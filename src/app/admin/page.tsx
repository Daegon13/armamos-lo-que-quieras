"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type AdminBooking = {
  id: string;
  customerFullName: string;
  customerPhone: string;
  serviceName: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled" | "blocked" | "expired";
  details: string;
};

type AdminBlock = {
  id: string;
  date: string;
  time: string;
  reason: string;
};

function getTodayDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const day = `${now.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getStatusLabel(status: AdminBooking["status"]) {
  if (status === "pending") return "Pendiente";
  if (status === "confirmed") return "Confirmada";
  if (status === "cancelled") return "Cancelada";
  if (status === "blocked") return "Bloqueada";
  return "Expirada";
}

function getStatusClass(status: AdminBooking["status"]) {
  if (status === "confirmed") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (status === "pending") return "bg-amber-50 text-amber-700 border-amber-200";
  if (status === "cancelled") return "bg-rose-50 text-rose-700 border-rose-200";
  return "bg-slate-100 text-slate-700 border-slate-200";
}

export default function AdminPage() {
  const [date, setDate] = useState(getTodayDate);
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [blocks, setBlocks] = useState<AdminBlock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [blockTime, setBlockTime] = useState("08:00");
  const [blockReason, setBlockReason] = useState("");

  async function loadAgenda(selectedDate: string) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/agenda?date=${selectedDate}`, { cache: "no-store" });
      const data = (await response.json()) as { bookings?: AdminBooking[]; blocks?: AdminBlock[]; error?: string };

      if (!response.ok) {
        setError(data.error ?? "No se pudo cargar la agenda.");
        return;
      }

      setBookings(data.bookings ?? []);
      setBlocks(data.blocks ?? []);
    } catch {
      setError("No se pudo cargar la agenda.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadAgenda(date);
  }, [date]);

  async function applyBookingAction(bookingId: string, action: "confirm" | "cancel") {
    setMessage(null);
    setError(null);

    const endpoint = action === "confirm" ? "confirm" : "cancel";

    const response = await fetch(`/api/admin/bookings/${bookingId}/${endpoint}`, { method: "POST" });
    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(data.error ?? "No pudimos actualizar la solicitud.");
      return;
    }

    setMessage(action === "confirm" ? "Solicitud confirmada." : "Solicitud cancelada/liberada.");
    await loadAgenda(date);
  }

  async function handleBlockSlot(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setError(null);

    const response = await fetch("/api/admin/blocks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, time: blockTime, reason: blockReason }),
    });

    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(data.error ?? "No pudimos bloquear el horario.");
      return;
    }

    setMessage("Horario bloqueado manualmente.");
    setBlockReason("");
    await loadAgenda(date);
  }

  const hasAgendaData = useMemo(() => bookings.length > 0 || blocks.length > 0, [bookings.length, blocks.length]);

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold text-slate-900">Admin agenda (demo)</h1>
        <p className="text-sm text-slate-600">
          Operación básica: ver solicitudes por fecha, confirmar, liberar/cancelar y bloquear horarios manualmente.
        </p>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <label className="flex max-w-xs flex-col gap-1 text-sm font-medium text-slate-800">
          Fecha
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">Bloquear horario manualmente</h2>
        <form className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end" onSubmit={handleBlockSlot}>
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-800">
            Hora
            <input
              type="time"
              step={3600}
              value={blockTime}
              onChange={(event) => setBlockTime(event.target.value)}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm"
              required
            />
          </label>

          <label className="flex flex-1 flex-col gap-1 text-sm font-medium text-slate-800">
            Motivo (opcional)
            <input
              type="text"
              value={blockReason}
              onChange={(event) => setBlockReason(event.target.value)}
              placeholder="Ej: corte de luz"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </label>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Bloquear
          </button>
        </form>
      </section>

      {message ? <p className="text-sm font-medium text-emerald-700">{message}</p> : null}
      {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">Solicitudes y reservas</h2>

        {isLoading ? <p className="mt-3 text-sm text-slate-600">Cargando agenda...</p> : null}

        {!isLoading && !hasAgendaData ? <p className="mt-3 text-sm text-slate-600">Sin movimientos para esta fecha.</p> : null}

        {!isLoading && hasAgendaData ? (
          <div className="mt-4 space-y-3">
            {bookings.map((booking) => (
              <article key={booking.id} className="rounded-lg border border-slate-200 p-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {booking.time} · {booking.customerFullName}
                    </p>
                    <p className="text-sm text-slate-600">{booking.serviceName}</p>
                    <p className="text-xs text-slate-500">{booking.customerPhone}</p>
                  </div>
                  <span className={`rounded-full border px-2 py-1 text-xs font-semibold ${getStatusClass(booking.status)}`}>
                    {getStatusLabel(booking.status)}
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-700">{booking.details}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => applyBookingAction(booking.id, "confirm")}
                    disabled={booking.status === "confirmed"}
                    className="rounded-md border border-emerald-300 px-3 py-1.5 text-xs font-semibold text-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Confirmar
                  </button>
                  <button
                    type="button"
                    onClick={() => applyBookingAction(booking.id, "cancel")}
                    disabled={booking.status === "cancelled"}
                    className="rounded-md border border-rose-300 px-3 py-1.5 text-xs font-semibold text-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Liberar / Cancelar
                  </button>
                </div>
              </article>
            ))}

            {blocks.map((block) => (
              <article key={block.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-sm font-semibold text-slate-900">{block.time} · Bloqueo manual</p>
                <p className="text-sm text-slate-600">{block.reason}</p>
              </article>
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
}
