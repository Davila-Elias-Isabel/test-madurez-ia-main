import { Question, MaturityLevel } from "./types";

export const QUESTIONS: Question[] = [
  {
    id: 1,
    dimension: "Estrategia y Visión",
    dimensionIcon: "🎯",
    text: "¿Su organización cuenta con una estrategia formal de Inteligencia Artificial alineada a objetivos institucionales?",
    options: [
      { id: "a", text: "No existe ningún plan ni visión relacionada con IA", score: 0 },
      { id: "b", text: "Se han tenido conversaciones iniciales pero sin plan formal", score: 1 },
      { id: "c", text: "Existe una hoja de ruta en desarrollo o parcialmente aprobada", score: 2 },
      { id: "d", text: "Contamos con una estrategia de IA formal, aprobada y en ejecución", score: 3 },
    ],
  },
  {
    id: 2,
    dimension: "Liderazgo y Gobernanza",
    dimensionIcon: "👥",
    text: "¿Existe liderazgo claro y responsabilidad formal para las iniciativas de IA en su organización?",
    options: [
      { id: "a", text: "No hay ningún responsable designado para IA", score: 0 },
      { id: "b", text: "Hay interés individual pero sin cargo ni mandato formal", score: 1 },
      { id: "c", text: "Existe un responsable técnico pero sin respaldo directivo sólido", score: 2 },
      { id: "d", text: "Hay un equipo o cargo de alto nivel dedicado a IA con apoyo de la alta dirección", score: 3 },
    ],
  },
  {
    id: 3,
    dimension: "Gestión de Datos",
    dimensionIcon: "🗄️",
    text: "¿Cómo describe el estado de la gestión y calidad de datos en su organización?",
    options: [
      { id: "a", text: "Los datos están dispersos, sin estructura ni gobernanza establecida", score: 0 },
      { id: "b", text: "Existen algunos sistemas de datos pero sin política de gestión unificada", score: 1 },
      { id: "c", text: "Hay políticas de datos en desarrollo con cierta interoperabilidad", score: 2 },
      { id: "d", text: "Contamos con datos estructurados, accesibles, con gobernanza sólida y catálogo de datos", score: 3 },
    ],
  },
  {
    id: 4,
    dimension: "Infraestructura Tecnológica",
    dimensionIcon: "🖥️",
    text: "¿Qué nivel de infraestructura tecnológica dispone su organización para soportar proyectos de IA?",
    options: [
      { id: "a", text: "Infraestructura básica o desactualizada, sin capacidad para IA", score: 0 },
      { id: "b", text: "Infraestructura parcial con algunos sistemas digitalizados", score: 1 },
      { id: "c", text: "Infraestructura digital moderada con capacidad computacional limitada para IA", score: 2 },
      { id: "d", text: "Infraestructura robusta (nube/híbrida) con capacidad de cómputo y almacenamiento escalable para IA", score: 3 },
    ],
  },
  {
    id: 5,
    dimension: "Talento y Capacidades",
    dimensionIcon: "🧠",
    text: "¿Cómo evalúa las capacidades internas de talento humano especializado en IA de su organización?",
    options: [
      { id: "a", text: "No existe personal con conocimientos en IA o ciencia de datos", score: 0 },
      { id: "b", text: "Algunos colaboradores tienen conocimiento básico o exploratorio de IA", score: 1 },
      { id: "c", text: "Existe un equipo pequeño con capacidades técnicas aplicadas en IA", score: 2 },
      { id: "d", text: "Contamos con equipos multidisciplinarios especializados en IA, datos e ingeniería", score: 3 },
    ],
  },
  {
    id: 6,
    dimension: "Formación y Cultura Digital",
    dimensionIcon: "📚",
    text: "¿Existen programas estructurados de formación en IA para el personal de su organización?",
    options: [
      { id: "a", text: "No hay ningún programa de formación relacionado con IA", score: 0 },
      { id: "b", text: "Se realizan capacitaciones esporádicas o charlas informativas puntuales", score: 1 },
      { id: "c", text: "Hay programas de formación estructurados para algunos equipos o áreas clave", score: 2 },
      { id: "d", text: "La formación en IA es continua, transversal y parte de la cultura organizacional", score: 3 },
    ],
  },
  {
    id: 7,
    dimension: "Implementación y Casos de Uso",
    dimensionIcon: "⚙️",
    text: "¿Ha implementado su organización soluciones o proyectos concretos basados en IA?",
    options: [
      { id: "a", text: "No se han implementado casos de uso de IA en ningún proceso", score: 0 },
      { id: "b", text: "Se han realizado pruebas piloto o experimentos puntuales sin escalar", score: 1 },
      { id: "c", text: "Hay proyectos de IA en producción con impacto limitado o en pocas áreas", score: 2 },
      { id: "d", text: "Múltiples soluciones de IA están en producción con impacto medible y sostenible", score: 3 },
    ],
  },
  {
    id: 8,
    dimension: "Ética e IA Responsable",
    dimensionIcon: "⚖️",
    text: "¿Su organización cuenta con principios o marcos formales para el uso ético y responsable de la IA?",
    options: [
      { id: "a", text: "No existen lineamientos éticos ni políticas para el uso de IA", score: 0 },
      { id: "b", text: "Se conocen principios éticos de referencia pero no hay políticas formales internas", score: 1 },
      { id: "c", text: "Existe una política ética de IA en desarrollo o parcialmente implementada", score: 2 },
      { id: "d", text: "Contamos con marcos éticos formales, auditables y aplicados en todos los proyectos de IA", score: 3 },
    ],
  },
  {
    id: 9,
    dimension: "Privacidad y Ciberseguridad",
    dimensionIcon: "🔒",
    text: "¿Cómo gestiona su organización la privacidad y seguridad de los datos utilizados en sistemas de IA?",
    options: [
      { id: "a", text: "No existen políticas de privacidad ni seguridad aplicadas a datos de IA", score: 0 },
      { id: "b", text: "Se aplican medidas básicas pero sin alineación con estándares para IA", score: 1 },
      { id: "c", text: "Hay protocolos de seguridad establecidos aún en proceso de maduración", score: 2 },
      { id: "d", text: "Contamos con políticas robustas alineadas con regulaciones vigentes (Ley N° 29733 y estándares internacionales)", score: 3 },
    ],
  },
  {
    id: 10,
    dimension: "Colaboración e Innovación",
    dimensionIcon: "🤝",
    text: "¿Su organización colabora activamente con actores externos (academia, sector privado, gobierno) en iniciativas de IA?",
    options: [
      { id: "a", text: "No existe ninguna colaboración externa vinculada a IA", score: 0 },
      { id: "b", text: "Se han tenido acercamientos informales o participación en eventos sectoriales", score: 1 },
      { id: "c", text: "Hay alianzas puntuales o proyectos conjuntos en desarrollo con terceros", score: 2 },
      { id: "d", text: "Existen redes consolidadas de colaboración multisectorial con resultados tangibles en IA", score: 3 },
    ],
  },
  {
    id: 11,
    dimension: "Presupuesto e Inversión",
    dimensionIcon: "💰",
    text: "¿Cuenta su organización con presupuesto planificado y asignado para iniciativas de IA?",
    options: [
      { id: "a", text: "No hay ningún presupuesto asignado ni proyectado para IA", score: 0 },
      { id: "b", text: "Existe financiamiento ad hoc o proyectos aislados con financiamiento externo", score: 1 },
      { id: "c", text: "Hay una partida presupuestal para IA aunque no es prioritaria en el plan institucional", score: 2 },
      { id: "d", text: "La IA cuenta con presupuesto significativo, planificado y alineado a la estrategia institucional", score: 3 },
    ],
  },
  {
    id: 12,
    dimension: "Medición e Impacto",
    dimensionIcon: "📊",
    text: "¿Mide su organización el impacto y los resultados de sus iniciativas de Inteligencia Artificial?",
    options: [
      { id: "a", text: "No se realiza ningún seguimiento ni evaluación de impacto de IA", score: 0 },
      { id: "b", text: "Se hacen evaluaciones informales sin métricas ni KPIs definidos", score: 1 },
      { id: "c", text: "Existen indicadores básicos pero el seguimiento no es sistemático ni continuo", score: 2 },
      { id: "d", text: "Contamos con KPIs claros, reportes regulares y evaluación de impacto integrada a la gestión institucional", score: 3 },
    ],
  },
];

