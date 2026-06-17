import { getSupabase } from "@/lib/supabase";

/**
 * Obtener todos los planes guardados
 * GET /api/planes/list?limit=10&offset=0&tipo=entidad_publica
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");
    const tipo = searchParams.get("tipo");
    const estado = searchParams.get("estado");

    const db = getSupabase();
    let query = db.from("planes_accion").select("*");

    if (tipo) query = query.eq("tipo_entidad", tipo);
    if (estado) query = query.eq("estado", estado);

    const { data, error, count } = await query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return Response.json({
      data,
      count,
      limit,
      offset,
    });
  } catch (err) {
    console.error("[planes/list]", err);
    return Response.json({ error: String(err) }, { status: 500 });
  }
}
