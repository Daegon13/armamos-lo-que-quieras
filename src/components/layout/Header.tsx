"use client";

import { useState } from "react";
import Link from "next/link";
import { businessInfo, navItems } from "@/lib/site";

function getDesktopLinkClass(isActive: boolean) {
  return isActive
    ? "text-sm font-semibold text-slate-900"
    : "text-sm font-medium text-slate-600 transition-colors hover:text-slate-900";
}

function getMobileLinkClass(isActive: boolean) {
  return isActive
    ? "block rounded-md bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-900"
    : "block rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900";
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
        <Link href="#inicio" className="text-sm font-semibold tracking-tight text-slate-900">
          {businessInfo.brand}
        </Link>

        <button
          type="button"
          className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 md:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          Menú
        </button>

        <nav aria-label="Navegación principal" className="hidden md:block">
          <ul className="flex items-center gap-4 sm:gap-6">
            {navItems.map((item) => {
              const isActive = item.href === "#inicio";

              return (
                <li key={item.href}>
                  <Link href={item.href} className={getDesktopLinkClass(isActive)}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <p className="hidden rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-600 sm:block">
          {businessInfo.serviceArea}
        </p>
      </div>

      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden" id="mobile-menu">
          <nav aria-label="Navegación móvil" className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = item.href === "#inicio";

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={getMobileLinkClass(isActive)}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
