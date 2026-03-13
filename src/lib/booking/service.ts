import { getBookingStore } from "@/lib/db/store";
import type { AvailabilitySlot, Booking, CreateBookingInput } from "@/lib/booking/types";
import {
  buildBaseSlots,
  isPastDate,
  isPastSlot,
  isTimeWithinAgenda,
  isValidDateInput,
  toLocalDateString,
} from "@/lib/booking/slots";

const slotLocks = new Map<string, Promise<void>>();

export class BookingRequestError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code: "VALIDATION_ERROR" | "SLOT_UNAVAILABLE",
  ) {
    super(message);
  }
}

async function withSlotLock<T>(slotKey: string, operation: () => Promise<T>): Promise<T> {
  const previous = slotLocks.get(slotKey) ?? Promise.resolve();
  let release: () => void;

  const current = new Promise<void>((resolve) => {
    release = resolve;
  });

  slotLocks.set(slotKey, previous.then(() => current));

  await previous;

  try {
    return await operation();
  } finally {
    release!();

    if (slotLocks.get(slotKey) === current) {
      slotLocks.delete(slotKey);
    }
  }
}

function isBlockingBooking(booking: Booking, now: Date): boolean {
  if (booking.status === "confirmed") {
    return true;
  }

  if (booking.status !== "pending") {
    return false;
  }

  if (!booking.holdUntil) {
    return true;
  }

  return new Date(booking.holdUntil).getTime() > now.getTime();
}

export async function getAvailabilityByDate(date: string): Promise<AvailabilitySlot[]> {
  if (!isValidDateInput(date)) {
    throw new Error("INVALID_DATE");
  }

  const now = new Date();

  if (isPastDate(date, now)) {
    return buildBaseSlots().map((slot) => ({ ...slot, available: false, reason: "past" }));
  }

  const store = getBookingStore();
  const [bookings, blocks] = await Promise.all([store.listBookingsByDate(date), store.listAdminBlocksByDate(date)]);

  const unavailableBookingTimes = new Set(
    bookings.filter((booking) => isBlockingBooking(booking, now)).map((booking) => booking.time),
  );

  const blockedTimes = new Set(blocks.map((block) => block.time));

  return buildBaseSlots().map((slot) => {
    if (isPastSlot(date, slot.value, now)) {
      return { ...slot, available: false, reason: "past" };
    }

    if (blockedTimes.has(slot.value)) {
      return { ...slot, available: false, reason: "blocked" };
    }

    if (unavailableBookingTimes.has(slot.value)) {
      return { ...slot, available: false, reason: "booked" };
    }

    return slot;
  });
}

function validateCreateBookingInput(input: CreateBookingInput): string | null {
  if (
    !input.fullName.trim() ||
    !input.phone.trim() ||
    !input.address.trim() ||
    !input.neighborhood.trim() ||
    !input.details.trim()
  ) {
    return "Faltan campos obligatorios.";
  }

  if (!isValidDateInput(input.preferredDate)) {
    return "La fecha es inválida.";
  }

  if (!isTimeWithinAgenda(input.preferredTime)) {
    return "La hora debe estar entre 08:00 y 21:00.";
  }

  if (!input.serviceType.trim()) {
    return "Debés seleccionar un tipo de servicio.";
  }

  const now = new Date();
  if (input.preferredDate < toLocalDateString(now)) {
    return "No se aceptan solicitudes en fechas pasadas.";
  }

  if (isPastSlot(input.preferredDate, input.preferredTime, now)) {
    return "No se aceptan solicitudes en horarios pasados.";
  }

  return null;
}

export async function createPendingBooking(input: CreateBookingInput) {
  const validationError = validateCreateBookingInput(input);

  if (validationError) {
    throw new BookingRequestError(validationError, 422, "VALIDATION_ERROR");
  }

  const slotKey = `${input.preferredDate}_${input.preferredTime}`;

  return withSlotLock(slotKey, async () => {
    const store = getBookingStore();
    const service = await store.findServiceByName(input.serviceType);

    if (!service) {
      throw new BookingRequestError("El servicio elegido no existe o no está disponible.", 422, "VALIDATION_ERROR");
    }

    const availability = await getAvailabilityByDate(input.preferredDate);
    const selectedSlot = availability.find((slot) => slot.value === input.preferredTime);

    if (!selectedSlot?.available) {
      throw new BookingRequestError("El horario seleccionado ya no está disponible.", 409, "SLOT_UNAVAILABLE");
    }

    let booking;

    try {
      booking = await store.createPendingBooking(input, service, new Date());
    } catch {
      throw new BookingRequestError("El horario seleccionado ya no está disponible.", 409, "SLOT_UNAVAILABLE");
    }

    return { booking, service };
  });
}

export async function listActiveServices() {
  const store = getBookingStore();
  return store.listServices();
}
