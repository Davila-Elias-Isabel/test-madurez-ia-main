import Anthropic from "@anthropic-ai/sdk";

interface PlanARevisar {
  plan: any;
  evidencia: string;
  tendenciaMercado: string;
}

export async function POST(req: Request) {
  try {
    const { plan, evidencia, tendenciaMercado } = await req.json() as PlanARevisar;

    const prompt = `Eres un asesor experto en ENIA 2026-2030 del Perú. Revisa el siguiente Plan de Acción basado en nueva evidencia y tendencias del mercado, y proporciona recomendaciones para ajustarlo.

PLAN ACTUAL:
${JSON.stringify(plan, null, 2)}

NUEVA EVIDENCIA:
${evidencia}

TENDENCIAS DEL MERCADO:
${tendenciaMercado}

Proporciona una revisión JSON con esta estructura:
{
  "evaluacion_general": "Síntesis de la revisión",
  "fortalezas": ["Fortaleza 1", ...],
  "debilidades": ["Debilidad 1", ...],
  "oportunidades": ["Oportunidad 1", ...],
  "amenazas": ["Amenaza 1", ...],
  "ajustes_recomendados": [
    {
      "area": "Eje o sección",
      "ajuste": "Cambio recomendado",
      "justificacion": "Por qué"
    }
  ],
  "nuevo_orden_prioridades": ["Actividad 1", "Actividad 2", ...],
  "presupuesto_implicaciones": "Impacto en presupuesto si aplica"
}

Responde SOLO con JSON válido, sin markdown, sin explicaciones adicionales.`;

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY_2 });

    const response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.content[0].type === "text" ? response.content[0].text : "{}";
    const revision = JSON.parse(content);

    return Response.json({ revision });
  } catch (err) {
    console.error("[revisar-plan]", err);
    return Response.json({ error: String(err) }, { status: 500 });
  }
}
