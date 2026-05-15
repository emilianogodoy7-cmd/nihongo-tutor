"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-1">
        <span className="text-base font-bold text-gray-800 mr-3">日本語</span>
        <Link
          href="/learn"
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            pathname.startsWith("/learn")
              ? "bg-indigo-100 text-indigo-700"
              : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          }`}
        >
          Learn
        </Link>
        <Link
          href="/chat"
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            pathname.startsWith("/chat")
              ? "bg-indigo-100 text-indigo-700"
              : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          }`}
        >
          Chat
        </Link>
      </div>
      <button
        onClick={signOut}
        className="text-xs text-gray-400 hover:text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
      >
        Sign out
      </button>
    </div>
  );
}
