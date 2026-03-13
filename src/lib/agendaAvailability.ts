export type TimeSlot = {
  value: string;
  label: string;
  available: boolean;
};

const START_HOUR = 8;
const END_HOUR = 21;

const MOCK_UNAVAILABLE_BY_DATE: Record<string, string[]> = {
  "2026-03-14": ["10:00", "11:00", "17:00"],
  "2026-03-15": ["08:00", "09:00", "20:00"],
};

function formatHour(hour: number) {
  return `${String(hour).padStart(2, "0")}:00`;
}

export function buildBaseTimeSlots(): TimeSlot[] {
  return Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, index) => {
    const hour = START_HOUR + index;
    const value = formatHour(hour);

    return {
      value,
      label: value,
      available: true,
    };
  });
}

export async function getAgendaAvailability(date: string): Promise<TimeSlot[]> {
  await new Promise((resolve) => setTimeout(resolve, 350));

  const unavailableSlots = MOCK_UNAVAILABLE_BY_DATE[date] ?? [];

  return buildBaseTimeSlots().map((slot) => ({
    ...slot,
    available: !unavailableSlots.includes(slot.value),
  }));
}
