"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useAgendaAvailability } from "@/hooks/useAgendaAvailability";

const FALLBACK_SERVICE_OPTIONS = [
  "Armado de muebles",
  "Instalación / colocación",
  "Desarme y rearmado",
  "Corrección de armado",
  "Trabajo especial",
] as const;

type FormValues = {
  fullName: string;
  phone: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  address: string;
  neighborhood: string;
  details: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type ApiService = {
  id: string;
  name: string;
};

const INITIAL_VALUES: FormValues = {
  fullName: "",
  phone: "",
  serviceType: "",
  preferredDate: "",
  preferredTime: "",
  address: "",
  neighborhood: "",
  details: "",
};

function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Ingresá tu nombre completo.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Ingresá un teléfono de contacto.";
  } else if (values.phone.replace(/\D/g, "").length < 8) {
    errors.phone = "El teléfono parece incompleto.";
  }

  if (!values.serviceType) {
    errors.serviceType = "Seleccioná el tipo de servicio.";
  }

  if (!values.preferredDate) {
    errors.preferredDate = "Elegí una fecha deseada.";
  }

  if (!values.preferredTime) {
    errors.preferredTime = "Elegí una franja horaria.";
  }

  if (!values.address.trim()) {
    errors.address = "Ingresá la dirección del domicilio.";
  }

  if (!values.neighborhood.trim()) {
    errors.neighborhood = "Indicá tu barrio o zona.";
  }

  if (!values.details.trim()) {
    errors.details = "Contanos brevemente qué necesitás resolver.";
  }

  return errors;
}