export const MAX_SCORE = QUESTIONS.length * 3; // 36

export function calculateScore(rawScore: number): number {
  return Math.round((rawScore / MAX_SCORE) * 100);
}

export const MATURITY_LEVELS: MaturityLevel[] = [
  {
    label: "Inicial",
    range: [0, 20],
    color: "#EF4444",
    bgColor: "#FEF2F2",
    description:
      "La entidad no ha iniciado formalmente su camino hacia la Inteligencia Artificial. Carece de estrategia, gobernanza, talento y proyectos concretos de IA.",
    recommendation:
      "Priorizar la sensibilización directiva, designar un responsable de IA, y comenzar con un diagnóstico de datos institucionales como base para futuros proyectos piloto.",
  },
  {
    label: "Exploratorio",
    range: [21, 40],
    color: "#F97316",
    bgColor: "#FFF7ED",
    description:
      "La entidad ha comenzado a explorar posibilidades de IA con iniciativas aisladas, pero aún sin estructura, estrategia ni capacidades sistematizadas.",
    recommendation:
      "Formalizar una hoja de ruta de IA, invertir en formación básica del personal, identificar un caso de uso de alto impacto para desarrollar como piloto y establecer lineamientos de gobernanza de datos.",
  },
  {
    label: "En Desarrollo",
    range: [41, 60],
    color: "#EAB308",
    bgColor: "#FEFCE8",
    description:
      "La entidad tiene iniciativas de IA en marcha con capacidades crecientes. Hay avances en datos, talento y primeros casos de uso, pero aún existen brechas importantes.",
    recommendation:
      "Escalar los casos de uso exitosos, fortalecer la gobernanza de IA, implementar marcos éticos formales y desarrollar programas de formación continua para ampliar las capacidades internas.",
  },
  {
    label: "Avanzado",
    range: [61, 80],
    color: "#3B82F6",
    bgColor: "#EFF6FF",
    description:
      "La entidad demuestra capacidades sólidas en IA con múltiples iniciativas en producción, talento especializado y marcos de gobernanza establecidos. Los resultados son medibles.",
    recommendation:
      "Consolidar el ecosistema de IA, ampliar la colaboración intersectorial, explorar tecnologías emergentes (IA generativa, MLOps), y posicionarse como referente para compartir buenas prácticas.",
  },
  {
    label: "Líder",
    range: [81, 100],
    color: "#10B981",
    bgColor: "#ECFDF5",
    description:
      "La entidad es referente en adopción responsable e innovadora de IA. Cuenta con estrategia consolidada, ecosistema de datos maduro, talento de clase mundial y cultura de innovación transversal.",
    recommendation:
      "Liderar iniciativas nacionales de IA, contribuir a estándares sectoriales, desarrollar programas de transferencia de capacidades hacia otras entidades y participar activamente en la gobernanza global de IA.",
  },
];

export function getMaturityLevel(score: number): MaturityLevel {
  return MATURITY_LEVELS.find(
    (level) => score >= level.range[0] && score <= level.range[1]
  ) ?? MATURITY_LEVELS[0];
}

export function getDimensionScores(answers: { questionId: number; score: number }[]): Record<string, { score: number; max: number }> {
  const result: Record<string, { score: number; max: number }> = {};
  for (const q of QUESTIONS) {
    const answer = answers.find((a) => a.questionId === q.id);
    result[q.dimension] = {
      score: answer?.score ?? 0,
      max: 3,
    };
  }
  return result;
}
