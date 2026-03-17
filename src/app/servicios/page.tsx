import Link from "next/link";
import { businessInfo } from "@/lib/site";

const serviceCatalog = [
  {
    name: "Consulta clínica general a domicilio",
    duration: "45 min",
    buffer: "15 min",
    price: "$24.900",
    description: "Chequeo integral, evaluación de síntomas y plan inicial de cuidados.",
  },
  {
    name: "Control preventivo y vacunación",
    duration: "30 min",
    buffer: "15 min",
    price: "$19.500",
    description: "Revisión por etapa, calendario sanitario y aplicación de vacunas indicadas.",
  },
  {
    name: "Curaciones y seguimiento postoperatorio",
    duration: "40 min",
    buffer: "20 min",
    price: "$22.000",
    description: "Control de evolución, limpieza de heridas y recomendaciones para recuperación segura.",
  },
  {
    name: "Asesoría nutricional y bienestar",
    duration: "35 min",
    buffer: "15 min",
    price: "$18.700",
    description: "Plan de alimentación adaptado a edad, condición corporal y rutina diaria.",
  },
] as const;

export default function ServiciosPage() {
  return (
    <main className="bg-slate-50 py-10 sm:py-14">
      <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Servicios</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Atención veterinaria profesional, clara y a tiempo
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
            En VetCare coordinamos cada visita para que tengas respuesta rápida, seguimiento responsable y un servicio
            confiable en {businessInfo.contact.city}. Trabajamos con turnos organizados para cuidar la experiencia de tu
            mascota y de tu familia.
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
          <h2 className="text-xl font-semibold text-slate-900">Servicios y tiempos de atención</h2>
          <p className="mt-2 text-sm text-slate-600">
            Duración estimada por visita, tiempo de preparación entre turnos y valor orientativo por servicio.
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
            Los valores son orientativos y pueden ajustarse según evaluación clínica, zona de cobertura y complejidad de
            cada caso.
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">¿Listo para coordinar?</h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Elegí el servicio que necesitás y reservá tu turno en minutos. Si preferís, también podés escribirnos para
            ayudarte a definir la mejor opción para tu mascota.
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
              Hablar con VetCare
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
