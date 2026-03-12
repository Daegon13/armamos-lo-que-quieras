import Link from "next/link";
import { businessInfo, navItems } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 text-sm text-slate-600 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
        <section>
          <p className="text-base font-semibold text-slate-900">{businessInfo.brand}</p>
          <p className="mt-2 max-w-xs leading-relaxed">{businessInfo.tagline}</p>
          <Link
            href="/agenda"
            className="mt-4 inline-flex rounded-md bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-700"
          >
            Reservar horario
          </Link>
        </section>

        <nav aria-label="Navegación del pie de página">
          <p className="font-semibold text-slate-900">Navegación</p>
          <ul className="mt-3 space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-slate-900">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section>
          <p className="font-semibold text-slate-900">Contacto</p>
          <ul className="mt-3 space-y-2">
            <li>WhatsApp: {businessInfo.phoneDisplay}</li>
            <li>Email: {businessInfo.emailDisplay}</li>
            <li>Zona de cobertura: {businessInfo.serviceArea}</li>
          </ul>
        </section>
      </div>
    </footer>
  );
}
