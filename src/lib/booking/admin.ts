import { getBookingStore } from "@/lib/db/store";
import { isTimeWithinAgenda, isValidDateInput } from "@/lib/booking/slots";

export class AdminRequestError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
  }
}

export async function getAdminAgendaByDate(date: string) {
  if (!isValidDateInput(date)) {
    throw new AdminRequestError("Fecha inválida.", 422);
  }

  const store = getBookingStore();
  const [bookings, blocks] = await Promise.all([store.listBookingsByDate(date), store.listAdminBlocksByDate(date)]);

  const services = await store.listServices();
  const serviceMap = new Map(services.map((service) => [service.id, service.name]));

  return {
    date,
    bookings: bookings
      .sort((a, b) => a.time.localeCompare(b.time))
      .map((booking) => ({
        ...booking,
        serviceName: serviceMap.get(booking.serviceId) ?? "Servicio",
      })),
    blocks: blocks.sort((a, b) => a.time.localeCompare(b.time)),
  };
}

export async function confirmBooking(bookingId: string) {
  if (!bookingId) {
    throw new AdminRequestError("Reserva inválida.", 422);
  }

  const store = getBookingStore();
  const booking = await store.updateBookingStatus(bookingId, "confirmed");

  if (!booking) {
    throw new AdminRequestError("No encontramos la reserva indicada.", 404);
  }

  return booking;
}

export async function cancelBooking(bookingId: string) {
  if (!bookingId) {
    throw new AdminRequestError("Reserva inválida.", 422);
  }

  const store = getBookingStore();
  const booking = await store.updateBookingStatus(bookingId, "cancelled");

  if (!booking) {
    throw new AdminRequestError("No encontramos la reserva indicada.", 404);
  }

  return booking;
}

export async function blockSlot(input: { date: string; time: string; reason?: string }) {
  if (!isValidDateInput(input.date)) {
    throw new AdminRequestError("Fecha inválida.", 422);
  }

  if (!isTimeWithinAgenda(input.time)) {
    throw new AdminRequestError("Horario inválido para la agenda.", 422);
  }

  const reason = input.reason?.trim() || "Bloqueo manual";

  const store = getBookingStore();
  await store.createAdminBlock(
    {
      date: input.date,
      time: input.time,
      reason,
    },
    new Date(),
  );

  return { date: input.date, time: input.time, reason };
}
