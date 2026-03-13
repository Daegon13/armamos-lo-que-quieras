import { randomUUID } from "crypto";
import { HOLD_MINUTES } from "@/lib/booking/constants";
import type { AdminBlock, Booking, CreateBookingInput, Service } from "@/lib/booking/types";
import { INITIAL_SERVICES } from "@/lib/services/catalog";

type BookingStore = {
  listServices: () => Promise<Service[]>;
  findServiceByName: (name: string) => Promise<Service | undefined>;
  listBookingsByDate: (date: string) => Promise<Booking[]>;
  listAdminBlocksByDate: (date: string) => Promise<AdminBlock[]>;
  createPendingBooking: (input: CreateBookingInput, service: Service, now: Date) => Promise<Booking>;
};

type MemoryState = {
  services: Service[];
  bookings: Booking[];
  adminBlocks: AdminBlock[];
};

const globalState = globalThis as typeof globalThis & { __bookingMemoryState?: MemoryState };

function getMemoryState(): MemoryState {
  if (!globalState.__bookingMemoryState) {
    globalState.__bookingMemoryState = {
      services: [...INITIAL_SERVICES],
      bookings: [],
      adminBlocks: [],
    };
  }

  return globalState.__bookingMemoryState;
}

function createMemoryStore(): BookingStore {
  return {
    async listServices() {
      return getMemoryState().services.filter((service) => service.isActive);
    },
    async findServiceByName(name: string) {
      return getMemoryState().services.find((service) => service.name === name && service.isActive);
    },
    async listBookingsByDate(date: string) {
      return getMemoryState().bookings.filter((booking) => booking.date === date);
    },
    async listAdminBlocksByDate(date: string) {
      return getMemoryState().adminBlocks.filter((block) => block.date === date);
    },
    async createPendingBooking(input, service, now) {
      const conflictingBooking = getMemoryState().bookings.find((booking) => {
        if (booking.date !== input.preferredDate || booking.time !== input.preferredTime) {
          return false;
        }

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
      });

      if (conflictingBooking) {
        throw new Error("El horario seleccionado ya no está disponible.");
      }

      const holdUntil = new Date(now.getTime() + HOLD_MINUTES * 60_000).toISOString();
      const booking: Booking = {
        id: randomUUID(),
        serviceId: service.id,
        customerFullName: input.fullName.trim(),
        customerPhone: input.phone.trim(),
        address: input.address.trim(),
        neighborhood: input.neighborhood.trim(),
        details: input.details.trim(),
        date: input.preferredDate,
        time: input.preferredTime,
        status: "pending",
        holdUntil,
        createdAt: now.toISOString(),
      };

      getMemoryState().bookings.push(booking);

      return booking;
    },
  };
}

function createPostgresStore(): BookingStore {
  // Placeholder intencional: cuando DATABASE_URL exista, este módulo puede migrar
  // a un repositorio real Postgres sin cambiar la capa de dominio.
  return createMemoryStore();
}

const store = process.env.DATABASE_URL ? createPostgresStore() : createMemoryStore();

export function getBookingStore(): BookingStore {
  return store;
}
