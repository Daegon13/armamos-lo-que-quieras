import type { AvailabilitySlot } from "@/lib/booking/types";

export type TimeSlot = AvailabilitySlot;

export async function getAgendaAvailability(date: string): Promise<TimeSlot[]> {
  const response = await fetch(`/api/availability?date=${encodeURIComponent(date)}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("AVAILABILITY_FETCH_ERROR");
  }

  const data = (await response.json()) as { slots: TimeSlot[] };
  return data.slots ?? [];
}
