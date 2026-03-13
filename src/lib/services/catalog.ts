import type { Service } from "@/lib/booking/types";

export const INITIAL_SERVICES: Service[] = [
  { id: "svc_armado", slug: "armado-de-muebles", name: "Armado de muebles", isActive: true },
  { id: "svc_instalacion", slug: "instalacion-colocacion", name: "Instalación / colocación", isActive: true },
  { id: "svc_desarme", slug: "desarme-rearmado", name: "Desarme y rearmado", isActive: true },
  { id: "svc_correccion", slug: "correccion-armado", name: "Corrección de armado", isActive: true },
  { id: "svc_especial", slug: "trabajo-especial", name: "Trabajo especial", isActive: true },
];
