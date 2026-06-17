export interface ChecklistItem {
  id: string;
  categoria: string;
  descripcion: string;
  norma: string;
  plazo?: string;
}

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  // Categoría 1: Designación Formal
  { id: "D1", categoria: "Designación Formal", descripcion: "Emitir resolución directoral o dispositivo equivalente que designe formalmente al OIA", norma: "ENIA 2026-2030 · Eje 1", plazo: "Mar 2026" },
  { id: "D2", categoria: "Designación Formal", descripcion: "Comunicar la designación del OIA a la Secretaría de Gobierno y Transformación Digital (SGTD-PCM)", norma: "DS 115-2025-PCM", plazo: "Mar 2026" },
  { id: "D3", categoria: "Designación Formal", descripcion: "Definir funciones, atribuciones y alcance del cargo OIA en la entidad mediante documento interno", norma: "ENIA 2026-2030 · Eje 1" },
  { id: "D4", categoria: "Designación Formal", descripcion: "Asignar presupuesto operativo al OIA para el ejercicio fiscal corriente", norma: "DS 115-2025-PCM" },
  { id: "D5", categoria: "Designación Formal", descripcion: "Registrar al OIA en el portal institucional y en el directorio oficial de la entidad", norma: "Ley N.° 31814 · Art. 8" },

  // Categoría 2: Capacitación y Competencias
  { id: "C1", categoria: "Capacitación y Competencias", descripcion: "Completar formación en el programa Talento Digital de la SGTD-PCM (mínimo módulo de fundamentos de IA)", norma: "ENIA 2026-2030 · Eje 1 · SGTD", plazo: "Jun 2026" },
  { id: "C2", categoria: "Capacitación y Competencias", descripcion: "Aprobar módulo de Inteligencia Artificial y Gobierno Digital en la ENAP (SERVIR)", norma: "ENIA 2026-2030 · Eje 1 · SERVIR", plazo: "Sep 2026" },
  { id: "C3", categoria: "Capacitación y Competencias", descripcion: "Estudiar y comprender los requisitos de la NTP-ISO/IEC 42001:2025 y su aplicación en la entidad", norma: "NTP-ISO/IEC 42001:2025 · INACAL", plazo: "Jun 2026" },
  { id: "C4", categoria: "Capacitación y Competencias", descripcion: "Participar en al menos una mesa técnica de gobernanza de IA convocada por la SGTD-PCM", norma: "ENIA 2026-2030 · Eje 4" },
  { id: "C5", categoria: "Capacitación y Competencias", descripcion: "Completar formación básica en gestión de riesgos de IA (ISO 31000 o equivalente aplicado a IA)", norma: "DS 115-2025-PCM · Cap. IV" },

  // Categoría 3: Inventario y Gobernanza
  { id: "G1", categoria: "Inventario y Gobernanza", descripcion: "Levantar inventario completo de todos los sistemas de IA en uso o en desarrollo en la entidad", norma: "Ley N.° 31814 · Art. 9", plazo: "Jun 2026" },
  { id: "G2", categoria: "Inventario y Gobernanza", descripcion: "Clasificar cada sistema de IA inventariado según nivel de riesgo (alto, medio, bajo) usando criterios DS 115", norma: "DS 115-2025-PCM · Art. 15", plazo: "Sep 2026" },
  { id: "G3", categoria: "Inventario y Gobernanza", descripcion: "Registrar sistemas de IA de riesgo alto en el sistema de registro SGTD-PCM", norma: "DS 115-2025-PCM", plazo: "Dic 2026" },
  { id: "G4", categoria: "Inventario y Gobernanza", descripcion: "Implementar proceso formal de Evaluación de Impacto Ético (EIA-IA) previo al despliegue de nuevos sistemas", norma: "Ley N.° 31814 · Art. 7", plazo: "Sep 2026" },
  { id: "G5", categoria: "Inventario y Gobernanza", descripcion: "Establecer mecanismos de supervisión humana significativa en todos los sistemas de IA críticos", norma: "Ley N.° 31814 · Art. 6" },
  { id: "G6", categoria: "Inventario y Gobernanza", descripcion: "Definir y documentar protocolo de respuesta ante incidentes o fallas de sistemas de IA", norma: "DS 115-2025-PCM · Cap. V" },

  // Categoría 4: Plan de Acción ENIA
  { id: "P1", categoria: "Plan de Acción ENIA", descripcion: "Elaborar el Plan de Acción institucional articulado con los 4 ejes estratégicos de la ENIA 2026-2030", norma: "DS 115-2025-PCM · Art. 12", plazo: "Feb 2026" },
  { id: "P2", categoria: "Plan de Acción ENIA", descripcion: "Validar el Plan de Acción con la Alta Dirección de la entidad (resolución o acta de aprobación)", norma: "DS 115-2025-PCM", plazo: "Mar 2026" },
  { id: "P3", categoria: "Plan de Acción ENIA", descripcion: "Presentar el Plan de Acción formal ante la SGTD-PCM dentro del plazo establecido", norma: "DS 115-2025-PCM", plazo: "Mar 2026" },
  { id: "P4", categoria: "Plan de Acción ENIA", descripcion: "Coordinar la ejecución del Plan con las áreas de TI, RRHH, Planificación y Alta Dirección", norma: "ENIA 2026-2030 · Todos los ejes" },
  { id: "P5", categoria: "Plan de Acción ENIA", descripcion: "Participar en la primera evaluación semestral ENIA y reportar avances a la SGTD-PCM", norma: "ENIA 2026-2030 · Seguimiento", plazo: "Dic 2026" },

  // Categoría 5: Normativa y Cumplimiento
  { id: "N1", categoria: "Normativa y Cumplimiento", descripcion: "Revisar íntegramente la Ley N.° 31814 y el Reglamento DS 115-2025-PCM e identificar obligaciones aplicables", norma: "Ley N.° 31814 · DS 115-2025-PCM" },
  { id: "N2", categoria: "Normativa y Cumplimiento", descripcion: "Implementar o planificar la implementación de la NTP-ISO/IEC 42001:2025 en la entidad", norma: "NTP-ISO/IEC 42001:2025 · INACAL", plazo: "Sep 2026" },
  { id: "N3", categoria: "Normativa y Cumplimiento", descripcion: "Revisar contratos vigentes con proveedores de IA para asegurar cumplimiento de la Ley N.° 31814", norma: "Ley N.° 31814 · Art. 11" },
  { id: "N4", categoria: "Normativa y Cumplimiento", descripcion: "Verificar que los sistemas de IA cumplen la Ley N.° 29733 (protección de datos personales)", norma: "Ley N.° 29733 · DS 003-2013-JUS" },
  { id: "N5", categoria: "Normativa y Cumplimiento", descripcion: "Elaborar y aprobar una política institucional de uso ético, seguro e inclusivo de la IA", norma: "ENIA 2026-2030 · Eje 3" },

  // Categoría 6: Transparencia y Comunicación
  { id: "T1", categoria: "Transparencia y Comunicación", descripcion: "Publicar en el portal institucional información sobre los sistemas de IA en uso (propósito, datos, decisiones)", norma: "Ley N.° 31814 · Art. 5 (Transparencia)" },
  { id: "T2", categoria: "Transparencia y Comunicación", descripcion: "Diseñar y ejecutar programa de capacitación en uso ético de IA para funcionarios clave de la entidad", norma: "ENIA 2026-2030 · Eje 1" },
  { id: "T3", categoria: "Transparencia y Comunicación", descripcion: "Promover la participación de la entidad en consultas públicas sobre IA en la plataforma Participa Perú", norma: "ENIA 2026-2030 · Eje 4" },
  { id: "T4", categoria: "Transparencia y Comunicación", descripcion: "Elaborar informe semestral de gobernanza de IA y compartirlo con la dirección y la SGTD-PCM", norma: "ENIA 2026-2030 · Seguimiento y Evaluación" },
];

export const CATEGORIAS = [...new Set(CHECKLIST_ITEMS.map((i) => i.categoria))];

export type EstadoItem = "pendiente" | "en-progreso" | "completado";
