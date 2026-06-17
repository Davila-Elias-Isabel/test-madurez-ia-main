import { getSupabase } from "@/lib/supabase";

/**
 * Guardar un plan de acción generado
 * POST /api/planes/save
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      tipo_entidad,
      diagnostico,
      objetivos,
      ejes,
      hitos,
      riscos,
      siguiente_paso,
      respuestas_formulario,
    } = body;

    if (!tipo_entidad || !diagnostico) {
      return Response.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    const db = getSupabase();
    const { data, error } = await db
      .from("planes_accion")
      .insert({
        tipo_entidad,
        diagnostico,
        objetivos,
        ejes,
        hitos,
        riscos,
        siguiente_paso,
        respuestas_formulario,
        estado: "generado",
      })
      .select();

    if (error) throw error;

    return Response.json({
      success: true,
      plan_id: data?.[0]?.id,
      plan: data?.[0],
    });
  } catch (err) {
    console.error("[planes/save]", err);
    return Response.json({ error: String(err) }, { status: 500 });
  }
}
