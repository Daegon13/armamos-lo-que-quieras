import Link from "next/link";
import { businessInfo } from "@/lib/site";

export function HeroSection() {
  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{businessInfo.tagline}</p>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Menos mensajes caóticos, más turnos confirmados
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          {businessInfo.brand} usa una agenda automática por WhatsApp que ordena cada consulta, solicita la
          información completa y deja cada trabajo listo para coordinar en minutos.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href={businessInfo.primaryCtaHref}
            className="inline-flex items-center justify-center rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
          >
            {businessInfo.primaryCtaLabel}
          </Link>
          <Link
            href="/#como-funciona-agenda"
            className="inline-flex items-center justify-center rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-white"
          >
            Cómo funciona la agenda
          </Link>
        </div>
      </div>
    </section>
  );
}
