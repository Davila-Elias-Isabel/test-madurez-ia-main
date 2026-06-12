import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FloatingAsesora from "@/components/FloatingAsesora";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Test de Madurez IA — ENIA Perú",
  description:
    "Evalúa el nivel de madurez en Inteligencia Artificial de tu organización basado en la Estrategia Nacional de IA del Perú (ENIA).",
  keywords: ["ENIA", "inteligencia artificial", "madurez IA", "Perú", "transformación digital"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-slate-50 text-slate-900 antialiased">
        {children}

        {/* Footer de autoría — aparece en todas las páginas */}
        <footer className="border-t border-slate-100 bg-white py-4 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <p className="text-xs text-slate-400">
              Desarrollado por{" "}
              <a
                href="https://www.linkedin.com/in/davilaeliasisabel"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:underline"
                style={{ color: "#003087" }}
              >
                R. Isabel Dávila Elías
              </a>
              {" "}·{" "}
              <span style={{ color: "#003087" }}>Especialista en IA &amp; Política Pública Digital · Perú</span>
            </p>
            <p className="text-xs" style={{ color: "#C8102E" }}>
              Basado en la ENIA 2026–2030 · Ley N.° 31814
            </p>
          </div>
        </footer>

        {/* Asesora ENIA — botón flotante global */}
        <FloatingAsesora />

        {/* Badge flotante — esquina inferior izquierda */}
        <a
          href="https://www.linkedin.com/in/davilaeliasisabel"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-full px-3 py-2 shadow-lg border text-xs font-medium transition-opacity opacity-80 hover:opacity-100"
          style={{ backgroundColor: "#003087", borderColor: "#003087", color: "#fff" }}
        >
          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V9h2v7zm-1-8a1 1 0 110-2 1 1 0 010 2zm8 8h-2v-3.5c0-.83-.67-1.5-1.5-1.5S13 11.67 13 12.5V16h-2V9h2v1.1c.52-.81 1.42-1.35 2.5-1.35C17.43 8.75 18 10.18 18 11.5V16z"/>
          </svg>
          <span>Rocío Dávila</span>
          <span className="hidden sm:inline opacity-75">· Oficial de IA · ENIA Perú</span>
        </a>
      </body>
    </html>
  );
}
