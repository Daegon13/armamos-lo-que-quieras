import Link from "next/link";
import { businessInfo, whatsappContactHref } from "@/lib/site";

export default function ContactoPage() {
  return (
    <main className="bg-slate-50 py-10 sm:py-14">
      <section className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Contacto</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Hablemos de tu mueble</h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Respondemos por WhatsApp y email para cotizar, coordinar visita y definir la mejor franja horaria.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-500">WhatsApp</p>
              <p className="mt-1 text-base font-semibold text-slate-900">{businessInfo.contact.phoneDisplay}</p>
              <Link
                href={whatsappContactHref}
                className="mt-3 inline-flex rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
              >
                Escribir ahora
              </Link>
            </article>

            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-500">Email</p>
              <p className="mt-1 text-base font-semibold text-slate-900">{businessInfo.contact.email}</p>
              <p className="mt-3 text-sm text-slate-600">También podés enviarnos fotos y medidas para una primera evaluación.</p>
            </article>
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold text-slate-900">Horarios operativos</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              {businessInfo.operationalHours.map((item) => (
                <li key={item.days}>
                  {item.days}: {item.hours}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-slate-600">Zonas de atención: {businessInfo.coverageZones.join(", ")}.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
