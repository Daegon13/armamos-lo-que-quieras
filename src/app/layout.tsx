import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { businessInfo } from "@/lib/site";
import { WhatsAppFloatingButton } from "@/components/ui/WhatsAppFloatingButton";
import "./globals.css";

const siteUrl = "https://armamosloquequieras.com";

export const metadata: Metadata = {
  title: {
    default: businessInfo.brand,
    template: `%s | ${businessInfo.brand}`,
  },
  description:
    "Servicio profesional de armado de muebles para hogar y oficina. Base comercial lista para iterar.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: businessInfo.brand,
    description:
      "Servicio profesional de armado de muebles para hogar y oficina. Atención confiable y comercial.",
    url: siteUrl,
    siteName: businessInfo.brand,
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-slate-100 text-slate-900 antialiased">
        <a href="#main-content" className="skip-link">Saltar al contenido</a>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
        </div>
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
