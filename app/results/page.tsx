"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMaturityLevel, getDimensionScores, MATURITY_LEVELS } from "@/lib/questions";
import { Answer } from "@/lib/types";
import AsesoraENIA from "@/components/AsesoraENIA";

interface StoredResult {
  answers: Answer[];
  score: number;
  completedAt: string;
}

export default function ResultsPage() {
  const [result, setResult] = useState<StoredResult | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("enia_result");
    if (raw) {
      setResult(JSON.parse(raw));
    }
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-slate-600 mb-4">No se encontraron resultados.</p>
          <Link href="/test" className="text-[#CE1126] font-semibold hover:underline">
            Realizar el test
          </Link>
        </div>
      </div>
    );
  }

  const { score, answers } = result;
  const level = getMaturityLevel(score);
  const dimensionScores = getDimensionScores(answers);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex">
              <div className="w-3 h-8 bg-[#CE1126] rounded-l-sm" />
              <div className="w-3 h-8 bg-white border-y border-slate-200" />
              <div className="w-3 h-8 bg-[#CE1126] rounded-r-sm" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#CE1126] tracking-widest uppercase">ENIA Perú</p>
              <p className="text-xs text-slate-500">Test de Madurez IA</p>
            </div>
          </Link>
          <span className="text-xs text-slate-400">
            {new Date(result.completedAt).toLocaleDateString("es-PE", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10 space-y-6 sm:space-y-8">
        {/* Score hero card */}
        <div
          className="rounded-2xl p-5 sm:p-8 md:p-10 text-center animate-scale-in border"
          style={{ backgroundColor: level.bgColor, borderColor: level.color + "33" }}
        >
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">
            Nivel de madurez en IA
          </p>

          {/* Gauge circle */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <svg className="w-40 h-40 -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke={level.color}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${(score / 100) * 264} 264`}
                className="transition-all duration-1000"
                style={{ filter: `drop-shadow(0 0 6px ${level.color}66)` }}
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-4xl font-black text-slate-900">{score}</span>
              <span className="block text-xs text-slate-500 font-medium">/ 100</span>
            </div>
          </div>

          <h1
            className="text-3xl md:text-4xl font-black mb-3"
            style={{ color: level.color }}
          >
            {level.label}
          </h1>
          <p className="text-slate-700 text-base max-w-xl mx-auto leading-relaxed mb-2">
            {level.description}
          </p>
        </div>

        {/* Maturity scale */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-5">
            Escala de madurez
          </h2>
          <div className="space-y-2">
            {MATURITY_LEVELS.map((lvl) => {
              const isCurrent = lvl.label === level.label;
              return (
                <div
                  key={lvl.label}
                  className={`flex items-center justify-between rounded-lg px-4 py-3 border transition-all ${
                    isCurrent
                      ? "border-2"
                      : "border-slate-100 bg-slate-50"
                  }`}
                  style={
                    isCurrent
                      ? {
                          borderColor: lvl.color,
                          backgroundColor: lvl.bgColor,
                        }
                      : {}
                  }
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: lvl.color }}
                    />
                    <span
                      className={`font-semibold text-sm ${isCurrent ? "text-slate-900" : "text-slate-500"}`}
                    >
                      {lvl.label}
                    </span>
                    {isCurrent && (
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: lvl.color, color: "#fff" }}
                      >
                        Tu nivel
                      </span>
                    )}
                  </div>
                  <span className={`text-sm font-mono ${isCurrent ? "text-slate-700 font-bold" : "text-slate-400"}`}>
                    {lvl.range[0]}–{lvl.range[1]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dimension breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-5">
            Resultado por dimensión
          </h2>
          <div className="space-y-4">
            {Object.entries(dimensionScores).map(([dim, { score: ds, max }]) => {
              const pct = Math.round((ds / max) * 100);
              const color =
                pct <= 33 ? "#EF4444" : pct <= 66 ? "#F97316" : pct < 100 ? "#3B82F6" : "#10B981";
              return (
                <div key={dim}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-slate-700">{dim}</span>
                    <span className="text-sm font-bold" style={{ color }}>
                      {ds}/{max}
                    </span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommendation */}
        <div className="rounded-2xl border-2 p-4 sm:p-6 md:p-8" style={{ borderColor: level.color + "55", backgroundColor: level.bgColor }}>
          <div className="flex items-start gap-3 sm:gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: level.color }}
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Recomendación estratégica</h3>
              <p className="text-slate-700 leading-relaxed">{level.recommendation}</p>
            </div>
          </div>
        </div>

        {/* ENIA reference */}
        <div className="bg-slate-800 rounded-2xl p-6 text-white">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
              <h3 className="font-bold text-base mb-1">¿Qué es la ENIA?</h3>
              <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
                La <strong className="text-white">Estrategia Nacional de Inteligencia Artificial del Perú (ENIA)</strong> es
                el instrumento de política pública que orienta el desarrollo, adopción y gobernanza ética de la IA en el país,
                con enfoque en competitividad, inclusión y bienestar ciudadano.
              </p>
            </div>
            <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto shrink-0">
              <Link
                href="/test"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#CE1126] hover:bg-[#a80e1e] text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors text-center"
              >
                Repetir test
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </Link>
              <Link
                href="/"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium text-sm px-5 py-2.5 rounded-xl transition-colors text-center"
              >
                Inicio
              </Link>
            </div>
          </div>
        </div>

        {/* Share prompt */}
        <div className="text-center py-4">
          <button
            onClick={() => {
              const text = `Mi organización obtuvo ${score}/100 en el Test de Madurez IA basado en #ENIA Perú — Nivel: ${level.label}. ¿Cuál es el nivel de tu organización?`;
              if (navigator.share) {
                navigator.share({ title: "Test de Madurez IA — ENIA Perú", text });
              } else {
                navigator.clipboard.writeText(text);
                alert("Texto copiado al portapapeles");
              }
            }}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700 border border-slate-300 rounded-xl px-5 py-2.5 hover:bg-white transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Compartir resultado
          </button>
        </div>
      </main>

      {/* Asesora ENIA — chat flotante */}
      <AsesoraENIA
        score={score}
        levelLabel={level.label}
        dimensionScores={dimensionScores}
      />
    </div>
  );
}
