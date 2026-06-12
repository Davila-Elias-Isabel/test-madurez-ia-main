import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex">
              <div className="w-3 h-8 bg-[#CE1126] rounded-l-sm" />
              <div className="w-3 h-8 bg-white border-y border-slate-200" />
              <div className="w-3 h-8 bg-[#CE1126] rounded-r-sm" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#CE1126] tracking-widest uppercase">
                ENIA Perú
              </p>
              <p className="text-xs text-slate-500">Estrategia Nacional de Inteligencia Artificial</p>
            </div>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Gobierno del Perú · 2026
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-3xl w-full text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-2 rounded-full border border-blue-200 mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            Herramienta oficial basada en ENIA 2026–2030
          </div>

          {/* Context banner */}
          <div className="bg-[#CE1126]/5 border border-[#CE1126]/20 rounded-xl px-5 py-4 mb-8 max-w-2xl mx-auto text-left">
            <p className="text-sm text-slate-700 leading-relaxed">
              <span className="font-bold text-[#CE1126]">Perú es el primer país de América Latina</span>{" "}
              con una ley marco de IA{" "}
              <span className="font-semibold text-slate-800">(Ley N.° 31814)</span>.{" "}
              ¿Tu organización está lista para cumplir con la ENIA 2026–2030?
            </p>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            Test de Madurez en{" "}
            <span className="text-[#CE1126]">Inteligencia Artificial</span>
          </h1>
          <p className="text-lg text-slate-600 mb-4 max-w-2xl mx-auto leading-relaxed">
            Evalúa en menos de 5 minutos el nivel de madurez de tu organización en
            Inteligencia Artificial, alineado a los 4 ejes de la{" "}
            <strong className="text-slate-800">
              ENIA 2026–2030 del Perú
            </strong>
            .
          </p>
          <p className="text-sm text-slate-500 mb-10">
            12 preguntas · 4 ejes ENIA · Score del 0 al 100 · Recomendaciones accionables
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/test"
              className="inline-flex items-center gap-2 bg-[#CE1126] hover:bg-[#a80e1e] text-white font-semibold text-lg px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-red-200 hover:shadow-xl hover:shadow-red-300 hover:-translate-y-0.5"
            >
              Iniciar evaluación
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/countdown"
              className="inline-flex items-center gap-2 border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 font-medium text-base px-6 py-4 rounded-xl transition-all duration-200 hover:bg-slate-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Plazos ENIA 2026–2030
            </Link>
          </div>

          <p className="mt-4 text-xs text-slate-400">
            Sin registro requerido · Resultados inmediatos · 100% gratuito
          </p>
        </div>
      </section>

      {/* Dimensions grid */}
      <section className="bg-white border-t border-slate-200 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">
            Ejes ENIA 2026–2030
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: "🧠",
                label: "Eje 1 · Talento y Capacidades",
                questions: ["Personal capacitado en IA", "Programas Talento Digital (SGTD)", "Plan de formación 12 meses"],
              },
              {
                icon: "🚀",
                label: "Eje 2 · Innovación y Emprendimiento",
                questions: ["Proyectos piloto de IA", "Ecosistema CNIDIA", "Datos abiertos en datos.gob.pe"],
              },
              {
                icon: "⚖️",
                label: "Eje 3 · Marco Ético y Regulatorio",
                questions: ["Ley N.° 31814", "NTP-ISO/IEC 42001:2025", "Evaluación de impacto ético"],
              },
              {
                icon: "🤝",
                label: "Eje 4 · Colaboración Nacional e Internacional",
                questions: ["Gobernanza IA (SGTD, mesas técnicas)", "Plataforma Participa Perú", "Convenios y alianzas activas"],
              },
            ].map((d) => (
              <div
                key={d.label}
                className="flex flex-col gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{d.icon}</span>
                  <span className="text-sm font-semibold text-slate-800">{d.label}</span>
                </div>
                <ul className="space-y-1 pl-1">
                  {d.questions.map((q) => (
                    <li key={q} className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Levels preview */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">
            Niveles de madurez
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Inicial", color: "bg-red-100 text-red-700 border-red-200", range: "0–20" },
              { label: "Exploratorio", color: "bg-orange-100 text-orange-700 border-orange-200", range: "21–40" },
              { label: "En Desarrollo", color: "bg-yellow-100 text-yellow-700 border-yellow-200", range: "41–60" },
              { label: "Avanzado", color: "bg-blue-100 text-blue-700 border-blue-200", range: "61–80" },
              { label: "Líder", color: "bg-green-100 text-green-700 border-green-200", range: "81–100" },
            ].map((level) => (
              <div
                key={level.label}
                className={`flex items-center gap-2 border rounded-full px-4 py-1.5 text-sm font-medium ${level.color}`}
              >
                <span>{level.label}</span>
                <span className="opacity-60 text-xs">{level.range}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 px-6 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            Basado en la{" "}
            <strong className="text-slate-600">Estrategia Nacional de Inteligencia Artificial 2026–2030</strong>
          </p>
          <div className="flex flex-col md:items-end gap-1 text-center md:text-right">
            <p>Secretaría de Gobierno y Transformación Digital · PCM</p>
            <p className="text-slate-300">
              Ley N.° 31814 · DS 115-2025-PCM · NTP-ISO/IEC 42001:2025
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
