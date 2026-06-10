import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
      </body>
    </html>
  );
}
