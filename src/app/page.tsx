import Link from "next/link";
import { HeroSection } from "@/components/sections/HeroSection";
import { businessInfo, quickAccessItems } from "@/lib/site";

export default function Home() {
  return (
    <>
      <HeroSection />

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-2 lg:px-8">
          {quickAccessItems.map((item) => (
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

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
          <article className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-slate-900">Servicios más solicitados</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {businessInfo.serviceHighlights.map((service) => (
                <li key={service}>• {service}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-slate-900">Zonas de atención</h2>
            <p className="mt-2 text-sm text-slate-600">Atendemos en:</p>
            <ul className="mt-3 flex flex-wrap gap-2 text-sm text-slate-700">
              {businessInfo.coverageZones.map((zone) => (
                <li key={zone} className="rounded-full border border-slate-300 px-3 py-1">
                  {zone}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </>
  );
}
