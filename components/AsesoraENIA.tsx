"use client";

import { useState, useRef, useEffect } from "react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface DimensionScore {
  score: number;
  max: number;
}

interface Props {
  score: number;
  levelLabel: string;
  dimensionScores: Record<string, DimensionScore>;
}

function buildContext(score: number, levelLabel: string, dimensionScores: Record<string, DimensionScore>): string {
  const lines = Object.entries(dimensionScores).map(([dim, { score: ds, max }]) => {
    const pct = Math.round((ds / max) * 100);
    return `  - ${dim}: ${ds}/${max} (${pct}%)`;
  });
  return [
    `Score total: ${score}/100 — Nivel: ${levelLabel}`,
    `Resultados por eje:`,
    ...lines,
  ].join("\n");
}

function getWeakest(dimensionScores: Record<string, DimensionScore>): string[] {
  return Object.entries(dimensionScores)
    .map(([dim, { score: ds, max }]) => ({ dim: dim.replace(/Eje \d+ · /, ""), pct: Math.round((ds / max) * 100) }))
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 2)
    .map((d) => d.dim);
}

function buildOpening(score: number, levelLabel: string, dimensionScores: Record<string, DimensionScore>): string {
  const weak = getWeakest(dimensionScores);
  const brecha = weak.length === 2
    ? `mayor brecha en **${weak[0]}** y **${weak[1]}**`
    : `mayor brecha en **${weak[0]}**`;
  return `Hola, soy tu Asesora ENIA 👋\n\nTu organización obtuvo **${score}/100** — nivel **${levelLabel}**, con ${brecha}.\n\n¿Quieres que te explique qué obligaciones tienes bajo la Ley N.° 31814 o por qué eje empezar?`;
}

function renderText(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : <span key={i}>{part}</span>
  );
}

const SUGGESTIONS = [
  "¿Qué debo hacer primero?",
  "¿Qué es la NTP-ISO/IEC 42001?",
  "Plazo más urgente",
  "¿Qué es el OIA?",
];

export default function AsesoraENIA({ score, levelLabel, dimensionScores }: Props) {
  const context = buildContext(score, levelLabel, dimensionScores);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: buildOpening(score, levelLabel, dimensionScores) },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    const newMessages: ChatMessage[] = [...messages, { role: "user", content: msg }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/agente-enia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, context }),
      });
      const data = await res.json() as { content?: string; error?: string };
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content ?? data.error ?? "Error al obtener respuesta." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "No se pudo conectar. Verifica tu conexión e intenta de nuevo." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const hasUserMessages = messages.some((m) => m.role === "user");

  return (
    <div className="rounded-2xl overflow-hidden border-2" style={{ borderColor: "#003087" }}>
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{ background: "linear-gradient(135deg, #003087 0%, #004db3 100%)" }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black shrink-0"
          style={{ backgroundColor: "#C8102E", color: "#fff" }}
        >
          IA
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-base leading-tight">Asesora ENIA</p>
          <p className="text-blue-200 text-xs">Orientación basada en ENIA 2026-2030 · Perú</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-green-300 font-medium shrink-0">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          En línea
        </div>
      </div>

      {/* Context pill */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 border-b border-blue-100">
        <span
          className="text-xs font-black px-2.5 py-0.5 rounded-full text-white shrink-0"
          style={{ backgroundColor: "#C8102E" }}
        >
          {score}/100
        </span>
        <span className="text-xs text-blue-800 font-medium">
          Nivel {levelLabel} · Contexto de tu evaluación cargado
        </span>
      </div>

      {/* Messages */}
      <div className="bg-white px-4 py-4 space-y-3 overflow-y-auto" style={{ minHeight: 220, maxHeight: 340 }}>
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "assistant" && (
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 mt-0.5"
                style={{ backgroundColor: "#003087", color: "#fff" }}
              >
                IA
              </div>
            )}
            <div
              className="max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
              style={
                m.role === "user"
                  ? { backgroundColor: "#003087", color: "#fff", borderBottomRightRadius: 4 }
                  : { backgroundColor: "#f1f5f9", color: "#1e293b", borderBottomLeftRadius: 4 }
              }
            >
              {renderText(m.content)}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2.5 justify-start">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black shrink-0"
              style={{ backgroundColor: "#003087", color: "#fff" }}
            >
              IA
            </div>
            <div className="bg-slate-100 rounded-2xl rounded-bl-sm px-4 py-3">
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick suggestions */}
      {!hasUserMessages && (
        <div className="bg-white border-t border-slate-100 px-4 pb-3 flex flex-wrap gap-2">
          {SUGGESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              className="text-xs border rounded-full px-3 py-1.5 transition-colors hover:bg-blue-50"
              style={{ borderColor: "#003087", color: "#003087" }}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="border-t border-slate-200 bg-white px-4 py-3 flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
          placeholder="Pregunta sobre ENIA, Ley 31814, plazos..."
          className="flex-1 text-sm border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
          disabled={loading}
        />
        <button
          onClick={() => send()}
          disabled={loading || !input.trim()}
          className="text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-40 hover:opacity-90 shrink-0"
          style={{ backgroundColor: "#C8102E" }}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
