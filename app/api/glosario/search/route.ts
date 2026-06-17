import { getSupabase } from "@/lib/supabase";

/**
 * Buscar términos en el glosario
 * GET /api/glosario/search?q=gobernanza&eje=3
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    const eje = searchParams.get("eje");

    const db = getSupabase();
    let query = db.from("glosario").select("*");

    // Búsqueda de texto
    if (q.trim()) {
      query = query.or(`termino.ilike.%${q}%,definicion.ilike.%${q}%`);
    }

    // Filtrar por eje si se proporciona
    if (eje) {
      query = query.eq("eje", parseInt(eje));
    }

    const { data, error } = await query.order("termino");

    if (error) throw error;

    return Response.json({ data, count: data?.length || 0 });
  } catch (err) {
    console.error("[glosario/search]", err);
    return Response.json({ error: String(err) }, { status: 500 });
  }
}
