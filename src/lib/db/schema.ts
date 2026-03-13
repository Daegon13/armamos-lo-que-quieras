/**
 * Esquema lógico preparado para migrar a Postgres (Vercel).
 *
 * Tablas previstas:
 * - services
 * - bookings
 * - admin_blocks
 * - settings
 *
 * Restricción clave recomendada en producción:
 * unique(date, time) for bookings where status in ('pending', 'confirmed')
 */

export type DbServiceRow = {
  id: string;
  slug: string;
  name: string;
  is_active: boolean;
  created_at: string;
};

export type DbBookingRow = {
  id: string;
  service_id: string;
  customer_full_name: string;
  customer_phone: string;
  address: string;
  neighborhood: string;
  details: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "blocked" | "expired";
  hold_until: string | null;
  created_at: string;
};

export type DbAdminBlockRow = {
  id: string;
  date: string;
  time: string;
  reason: string;
  created_at: string;
};

export type DbSettingRow = {
  key: string;
  value: string;
  updated_at: string;
};
