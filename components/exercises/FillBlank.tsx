"use client";

import { useState } from "react";
import { FillBlankExercise } from "@/lib/lessons";

export default function FillBlank({
  exercise,
  onCorrect,
  onContinue,
}: {
  exercise: FillBlankExercise;
  onCorrect: () => void;
  onContinue: () => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  const isCorrect = selected === exercise.correctIndex;

  const parts = exercise.sentence.split("___");

  function handleCheck() {
    if (selected === null) return;
    setChecked(true);
    if (selected === exercise.correctIndex) onCorrect();
  }

  function handleContinue() {
    setSelected(null);
    setChecked(false);
    onContinue();
  }

  const filled = checked || selected !== null
    ? exercise.choices[selected ?? exercise.correctIndex]
    : "___";

  return (
    <div className="space-y-6">
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Fill in the blank</p>

      <div className="bg-gray-50 rounded-xl px-5 py-4 text-xl text-gray-800 font-medium text-center leading-loose">
        {parts[0]}
        <span
          className={`mx-1 px-2 py-0.5 rounded-lg border-b-2 ${
            checked
              ? isCorrect
                ? "border-green-500 text-green-700 bg-green-50"
                : "border-red-400 text-red-700 bg-red-50"
              : selected !== null
              ? "border-indigo-500 text-indigo-700 bg-indigo-50"
              : "border-gray-400 text-gray-400"
          }`}
        >
          {selected !== null ? exercise.choices[selected] : "　　　"}
        </span>
        {parts[1]}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {exercise.choices.map((choice, i) => {
          let style =
            "w-full text-center px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ";
          if (!checked) {
            style +=
              selected === i
                ? "border-indigo-500 bg-indigo-50 text-indigo-800"
                : "border-gray-200 bg-white text-gray-700 hover:border-indigo-300 hover:bg-indigo-50";
          } else if (i === exercise.correctIndex) {
            style += "border-green-500 bg-green-50 text-green-800";
          } else if (i === selected) {
            style += "border-red-400 bg-red-50 text-red-700";
          } else {
            style += "border-gray-200 bg-white text-gray-400";
          }

          return (
            <button
              key={i}
              onClick={() => !checked && setSelected(i)}
              className={style}
            >
              {choice}
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
          <p>{exercise.explanation}</p>
        </div>
      )}

      <div className="flex justify-end">
        {!checked ? (
          <button
            onClick={handleCheck}
            disabled={selected === null}
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
