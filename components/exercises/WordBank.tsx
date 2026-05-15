"use client";

import { useState } from "react";
import { WordBankExercise } from "@/lib/lessons";

export default function WordBank({
  exercise,
  onCorrect,
  onContinue,
}: {
  exercise: WordBankExercise;
  onCorrect: () => void;
  onContinue: () => void;
}) {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);

  const selectedWords = selectedIndices.map((i) => exercise.words[i]);
  const isCorrect =
    selectedWords.length === exercise.answer.length &&
    selectedWords.every((w, i) => w === exercise.answer[i]);

  function selectWord(idx: number) {
    if (checked || selectedIndices.includes(idx)) return;
    setSelectedIndices((prev) => [...prev, idx]);
  }

  function removeWord(positionInSelected: number) {
    if (checked) return;
    setSelectedIndices((prev) => prev.filter((_, i) => i !== positionInSelected));
  }

  function handleCheck() {
    if (selectedIndices.length === 0) return;
    setChecked(true);
    if (isCorrect) onCorrect();
  }

  function handleContinue() {
    setSelectedIndices([]);
    setChecked(false);
    onContinue();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
          Arrange the words
        </p>
        <p className="text-lg font-semibold text-gray-800">{exercise.prompt}</p>
      </div>

      {/* Sentence assembly area */}
      <div
        className={`min-h-[56px] bg-gray-50 border-2 rounded-xl px-4 py-3 flex flex-wrap gap-2 items-center transition-colors ${
          checked
            ? isCorrect
              ? "border-green-400 bg-green-50"
              : "border-red-400 bg-red-50"
            : "border-gray-200"
        }`}
      >
        {selectedIndices.length === 0 ? (
          <span className="text-gray-400 text-sm">Tap words below to build the sentence</span>
        ) : (
          selectedIndices.map((wordIdx, pos) => (
            <button
              key={pos}
              onClick={() => removeWord(pos)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                checked
                  ? isCorrect
                    ? "border-green-400 bg-white text-green-800"
                    : "border-red-400 bg-white text-red-700"
                  : "border-indigo-400 bg-white text-indigo-800 hover:bg-red-50 hover:border-red-300"
              }`}
            >
              {exercise.words[wordIdx]}
            </button>
          ))
        )}
      </div>

      {/* Word bank */}
      <div className="flex flex-wrap gap-2">
        {exercise.words.map((word, idx) => {
          const used = selectedIndices.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => selectWord(idx)}
              disabled={used || checked}
              className={`px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                used
                  ? "border-gray-100 bg-gray-100 text-gray-300 cursor-default"
                  : "border-gray-300 bg-white text-gray-700 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-800"
              }`}
            >
              {word}
            </button>
          );
        })}
      </div>

      {checked && (
        <div
          className={`px-4 py-3 rounded-xl text-sm ${
            isCorrect
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          <p className="font-semibold mb-1">{isCorrect ? "✓ Correct!" : "✗ Not quite"}</p>
          {!isCorrect && (
            <p>
              Correct order:{" "}
              <span className="font-medium">{exercise.answer.join(" ")}</span>
            </p>
          )}
        </div>
      )}

      <div className="flex justify-end">
        {!checked ? (
          <button
            onClick={handleCheck}
            disabled={selectedIndices.length === 0}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 disabled:opacity-40 transition-colors"
          >
            Check
          </button>
        ) : (
          <button
            onClick={handleContinue}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Continue →
          </button>
        )}
      </div>
    </div>
  );
}
