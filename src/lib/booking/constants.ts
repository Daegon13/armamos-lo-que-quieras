export const AGENDA_START_HOUR = 8;
export const AGENDA_END_HOUR = 21;
export const HOLD_MINUTES = 15;

export const BOOKING_STATUSES = ["available", "pending", "confirmed", "blocked", "cancelled", "expired"] as const;

export type BookingStatus = (typeof BOOKING_STATUSES)[number];
