import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppFloatingButton } from "@/components/ui/WhatsAppFloatingButton";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Armamos lo que quieras",
    template: "%s | Armamos lo que quieras",
  },
  description:
    "Servicio profesional de armado de muebles para hogar y oficina. Base comercial lista para iterar.",
  metadataBase: new URL("https://armamosloquequieras.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-slate-100 text-slate-900 antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
