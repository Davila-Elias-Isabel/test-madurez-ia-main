export type TipoEntidad =
  | "entidad_publica"
  | "gobierno_regional"
  | "municipalidad"
  | "empresa_privada"
  | "universidad"
  | "sociedad_civil";

export interface Obligacion {
  id: string;
  titulo: string;
  descripcion: string;
  plazo: string;
  norma: string;
  eje: 1 | 2 | 3 | 4;
  ejeLabel: string;
  prioridad: "alta" | "media" | "baja";
}

export const ENTIDADES: Record<TipoEntidad, { label: string; icon: string; descripcion: string }> = {
  entidad_publica:  { label: "Entidad pública nacional", icon: "🏛️", descripcion: "Ministerios, organismos adscritos, entidades del Poder Ejecutivo" },
  gobierno_regional:{ label: "Gobierno regional",         icon: "🗺️", descripcion: "25 gobiernos regionales y sus organismos" },
  municipalidad:    { label: "Municipalidad",              icon: "🏘️", descripcion: "Municipalidades provinciales y distritales" },
  empresa_privada:  { label: "Empresa privada",            icon: "🏢", descripcion: "Empresas que desarrollan o despliegan sistemas de IA" },
  universidad:      { label: "Universidad / Academia",     icon: "🎓", descripcion: "Universidades públicas y privadas, centros de investigación" },
  sociedad_civil:   { label: "Sociedad civil",             icon: "🤝", descripcion: "ONGs, asociaciones, colegios profesionales, ciudadanía" },
};

const BASE: Obligacion[] = [
  {
    id: "plan-accion",
    titulo: "Plan de Acción por Eje ENIA",
    descripcion: "Presentar el Plan de Acción institucional ante la SGTD-PCM, detallando metas por cada eje estratégico de la ENIA 2026-2030.",
    plazo: "Mar 2026",
    norma: "DS 115-2025-PCM · Art. 12",
    eje: 3,
    ejeLabel: "Eje 3 · Marco Ético y Regulatorio",
    prioridad: "alta",
  },
  {
    id: "ntp-42001",
    titulo: "Implementar NTP-ISO/IEC 42001:2025",
    descripcion: "Adoptar el Sistema de Gestión de Inteligencia Artificial según la norma técnica peruana. Implica diagnóstico, planificación, implementación y auditoría interna.",
    plazo: "Sep 2026",
    norma: "Reglamento Ley N.° 31814 · INACAL",
    eje: 3,
    ejeLabel: "Eje 3 · Marco Ético y Regulatorio",
    prioridad: "alta",
  },
  {
    id: "registro-riesgo-alto",
    titulo: "Registrar sistemas de IA de riesgo alto",
    descripcion: "Todo sistema de IA de riesgo alto desplegado debe registrarse en el sistema nacional, con trazabilidad completa y documentación de impacto.",
    plazo: "Dic 2026",
    norma: "DS 115-2025-PCM · Ley 31814",
    eje: 3,
    ejeLabel: "Eje 3 · Marco Ético y Regulatorio",
    prioridad: "alta",
  },
  {
    id: "oia",
    titulo: "Designar un Oficial de IA (OIA)",
    descripcion: "Nombrar formalmente al Oficial de Inteligencia Artificial, responsable de coordinar la gobernanza de IA y articular con la SGTD-PCM.",
    plazo: "Mar 2026",
    norma: "ENIA 2026-2030 · Eje 1",
    eje: 1,
    ejeLabel: "Eje 1 · Talento y Capacidades",
    prioridad: "alta",
  },
  {
    id: "formacion-personal",
    titulo: "Plan de formación en IA para el personal",
    descripcion: "Inscribir personal en los programas Talento Digital (SGTD) y ENAP (SERVIR). Diseñar un plan de capacitación con metas medibles para los próximos 12 meses.",
    plazo: "Jun 2026",
    norma: "ENIA 2026-2030 · Eje 1 · SERVIR",
    eje: 1,
    ejeLabel: "Eje 1 · Talento y Capacidades",
    prioridad: "media",
  },
  {
    id: "evaluacion-enia",
    titulo: "Primera evaluación ENIA semestral",
    descripcion: "Participar en el proceso de seguimiento semestral de la ENIA 2026-2030 ante la SGTD, reportando avances por eje estratégico.",
    plazo: "Dic 2026",
    norma: "ENIA 2026-2030 · Seguimiento y Evaluación",
    eje: 3,
    ejeLabel: "Eje 3 · Marco Ético y Regulatorio",
    prioridad: "media",
  },
];

