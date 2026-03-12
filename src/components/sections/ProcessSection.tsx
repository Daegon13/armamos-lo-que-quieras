const steps = [
  {
    title: "1. Coordinación",
    description: "Definimos tipo de mueble, ubicación y franja horaria disponible.",
  },
  {
    title: "2. Armado",
    description: "Realizamos el armado con herramientas adecuadas y cuidado del ambiente.",
  },
  {
    title: "3. Entrega final",
    description: "Verificación conjunta de estabilidad, terminaciones y limpieza del área.",
  },
];

export function ProcessSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Cómo trabajamos</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Proceso simple, claro y profesional
          </h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <article key={step.title} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-base font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
