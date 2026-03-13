# Estado backend de agenda (patch cierre)

## Garantía actual
- El sistema usa lock por slot en capa de dominio y revalidación de disponibilidad antes de crear booking.
- El store en memoria vuelve a validar conflicto al persistir para rechazar dobles tomas del mismo bloque horario (`pending` vigente o `confirmed`).

## Alcance de la garantía
- La protección actual es adecuada para demo/desarrollo y proceso único.
- No reemplaza una garantía distribuida entre múltiples instancias.

## Camino a producción (Vercel + Postgres)
- Implementar adapter Postgres real en `src/lib/db/postgres.ts`.
- Agregar índice único parcial por `(date, time)` para estados activos (`pending`, `confirmed`).
- Ejecutar creación dentro de transacción para evitar carreras concurrentes.

## Estrategia graceful
- Si no hay implementación Postgres real, el sistema usa fallback en memoria para no romper build ni ejecución local.
