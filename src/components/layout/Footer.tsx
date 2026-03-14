import Link from "next/link";
import { businessInfo, navItems } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 text-sm text-slate-600 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="text-base font-semibold text-slate-900">{businessInfo.brand}</p>
          <p className="mt-2">{businessInfo.tagline}</p>
          <p className="mt-2">WhatsApp: {businessInfo.contact.phoneDisplay}</p>
          <p>Email: {businessInfo.contact.email}</p>
        </div>

        <div>
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
        </div>

        <div>
          <p className="font-semibold text-slate-900">Operación y cobertura</p>
          <ul className="mt-3 space-y-2">
            {businessInfo.operationalHours.map((item) => (
              <li key={item.days}>
                {item.days}: {item.hours}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-slate-700">Zonas: {businessInfo.coverageZones.join(", ")}</p>
        </div>
      </div>
    </footer>
  );
}
