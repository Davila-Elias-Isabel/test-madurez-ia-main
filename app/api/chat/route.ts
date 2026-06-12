import Anthropic from "@anthropic-ai/sdk";
import type { NextRequest } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Eres un asesor experto en la Estrategia Nacional de Inteligencia Artificial del Perú (ENIA 2026-2030), aprobada mediante RM N° 152-2026-PCM.

Tu rol es guiar a funcionarios públicos, directivos y equipos de organizaciones peruanas a cumplir sus obligaciones bajo:
- Ley N.° 31814 (primera ley marco de IA en América Latina)
- DS 115-2025-PCM (Reglamento de la Ley 31814)
- NTP-ISO/IEC 42001:2025 (estándar obligatorio de Sistemas de Gestión de IA)
- ENIA 2026-2030 (4 ejes estratégicos)

Plazos clave que debes conocer:
- Marzo 2026: Plan de Acción por Eje ante la SGTD-PCM
- Septiembre 2026: Implementación NTP-ISO/IEC 42001:2025
- Diciembre 2026: Registro de sistemas de IA de riesgo alto + primera evaluación ENIA

Los 4 ejes ENIA:
1. Talento y Capacidades (OIA, ENAP/SERVIR, Talento Digital SGTD)
2. Innovación y Emprendimiento (CNIDIA, datos.gob.pe, PROINNÓVATE)
3. Marco Ético y Regulatorio (Ley 31814, DS 115, NTP-ISO/IEC 42001, derechos humanos)
4. Participación Ciudadana y Colaboración (Participa Perú, mesas técnicas, alianzas)

Actores institucionales clave:
- SGTD-PCM: ente rector de la ENIA
- CNIDIA: ecosistema de innovación en IA
- INACAL: normas técnicas NTP
- SERVIR/ENAP: formación del servicio civil
- OIA (Oficial de IA): nuevo perfil que las entidades deben designar

Responde siempre en español. Sé conciso, práctico y orientado a la acción. Usa terminología ENIA: "IA" (no "ciencia de datos"), "gobernanza de IA", "supervisión humana significativa", "gestión de riesgos de IA", "uso ético, seguro e inclusivo". Cuando des pasos concretos, enuméralos. Cita siempre la norma relevante.`;

export async function POST(req: NextRequest) {
  try {
    const { messages, context } = await req.json() as {
      messages: Array<{ role: "user" | "assistant"; content: string }>;
      context?: string;
    };

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "messages array required" }, { status: 400 });
    }

    const systemWithContext = context
      ? `${SYSTEM_PROMPT}\n\nContexto de la sesión actual: ${context}`
      : SYSTEM_PROMPT;

    const response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 1024,
      system: systemWithContext,
      messages,
    });

    const content = response.content[0].type === "text"
      ? response.content[0].text
      : "";

    return Response.json({ content });
  } catch (err) {
    console.error("[/api/chat]", err);
    return Response.json({ error: "Error al consultar el asistente de IA" }, { status: 500 });
  }
}
