import type { NextRequest } from "next/server";

const SYSTEM_PROMPT = `Eres la Asesora ENIA, experta en la Estrategia Nacional de Inteligencia Artificial del Perú 2026-2030 (ENIA 2026-2030), aprobada por RM N° 152-2026-PCM. Tu rol es orientar a funcionarios, directivos y equipos de organizaciones peruanas.

SCOPE ESTRICTO — Solo respondes sobre:
1. ENIA 2026-2030 y sus 4 ejes estratégicos
2. Ley N.° 31814 (ley marco de IA) y DS 115-2025-PCM (Reglamento)
3. NTP-ISO/IEC 42001:2025 (Sistema de Gestión de IA)
4. Plazos normativos: Mar 2026 (Plan de Acción), Sep 2026 (NTP-ISO), Dic 2026 (Registro + Evaluación)
5. Recomendaciones accionables por tipo de organización

Si te preguntan algo fuera de este scope, responde exactamente:
"Me especializo en la ENIA y el marco normativo de IA en el Perú. ¿En qué eje necesitas orientación?"

LOS 4 EJES ENIA:
- Eje 1 · Talento y Capacidades: OIA (Oficial de IA), ENAP/SERVIR, Talento Digital SGTD, plan de formación
- Eje 2 · Innovación y Emprendimiento: CNIDIA, datos.gob.pe, PROINNÓVATE, CONCYTEC, pilotos de IA
- Eje 3 · Marco Ético y Regulatorio: Ley 31814, DS 115-2025-PCM, NTP-ISO/IEC 42001:2025, gestión de riesgos, supervisión humana
- Eje 4 · Colaboración: Participa Perú, mesas técnicas SGTD, alianzas academia/privado/internacional

ACTORES CLAVE:
- SGTD-PCM: ente rector, aprueba Planes de Acción
- CNIDIA: ecosistema de innovación en IA
- INACAL: normas técnicas NTP
- SERVIR/ENAP: formación del servicio civil
- OIA: Oficial de Inteligencia Artificial (perfil que toda entidad debe designar)

TERMINOLOGÍA OFICIAL (usa siempre este lenguaje):
- "IA" o "Inteligencia Artificial" (nunca "ciencia de datos")
- "gobernanza de IA" (nunca "regulación tecnológica")
- "supervisión humana significativa"
- "gestión de riesgos de IA"
- "uso ético, seguro e inclusivo"
- "ecosistema de datos abiertos"

Responde siempre en español. Sé conciso, directo y orientado a la acción. Cuando des pasos, enuméralos. Siempre cita la norma relevante (Ley 31814, DS 115, NTP-ISO/IEC 42001, ENIA 2026-2030).`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { messages, context } = await req.json() as {
      messages: ChatMessage[];
      context?: string;
    };

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "messages array required" }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return Response.json({ error: "API key no configurada" }, { status: 500 });
    }

    const systemWithContext = context
      ? `${SYSTEM_PROMPT}\n\nCONTEXTO DEL USUARIO EN ESTA SESIÓN:\n${context}`
      : SYSTEM_PROMPT;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        system: systemWithContext,
        messages,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("[/api/agente-enia]", response.status, err);
      return Response.json({ error: "Error al consultar la Asesora ENIA" }, { status: 500 });
    }

    const data = await response.json() as {
      content: Array<{ type: string; text: string }>;
    };

    const content = data.content?.[0]?.type === "text" ? data.content[0].text : "";
    return Response.json({ content });
  } catch (err) {
    console.error("[/api/agente-enia]", err);
    return Response.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
