import { getSupabase } from "@/lib/supabase";
import { GLOSARIO } from "@/lib/glosario-data";

export async function POST() {
  try {
    const db = getSupabase();
    const { error } = await db.from("glosario").upsert(
      GLOSARIO.map((t) => ({
        id: t.id,
        termino: t.termino,
        definicion: t.definicion,
        ejemplo: t.ejemplo,
        relacionados: t.relacionados,
        eje: t.eje || null,
        created_at: new Date().toISOString(),
      })),
      { onConflict: "id" }
    );
    if (error) throw error;
    return Response.json({ success: true, count: GLOSARIO.length });
  } catch (err) {
    console.error("[seed-glosario]", err);
    return Response.json({ error: String(err) }, { status: 500 });
  }
}
