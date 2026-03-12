"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { businessInfo, navItems } from "@/lib/site";

const desktopLinkClass =
  "text-sm font-medium text-slate-600 transition-colors hover:text-slate-900";
const desktopLinkActiveClass = "text-sm font-medium text-slate-900 transition-colors";
const mobileLinkClass =
  "rounded-md px-2 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900";
const mobileLinkActiveClass =
  "rounded-md bg-slate-100 px-2 py-2 text-sm font-medium text-slate-900 transition-colors";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-slate-900"
            onClick={closeMenu}
          >
            {businessInfo.brand}
          </Link>

          <nav aria-label="Navegación principal" className="hidden items-center gap-6 md:flex">
                  className={isActive ? desktopLinkActiveClass : desktopLinkClass}
        {isMenuOpen && (
                    className={isActive ? mobileLinkActiveClass : mobileLinkClass}

        )}

          <div className="flex items-center gap-2">
            <Link
              href="/agenda"
              className="hidden rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700 sm:inline-flex"
            >
              Reservar horario
            </Link>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 p-2 text-slate-700 md:hidden"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-main-menu"
              aria-label="Abrir menú"
              onClick={() => setIsMenuOpen((previous) => !previous)}
            >
              <span className="sr-only">Menú</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                {isMenuOpen ? (
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm1 4a1 1 0 100 2h12a1 1 0 100-2H4z"
                    clipRule="evenodd"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen ? (
          <div id="mobile-main-menu" className="mt-3 space-y-2 border-t border-slate-200 pt-3 md:hidden">
            <nav aria-label="Navegación móvil" className="flex flex-col gap-1">
                    onClick={closeMenu}
                    className={
                        ? "rounded-md bg-slate-100 px-2 py-2 text-sm font-medium text-slate-900 transition-colors"
                        : "rounded-md px-2 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
                    }
            <Link
              href="/agenda"
              className="inline-flex w-full items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
              onClick={closeMenu}
            >
              Reservar horario
            </Link>
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/agenda"
              className="inline-flex w-full items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Reservar horario
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}