export default function AgendaPage() {
  const [formValues, setFormValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [serviceOptions, setServiceOptions] = useState<string[]>([...FALLBACK_SERVICE_OPTIONS]);

  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  const { isLoading, slots, error: availabilityError } = useAgendaAvailability(formValues.preferredDate);

  const availableSlots = useMemo(() => slots.filter((slot) => slot.available), [slots]);

  useEffect(() => {
    let mounted = true;

    async function loadServices() {
      try {
        const response = await fetch("/api/services", { cache: "no-store" });

        if (!response.ok || !mounted) {
          return;
        }

        const data = (await response.json()) as { services?: ApiService[] };
        const names = data.services?.map((service) => service.name).filter(Boolean);

        if (names && names.length > 0) {
          setServiceOptions(names);
        }
      } catch {
        // fallback silencioso al catálogo local.
      }
    }

    loadServices();

    return () => {
      mounted = false;
    };
  }, []);

  const handleChange = (field: keyof FormValues, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "preferredDate" ? { preferredTime: "" } : {}),
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
      ...(field === "preferredDate" ? { preferredTime: undefined } : {}),
    }));

    setSuccessMessage(null);
    setSubmitError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm(formValues);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSuccessMessage(null);
      setSubmitError(null);
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage(null);
    setSubmitError(null);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setSubmitError(data.error ?? "No pudimos registrar tu solicitud. Intentá nuevamente.");
        return;
      }

      setErrors({});
      setSuccessMessage(
        "Recibimos tu solicitud. El horario elegido quedó en estado pendiente y sujeto a confirmación operativa.",
      );
      setFormValues(INITIAL_VALUES);
    } catch {
      setSubmitError("No pudimos registrar tu solicitud. Revisá tu conexión e intentá nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-slate-50 pb-16 pt-8 sm:pb-20 sm:pt-12">
      <section className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Reserva tu visita</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Agenda tu servicio</h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Completá este formulario y coordinamos la mejor opción para resolver tu trabajo a domicilio.
          </p>
          <p className="mt-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
            Todas las solicitudes quedan sujetas a confirmación final.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
            <Field
              id="fullName"
              label="Nombre completo"
              value={formValues.fullName}
              error={errors.fullName}
              onChange={(value) => handleChange("fullName", value)}
              autoComplete="name"
            />

            <Field
              id="phone"
              label="Teléfono"
              value={formValues.phone}
              error={errors.phone}
              onChange={(value) => handleChange("phone", value)}
              inputMode="tel"
              autoComplete="tel"
            />

            <div>
              <label htmlFor="serviceType" className="mb-1 block text-sm font-medium text-slate-700">
                Tipo de servicio
              </label>
              <select
                id="serviceType"
                value={formValues.serviceType}
                onChange={(event) => handleChange("serviceType", event.target.value)}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
              >
                <option value="">Seleccioná una opción</option>
                {serviceOptions.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
              {errors.serviceType && <p className="mt-1 text-xs text-rose-600">{errors.serviceType}</p>}
            </div>

            <div>
              <label htmlFor="preferredDate" className="mb-1 block text-sm font-medium text-slate-700">
                Fecha deseada
              </label>
              <input
                id="preferredDate"
                type="date"
                value={formValues.preferredDate}
                onChange={(event) => handleChange("preferredDate", event.target.value)}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
                min={minDate}
              />
              {errors.preferredDate && <p className="mt-1 text-xs text-rose-600">{errors.preferredDate}</p>}
            </div>

            <div>
              <p className="mb-1 block text-sm font-medium text-slate-700">Hora deseada</p>

              {!formValues.preferredDate && (
                <p className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
                  Elegí una fecha para ver horarios disponibles entre 08:00 y 21:00.
                </p>
              )}

              {formValues.preferredDate && isLoading && (
                <p className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
                  Cargando disponibilidad...
                </p>
              )}

              {availabilityError && (
                <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                  {availabilityError}
                </p>
              )}

              {formValues.preferredDate && !isLoading && !availabilityError && availableSlots.length === 0 && (
                <p className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
                  No hay bloques disponibles para esta fecha por ahora. Probá otra fecha.
                </p>
              )}

              {formValues.preferredDate && !isLoading && !availabilityError && availableSlots.length > 0 && (
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {availableSlots.map((slot) => {
                    const isSelected = slot.value === formValues.preferredTime;

                    return (
                      <button
                        key={slot.value}
                        type="button"
                        onClick={() => handleChange("preferredTime", slot.value)}
                        className={`rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                          isSelected
                            ? "border-slate-900 bg-slate-900 text-white"
                            : "border-slate-300 bg-white text-slate-700 hover:border-slate-500"
                        }`}
                      >
                        {slot.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {errors.preferredTime && <p className="mt-1 text-xs text-rose-600">{errors.preferredTime}</p>}
            </div>

            <Field
              id="address"
              label="Dirección del domicilio"
              value={formValues.address}
              error={errors.address}
              onChange={(value) => handleChange("address", value)}
              autoComplete="street-address"
            />

            <Field
              id="neighborhood"
              label="Barrio / zona"
              value={formValues.neighborhood}
              error={errors.neighborhood}
              onChange={(value) => handleChange("neighborhood", value)}
            />

            <div>
              <label htmlFor="details" className="mb-1 block text-sm font-medium text-slate-700">
                Detalles del trabajo
              </label>
              <textarea
                id="details"
                value={formValues.details}
                onChange={(event) => handleChange("details", event.target.value)}
                rows={4}
                placeholder="Ejemplo: necesito armar un placard y fijar una biblioteca a pared."
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
              />
              {errors.details && <p className="mt-1 text-xs text-rose-600">{errors.details}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {isSubmitting ? "Enviando solicitud..." : "Solicitar agenda"}
            </button>

            {submitError && (
              <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700" aria-live="polite">
                {submitError}
              </p>
            )}

            {successMessage && (
              <p
                className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
                aria-live="polite"
              >
                {successMessage}
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email" | "url" | "numeric" | "decimal" | "search";
};

function Field({ id, label, value, onChange, error, autoComplete, inputMode = "text" }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
      />
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </div>
  );
}
