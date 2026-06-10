"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QUESTIONS, calculateScore } from "@/lib/questions";
import { Answer } from "@/lib/types";

export default function TestPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const question = QUESTIONS[currentIndex];
  const progress = ((currentIndex) / QUESTIONS.length) * 100;
  const isLast = currentIndex === QUESTIONS.length - 1;

  function handleSelect(optionId: string) {
    if (isTransitioning) return;
    setSelectedOption(optionId);
  }

  function handleNext() {
    if (!selectedOption || isTransitioning) return;

    const option = question.options.find((o) => o.id === selectedOption)!;
    const newAnswers: Answer[] = [
      ...answers.filter((a) => a.questionId !== question.id),
      { questionId: question.id, optionId: selectedOption, score: option.score },
    ];
    setAnswers(newAnswers);

    if (isLast) {
      const rawTotal = newAnswers.reduce((sum, a) => sum + a.score, 0);
      const score = calculateScore(rawTotal);
      localStorage.setItem(
        "enia_result",
        JSON.stringify({ answers: newAnswers, score, completedAt: new Date().toISOString() })
      );
      router.push("/results");
      return;
    }

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsTransitioning(false);
    }, 250);
  }

  function handleBack() {
    if (currentIndex === 0) return;
    const prevAnswer = answers.find((a) => a.questionId === QUESTIONS[currentIndex - 1].id);
    setCurrentIndex((i) => i - 1);
    setSelectedOption(prevAnswer?.optionId ?? null);
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <Link href="/" className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Inicio
            </Link>
            <span className="text-sm font-semibold text-slate-700">
              Pregunta {currentIndex + 1} de {QUESTIONS.length}
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#CE1126] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Question content */}
      <main className="flex-1 flex items-start justify-center px-6 py-10">
        <div
          key={currentIndex}
          className="w-full max-w-2xl animate-fade-in-up"
        >
          {/* Dimension badge */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">{question.dimensionIcon}</span>
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              {question.dimension}
            </span>
          </div>

          {/* Question text */}
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-snug mb-8">
            {question.text}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, idx) => {
              const isSelected = selectedOption === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-150 flex items-start gap-4 group ${
                    isSelected
                      ? "border-[#CE1126] bg-red-50 shadow-md"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 font-bold text-sm transition-all ${
                      isSelected
                        ? "border-[#CE1126] bg-[#CE1126] text-white"
                        : "border-slate-300 text-slate-400 group-hover:border-slate-400"
                    }`}
                  >
                    {isSelected ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      String.fromCharCode(65 + idx)
                    )}
                  </div>
                  <span
                    className={`text-sm md:text-base leading-snug transition-colors ${
                      isSelected ? "text-slate-900 font-medium" : "text-slate-700"
                    }`}
                  >
                    {option.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-4 py-2 rounded-lg hover:bg-slate-100"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Anterior
            </button>

            <button
              onClick={handleNext}
              disabled={!selectedOption}
              className="flex items-center gap-2 bg-[#CE1126] hover:bg-[#a80e1e] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {isLast ? "Ver resultados" : "Siguiente"}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>

          {/* Step dots */}
          <div className="flex justify-center gap-1.5 mt-10 flex-wrap">
            {QUESTIONS.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx < currentIndex
                    ? "w-4 bg-[#CE1126]"
                    : idx === currentIndex
                    ? "w-6 bg-[#CE1126]"
                    : "w-1.5 bg-slate-200"
                }`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
