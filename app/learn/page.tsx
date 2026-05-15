import Nav from "@/components/Nav";
import { LESSONS } from "@/lib/lessons";
import Link from "next/link";

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Lessons</h1>
          <p className="text-gray-500 text-sm mt-1">
            Pick a lesson to start practising.
          </p>
        </div>

        <div className="space-y-3">
          {LESSONS.map((lesson, i) => (
            <Link
              key={lesson.id}
              href={`/learn/${lesson.id}`}
              className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl px-5 py-4 hover:border-indigo-300 hover:shadow-sm transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-indigo-100 transition-colors">
                {lesson.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <h2 className="font-semibold text-gray-900">{lesson.title}</h2>
                  <span className="text-gray-400 text-sm">{lesson.titleJp}</span>
                </div>
                <p className="text-sm text-gray-500 mt-0.5 truncate">{lesson.description}</p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-xs text-gray-400">
                  {lesson.exercises.length} exercises
                </span>
                <span className="text-indigo-500 text-lg group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-2xl px-5 py-4 flex items-center gap-4">
          <span className="text-2xl">💬</span>
          <div className="flex-1">
            <p className="font-semibold text-indigo-800 text-sm">Want to practise freely?</p>
            <p className="text-indigo-600 text-xs mt-0.5">
              Chat with Hana, your AI tutor, for open conversation practice.
            </p>
          </div>
          <Link
            href="/chat"
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex-shrink-0"
          >
            Chat
          </Link>
        </div>
      </div>
    </div>
  );
}
