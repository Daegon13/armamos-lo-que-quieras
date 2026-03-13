import type { BookingStore } from "@/lib/db/types";

type CreatePostgresStoreOptions = {
  fallbackStore: BookingStore;
};

const globalState = globalThis as typeof globalThis & { __postgresFallbackWarningShown?: boolean };

/**
 * Punto de extensión para reemplazar el fallback por un repositorio Postgres real.
 *
 * Objetivo en producción:
 * - transacción en creación de booking;
 * - índice único parcial por (date, time) para status activos (pending, confirmed).
 */
export function createPostgresStore({ fallbackStore }: CreatePostgresStoreOptions): BookingStore {
  // Estrategia graceful actual: si hay DATABASE_URL pero todavía no existe implementación
  // real, continuar con memoria para no romper el entorno de desarrollo/demo.
  if (!globalState.__postgresFallbackWarningShown) {
    console.warn(
      "[booking] DATABASE_URL detectada pero el adapter Postgres aún no está implementado. Se usa fallback en memoria.",
    );
    globalState.__postgresFallbackWarningShown = true;
  }

  return fallbackStore;
}
