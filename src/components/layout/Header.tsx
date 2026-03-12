import Link from "next/link";
import { businessInfo, navItems } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
        <Link href="#inicio" className="text-sm font-semibold tracking-tight text-slate-900">
          {businessInfo.brand}
        </Link>

        <nav aria-label="Navegación principal">
          <ul className="flex items-center gap-4 sm:gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="hidden rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-600 sm:block">
          {businessInfo.serviceArea}
        </p>
      </div>
    </header>
  );
}
