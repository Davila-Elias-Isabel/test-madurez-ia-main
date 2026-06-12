import { Question, MaturityLevel } from "./types";

export const QUESTIONS: Question[] = [
  // EJE 1 — Talento y Capacidades
  {
    id: 1,
    dimension: "Eje 1 · Talento y Capacidades",
    dimensionIcon: "🧠",
    text: "¿Tu organización tiene personal capacitado en IA o ciencia de datos?",
    options: [
      { id: "a", text: "No tenemos ningún personal con conocimientos en IA o datos", score: 0 },
      { id: "b", text: "Algunos colaboradores tienen conocimiento autodidacta básico", score: 1 },
      { id: "c", text: "Contamos con personal técnico con formación formal en IA o ciencia de datos", score: 2 },
      { id: "d", text: "Tenemos equipos especializados con certificaciones y experiencia en proyectos de IA", score: 3 },
    ],
  },
  {
    id: 2,
    dimension: "Eje 1 · Talento y Capacidades",
    dimensionIcon: "🧠",
    text: "¿Has participado o enviado personal a programas como Talento Digital (SGTD)?",
    options: [
      { id: "a", text: "No conocemos ni hemos participado en programas de formación del Estado", score: 0 },
      { id: "b", text: "Conocemos el programa pero aún no hemos enviado personal", score: 1 },
      { id: "c", text: "Hemos enviado personal a 1 o 2 ediciones de manera puntual", score: 2 },
      { id: "d", text: "Participamos activamente con un plan sistemático de formación a través de estos programas", score: 3 },
    ],
  },
  {
    id: 3,
    dimension: "Eje 1 · Talento y Capacidades",
    dimensionIcon: "🧠",
    text: "¿Existe un plan de formación en IA para los próximos 12 meses?",
    options: [
      { id: "a", text: "No existe ningún plan de formación en IA", score: 0 },
      { id: "b", text: "Se ha discutido la idea pero sin formalizar ningún plan", score: 1 },
      { id: "c", text: "Existe un plan básico con algunas actividades de capacitación identificadas", score: 2 },
      { id: "d", text: "Contamos con un plan aprobado, con presupuesto asignado y metas medibles", score: 3 },
    ],
  },

  // EJE 2 — Innovación y Emprendimiento
  {
    id: 4,
    dimension: "Eje 2 · Innovación y Emprendimiento",
    dimensionIcon: "🚀",
    text: "¿Tu organización tiene algún proyecto piloto de IA en curso o ejecutado?",
    options: [
      { id: "a", text: "No hemos iniciado ningún piloto ni experimento de IA", score: 0 },
      { id: "b", text: "Estamos en fase exploratoria, evaluando posibles casos de uso", score: 1 },
      { id: "c", text: "Tenemos uno o más pilotos en ejecución con resultados preliminares", score: 2 },
      { id: "d", text: "Contamos con soluciones de IA en producción con impacto medible y documentado", score: 3 },
    ],
  },
  {
    id: 5,
    dimension: "Eje 2 · Innovación y Emprendimiento",
    dimensionIcon: "🚀",
    text: "¿Conoces el CNIDIA (Centro Nacional de Innovación Digital e IA) y su oferta?",
    options: [
      { id: "a", text: "No conocemos el CNIDIA ni sus servicios", score: 0 },
      { id: "b", text: "Conocemos su existencia pero no hemos interactuado con él", score: 1 },
      { id: "c", text: "Hemos asistido a eventos o consultado recursos del CNIDIA", score: 2 },
      { id: "d", text: "Somos usuarios activos del CNIDIA y hemos colaborado en proyectos conjuntos", score: 3 },
    ],
  },
  {
    id: 6,
    dimension: "Eje 2 · Innovación y Emprendimiento",
    dimensionIcon: "🚀",
    text: "¿Publicas o consumes datasets en datos.gob.pe?",
    options: [
      { id: "a", text: "No conocemos la plataforma datos.gob.pe", score: 0 },
      { id: "b", text: "Conocemos la plataforma pero no la usamos activamente", score: 1 },
      { id: "c", text: "Consumimos datasets disponibles para nuestros proyectos", score: 2 },
      { id: "d", text: "Publicamos y consumimos datasets activamente, contribuyendo al ecosistema de datos abiertos", score: 3 },
    ],
  },

  // EJE 3 — Marco Ético y Regulatorio
  {
    id: 7,
    dimension: "Eje 3 · Marco Ético y Regulatorio",
    dimensionIcon: "⚖️",
    text: "¿Tu organización conoce la Ley N.° 31814 y sus obligaciones?",
    options: [
      { id: "a", text: "No conocemos la Ley N.° 31814 ni sus implicancias", score: 0 },
      { id: "b", text: "Hemos oído sobre ella pero no revisamos sus obligaciones formalmente", score: 1 },
      { id: "c", text: "La hemos revisado e identificamos qué obligaciones nos aplican", score: 2 },
      { id: "d", text: "Conocemos plenamente la ley, analizamos su impacto y adoptamos medidas de cumplimiento", score: 3 },
    ],
  },
  {
    id: 8,
    dimension: "Eje 3 · Marco Ético y Regulatorio",
    dimensionIcon: "⚖️",
    text: "¿Aplicas o tienes plan para implementar la NTP-ISO/IEC 42001:2025?",
    options: [
      { id: "a", text: "No conocemos esta norma técnica peruana", score: 0 },
      { id: "b", text: "Conocemos la norma pero no hemos evaluado su aplicación", score: 1 },
      { id: "c", text: "Estamos en proceso de evaluar o implementar parcialmente la norma", score: 2 },
      { id: "d", text: "La norma está implementada o tenemos un plan formal y presupuestado de adopción", score: 3 },
    ],
  },
  {
    id: 9,
    dimension: "Eje 3 · Marco Ético y Regulatorio",
    dimensionIcon: "⚖️",
    text: "¿Existe evaluación de impacto ético antes de desplegar sistemas de IA?",
    options: [
      { id: "a", text: "No realizamos ninguna evaluación ética previa al despliegue de IA", score: 0 },
      { id: "b", text: "Se revisan aspectos básicos de manera informal, sin proceso estructurado", score: 1 },
      { id: "c", text: "Tenemos un checklist o protocolo básico de revisión ética", score: 2 },
      { id: "d", text: "Contamos con un proceso formal de Evaluación de Impacto Ético integrado al ciclo de desarrollo", score: 3 },
    ],
  },

  // EJE 4 — Colaboración Nacional e Internacional
  {
    id: 10,
    dimension: "Eje 4 · Colaboración Nacional e Internacional",
    dimensionIcon: "🤝",
    text: "¿Tu organización participa en espacios de gobernanza de IA (SGTD, comités, mesas técnicas)?",
    options: [
      { id: "a", text: "No participamos en ningún espacio de gobernanza de IA", score: 0 },
      { id: "b", text: "Seguimos las actividades de la SGTD u otros actores sin participar activamente", score: 1 },
      { id: "c", text: "Participamos ocasionalmente en eventos o consultas públicas", score: 2 },
      { id: "d", text: "Participamos de forma continua en mesas técnicas, comités o grupos de trabajo de IA", score: 3 },
    ],
  },
  {
    id: 11,
    dimension: "Eje 4 · Colaboración Nacional e Internacional",
    dimensionIcon: "🤝",
    text: "¿Conoces la plataforma Participa Perú para aportar a la gobernanza de IA?",
    options: [
      { id: "a", text: "No conocemos la plataforma Participa Perú", score: 0 },
      { id: "b", text: "Conocemos la plataforma pero no la hemos utilizado", score: 1 },
      { id: "c", text: "Hemos participado en alguna consulta o proceso en la plataforma", score: 2 },
      { id: "d", text: "Usamos activamente Participa Perú y promovemos su uso en nuestra organización", score: 3 },
    ],
  },
  {
    id: 12,
    dimension: "Eje 4 · Colaboración Nacional e Internacional",
    dimensionIcon: "🤝",
    text: "¿Tienes convenios o alianzas activas con academia, Estado u organismos internacionales en IA?",
    options: [
      { id: "a", text: "No tenemos ningún convenio o alianza en materia de IA", score: 0 },
      { id: "b", text: "Estamos en conversaciones iniciales con posibles aliados", score: 1 },
      { id: "c", text: "Tenemos uno o más convenios formalizados pero con actividad limitada", score: 2 },
      { id: "d", text: "Contamos con alianzas activas y en ejecución con resultados concretos en IA", score: 3 },
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
      "La organización no ha iniciado formalmente su camino hacia la IA. Carece de talento especializado, proyectos concretos, conocimiento regulatorio y vínculos de colaboración.",
    recommendation:
      "Priorizar la sensibilización directiva, identificar un responsable de IA, revisar la Ley N.° 31814 e inscribirse en los programas de Talento Digital de la SGTD como primer paso.",
  },
  {
    label: "Exploratorio",
    range: [21, 40],
    color: "#F97316",
    bgColor: "#FFF7ED",
    description:
      "La organización explora posibilidades de IA con iniciativas aisladas, pero sin estructura ni capacidades alineadas a los ejes de la ENIA 2026–2030.",
    recommendation:
      "Formalizar un plan de formación, lanzar un piloto de IA apoyado por el CNIDIA, familiarizarse con la NTP-ISO/IEC 42001:2025 y publicar los primeros datasets en datos.gob.pe.",
  },
  {
    label: "En Desarrollo",
    range: [41, 60],
    color: "#EAB308",
    bgColor: "#FEFCE8",
    description:
      "La organización avanza en los 4 ejes ENIA con iniciativas en marcha, pero aún existen brechas importantes en gobernanza ética, datos abiertos y colaboración.",
    recommendation:
      "Escalar pilotos a producción, adoptar formalmente la NTP-ISO/IEC 42001:2025, incorporar evaluaciones de impacto ético y participar activamente en mesas técnicas de la SGTD.",
  },
  {
    label: "Avanzado",
    range: [61, 80],
    color: "#3B82F6",
    bgColor: "#EFF6FF",
    description:
      "La organización demuestra capacidades sólidas alineadas a la ENIA: talento formado, proyectos en producción, cumplimiento regulatorio y colaboración intersectorial.",
    recommendation:
      "Consolidar el ecosistema de IA, ampliar la red de alianzas internacionales, explorar IA generativa y MLOps, y posicionarse como referente sectorial para transferir buenas prácticas.",
  },
  {
    label: "Líder",
    range: [81, 100],
    color: "#10B981",
    bgColor: "#ECFDF5",
    description:
      "La organización es referente nacional en adopción responsable de IA, alineada plenamente con la ENIA 2026–2030: talento de alto nivel, datos abiertos, marcos éticos maduros y redes de colaboración consolidadas.",
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
    if (!result[q.dimension]) {
      result[q.dimension] = { score: 0, max: 0 };
    }
    result[q.dimension].score += answer?.score ?? 0;
    result[q.dimension].max += 3;
  }
  return result;
}
