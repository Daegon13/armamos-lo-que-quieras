# Regresión visual móvil de CTAs

## Objetivo
Evitar que un estilo global de links vuelva a sobrescribir colores explícitos de Tailwind en CTAs.

## Escenarios a validar
1. Home (`/`): CTA principal "Reservar horario" con `bg-slate-900` y texto blanco.
2. Header (`/`): CTA desktop/mobile "Reservar horario" con `bg-slate-900` y texto blanco.
3. Agenda (`/agenda`): CTA de éxito "Abrir WhatsApp ahora" con `bg-emerald-700` y texto blanco.

## Capturas de referencia (mobile)
Se generaron capturas en viewport móvil (`390x844`) para tema claro y oscuro del navegador:

- Home, claro.
- Home, oscuro.
- Agenda (estado éxito con CTA WhatsApp), claro.
- Agenda (estado éxito con CTA WhatsApp), oscuro.

> Nota: para capturar el estado de éxito de agenda se mockearon `/api/services`, `/api/availability` y `POST /api/bookings`.

## Criterio de aceptación
- Texto de CTA legible sobre `bg-slate-900` y `bg-emerald-700` en ambos esquemas (claro/oscuro del navegador).
- No hay herencia accidental de color desde reglas globales de `<a>`.
