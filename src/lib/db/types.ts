import type { AdminBlock, Booking, CreateBookingInput, Service } from "@/lib/booking/types";

export type BookingStore = {
  listServices: () => Promise<Service[]>;
  findServiceByName: (name: string) => Promise<Service | undefined>;
  listBookingsByDate: (date: string) => Promise<Booking[]>;
  listAdminBlocksByDate: (date: string) => Promise<AdminBlock[]>;
  createPendingBooking: (input: CreateBookingInput, service: Service, now: Date) => Promise<Booking>;
};
