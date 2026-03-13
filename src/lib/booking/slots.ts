import { AGENDA_END_HOUR, AGENDA_START_HOUR } from "@/lib/booking/constants";
import type { AvailabilitySlot } from "@/lib/booking/types";

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export function isValidDateInput(date: string): boolean {
  if (!DATE_REGEX.test(date)) {
    return false;
  }

  const parsed = new Date(`${date}T00:00:00`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().startsWith(date);
}

export function formatHour(hour: number): string {
  return `${String(hour).padStart(2, "0")}:00`;
}

export function buildBaseSlots(): AvailabilitySlot[] {
  return Array.from({ length: AGENDA_END_HOUR - AGENDA_START_HOUR + 1 }, (_, index) => {
    const hour = AGENDA_START_HOUR + index;
    const value = formatHour(hour);

    return {
      value,
      label: value,
      available: true,
    };
  });
}

export function isPastDate(date: string, now = new Date()): boolean {
  const today = now.toISOString().slice(0, 10);
  return date < today;
}

export function isPastSlot(date: string, time: string, now = new Date()): boolean {
  const slotDateTime = new Date(`${date}T${time}:00`);
  return slotDateTime.getTime() <= now.getTime();
}

export function isTimeWithinAgenda(time: string): boolean {
  const [hours, minutes] = time.split(":").map(Number);

  if (!Number.isInteger(hours) || !Number.isInteger(minutes) || minutes !== 0) {
    return false;
  }

  return hours >= AGENDA_START_HOUR && hours <= AGENDA_END_HOUR;
}
