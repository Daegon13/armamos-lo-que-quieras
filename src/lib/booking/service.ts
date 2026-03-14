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
    public readonly code: "VALIDATION_ERROR" | "SLOT_UNAVAILABLE" | "BACKEND_UNAVAILABLE",
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

const NAME_REGEX = /^[a-záéíóúüñ\s'.-]+$/i;
const PHONE_REGEX = /^\+?[\d\s()-]+$/;
const ADDRESS_REGEX = /^[a-záéíóúüñ\d\s.,#°/-]+$/i;
const NEIGHBORHOOD_REGEX = /^[a-záéíóúüñ\d\s'.-]+$/i;

function validateCreateBookingInput(input: CreateBookingInput): string | null {
  const fullName = input.fullName.trim();
  const phone = input.phone.trim();
  const serviceType = input.serviceType.trim();
  const address = input.address.trim();
  const neighborhood = input.neighborhood.trim();
  const details = input.details.trim();

  if (!fullName) {
    return "Ingresá tu nombre completo.";
  }

  if (fullName.length < 3 || !NAME_REGEX.test(fullName)) {
    return "Ingresá un nombre válido para continuar.";
  }

  if (!phone) {
    return "Ingresá un teléfono de contacto.";
  }

  if (!PHONE_REGEX.test(phone)) {
    return "El teléfono ingresado no tiene un formato válido.";
  }

  const phoneDigits = phone.replace(/\D/g, "");
  if (phoneDigits.length < 8 || phoneDigits.length > 15) {
    return "El teléfono debe tener entre 8 y 15 dígitos.";
  }

  if (!serviceType) {
    return "Debés seleccionar un tipo de servicio.";
  }

  if (!isValidDateInput(input.preferredDate)) {
    return "La fecha es inválida.";
  }

  if (!isTimeWithinAgenda(input.preferredTime)) {
    return "La hora elegida está fuera del rango operativo (08:00 a 21:00).";
  }

  if (!address) {
    return "Ingresá la dirección del domicilio.";
  }

  if (address.length < 6 || !ADDRESS_REGEX.test(address)) {
    return "Ingresá una dirección válida (calle y altura).";
  }

  if (!neighborhood) {
    return "Indicá tu barrio o zona.";
  }

  if (neighborhood.length < 3 || !NEIGHBORHOOD_REGEX.test(neighborhood)) {
    return "Ingresá un barrio o zona válido.";
  }

  if (!details || details.length < 10) {
    return "Contanos más detalles del trabajo para evaluar tu solicitud.";
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
    } catch (error) {
      if (error instanceof Error && error.message === "El horario seleccionado ya no está disponible.") {
        throw new BookingRequestError("El horario seleccionado ya no está disponible.", 409, "SLOT_UNAVAILABLE");
      }

      throw new BookingRequestError(
        "No pudimos procesar la solicitud en este momento. Intentá nuevamente en unos minutos.",
        503,
        "BACKEND_UNAVAILABLE",
      );
    }

    return { booking, service };
  });
}

export async function listActiveServices() {
  const store = getBookingStore();
  return store.listServices();
}
