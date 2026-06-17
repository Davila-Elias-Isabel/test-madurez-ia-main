import { getSupabase } from "@/lib/supabase";
import Anthropic from "@anthropic-ai/sdk";

interface PreguntasFormulario {
  tipoEntidad: string;
  presupuesto: string;
  madurezIA: string;
  principalesChallenges: string;
  oportunidades: string;
  recursos: string;
  timeline: string;
  metricas: string;
}

export async function POST(req: Request) {
  try {
    const { preguntas } = await req.json() as { preguntas: PreguntasFormulario };

    const prompt = `Basado en las siguientes respuestas de una entidad peruana sobre su contexto de IA, genera un Plan de Acción estructurado alineado a la ENIA 2026-2030.

Tipo de entidad: ${preguntas.tipoEntidad}
Presupuesto estimado: ${preguntas.presupuesto}
Madurez actual en IA: ${preguntas.madurezIA}
Principales desafíos: ${preguntas.principalesChallenges}
Oportunidades identificadas: ${preguntas.oportunidades}
Recursos disponibles: ${preguntas.recursos}
Timeline de implementación: ${preguntas.timeline}
Métricas de éxito: ${preguntas.metricas}

Genera un Plan de Acción JSON con la siguiente estructura:
{
  "diagnostico": "Análisis breve de la situación actual",
  "objetivos": ["Objetivo 1", "Objetivo 2", ...],
  "ejes": {
    "eje1": {
      "actividades": [
        {
          "nombre": "Actividad",
          "descripcion": "Desc",
          "plazo": "MM/YYYY",
          "responsable": "Rol",
          "presupuesto": "Estimado"
        }
      ]
    },
    "eje2": {...},
    "eje3": {...},
    "eje4": {...}
  },
  "hitos": [
    {"fecha": "MM/YYYY", "descripcion": "Hito clave"}
  ],
  "riscos": ["Riesgo 1", "Riesgo 2"],
  "siguiente_paso": "Próxima acción recomendada"
}

Responde SOLO con JSON válido, sin markdown, sin explicaciones adicionales.`;

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY_2 });

    const response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.content[0].type === "text" ? response.content[0].text : "{}";
    const plan = JSON.parse(content);

    // Guardar en Supabase
    const db = getSupabase();
    const { data, error } = await db
      .from("planes_accion")
      .insert({
        tipo_entidad: preguntas.tipoEntidad,
        diagnostico: plan.diagnostico,
        objetivos: plan.objetivos || [],
        ejes: plan.ejes || {},
        hitos: plan.hitos || [],
        riscos: plan.riscos || [],
        siguiente_paso: plan.siguiente_paso,
        respuestas_formulario: preguntas,
        estado: "generado",
      })
      .select();

    if (error) throw new Error(`Supabase error: ${error.message}`);

    return Response.json({
      plan,
      id: data?.[0]?.id,
      savedInDatabase: true,
    });
  } catch (err) {
    console.error("[generar-plan]", err);
    return Response.json({ error: String(err) }, { status: 500 });
  }
}
