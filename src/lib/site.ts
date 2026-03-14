import type { BusinessInfo, NavItem } from "@/types/site";

const configuredWhatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

export const navItems: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Trabajos", href: "/trabajos" },
  { label: "Agenda", href: "/agenda" },
  { label: "Contacto", href: "/contacto" },
];

export const businessInfo: BusinessInfo = {
  brand: "Armamos lo que quieras",
  tagline: "Armado e instalación de muebles a domicilio en CABA y GBA",
  description:
    "Resolvemos armado, instalación y ajustes de muebles para hogares y oficinas con visita coordinada y atención por WhatsApp.",
  primaryCtaLabel: "Agendar por WhatsApp",
  primaryCtaHref: "/agenda",
  contact: {
    phoneDisplay: "+54 9 11 0000-0000",
    whatsappNumber: configuredWhatsappNumber || "5491100000000",
    whatsappDefaultMessage: "Hola, quiero coordinar un servicio de armado de muebles.",
    email: "hola@armamosloquequieras.com",
    city: "CABA y GBA",
  },
  operationalHours: [
    { days: "Lunes a viernes", hours: "08:00 a 21:00" },
    { days: "Sábados", hours: "09:00 a 18:00" },
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

export const whatsappPlaceholderHref = `${whatsappBaseUrl}?text=${whatsappText}`;

export const quickAccessItems = [
  {
    title: "Servicios",
    description: "Conocé los servicios reales que cubrimos en domicilio.",
    href: "/servicios",
  },
  {
    title: "Agenda",
    description: "Elegí fecha y horario operativo para tu visita.",
    href: "/agenda",
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
