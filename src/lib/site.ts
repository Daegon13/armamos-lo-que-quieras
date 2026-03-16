import type { BusinessInfo, NavItem } from "@/types/site";

const configuredWhatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
const configuredPhoneDisplay = process.env.NEXT_PUBLIC_PHONE_DISPLAY;
const configuredContactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
const configuredCoverageCity = process.env.NEXT_PUBLIC_COVERAGE_CITY;

export const navItems: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Trabajos", href: "/trabajos" },
  { label: "Agenda", href: "/agenda" },
  { label: "Contacto", href: "/contacto" },
];

export const businessInfo: BusinessInfo = {
  brand: "Armamos lo que quieras",
  tagline: "Agenda automática por WhatsApp para ordenar cada trabajo",
  description:
    "Tomamos solicitudes por WhatsApp, pedimos todos los datos clave y dejamos cada visita lista para coordinar sin idas y vueltas.",
  primaryCtaLabel: "Abrir agenda",
  primaryCtaHref: "/agenda",
  contact: {
    phoneDisplay: configuredPhoneDisplay || "+54 9 11 5234-8796",
    whatsappNumber: configuredWhatsappNumber || "5491152348796",
    whatsappDefaultMessage: "Hola, quiero coordinar un servicio de armado de muebles.",
    email: configuredContactEmail || "hola@armamosloquequieras.com",
    city: configuredCoverageCity || "CABA y GBA",
  },
  operationalHours: [
    { days: "Lunes a viernes", hours: "08:00 a 21:00" },
    { days: "Sábados", hours: "08:00 a 21:00" },
  ],
  serviceHighlights: [
    "Armado de muebles en caja",
    "Instalación de estantes, bibliotecas y soportes",
    "Desarme y rearmado por mudanza",
    "Ajustes y correcciones de armado",
    "Soluciones a medida para hogar y oficina",
  ],
  coverageZones: ["CABA", "Zona Norte", "Zona Oeste", "Zona Sur"],
};

const whatsappBaseUrl = `https://wa.me/${businessInfo.contact.whatsappNumber}`;
const whatsappText = encodeURIComponent(businessInfo.contact.whatsappDefaultMessage);

export const whatsappContactHref = `${whatsappBaseUrl}?text=${whatsappText}`;

export const quickAccessItems = [
  {
    title: "Agenda",
    description: "Completá tu pedido y proponé horario desde una agenda guiada.",
    href: "/agenda",
  },
  {
    title: "Servicios",
    description: "Conocé los servicios reales que cubrimos en domicilio.",
    href: "/servicios",
  },
  {
    title: "Cobertura",
    description: `Atendemos ${businessInfo.coverageZones.join(", ")} con coordinación previa.`,
    href: "/contacto",
  },
  {
    title: "Contacto",
    description: `Escribinos por WhatsApp al ${businessInfo.contact.phoneDisplay}.`,
    href: "/contacto",
  },
] as const;
