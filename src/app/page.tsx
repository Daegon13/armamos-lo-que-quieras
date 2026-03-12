import { CoverageSection } from "@/components/sections/CoverageSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProcessSection } from "@/components/sections/ProcessSection";

const serviceHighlights = [
  {
    title: "Puntualidad",
    description: "Coordinación clara para que el armado suceda en tiempo y forma.",
  },
  {
    title: "Cuidado del espacio",
    description: "Trabajo ordenado y respeto por tu hogar u oficina en cada visita.",
  },
  {
    title: "Resultado profesional",
    description: "Terminaciones prolijas para que tus muebles queden listos para usar.",
  },
];

export default function Home() {
  return (
    <>
      <HeroSection />

      <section id="servicio" className="bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-3 lg:px-8">
          {serviceHighlights.map((item) => (
            <article key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-base font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <ProcessSection />
      <CoverageSection />
    </>
  );
}
