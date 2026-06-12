"use client";

const plazos = [
  {
    nombre: "Plan de Acción por Eje — Entidades públicas",
    descripcion: "Cada entidad debe presentar su Plan de Acción ante SGTD-PCM",
    fecha: "2026-03-09",
    norma: "DS 115-2025-PCM, 6 meses desde aprobación ENIA"
  },
  {
    nombre: "Implementación NTP-ISO/IEC 42001:2025",
    descripcion: "Adopción obligatoria para sistemas de IA en entidades públicas",
    fecha: "2026-09-09",
    norma: "Reglamento Ley N.° 31814"
  },
  {
    nombre: "Registro de sistemas de IA de riesgo alto",
    descripcion: "Sistemas desplegados deben estar registrados con trazabilidad",
    fecha: "2026-12-31",
    norma: "DS 115-2025-PCM"
  },
  {
    nombre: "Primera evaluación ENIA 2026-2030",
    descripcion: "Seguimiento semestral por eje estratégico",
    fecha: "2026-12-31",
    norma: "ENIA 2026-2030, Sección 9"
  }
];

function diasHabiles(fecha: string) {
  const hoy = new Date();
  const limite = new Date(fecha);
  let dias = 0;
  const cursor = new Date(hoy);
  while (cursor < limite) {
    const dia = cursor.getDay();
    if (dia !== 0 && dia !== 6) dias++;
    cursor.setDate(cursor.getDate() + 1);
  }
  return dias;
}

function colorUrgencia(dias: number) {
  if (dias > 30) return "text-green-600 bg-green-50 border-green-200";
  if (dias > 10) return "text-yellow-600 bg-yellow-50 border-yellow-200";
  return "text-red-600 bg-red-50 border-red-200";
}

export default function CountdownENIA() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">
        ENIA 2026–2030
      </p>
      <h1 className="text-2xl font-semibold text-gray-900 mb-1">
        Plazos oficiales
      </h1>
      <p className="text-sm text-gray-500 mb-10">
        Días hábiles restantes para cada compromiso normativo
      </p>

      <div className="flex flex-col gap-4">
        {plazos.map((p) => {
          const dias = diasHabiles(p.fecha);
          const color = colorUrgencia(dias);
          const pct = Math.min(100, Math.round((dias / 365) * 100));

          return (
            <div key={p.nombre}
              className="border border-gray-100 rounded-xl p-5 bg-white">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{p.nombre}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{p.descripcion}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap ${color}`}>
                  {dias} días hábiles
                </span>
              </div>

              <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
                <div
                  className="h-1.5 rounded-full bg-current transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>

              <p className="text-xs text-gray-300">{p.norma} · {p.fecha}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
