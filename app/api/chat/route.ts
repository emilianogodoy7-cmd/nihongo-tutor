import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase-server";
import { JAPANESE_TUTOR_SYSTEM_PROMPT } from "@/lib/system-prompt";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError) console.error("[auth] getUser error:", authError.message);
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
      model: "claude-haiku-4-5",
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
      console.error("[parse] failed to parse AI response:", raw);
      return NextResponse.json({ error: "AI response parse error" }, { status: 500 });
    }

    const { error: insertUserErr } = await supabase.from("messages").insert({
      session_id: sessionId,
      user_id: user.id,
      role: "user",
      content: message,
    });
    if (insertUserErr) console.error("[db] insert user message:", insertUserErr.message);

    const { error: insertAiErr } = await supabase.from("messages").insert({
      session_id: sessionId,
      user_id: user.id,
      role: "assistant",
      content: raw,
    });
    if (insertAiErr) console.error("[db] insert assistant message:", insertAiErr.message);

    return NextResponse.json(parsed);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[api/chat] unhandled error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
