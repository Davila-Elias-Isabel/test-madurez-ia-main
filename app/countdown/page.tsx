"use client";

import { useState, useEffect } from "react";

interface Plazo {
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  fechaLimite: string;
  norma: string;
}

const PLAZOS: Plazo[] = [
  {
    nombre: "Plan de Acción por Eje — Entidades públicas",
    descripcion: "Cada entidad presenta su Plan de Acción ante la SGTD-PCM",
    fechaInicio: "2025-09-09",
    fechaLimite: "2026-03-09",
    norma: "DS 115-2025-PCM · 6 meses desde aprobación ENIA",
  },
  {
    nombre: "Implementación NTP-ISO/IEC 42001:2025",
    descripcion: "Adopción obligatoria del estándar de Sistemas de Gestión de IA",
    fechaInicio: "2025-09-09",
    fechaLimite: "2026-09-09",
    norma: "Reglamento Ley N.° 31814",
  },
  {
    nombre: "Registro de sistemas de IA de riesgo alto",
    descripcion: "Sistemas desplegados deben registrarse con trazabilidad completa",
    fechaInicio: "2026-01-01",
    fechaLimite: "2026-12-31",
    norma: "DS 115-2025-PCM",
  },
  {
    nombre: "Primera evaluación ENIA 2026–2030",
    descripcion: "Seguimiento semestral por eje estratégico ante SGTD",
    fechaInicio: "2026-06-09",
    fechaLimite: "2026-12-31",
    norma: "ENIA 2026-2030 · Seguimiento y Evaluación",
  },
];

// Cuenta días hábiles entre dos fechas (excluye sábados y domingos)
function diasHabilesEntre(desde: Date, hasta: Date): number {
  if (hasta <= desde) return 0;
  let dias = 0;
  const cursor = new Date(desde);
  cursor.setHours(0, 0, 0, 0);
  const fin = new Date(hasta);
  fin.setHours(0, 0, 0, 0);
  while (cursor < fin) {
    const dow = cursor.getDay();
    if (dow !== 0 && dow !== 6) dias++;
    cursor.setDate(cursor.getDate() + 1);
  }
  return dias;
}

function formatFecha(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

type Estado = "seguro" | "advertencia" | "urgente" | "vencido";

function getEstado(diasRestantes: number): Estado {
  if (diasRestantes <= 0) return "vencido";
  if (diasRestantes < 10) return "urgente";
  if (diasRestantes <= 30) return "advertencia";
  return "seguro";
}

const SEMAFORO: Record<Estado, {
  badge: string;
  barColor: string;
  label: string;
  dot: string;
}> = {
  seguro:      { badge: "bg-green-50 text-green-700 border-green-200",   barColor: "#16a34a", label: "Plazo seguro",              dot: "bg-green-500" },
  advertencia: { badge: "bg-yellow-50 text-yellow-700 border-yellow-200", barColor: "#ca8a04", label: "Advertencia · En proceso",  dot: "bg-yellow-500" },
  urgente:     { badge: "bg-red-50 text-red-700 border-red-200",          barColor: "#dc2626", label: "Urgente · Próximo a vencer", dot: "bg-red-500" },
  vencido:     { badge: "bg-gray-100 text-gray-400 border-gray-200",      barColor: "#9ca3af", label: "Vencido",                   dot: "bg-gray-400" },
};

export default function CountdownENIA() {
  const [ahora, setAhora] = useState<Date>(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  // Actualiza el estado cada minuto; si cambió el día, recalcula
  useEffect(() => {
    const intervalo = setInterval(() => {
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      setAhora((prev) => (prev.getTime() !== hoy.getTime() ? hoy : prev));
    }, 60_000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:py-14">
      <div className="max-w-2xl mx-auto">

        {/* Encabezado */}
        <p className="text-xs font-semibold text-[#CE1126] uppercase tracking-widest mb-2">
          ENIA 2026–2030
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
          Plazos oficiales
        </h1>
        <p className="text-sm text-gray-500 mb-3">
          Días hábiles restantes · Se actualiza automáticamente cada día
        </p>

        {/* Leyenda semáforo */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> +30 días · Seguro
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-yellow-700 bg-yellow-50 border border-yellow-200 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> 10–30 días · Advertencia
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-red-700 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> −10 días · Urgente
          </span>
        </div>

        {/* Tarjetas */}
        <div className="flex flex-col gap-5">
          {PLAZOS.map((p) => {
            const inicio  = new Date(p.fechaInicio);
            const limite  = new Date(p.fechaLimite);
            const diasRestantes = diasHabilesEntre(ahora, limite);
            const totalDias     = diasHabilesEntre(inicio, limite);
            const transcurridos = diasHabilesEntre(inicio, ahora);

            // Porcentaje de progreso: tiempo transcurrido sobre el total del hito
            const pct = totalDias > 0
              ? Math.min(100, Math.round((transcurridos / totalDias) * 100))
              : 100;

            const estado = getEstado(diasRestantes);
            const sem    = SEMAFORO[estado];

            return (
              <div
                key={p.nombre}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
              >
                {/* Fila superior: nombre + badge días */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4 mb-1">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 leading-snug">{p.nombre}</p>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">{p.descripcion}</p>
                  </div>
                  <span className={`self-start text-xs font-bold px-3 py-1.5 rounded-full border whitespace-nowrap ${sem.badge}`}>
                    {estado === "vencido" ? "Vencido" : `${diasRestantes} días hábiles`}
                  </span>
                </div>

                {/* Estado semáforo */}
                <div className="flex items-center gap-1.5 mb-3">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${sem.dot}`} />
                  <span className={`text-xs font-semibold ${
                    estado === "seguro"      ? "text-green-700"  :
                    estado === "advertencia" ? "text-yellow-700" :
                    estado === "urgente"     ? "text-red-700"    : "text-gray-400"
                  }`}>
                    {sem.label}
                  </span>
                </div>

                {/* Barra de progreso */}
                <div className="w-full bg-gray-100 rounded-full h-2 mb-3 overflow-hidden">
                  <div
                    className="h-2 rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, backgroundColor: sem.barColor }}
                  />
                </div>

                {/* Pie: norma + fecha límite */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <p className="text-xs text-gray-300">{p.norma}</p>
                  <p className="text-xs font-semibold text-gray-500 shrink-0">
                    Límite: {formatFecha(p.fechaLimite)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-gray-300 mt-10">
          Basado en la ENIA 2026–2030 · Ley N.° 31814 · DS 115-2025-PCM
        </p>
      </div>
    </main>
  );
}