const OBLIGACIONES_POR_ENTIDAD: Record<TipoEntidad, Obligacion[]> = {
  entidad_publica: [
    ...BASE,
    {
      id: "datos-abiertos",
      titulo: "Publicar datasets en datos.gob.pe",
      descripcion: "Contribuir al ecosistema de datos abiertos publicando conjuntos de datos institucionales relevantes para proyectos de IA en la plataforma nacional.",
      plazo: "Dic 2026",
      norma: "ENIA 2026-2030 · Eje 2 · DL 1412",
      eje: 2,
      ejeLabel: "Eje 2 · Innovación y Emprendimiento",
      prioridad: "media",
    },
    {
      id: "cnidia",
      titulo: "Articularse con el CNIDIA",
      descripcion: "Establecer vínculo formal con el Centro Nacional de Innovación Digital e IA para acceder a herramientas, financiamiento y casos de uso del ecosistema nacional.",
      plazo: "Jun 2026",
      norma: "ENIA 2026-2030 · Eje 2",
      eje: 2,
      ejeLabel: "Eje 2 · Innovación y Emprendimiento",
      prioridad: "baja",
    },
    {
      id: "mesas-tecnicas",
      titulo: "Participar en mesas técnicas SGTD",
      descripcion: "Designar un representante para participar en las mesas técnicas y comités de gobernanza de IA convocados por la SGTD-PCM.",
      plazo: "Permanente",
      norma: "ENIA 2026-2030 · Eje 4",
      eje: 4,
      ejeLabel: "Eje 4 · Colaboración",
      prioridad: "media",
    },
  ],
  gobierno_regional: [
    ...BASE,
    {
      id: "plan-regional-ia",
      titulo: "Incorporar IA en el Plan de Desarrollo Regional",
      descripcion: "Integrar metas de adopción de IA en los instrumentos de planificación regional (PDC, PEI, POI), alineados a la ENIA 2026-2030.",
      plazo: "Jun 2026",
      norma: "ENIA 2026-2030 · DL 1412",
      eje: 2,
      ejeLabel: "Eje 2 · Innovación y Emprendimiento",
      prioridad: "media",
    },
    {
      id: "mesas-regionales",
      titulo: "Articular con universidades y empresas regionales",
      descripcion: "Convocar mesas técnicas regionales de IA con actores del ecosistema local: universidades, empresas tecnológicas y sociedad civil.",
      plazo: "Dic 2026",
      norma: "ENIA 2026-2030 · Eje 4",
      eje: 4,
      ejeLabel: "Eje 4 · Colaboración",
      prioridad: "baja",
    },
  ],
  municipalidad: [
    BASE[3], // OIA
    BASE[4], // Formación
    BASE[5], // Evaluación
    {
      id: "servicios-ia-municipales",
      titulo: "Identificar servicios municipales para IA",
      descripcion: "Mapear los trámites y servicios municipales donde la IA puede reducir tiempos y costos: atención ciudadana, licencias, gestión de residuos, seguridad.",
      plazo: "Jun 2026",
      norma: "ENIA 2026-2030 · Eje 2 · DL 1412",
      eje: 2,
      ejeLabel: "Eje 2 · Innovación y Emprendimiento",
      prioridad: "media",
    },
    {
      id: "capacitacion-funcionarios",
      titulo: "Capacitar funcionarios en uso ético de IA",
      descripcion: "Enviar funcionarios municipales a programas de formación básica en IA ofrecidos por la ENAP-SERVIR y Talento Digital de la SGTD.",
      plazo: "Sep 2026",
      norma: "ENIA 2026-2030 · Eje 1 · SERVIR",
      eje: 1,
      ejeLabel: "Eje 1 · Talento y Capacidades",
      prioridad: "alta",
    },
  ],
  empresa_privada: [
    BASE[1], // NTP-ISO/IEC 42001
    BASE[2], // Registro riesgo alto
    {
      id: "evaluacion-impacto-etico",
      titulo: "Evaluación de Impacto Ético antes del despliegue",
      descripcion: "Implementar un proceso formal de Evaluación de Impacto Ético (EIA-IA) para todo sistema de IA antes de su lanzamiento al mercado peruano.",
      plazo: "Sep 2026",
      norma: "Ley N.° 31814 · DS 115-2025-PCM",
      eje: 3,
      ejeLabel: "Eje 3 · Marco Ético y Regulatorio",
      prioridad: "alta",
    },
    {
      id: "transparencia-algoritmica",
      titulo: "Declaración de transparencia algorítmica",
      descripcion: "Documentar y publicar información sobre los algoritmos de IA utilizados: datos de entrenamiento, criterios de decisión, mecanismos de supervisión humana.",
      plazo: "Dic 2026",
      norma: "Ley N.° 31814 · Art. 5",
      eje: 3,
      ejeLabel: "Eje 3 · Marco Ético y Regulatorio",
      prioridad: "alta",
    },
    {
      id: "proinnova",
      titulo: "Postular a fondos PROINNÓVATE / CONCYTEC",
      descripcion: "Explorar y postular a los fondos de innovación tecnológica en IA disponibles para empresas en PROINNÓVATE, CONCYTEC y PRODUCE.",
      plazo: "Permanente",
      norma: "ENIA 2026-2030 · Eje 2",
      eje: 2,
      ejeLabel: "Eje 2 · Innovación y Emprendimiento",
      prioridad: "baja",
    },
  ],
  universidad: [
    BASE[4], // Formación
    {
      id: "curricula-ia",
      titulo: "Incorporar IA ética en el currículo",
      descripcion: "Integrar contenidos de IA, ética algorítmica y gobernanza de datos en los programas de estudio, alineados a los estándares ENIA 2026-2030.",
      plazo: "2026",
      norma: "ENIA 2026-2030 · Eje 1 · MINEDU",
      eje: 1,
      ejeLabel: "Eje 1 · Talento y Capacidades",
      prioridad: "alta",
    },
    {
      id: "investigacion-enia",
      titulo: "Publicar investigación alineada a ENIA",
      descripcion: "Orientar líneas de investigación hacia los 4 ejes ENIA: talento, innovación, marco ético y colaboración. Publicar resultados en datos.gob.pe y eventos CNIDIA.",
      plazo: "Dic 2026",
      norma: "ENIA 2026-2030 · Eje 2 · CONCYTEC",
      eje: 2,
      ejeLabel: "Eje 2 · Innovación y Emprendimiento",
      prioridad: "media",
    },
    {
      id: "alianzas-estado",
      titulo: "Convenios con entidades públicas para IA",
      descripcion: "Establecer convenios de colaboración con entidades del Estado para co-desarrollar proyectos piloto de IA y formación de OIAs.",
      plazo: "Dic 2026",
      norma: "ENIA 2026-2030 · Eje 4",
      eje: 4,
      ejeLabel: "Eje 4 · Colaboración",
      prioridad: "baja",
    },
    {
      id: "participa-peru",
      titulo: "Participar en consultas Participa Perú",
      descripcion: "Contribuir activamente a los procesos de consulta pública sobre gobernanza de IA en la plataforma Participa Perú, representando la perspectiva académica.",
      plazo: "Permanente",
      norma: "ENIA 2026-2030 · Eje 4",
      eje: 4,
      ejeLabel: "Eje 4 · Colaboración",
      prioridad: "baja",
    },
  ],
  sociedad_civil: [
    {
      id: "consulta-publica",
      titulo: "Participar en consultas públicas de IA",
      descripcion: "Usar la plataforma Participa Perú para aportar en las consultas públicas sobre gobernanza y regulación de IA, representando intereses ciudadanos.",
      plazo: "Permanente",
      norma: "ENIA 2026-2030 · Eje 4",
      eje: 4,
      ejeLabel: "Eje 4 · Colaboración",
      prioridad: "alta",
    },
    {
      id: "vigilancia-algoritmica",
      titulo: "Vigilancia de sistemas de IA de riesgo alto",
      descripcion: "Monitorear el cumplimiento de la Ley N.° 31814 por parte de entidades públicas y privadas. Solicitar información sobre sistemas de IA que afecten derechos ciudadanos.",
      plazo: "Permanente",
      norma: "Ley N.° 31814 · Art. 7",
      eje: 3,
      ejeLabel: "Eje 3 · Marco Ético y Regulatorio",
      prioridad: "alta",
    },
    {
      id: "alfabetizacion-ia",
      titulo: "Promover alfabetización en IA",
      descripcion: "Desarrollar iniciativas de educación ciudadana sobre IA, derechos digitales y uso ético de la tecnología, articulando con el Eje 1 ENIA.",
      plazo: "Dic 2026",
      norma: "ENIA 2026-2030 · Eje 1",
      eje: 1,
      ejeLabel: "Eje 1 · Talento y Capacidades",
      prioridad: "media",
    },
    {
      id: "mesa-tecnica-sc",
      titulo: "Integrarse a mesas técnicas SGTD",
      descripcion: "Solicitar participación en las mesas técnicas de gobernanza de IA de la SGTD-PCM para que la voz de la sociedad civil esté representada.",
      plazo: "Jun 2026",
      norma: "ENIA 2026-2030 · Eje 4",
      eje: 4,
      ejeLabel: "Eje 4 · Colaboración",
      prioridad: "media",
    },
  ],
};

export function getObligaciones(tipo: TipoEntidad): Obligacion[] {
  return OBLIGACIONES_POR_ENTIDAD[tipo] ?? [];
}
