"use client";

import { useState } from "react";
import { ListeningExercise } from "@/lib/lessons";

export default function ListeningScaffold({
  exercise,
  onCorrect,
  onContinue,
}: {
  exercise: ListeningExercise;
  onCorrect: () => void;
  onContinue: () => void;
}) {
  const [revealed, setRevealed] = useState(false);

  function handleReveal() {
    setRevealed(true);
    onCorrect();
  }

  function handleContinue() {
    setRevealed(false);
    onContinue();
  }

  return (
    <div className="space-y-6">
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Listening</p>

      <div className="flex flex-col items-center gap-4 py-6">
        <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center">
          <span className="text-4xl">🔊</span>
        </div>

        <div className="text-center">
          <p className="text-3xl font-bold text-gray-800">{exercise.text}</p>
          {revealed && (
            <div className="mt-3 space-y-1">
              <p className="text-gray-500 text-sm">{exercise.romaji}</p>
              <p className="text-gray-600 font-medium">{exercise.translation}</p>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-400 text-center">
          (Audio playback coming soon — practice reading the text above)
        </p>
      </div>

      {!revealed ? (
        <div className="flex justify-end">
          <button
            onClick={handleReveal}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Reveal meaning
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3 text-sm text-indigo-800">
            <p className="font-semibold mb-1">✓ Good work!</p>
            <p>
              <span className="font-medium">{exercise.text}</span> ({exercise.romaji}) means{" "}
              <span className="font-medium">{exercise.translation}</span>.
            </p>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleContinue}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Continue →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
