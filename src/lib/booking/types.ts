import type { BookingStatus } from "@/lib/booking/constants";

export type Service = {
  id: string;
  slug: string;
  name: string;
  isActive: boolean;
};

export type Booking = {
  id: string;
  serviceId: string;
  customerFullName: string;
  customerPhone: string;
  address: string;
  neighborhood: string;
  details: string;
  date: string;
  time: string;
  status: BookingStatus;
  holdUntil: string | null;
  createdAt: string;
};

export type AdminBlock = {
  id: string;
  date: string;
  time: string;
  reason: string;
};

export type AgendaSettings = {
  startHour: number;
  endHour: number;
  slotDurationMinutes: number;
};

export type AvailabilitySlot = {
  value: string;
  label: string;
  available: boolean;
  reason?: "past" | "booked" | "blocked";
};

export type CreateBookingInput = {
  fullName: string;
  phone: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  address: string;
  neighborhood: string;
  details: string;
};
