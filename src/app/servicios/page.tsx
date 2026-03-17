import Link from "next/link";
import { businessInfo } from "@/lib/site";

const serviceCatalog = [
  {
    name: "Armado de muebles en caja",
    duration: "90 min",
    buffer: "20 min",
    price: "$28.000",
    description: "Armado completo con ajuste final para asegurar estabilidad y terminación prolija.",
  },
  {
    name: "Instalación de estantes y soportes",
    duration: "60 min",
    buffer: "15 min",
    price: "$21.000",
    description: "Colocación nivelada y fijación segura en pared para uso diario en hogar u oficina.",
  },
  {
    name: "Desarme y rearmado por mudanza",
    duration: "120 min",
    buffer: "30 min",
    price: "$36.000",
    description: "Desarme ordenado, traslado interno y rearmado para mantener estructura y funcionamiento.",
  },
  {
    name: "Corrección y ajuste de armado",
    duration: "45 min",
    buffer: "15 min",
    price: "$18.500",
    description: "Revisión de errores de montaje, refuerzo de uniones y calibración de puertas o cajones.",
  },
] as const;

export default function ServiciosPage() {
  return (
    <main className="bg-slate-50 py-10 sm:py-14">
      <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Servicios</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Soluciones de armado confiables para tu casa u oficina
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
            En {businessInfo.brand} coordinamos cada visita con puntualidad, trabajo prolijo y comunicación clara para que
            resuelvas armado, instalación o ajustes sin complicaciones en {businessInfo.contact.city}.
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {businessInfo.serviceHighlights.map((service) => (
              <li key={service} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                {service}
              </li>
            ))}
          </ul>
        </div>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Duración estimada y valores orientativos</h2>
          <p className="mt-2 text-sm text-slate-600">
            Referencia de tiempos por trabajo, margen entre visitas y valor estimado para ayudarte a planificar.
          </p>

          <div className="mt-5 space-y-3">
            {serviceCatalog.map((service) => (
              <article key={service.name} className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 sm:text-base">{service.name}</h3>
                    <p className="mt-1 text-sm text-slate-600">{service.description}</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">{service.price}</p>
                </div>
                <ul className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600 sm:text-sm">
                  <li className="rounded-full border border-slate-200 bg-white px-3 py-1">Duración: {service.duration}</li>
                  <li className="rounded-full border border-slate-200 bg-white px-3 py-1">Buffer: {service.buffer}</li>
                </ul>
              </article>
            ))}
          </div>

          <p className="mt-4 text-xs text-slate-500 sm:text-sm">
            Valores orientativos sujetos a tipo de mueble, estado de la instalación y complejidad del trabajo.
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">¿Listo para coordinar tu visita?</h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Reservá tu turno en minutos desde la agenda. Si necesitás asesoramiento previo, te ayudamos por WhatsApp.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/agenda"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Abrir agenda
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
            >
              Contactar por WhatsApp
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
