import { businessInfo } from "@/lib/site";

export default function ServiciosPage() {
  return (
    <main className="bg-slate-50 py-10 sm:py-14">
      <section className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Servicios</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Qué hacemos</h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Estos son los servicios operativos que ofrecemos hoy para domicilio en {businessInfo.contact.city}.
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {businessInfo.serviceHighlights.map((service) => (
              <li key={service} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                {service}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
