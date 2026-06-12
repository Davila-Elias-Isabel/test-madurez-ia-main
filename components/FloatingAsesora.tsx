"use client";

import { useState, useRef, useEffect } from "react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const WELCOME = "Hola, soy tu Asesora ENIA. Puedo orientarte sobre la Estrategia Nacional de IA del Perú, tus obligaciones bajo la Ley N.° 31814 y cómo avanzar en cada eje estratégico. ¿Por dónde empezamos?";

const QUICK = [
  "¿Qué es la ENIA 2026-2030?",
  "Plazos más urgentes",
  "¿Qué debo hacer primero?",
  "¿Qué es el OIA?",
];

export default function FloatingAsesora() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: WELCOME },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  async function send(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    const next: ChatMessage[] = [...messages, { role: "user", content: msg }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json() as { content?: string; error?: string };
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content ?? data.error ?? "Error al obtener respuesta." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "No se pudo conectar. Intenta nuevamente." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const hasUserMsg = messages.some((m) => m.role === "user");

  return (
    <>
      {/* Botón flotante redondo */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar Asesora ENIA" : "Abrir Asesora ENIA"}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-sm shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95"
        style={{
          backgroundColor: "#003087",
          boxShadow: "0 8px 32px rgba(0,48,135,0.45)",
        }}
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <span className="tracking-tight">ENIA</span>
        )}
      </button>

      {/* Panel de chat */}
      {open && (
        <div
          className="fixed z-50 flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-slate-200"
          style={{
            bottom: "5.5rem",
            right: "1.5rem",
            width: "min(380px, calc(100vw - 2rem))",
            height: "min(500px, calc(100vh - 8rem))",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 shrink-0"
            style={{ backgroundColor: "#003087" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm shrink-0"
                style={{ backgroundColor: "#C8102E", color: "#fff" }}
              >
                IA
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-tight">Asesora ENIA</p>
                <p className="text-blue-200 text-xs">Especialista en ENIA · Ley N.° 31814</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs text-green-300 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="hidden sm:inline">En línea</span>
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

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white min-h-0">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "assistant" && (
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5"
                    style={{ backgroundColor: "#003087", color: "#fff" }}
                  >
                    IA
                  </div>
                )}
                <div
                  className="max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap"
                  style={
                    m.role === "user"
                      ? { backgroundColor: "#C8102E", color: "#fff", borderBottomRightRadius: 4 }
                      : { backgroundColor: "#f1f5f9", color: "#1e293b", borderBottomLeftRadius: 4 }
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 justify-start">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black shrink-0"
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

          {/* Sugerencias rápidas */}
          {!hasUserMsg && (
            <div className="bg-white border-t border-slate-100 px-3 py-2 flex flex-wrap gap-1.5 shrink-0">
              {QUICK.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-xs border rounded-full px-3 py-1.5 transition-colors hover:bg-blue-50 shrink-0"
                  style={{ borderColor: "#003087", color: "#003087" }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-slate-200 bg-white px-3 py-3 flex gap-2 shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
              placeholder="Pregunta sobre ENIA, Ley 31814..."
              className="flex-1 text-sm border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all"
              disabled={loading}
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              className="text-white px-3.5 py-2 rounded-xl disabled:opacity-40 hover:opacity-90 transition-opacity shrink-0"
              style={{ backgroundColor: "#C8102E" }}
              aria-label="Enviar"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>

          {/* Footer autoría */}
          <div className="bg-slate-50 border-t border-slate-100 py-2 px-4 text-center shrink-0">
            <p className="text-xs text-slate-400">
              Desarrollado por{" "}
              <a
                href="https://www.linkedin.com/in/davilaeliasisabel"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:underline"
                style={{ color: "#003087" }}
              >
                R. Isabel Dávila Elías
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
