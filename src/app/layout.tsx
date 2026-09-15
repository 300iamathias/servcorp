import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Servicios Corporativos | Constitución de Empresas SAS y Asesoría Legal y Financiera en Ecuador",
  description:
    "Constitución y creación de compañías SAS en Ecuador, asesoría legal empresarial y consultoría financiera. Proceso 100% remoto vía Zoom con atención personalizada.",
  keywords: [
    "constitución de empresas Ecuador",
    "crear una SAS en Ecuador",
    "Sociedad por Acciones Simplificada",
    "asesoría legal empresarial Ecuador",
    "consultoría financiera Ecuador",
    "Servicios Corporativos",
  ],
  authors: [{ name: "Servicios Corporativos S.A.S." }],
  openGraph: {
    title:
      "Servicios Corporativos | Constitución de Empresas SAS en Ecuador",
    description:
      "Constituye tu compañía SAS con asesoría legal y financiera integral. Proceso 100% remoto vía Zoom.",
    siteName: "Servicios Corporativos",
    locale: "es_EC",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050c1d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
