"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getLessonById } from "@/lib/lessons";
import MultipleChoice from "@/components/exercises/MultipleChoice";
import FillBlank from "@/components/exercises/FillBlank";
import WordBank from "@/components/exercises/WordBank";
import ListeningScaffold from "@/components/exercises/ListeningScaffold";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lesson = getLessonById(params.lessonId as string);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Lesson not found.{" "}
        <button onClick={() => router.push("/learn")} className="ml-2 text-indigo-600 underline">
          Back
        </button>
      </div>
    );
  }

  const exercise = lesson.exercises[currentIndex];
  const total = lesson.exercises.length;
  const progress = ((currentIndex) / total) * 100;

  function handleCorrect() {
    setCorrectCount((c) => c + 1);
  }

  function handleContinue() {
    if (currentIndex + 1 >= total) {
      setDone(true);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }

  if (done) {
    const pct = Math.round((correctCount / total) * 100);
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 max-w-sm w-full text-center space-y-4">
          <div className="text-5xl">{pct === 100 ? "🎉" : pct >= 60 ? "👍" : "💪"}</div>
          <h2 className="text-xl font-bold text-gray-900">Lesson complete!</h2>
          <p className="text-gray-500 text-sm">
            You got {correctCount} out of {total} correct ({pct}%)
          </p>
          <div className="w-full bg-gray-100 rounded-full h-2.5">
            <div
              className="bg-indigo-500 h-2.5 rounded-full transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setCorrectCount(0);
                setDone(false);
              }}
              className="w-full px-5 py-2.5 border-2 border-indigo-200 text-indigo-700 rounded-xl text-sm font-medium hover:bg-indigo-50 transition-colors"
            >
              Try again
            </button>
            <button
              onClick={() => router.push("/learn")}
              className="w-full px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Back to lessons
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Progress header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-xl mx-auto flex items-center gap-3">
          <button
            onClick={() => router.push("/learn")}
            className="text-gray-400 hover:text-gray-600 transition-colors text-lg"
          >
            ✕
          </button>
          <div className="flex-1 bg-gray-100 rounded-full h-3">
            <div
              className="bg-indigo-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-gray-400 w-12 text-right">
            {currentIndex + 1}/{total}
          </span>
        </div>
      </div>

      {/* Exercise card */}
      <div className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 w-full max-w-xl">
          <div className="mb-6 flex items-center gap-2">
            <span className="text-xl">{lesson.icon}</span>
            <span className="text-sm font-medium text-gray-500">{lesson.title}</span>
          </div>

          {exercise.type === "multiple-choice" && (
            <MultipleChoice
              exercise={exercise}
              onCorrect={handleCorrect}
              onContinue={handleContinue}
            />
          )}
          {exercise.type === "fill-blank" && (
            <FillBlank
              exercise={exercise}
              onCorrect={handleCorrect}
              onContinue={handleContinue}
            />
          )}
          {exercise.type === "word-bank" && (
            <WordBank
              exercise={exercise}
              onCorrect={handleCorrect}
              onContinue={handleContinue}
            />
          )}
          {exercise.type === "listening" && (
            <ListeningScaffold
              exercise={exercise}
              onCorrect={handleCorrect}
              onContinue={handleContinue}
            />
          )}
        </div>
      </div>
    </div>
  );
}
