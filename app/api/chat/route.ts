import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase-server";
import { JAPANESE_TUTOR_SYSTEM_PROMPT } from "@/lib/system-prompt";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

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

  const messages: Anthropic.MessageParam[] = [
    ...(history || []),
    { role: "user", content: message },
  ];

  const response = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 1024,
    system: JAPANESE_TUTOR_SYSTEM_PROMPT,
    messages,
    temperature: 0.7,
  });

  const raw = response.content[0].type === "text" ? response.content[0].text : "{}";
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
