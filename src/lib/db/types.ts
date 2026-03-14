import type { AdminBlock, Booking, CreateBookingInput, Service } from "@/lib/booking/types";

export type BookingStore = {
  listServices: () => Promise<Service[]>;
  findServiceByName: (name: string) => Promise<Service | undefined>;
  findServiceById: (id: string) => Promise<Service | undefined>;
  listBookingsByDate: (date: string) => Promise<Booking[]>;
  listAdminBlocksByDate: (date: string) => Promise<AdminBlock[]>;
  createPendingBooking: (input: CreateBookingInput, service: Service, now: Date) => Promise<Booking>;
  updateBookingStatus: (bookingId: string, status: Booking["status"]) => Promise<Booking | null>;
  createAdminBlock: (input: { date: string; time: string; reason: string }, now: Date) => Promise<AdminBlock>;
};
