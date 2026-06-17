"use client";

import { useState } from "react";

export default function AdminSeedPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function executeSeed() {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Sin validación de secret key para admin local
      const res = await fetch("/api/admin/seed-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer admin-seed",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error desconocido");
        setResult(null);
      } else {
        setResult(data);
        setError(null);
      }
    } catch (err) {
      setError(`Error: ${err}`);
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Admin — Seed Data</h1>
          <p className="text-sm text-gray-500 mt-1">Llena la base de datos con glosario y checklist</p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="space-y-6">
            {/* Instrucciones */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">Pasos Necesarios</h2>
              <ol className="space-y-2 text-sm text-gray-700">
                <li>✅ <strong>Paso 1:</strong> Crea tablas en Supabase (SQL migration en repo)</li>
                <li>✅ <strong>Paso 2:</strong> Configura variables en Vercel:
                  <ul className="ml-6 mt-1 space-y-1 text-gray-600">
                    <li>• SUPABASE_URL</li>
                    <li>• SUPABASE_SERVICE_ROLE_KEY</li>
                  </ul>
                </li>
                <li>👇 <strong>Paso 3:</strong> Haz clic abajo para llenar datos</li>
              </ol>
            </div>

            {/* Botón Seed */}
            <button
              onClick={executeSeed}
              disabled={loading}
              className="w-full py-3 bg-[#003087] hover:bg-[#002060] disabled:opacity-40 text-white font-semibold rounded-lg transition-colors"
            >
              {loading ? "Ejecutando seed..." : "Ejecutar Seed (40+ glosario + 30 checklist)"}
            </button>

            {/* Resultado exitoso */}
            {result && !error && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm font-bold text-green-800">✅ Éxito</p>
                <ul className="text-sm text-green-700 mt-2 space-y-1">
                  <li>📖 Glosario: {result.glosario?.inserted || 0} términos insertados</li>
                  <li>✓ Checklist: {result.checklist?.inserted || 0} items insertados</li>
                </ul>
                <p className="text-xs text-green-600 mt-3">{result.message}</p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm font-bold text-red-800">❌ Error</p>
                <p className="text-sm text-red-700 mt-2">{error}</p>
                <p className="text-xs text-red-600 mt-3">
                  Verifica que SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY estén configuradas en Vercel
                </p>
              </div>
            )}

            {/* Información */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm font-bold text-blue-800 mb-2">ℹ️ Información</p>
              <p className="text-sm text-blue-700">
                Este endpoint crea/actualiza los datos en las tablas <code className="bg-white px-1 rounded">glosario</code> y <code className="bg-white px-1 rounded">checklist_items</code> en tu base de datos Supabase.
              </p>
              <p className="text-xs text-blue-600 mt-2">
                Si ves un error aquí, significa que la conexión a Supabase no está configurada correctamente en Vercel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
