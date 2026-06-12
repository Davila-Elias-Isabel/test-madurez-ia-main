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
    `Score total: ${score}/100 — Nivel de madurez: ${levelLabel}`,
    `Resultados por eje:`,
    ...lines,
  ].join("\n");
}

function buildOpeningMessage(score: number, levelLabel: string, dimensionScores: Record<string, DimensionScore>): string {
  const sorted = Object.entries(dimensionScores)
    .map(([dim, { score: ds, max }]) => ({ dim, pct: Math.round((ds / max) * 100) }))
    .sort((a, b) => a.pct - b.pct);

  const weakest = sorted.slice(0, 2).map((d) => {
    const short = d.dim.replace(/Eje \d+ · /, "");
    return short;
  });

  const brechaText = weakest.length === 2
    ? `mayor brecha en **${weakest[0]}** y **${weakest[1]}**`
    : `mayor brecha en **${weakest[0]}**`;

  return `Hola, soy tu Asesora ENIA 👋\n\nTu organización obtuvo **${score}/100** — nivel **${levelLabel}**, con ${brechaText}.\n\n¿Quieres que te explique qué obligaciones tienes bajo la Ley N.° 31814, o por qué eje estratégico empezar?`;
}

export default function AsesoraENIA({ score, levelLabel, dimensionScores }: Props) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const context = buildContext(score, levelLabel, dimensionScores);

  useEffect(() => {
    if (open && !initialized) {
      setMessages([
        {
          role: "assistant",
          content: buildOpeningMessage(score, levelLabel, dimensionScores),
        },
      ]);
      setInitialized(true);
    }
  }, [open, initialized, score, levelLabel, dimensionScores]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
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
        { role: "assistant", content: "No se pudo conectar con la Asesora ENIA. Intenta nuevamente." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function renderContent(text: string) {
    return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
      part.startsWith("**") && part.endsWith("**")
        ? <strong key={i}>{part.slice(2, -2)}</strong>
        : <span key={i}>{part}</span>
    );
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 text-white font-semibold text-sm px-4 py-3 rounded-2xl shadow-xl transition-all duration-200 hover:-translate-y-0.5"
        style={{ backgroundColor: open ? "#002060" : "#003087", boxShadow: "0 8px 24px rgba(0,48,135,0.35)" }}
        aria-label="Abrir Asesora ENIA"
      >
        {/* Avatar ENIA */}
        <span
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0"
          style={{ backgroundColor: "#C8102E", color: "#fff" }}
        >
          IA
        </span>
        <span className="hidden sm:inline">Asesora ENIA</span>
        {!open && (
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-20 right-4 sm:right-6 z-50 flex flex-col rounded-2xl border border-gray-200 overflow-hidden"
          style={{
            width: "min(92vw, 400px)",
            maxHeight: "min(72vh, 560px)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 shrink-0"
            style={{ background: "linear-gradient(135deg, #003087 0%, #004db3 100%)" }}
          >
            <div className="flex items-center gap-2.5">
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                style={{ backgroundColor: "#C8102E", color: "#fff" }}
              >
                IA
              </span>
              <div>
                <p className="text-white font-bold text-sm leading-none">Asesora ENIA</p>
                <p className="text-blue-200 text-xs mt-0.5">ENIA 2026-2030 · Perú</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-xs text-green-300 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                En línea
              </span>
              <button
                onClick={() => setOpen(false)}
                className="text-blue-200 hover:text-white p-1 rounded-lg transition-colors"
                aria-label="Cerrar"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Score context bar */}
          <div className="bg-blue-50 border-b border-blue-100 px-4 py-2 flex items-center gap-2 shrink-0">
            <span
              className="text-xs font-black px-2 py-0.5 rounded-full text-white shrink-0"
              style={{ backgroundColor: "#C8102E" }}
            >
              {score}/100
            </span>
            <span className="text-xs text-blue-700 font-medium truncate">
              Nivel {levelLabel} · Contexto cargado
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white min-h-0">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
                {m.role === "assistant" && (
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5"
                    style={{ backgroundColor: "#003087", color: "#fff" }}
                  >
                    IA
                  </span>
                )}
                <div
                  className="max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed"
                  style={
                    m.role === "user"
                      ? { backgroundColor: "#003087", color: "#fff", borderBottomRightRadius: 4 }
                      : { backgroundColor: "#f1f5f9", color: "#1e293b", borderBottomLeftRadius: 4 }
                  }
                >
                  {renderContent(m.content)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start gap-2">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0"
                  style={{ backgroundColor: "#003087", color: "#fff" }}
                >
                  IA
                </span>
                <div className="bg-slate-100 rounded-2xl rounded-bl-sm px-4 py-3">
                  <span className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick suggestions (shown only with no user messages yet) */}
          {messages.filter((m) => m.role === "user").length === 0 && !loading && (
            <div className="bg-white border-t border-slate-100 px-3 py-2 flex gap-2 overflow-x-auto shrink-0">
              {[
                "¿Qué debo hacer primero?",
                "Plazo más urgente",
                "¿Qué es la NTP-ISO 42001?",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => { setInput(q); setTimeout(() => inputRef.current?.focus(), 50); }}
                  className="text-xs whitespace-nowrap border rounded-full px-3 py-1.5 transition-colors shrink-0"
                  style={{ borderColor: "#003087", color: "#003087" }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-slate-100 p-3 flex gap-2 bg-white shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
              placeholder="Pregunta sobre ENIA, plazos, obligaciones..."
              className="flex-1 text-sm border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-[#003087] focus:ring-1 focus:ring-[#003087]/30 transition-all"
              disabled={loading}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="text-white p-2.5 rounded-xl transition-all disabled:opacity-40 hover:opacity-90 shrink-0"
              style={{ backgroundColor: "#C8102E" }}
              aria-label="Enviar"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
