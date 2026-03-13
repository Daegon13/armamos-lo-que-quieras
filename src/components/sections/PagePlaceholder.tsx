import Link from "next/link";

type PagePlaceholderProps = {
  title: string;
  description: string;
};

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-2xl rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Página en preparación</p>
          <h1 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">{title}</h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
            >
              Volver al inicio
            </Link>
            <Link
              href="/agenda"
              className="inline-flex items-center rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-white"
            >
              Ir a agenda
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
