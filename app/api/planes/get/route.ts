import { getSupabase } from "@/lib/supabase";

/**
 * Obtener un plan específico
 * GET /api/planes/get?id=uuid-aqui
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json({ error: "ID requerido" }, { status: 400 });
    }

    const db = getSupabase();
    const { data, error } = await db
      .from("planes_accion")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return Response.json({ data });
  } catch (err) {
    console.error("[planes/get]", err);
    return Response.json({ error: String(err) }, { status: 500 });
  }
}
