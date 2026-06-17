"use client";

import { useState } from "react";
import Link from "next/link";

interface PreguntasFormulario {
  tipoEntidad: string;
  presupuesto: string;
  madurezIA: string;
  principalesChallenges: string;
  oportunidades: string;
  recursos: string;
  timeline: string;
  metricas: string;
}

interface Plan {
  diagnostico: string;
  objetivos: string[];
  ejes: Record<string, any>;
  hitos: Array<{ fecha: string; descripcion: string }>;
  riscos: string[];
  siguiente_paso: string;
}

export default function PlanAccionPage() {
  const [step, setStep] = useState<"formulario" | "plan" | "revision">("formulario");
  const [preguntas, setPreguntas] = useState<PreguntasFormulario>({
    tipoEntidad: "",
    presupuesto: "",
    madurezIA: "",
    principalesChallenges: "",
    oportunidades: "",
    recursos: "",
    timeline: "",
    metricas: "",
  });
  const [plan, setPlan] = useState<Plan | null>(null);
  const [planId, setPlanId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [evidencia, setEvidencia] = useState("");
  const [tendencia, setTendencia] = useState("");
  const [revision, setRevision] = useState<any>(null);
  const [revisionLoading, setRevisionLoading] = useState(false);

  async function generarPlan() {
    setLoading(true);
    try {
      const res = await fetch("/api/generar-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preguntas }),
      });
      const data = await res.json();
      setPlan(data.plan);
      setPlanId(data.id);
      setStep("plan");
    } catch (err) {
      alert("Error al generar plan: " + err);
    } finally {
      setLoading(false);
    }
  }

  async function revisarPlan() {
    if (!plan || !evidencia.trim() || !tendencia.trim()) {
      alert("Completa todos los campos para revisar el plan");
      return;
    }
    setRevisionLoading(true);
    try {
      const res = await fetch("/api/revisar-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, evidencia, tendenciaMercado: tendencia }),
      });
      const data = await res.json();
      setRevision(data.revision);
      setStep("revision");
    } catch (err) {
      alert("Error al revisar plan: " + err);
    } finally {
      setRevisionLoading(false);
    }
  }

  function exportarPlan() {
    if (!plan) return;
    const contenido = JSON.stringify({ preguntas, plan }, null, 2);
    const blob = new Blob([contenido], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `plan-accion-${new Date().toISOString().slice(0, 10)}.json`;
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
              <p className="text-xs text-slate-500 hidden sm:block">Generador de Plan de Acción</p>
            </div>
          </div>
          <Link href="/" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">← Inicio</Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {step === "formulario" && (
          <>
            <div className="mb-8">
              <p className="text-xs font-semibold text-[#CE1126] uppercase tracking-widest mb-1">ENIA 2026–2030</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Generador de Plan de Acción</h1>
              <p className="text-sm text-gray-500">
                Responde 8 preguntas sobre tu entidad y obtendrás un Plan de Acción IA estructurado alineado a la ENIA.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                generarPlan();
              }}
              className="bg-white rounded-2xl p-6 border border-gray-100 space-y-6"
            >
              {[
                { key: "tipoEntidad", label: "Tipo de entidad", placeholder: "Ej: Municipalidad, Entidad pública nacional, Universidad" },
                { key: "presupuesto", label: "¿Cuál es tu presupuesto estimado para IA en 2026?", placeholder: "Ej: S/. 50,000 - 100,000" },
                { key: "madurezIA", label: "¿Cuál es tu nivel actual de madurez en IA?", placeholder: "Ej: Exploratorio, En desarrollo, Avanzado" },
                { key: "principalesChallenges", label: "¿Cuáles son tus principales desafíos?", placeholder: "Ej: Falta de talento, Infraestructura limitada, Resistencia al cambio" },
                { key: "oportunidades", label: "¿Qué oportunidades ves para IA en tu entidad?", placeholder: "Ej: Optimizar procesos, Mejorar atención ciudadana" },
                { key: "recursos", label: "¿Qué recursos tienes disponibles?", placeholder: "Ej: Equipo TI, Datos históricos, Apoyo directivo" },
                { key: "timeline", label: "¿Cuál es tu timeline de implementación?", placeholder: "Ej: 6 meses, 1 año, 18 meses" },
                { key: "metricas", label: "¿Cómo medirás el éxito?", placeholder: "Ej: ROI, Satisfacción ciudadana, Eficiencia operativa" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">{field.label}</label>
                  <textarea
                    value={preguntas[field.key as keyof PreguntasFormulario]}
                    onChange={(e) => setPreguntas({ ...preguntas, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    rows={2}
                    className="w-full text-sm border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-[#003087] focus:ring-2 focus:ring-[#003087]/20 resize-none"
                    required
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#003087] hover:bg-[#002060] disabled:opacity-40 text-white font-semibold rounded-lg transition-colors"
              >
                {loading ? "Generando plan..." : "Generar Plan de Acción"}
              </button>
            </form>
          </>
        )}

        {step === "plan" && plan && (
          <>
            <div className="mb-8 flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Tu Plan de Acción IA</h1>
                <p className="text-sm text-gray-500">Alineado a ENIA 2026-2030 · {preguntas.tipoEntidad}</p>
              </div>
              <button
                onClick={exportarPlan}
                className="px-4 py-2 bg-[#003087] text-white font-semibold text-sm rounded-lg hover:bg-[#002060] transition-colors"
              >
                Descargar JSON
              </button>
            </div>

            <div className="space-y-6">
              {/* Diagnóstico */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-3">Diagnóstico</h2>
                <p className="text-sm text-gray-700 leading-relaxed">{plan.diagnostico}</p>
              </div>

              {/* Objetivos */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-3">Objetivos Estratégicos</h2>
                <ul className="space-y-2">
                  {plan.objetivos.map((obj, i) => (
                    <li key={i} className="text-sm text-gray-700 flex gap-2">
                      <span className="text-[#CE1126] font-bold">→</span> {obj}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ejes */}
              <div className="space-y-4">
                {Object.entries(plan.ejes).map(([eje, data]: [string, any]) => (
                  <div key={eje} className="bg-white rounded-2xl p-6 border border-gray-100">
                    <h3 className="text-base font-bold text-gray-900 mb-4 capitalize">{eje}</h3>
                    <div className="space-y-3">
                      {data.actividades?.map((act: any, i: number) => (
                        <div key={i} className="pl-4 border-l-4 border-[#003087]">
                          <p className="text-sm font-semibold text-gray-900">{act.nombre}</p>
                          <p className="text-xs text-gray-600 mt-1">{act.descripcion}</p>
                          <div className="flex gap-4 mt-2 text-xs text-gray-500">
                            <span>📅 {act.plazo}</span>
                            <span>👤 {act.responsable}</span>
                            <span>💰 {act.presupuesto}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Hitos */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-3">Hitos Clave</h2>
                <div className="space-y-2">
                  {plan.hitos.map((h, i) => (
                    <div key={i} className="text-sm">
                      <span className="font-bold text-[#003087]">{h.fecha}</span>
                      <span className="text-gray-700"> — {h.descripcion}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Riesgos */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-3">Riesgos Identificados</h2>
                <ul className="space-y-2">
                  {plan.riscos.map((r, i) => (
                    <li key={i} className="text-sm text-gray-700 flex gap-2">
                      <span className="text-red-500 font-bold">⚠️</span> {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Siguiente paso */}
              <div className="bg-[#003087] rounded-2xl p-6 text-white">
                <h2 className="text-base font-bold mb-2">Próximo Paso Recomendado</h2>
                <p className="text-sm">{plan.siguiente_paso}</p>
              </div>

              {/* Información de guardado */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  ✅ <strong>Plan guardado en la base de datos.</strong> {planId && `ID: ${planId}`}
                </p>
              </div>

              {/* Revisar con evidencia */}
              <button
                onClick={() => setStep("revision")}
                className="w-full py-3 bg-[#C8102E] hover:bg-[#a80e1e] text-white font-semibold rounded-lg transition-colors"
              >
                Revisar Plan basado en Evidencia/Mercado
              </button>
            </div>
          </>
        )}

        {step === "revision" && plan && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Revisar Plan con Agente IA</h1>
              <p className="text-sm text-gray-500">Proporciona evidencia y tendencias del mercado para replantear tu plan</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Evidencia o cambios recientes</label>
                <textarea
                  value={evidencia}
                  onChange={(e) => setEvidencia(e.target.value)}
                  placeholder="Ej: Ley aprobada, cambio de presupuesto, nueva tecnología disponible, resultado de piloto..."
                  rows={3}
                  className="w-full text-sm border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-[#003087] focus:ring-2 focus:ring-[#003087]/20 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Tendencias del mercado</label>
                <textarea
                  value={tendencia}
                  onChange={(e) => setTendencia(e.target.value)}
                  placeholder="Ej: IA generativa en auge, falta de talento especializado, nuevos proveedores de IA, competencia regional..."
                  rows={3}
                  className="w-full text-sm border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-[#003087] focus:ring-2 focus:ring-[#003087]/20 resize-none"
                />
              </div>

              <button
                onClick={revisarPlan}
                disabled={revisionLoading}
                className="w-full py-3 bg-[#003087] hover:bg-[#002060] disabled:opacity-40 text-white font-semibold rounded-lg transition-colors"
              >
                {revisionLoading ? "Analizando con IA..." : "Analizar y Revisar Plan"}
              </button>

              {revision && (
                <div className="mt-6 space-y-4 pt-6 border-t border-gray-200">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-2">Evaluación General</h3>
                    <p className="text-sm text-gray-700">{revision.evaluacion_general}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-green-700 uppercase mb-2">Fortalezas</h4>
                      <ul className="space-y-1">
                        {revision.fortalezas?.slice(0, 3).map((f: string, i: number) => (
                          <li key={i} className="text-xs text-gray-700">✓ {f}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-red-700 uppercase mb-2">Debilidades</h4>
                      <ul className="space-y-1">
                        {revision.debilidades?.slice(0, 3).map((d: string, i: number) => (
                          <li key={i} className="text-xs text-gray-700">✗ {d}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {revision.ajustes_recomendados && (
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 mb-2">Ajustes Recomendados</h4>
                      <div className="space-y-2">
                        {revision.ajustes_recomendados.slice(0, 3).map((a: any, i: number) => (
                          <div key={i} className="text-xs bg-blue-50 p-2 rounded">
                            <p className="font-semibold text-[#003087]">{a.area}</p>
                            <p className="text-gray-700">{a.ajuste}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={() => setStep("plan")}
                className="w-full py-2 text-[#003087] font-semibold text-sm hover:underline"
              >
                ← Volver al Plan
              </button>
            </div>
          </>
        )}

        <p className="text-center text-xs text-gray-300 mt-10">
          Basado en ENIA 2026–2030 · Ley N.° 31814 · DS 115-2025-PCM · Potenciado con Claude IA
        </p>
      </div>
    </main>
  );
}
