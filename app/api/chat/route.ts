import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@/lib/supabase-server";
import { JAPANESE_TUTOR_SYSTEM_PROMPT } from "@/lib/system-prompt";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { message, sessionId, history } = await req.json();

  if (!message || !sessionId) {
    return NextResponse.json({ error: "Missing message or sessionId" }, { status: 400 });
  }

  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: "system", content: JAPANESE_TUTOR_SYSTEM_PROMPT },
    ...(history || []),
    { role: "user", content: message },
  ];

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    response_format: { type: "json_object" },
    temperature: 0.7,
  });

  const raw = completion.choices[0].message.content ?? "{}";
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "AI response parse error" }, { status: 500 });
  }

  // Persist user message
  await supabase.from("messages").insert({
    session_id: sessionId,
    user_id: user.id,
    role: "user",
    content: message,
  });

  // Persist AI message (store full structured JSON)
  await supabase.from("messages").insert({
    session_id: sessionId,
    user_id: user.id,
    role: "assistant",
    content: raw,
  });

  return NextResponse.json(parsed);
}
