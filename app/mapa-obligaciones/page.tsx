"use client";

import { useState } from "react";
import Link from "next/link";
import { ENTIDADES, getObligaciones, type TipoEntidad, type Obligacion } from "@/lib/obligaciones";

const EJE_COLORS: Record<number, { bg: string; text: string; border: string }> = {
  1: { bg: "bg-blue-50",   text: "text-blue-700",   border: "border-blue-200" },
  2: { bg: "bg-purple-50", text: "text-purple-700",  border: "border-purple-200" },
  3: { bg: "bg-red-50",    text: "text-red-700",     border: "border-red-200" },
  4: { bg: "bg-green-50",  text: "text-green-700",   border: "border-green-200" },
};

const PRIORIDAD_COLORS: Record<string, string> = {
  alta:  "bg-red-100 text-red-700 border-red-200",
  media: "bg-yellow-100 text-yellow-700 border-yellow-200",
  baja:  "bg-gray-100 text-gray-500 border-gray-200",
};

function ObligacionCard({ ob }: { ob: Obligacion }) {
  const c = EJE_COLORS[ob.eje];
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-900 leading-snug">{ob.titulo}</p>
          <span className={`inline-block mt-1.5 text-xs font-medium px-2 py-0.5 rounded-full border ${c.bg} ${c.text} ${c.border}`}>
            {ob.ejeLabel}
          </span>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${PRIORIDAD_COLORS[ob.prioridad]}`}>
            {ob.prioridad === "alta" ? "Prioritario" : ob.prioridad === "media" ? "Importante" : "Recomendado"}
          </span>
          <span className="text-xs text-gray-400 font-medium">{ob.plazo}</span>
        </div>
      </div>
      <p className="text-xs text-gray-500 leading-relaxed">{ob.descripcion}</p>
      <p className="text-xs text-gray-300">{ob.norma}</p>
    </div>
  );
}

export default function MapaObligaciones() {
  const [selected, setSelected] = useState<TipoEntidad | null>(null);

  const obligaciones = selected ? getObligaciones(selected) : [];
  const alta  = obligaciones.filter((o) => o.prioridad === "alta");
  const media = obligaciones.filter((o) => o.prioridad === "media");
  const baja  = obligaciones.filter((o) => o.prioridad === "baja");

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex shrink-0">
              <div className="w-3 h-8 bg-[#CE1126] rounded-l-sm" />
              <div className="w-3 h-8 bg-white border-y border-slate-200" />
              <div className="w-3 h-8 bg-[#CE1126] rounded-r-sm" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#CE1126] tracking-widest uppercase leading-none">ENIA Perú</p>
              <p className="text-xs text-slate-500 hidden sm:block">Mapa de Obligaciones</p>
            </div>
          </div>
          <Link href="/" className="text-xs text-slate-400 hover:text-slate-600 transition-colors shrink-0">← Inicio</Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Title */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-[#CE1126] uppercase tracking-widest mb-1">ENIA 2026–2030</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Mapa de Obligaciones</h1>
          <p className="text-sm text-gray-500 max-w-xl">
            Selecciona el tipo de entidad para ver las obligaciones normativas que aplican, con plazos y normas de referencia.
          </p>
        </div>

        {/* Entity selector grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
          {(Object.entries(ENTIDADES) as [TipoEntidad, typeof ENTIDADES[TipoEntidad]][]).map(([key, ent]) => (
            <button
              key={key}
              onClick={() => setSelected(key === selected ? null : key)}
              className={`text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
                selected === key
                  ? "border-[#CE1126] bg-[#CE1126]/5 shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              <span className="text-2xl block mb-1">{ent.icon}</span>
              <p className={`text-sm font-semibold leading-tight ${selected === key ? "text-[#CE1126]" : "text-gray-800"}`}>
                {ent.label}
              </p>
              <p className="text-xs text-gray-400 mt-1 leading-snug hidden sm:block">{ent.descripcion}</p>
            </button>
          ))}
        </div>

        {/* Obligations list */}
        {selected && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">{ENTIDADES[selected].icon}</span>
              <div>
                <h2 className="text-lg font-bold text-gray-900">{ENTIDADES[selected].label}</h2>
                <p className="text-xs text-gray-400">{obligaciones.length} obligaciones identificadas</p>
              </div>
            </div>

            {/* Eje legend */}
            <div className="flex flex-wrap gap-2 mb-6">
              {([1, 2, 3, 4] as const).map((eje) => {
                const c = EJE_COLORS[eje];
                const labels = ["Talento y Capacidades", "Innovación", "Marco Ético", "Colaboración"];
                return (
                  <span key={eje} className={`text-xs font-medium px-3 py-1 rounded-full border ${c.bg} ${c.text} ${c.border}`}>
                    Eje {eje} · {labels[eje - 1]}
                  </span>
                );
              })}
            </div>

            {alta.length > 0 && (
              <section className="mb-8">
                <h3 className="text-xs font-bold text-red-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500" /> Prioritarias
                </h3>
                <div className="flex flex-col gap-4">
                  {alta.map((ob) => <ObligacionCard key={ob.id} ob={ob} />)}
                </div>
              </section>
            )}

            {media.length > 0 && (
              <section className="mb-8">
                <h3 className="text-xs font-bold text-yellow-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-500" /> Importantes
                </h3>
                <div className="flex flex-col gap-4">
                  {media.map((ob) => <ObligacionCard key={ob.id} ob={ob} />)}
                </div>
              </section>
            )}

            {baja.length > 0 && (
              <section className="mb-8">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gray-400" /> Recomendadas
                </h3>
                <div className="flex flex-col gap-4">
                  {baja.map((ob) => <ObligacionCard key={ob.id} ob={ob} />)}
                </div>
              </section>
            )}
          </div>
        )}

        {!selected && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">☝️</p>
            <p className="text-sm font-medium">Selecciona un tipo de entidad para ver sus obligaciones ENIA</p>
          </div>
        )}

        <p className="text-center text-xs text-gray-300 mt-10">
          Ley N.° 31814 · DS 115-2025-PCM · NTP-ISO/IEC 42001:2025 · ENIA 2026–2030
        </p>
      </div>
    </main>
  );
}
