"use client";

import { useState } from "react";
import Link from "next/link";
import { CHECKLIST_ITEMS, CATEGORIAS, type EstadoItem } from "@/lib/checklist-data";

type ChecklistState = Record<string, EstadoItem>;

export default function ChecklistOIA() {
  const [estado, setEstado] = useState<ChecklistState>(
    CHECKLIST_ITEMS.reduce((acc, item) => ({ ...acc, [item.id]: "pendiente" }), {})
  );

  const completados = Object.values(estado).filter((s) => s === "completado").length;
  const porcentaje = Math.round((completados / CHECKLIST_ITEMS.length) * 100);

  function toggleEstado(id: string) {
    setEstado((prev) => {
      const current = prev[id];
      const siguiente: EstadoItem =
        current === "pendiente" ? "en-progreso" : current === "en-progreso" ? "completado" : "pendiente";
      return { ...prev, [id]: siguiente };
    });
  }

  function exportar() {
    const timestamp = new Date().toISOString().slice(0, 10);
    let csv = "ID,Categoría,Descripción,Norma,Plazo,Estado\n";
    CHECKLIST_ITEMS.forEach((item) => {
      csv += `"${item.id}","${item.categoria}","${item.descripcion}","${item.norma}","${item.plazo || "-"}","${estado[item.id]}"\n`;
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `checklist-oia-${timestamp}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

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
              <p className="text-xs text-slate-500 hidden sm:block">Checklist del OIA</p>
            </div>
          </div>
          <Link href="/" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">← Inicio</Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <p className="text-xs font-semibold text-[#CE1126] uppercase tracking-widest mb-1">ENIA 2026–2030</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checklist del Oficial de IA</h1>
          <p className="text-sm text-gray-500">
            Seguimiento de requisitos para implementar la gobernanza de IA en tu entidad conforme a la ENIA 2026-2030.
          </p>
        </div>

        {/* Barra de progreso */}
        <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Progreso general</span>
            <span className="text-sm font-bold text-[#CE1126]">{porcentaje}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${porcentaje}%`, backgroundColor: "#003087" }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {completados} de {CHECKLIST_ITEMS.length} requisitos completados
          </p>
        </div>

        {/* Botón exportar */}
        <div className="mb-8 flex justify-end">
          <button
            onClick={exportar}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#003087] hover:bg-[#002060] text-white font-semibold text-sm rounded-xl transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8m0 8l-4-4m4 4l4-4" />
            </svg>
            Exportar CSV
          </button>
        </div>

        {/* Checklist por categoría */}
        <div className="space-y-8">
          {CATEGORIAS.map((cat) => {
            const itemsCat = CHECKLIST_ITEMS.filter((i) => i.categoria === cat);
            const completadosCat = itemsCat.filter((i) => estado[i.id] === "completado").length;
            const pctCat = Math.round((completadosCat / itemsCat.length) * 100);

            return (
              <div key={cat} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">{cat}</h2>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: "#003087", color: "#fff" }}>
                    {completadosCat}/{itemsCat.length}
                  </span>
                </div>

                <div className="w-full bg-gray-100 rounded-full h-2 mb-4 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pctCat}%`, backgroundColor: "#C8102E" }}
                  />
                </div>

                <div className="space-y-2">
                  {itemsCat.map((item) => {
                    const s = estado[item.id];
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleEstado(item.id)}
                        className="flex gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all"
                        style={{
                          borderColor: s === "completado" ? "#10B981" : s === "en-progreso" ? "#F59E0B" : "#E5E7EB",
                          backgroundColor: s === "completado" ? "#F0FDF4" : s === "en-progreso" ? "#FFFBEB" : "#F9FAFB",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={s === "completado"}
                          onChange={() => {}}
                          className="w-5 h-5 mt-0.5 cursor-pointer"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900">{item.descripcion}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{item.norma}</p>
                          {item.plazo && <p className="text-xs text-gray-300 mt-1">Plazo: {item.plazo}</p>}
                        </div>
                        <span
                          className="text-xs font-semibold px-2 py-1 rounded-full shrink-0"
                          style={{
                            backgroundColor: s === "completado" ? "#DBEAFE" : s === "en-progreso" ? "#FEF3C7" : "#F3F4F6",
                            color: s === "completado" ? "#0369A1" : s === "en-progreso" ? "#92400E" : "#6B7280",
                          }}
                        >
                          {s === "completado" ? "✓" : s === "en-progreso" ? "→" : "○"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-gray-300 mt-10">
          Basado en ENIA 2026–2030 · Ley N.° 31814 · DS 115-2025-PCM · NTP-ISO/IEC 42001:2025
        </p>
      </div>
    </main>
  );
}
