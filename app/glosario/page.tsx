"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { GLOSARIO, type TerminoGlosario } from "@/lib/glosario-data";

export default function GlosarioPage() {
  const [busqueda, setBusqueda] = useState("");
  const [seleccionado, setSeleccionado] = useState<TerminoGlosario | null>(null);
  const [eje, setEje] = useState<number | null>(null);

  const terminos = useMemo(() => {
    return GLOSARIO.filter((t) => {
      const coincideBusqueda =
        t.termino.toLowerCase().includes(busqueda.toLowerCase()) ||
        t.definicion.toLowerCase().includes(busqueda.toLowerCase());
      const coincideEje = eje === null || t.eje === eje;
      return coincideBusqueda && coincideEje;
    });
  }, [busqueda, eje]);

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex shrink-0">
              <div className="w-3 h-8 bg-[#CE1126] rounded-l-sm" />
              <div className="w-3 h-8 bg-white border-y border-slate-200" />
              <div className="w-3 h-8 bg-[#CE1126] rounded-r-sm" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#CE1126] tracking-widest uppercase">ENIA Perú</p>
              <p className="text-xs text-slate-500 hidden sm:block">Glosario Interactivo</p>
            </div>
          </div>
          <Link href="/" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">← Inicio</Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <p className="text-xs font-semibold text-[#CE1126] uppercase tracking-widest mb-1">ENIA 2026–2030</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Glosario Interactivo</h1>
          <p className="text-sm text-gray-500">
            Guía completa de términos sobre IA y la ENIA. {GLOSARIO.length} definiciones con ejemplos prácticos.
          </p>
        </div>

        {/* Búsqueda y filtros */}
        <div className="bg-white rounded-2xl p-5 mb-6 border border-gray-100 shadow-sm">
          <input
            type="text"
            placeholder="Busca un término (ej: Gobernanza, SGTD, Privacidad)..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full text-sm border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#003087] focus:ring-2 focus:ring-[#003087]/20 mb-4"
          />

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setEje(null)}
              className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
                eje === null
                  ? "bg-[#003087] text-white border-[#003087]"
                  : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
              }`}
            >
              Todos
            </button>
            {[1, 2, 3, 4].map((e) => {
              const labels = ["", "Talento", "Innovación", "Marco Ético", "Colaboración"];
              return (
                <button
                  key={e}
                  onClick={() => setEje(e)}
                  className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
                    eje === e
                      ? "text-white border-[#003087]"
                      : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                  }`}
                  style={eje === e ? { backgroundColor: "#003087" } : {}}
                >
                  Eje {e}: {labels[e]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de términos */}
          <div className="lg:col-span-1 space-y-2 max-h-[600px] overflow-y-auto">
            {terminos.map((t) => (
              <button
                key={t.id}
                onClick={() => setSeleccionado(t)}
                className={`w-full text-left p-3 rounded-lg border transition-all text-sm ${
                  seleccionado?.id === t.id
                    ? "bg-[#003087] text-white border-[#003087]"
                    : "bg-white text-gray-900 border-gray-100 hover:border-gray-200 hover:shadow-sm"
                }`}
              >
                <p className="font-semibold">{t.termino}</p>
                {t.eje && (
                  <p className={`text-xs mt-1 ${seleccionado?.id === t.id ? "text-blue-100" : "text-gray-400"}`}>
                    Eje {t.eje}
                  </p>
                )}
              </button>
            ))}
          </div>

          {/* Detalle del término */}
          <div className="lg:col-span-2">
            {seleccionado ? (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{seleccionado.termino}</h2>
                {seleccionado.eje && (
                  <p className="text-xs text-gray-400 mb-4">
                    <span className="font-semibold">Eje {seleccionado.eje}:</span> {["", "Talento", "Innovación", "Marco Ético", "Colaboración"][seleccionado.eje]}
                  </p>
                )}

                <div className="space-y-5">
                  <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Definición</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{seleccionado.definicion}</p>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Ejemplo Práctico</h3>
                    <p className="text-sm text-gray-700 leading-relaxed italic border-l-4 border-[#CE1126] pl-4">
                      {seleccionado.ejemplo}
                    </p>
                  </div>

                  {seleccionado.relacionados.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Términos Relacionados</h3>
                      <div className="flex flex-wrap gap-2">
                        {seleccionado.relacionados.map((rel) => (
                          <button
                            key={rel}
                            onClick={() => {
                              const found = GLOSARIO.find((t) => t.termino === rel);
                              if (found) setSeleccionado(found);
                            }}
                            className="text-xs px-3 py-1.5 bg-blue-50 text-[#003087] rounded-full border border-blue-200 hover:bg-blue-100 transition-colors font-medium"
                          >
                            {rel}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 border border-gray-100 text-center">
                <p className="text-gray-400 text-sm">
                  {terminos.length === 0
                    ? "No se encontraron términos que coincidan con tu búsqueda."
                    : "Selecciona un término para ver su definición, ejemplo y términos relacionados."}
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-300 mt-10">
          Basado en ENIA 2026–2030 · Ley N.° 31814 · DS 115-2025-PCM
        </p>
      </div>
    </main>
  );
}
