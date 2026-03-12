import { businessInfo } from "@/lib/site";

export function CoverageSection() {
  return (
    <section id="contacto" className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Cobertura</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Atención en {businessInfo.serviceArea}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Coordinamos visitas para hogar y oficina con comunicación clara y tiempos realistas.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
          <p className="text-sm font-medium text-slate-500">Contacto comercial (placeholder)</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">WhatsApp: {businessInfo.phoneDisplay}</p>
          <p className="mt-2 text-sm text-slate-600">
            En próximos patches se integrará el flujo real de contacto y agenda.
          </p>
        </div>
      </div>
    </section>
  );
}
