"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { businessInfo, navItems } from "@/lib/site";

function desktopLinkClass(isActive: boolean) {
  return isActive
    ? "text-sm font-semibold text-slate-900"
    : "text-sm font-medium text-slate-600 transition-colors hover:text-slate-900";
}

function mobileLinkClass(isActive: boolean) {
  return isActive
    ? "block rounded-md bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-900"
    : "block rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900";
}

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm font-semibold tracking-tight text-slate-900" onClick={() => setIsMenuOpen(false)}>
          {businessInfo.brand}
        </Link>

        <div className="hidden items-center gap-5 md:flex">
          <nav aria-label="Navegación principal">
            <ul className="flex items-center gap-4 sm:gap-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={desktopLinkClass(pathname === item.href)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            href={businessInfo.primaryCtaHref}
            className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
          >
            {businessInfo.primaryCtaLabel}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 md:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          Menú
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden" id="mobile-menu">
          <nav aria-label="Navegación móvil" className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={mobileLinkClass(pathname === item.href)}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={businessInfo.primaryCtaHref}
              className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              {businessInfo.primaryCtaLabel}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
