import { getSupabase } from "@/lib/supabase";
import { GLOSARIO } from "@/lib/glosario-data";
import { CHECKLIST_ITEMS } from "@/lib/checklist-data";

/**
 * Endpoint para llenar la base de datos con datos iniciales
 * Ejecutar una sola vez: POST /api/admin/seed-data
 *
 * Requiere: SUPABASE_SERVICE_ROLE_KEY configurada
 */
export async function POST(req: Request) {
  try {
    // En producción, validar secret key. En desarrollo, permitir sin validación.
    if (process.env.NODE_ENV === "production") {
      const authHeader = req.headers.get("authorization");
      const secretKey = process.env.SEED_SECRET_KEY || "seed-key";
      if (!authHeader?.includes(secretKey)) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const db = getSupabase();

    // Seed glosario
    const glosarioData = GLOSARIO.map((t) => ({
      id: t.id,
      termino: t.termino,
      definicion: t.definicion,
      ejemplo: t.ejemplo,
      relacionados: t.relacionados,
      eje: t.eje || null,
    }));

    const { error: glosarioError, data: glosarioResult } = await db
      .from("glosario")
      .upsert(glosarioData, { onConflict: "id" })
      .select();

    if (glosarioError) throw new Error(`Glosario error: ${glosarioError.message}`);

    // Seed checklist items
    const checklistData = CHECKLIST_ITEMS.map((item) => ({
      id: item.id,
      categoria: item.categoria,
      descripcion: item.descripcion,
      norma: item.norma,
      plazo: item.plazo || null,
    }));

    const { error: checklistError, data: checklistResult } = await db
      .from("checklist_items")
      .upsert(checklistData, { onConflict: "id" })
      .select();

    if (checklistError) throw new Error(`Checklist error: ${checklistError.message}`);

    return Response.json({
      success: true,
      glosario: { inserted: glosarioResult?.length || 0, total: GLOSARIO.length },
      checklist: { inserted: checklistResult?.length || 0, total: CHECKLIST_ITEMS.length },
      message: "Base de datos poblada exitosamente",
    });
  } catch (err) {
    console.error("[seed-data]", err);
    return Response.json({ error: String(err) }, { status: 500 });
  }
}
