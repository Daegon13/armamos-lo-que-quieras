import Link from "next/link";
import { HeroSection } from "@/components/sections/HeroSection";
import { businessInfo, quickAccessItems } from "@/lib/site";

const agendaBenefits = [
  {
    title: "Ordena consultas",
    description: "Cada solicitud entra con estructura clara para priorizar trabajos reales.",
  },
  {
    title: "Toma datos completos",
    description: "La agenda pide tipo de mueble, zona, disponibilidad y detalles clave desde el inicio.",
  },
  {
    title: "Reduce mensajes caóticos",
    description: "Se evita el ida y vuelta interminable por WhatsApp y se acelera cada respuesta.",
  },
  {
    title: "Facilita coordinación",
    description: "Con la información ordenada, confirmar fecha y horario es directo y rápido.",
  },
] as const;

const agendaFlow = [
  "Completás la agenda por WhatsApp con los datos del trabajo.",
  "El backend organiza la solicitud para revisión y seguimiento.",
  "Confirmamos la visita con fecha, franja horaria y alcance del servicio.",
] as const;

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
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Diferencial real</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Una agenda que vende orden y velocidad desde el primer mensaje
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {agendaBenefits.map((benefit) => (
              <article key={benefit.title} className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-base font-semibold text-slate-900">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.4fr_1fr] lg:px-8">
          <article className="rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Cómo funciona la agenda</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {agendaFlow.map((step, index) => (
                <li key={step}>
                  <span className="font-semibold text-slate-900">{index + 1}. </span>
                  {step}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-slate-900">Servicios más solicitados</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {businessInfo.serviceHighlights.map((service) => (
                <li key={service}>• {service}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </>
  );
}
