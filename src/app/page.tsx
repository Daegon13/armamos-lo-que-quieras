import Link from "next/link";
import { HeroSection } from "@/components/sections/HeroSection";

const quickAccess = [
  {
    title: "Servicios",
    description: "Detalle de tipos de armado e instalación.",
    href: "/servicios",
  },
  {
    title: "Trabajos",
    description: "Galería de referencias y casos realizados.",
    href: "/trabajos",
  },
  {
    title: "Agenda",
    description: "Próximamente: flujo para reservar horarios.",
    href: "/agenda",
  },
  {
    title: "Contacto",
    description: "Canales comerciales y consulta inicial.",
    href: "/contacto",
  },
];

export default function Home() {
  return (
    <>
      <HeroSection />

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-2 lg:px-8">
          {quickAccess.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-slate-300"
            >
              <h2 className="text-base font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
