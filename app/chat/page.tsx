"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";

interface Correction {
  original: string;
  corrected: string;
  explanation: string;
}

interface AIMessage {
  reply: string;
  romaji: string;
  translation: string;
  corrections: Correction[];
  tip: string | null;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  parsed?: AIMessage;
}

function AssistantBubble({ parsed }: { parsed: AIMessage }) {
  return (
    <div className="space-y-2 max-w-[80%]">
      <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
        <p className="text-gray-900 text-base">{parsed.reply}</p>
        <p className="text-gray-400 text-xs mt-1">{parsed.romaji}</p>
        <p className="text-gray-500 text-sm mt-1 italic">{parsed.translation}</p>
      </div>

      {parsed.corrections.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm">
          <p className="text-amber-700 font-semibold text-xs uppercase tracking-wide mb-2">Corrections</p>
          {parsed.corrections.map((c, i) => (
            <div key={i} className="mb-2 last:mb-0">
              <span className="line-through text-red-400">{c.original}</span>
              {" → "}
              <span className="text-green-600 font-medium">{c.corrected}</span>
              <p className="text-gray-600 text-xs mt-0.5">{c.explanation}</p>
            </div>
          ))}
        </div>
      )}

      {parsed.tip && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3 text-sm text-indigo-700">
          <span className="font-semibold text-xs uppercase tracking-wide">Tip </span>
          {parsed.tip}
        </div>
      )}
    </div>
  );
}

export default function ChatPage() {
  const router = useRouter();
  const supabase = createClient();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const initSession = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }
    setUserId(user.id);

    // Get or create session
    const { data: sessions } = await supabase
      .from("chat_sessions")
      .select("id")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1);

    let sid: string;
    if (sessions && sessions.length > 0) {
      sid = sessions[0].id;
    } else {
      const { data: newSession } = await supabase
        .from("chat_sessions")
        .insert({ user_id: user.id })
        .select("id")
        .single();
      sid = newSession!.id;
    }
    setSessionId(sid);

    // Load message history
    const { data: msgs } = await supabase
      .from("messages")
      .select("*")
      .eq("session_id", sid)
      .order("created_at", { ascending: true });

    if (msgs) {
      const loaded: Message[] = msgs.map((m) => {
        if (m.role === "assistant") {
          try {
            return { id: m.id, role: "assistant", content: m.content, parsed: JSON.parse(m.content) };
          } catch {
            return { id: m.id, role: "assistant", content: m.content };
          }
        }
        return { id: m.id, role: "user", content: m.content };
      });
      setMessages(loaded);
    }
  }, [supabase, router]);

  useEffect(() => { initSession(); }, [initSession]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || !sessionId || loading) return;

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    const text = input.trim();
    setInput("");
    setLoading(true);

    // Build history for context (last 10 exchanges)
    const recentHistory = messages.slice(-10).map((m) => ({
      role: m.role,
      content: m.role === "assistant" && m.parsed ? m.parsed.reply : m.content,
    }));

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, sessionId, history: recentHistory }),
    });

    if (res.ok) {
      const data: AIMessage = await res.json();
      const aiMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: JSON.stringify(data),
        parsed: data,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } else {
      setMessages((prev) => [...prev, {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "",
        parsed: { reply: "エラーが発生しました。もう一度お試しください。", romaji: "Eraa ga hassei shimashita.", translation: "An error occurred. Please try again.", corrections: [], tip: null },
      }]);
    }
    setLoading(false);
  }

  async function handleNewSession() {
    if (!userId) return;
    const { data } = await supabase
      .from("chat_sessions")
      .insert({ user_id: userId })
      .select("id")
      .single();
    if (data) {
      setSessionId(data.id);
      setMessages([]);
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Nav />
      {/* Chat sub-header */}
      <div className="bg-white border-b border-gray-100 px-4 py-2 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700">Hana · AI Tutor</p>
          <p className="text-xs text-gray-400">Chat freely in Japanese</p>
        </div>
        <button
          onClick={handleNewSession}
          className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          New chat
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 && !loading && (
          <div className="text-center mt-16 text-gray-400">
            <p className="text-4xl mb-3">🌸</p>
            <p className="font-medium text-gray-500">こんにちは！</p>
            <p className="text-sm mt-1">Start chatting in Japanese. Hana will correct and guide you.</p>
          </div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "user" ? (
              <div className="bg-indigo-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[75%] text-sm shadow-sm">
                {msg.content}
              </div>
            ) : msg.parsed ? (
              <AssistantBubble parsed={msg.parsed} />
            ) : (
              <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] text-sm text-gray-700">
                {msg.content}
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1 items-center h-5">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <form onSubmit={handleSend} className="flex gap-2 max-w-3xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="日本語で話しかけてね… (Type in Japanese)"
            disabled={loading}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
