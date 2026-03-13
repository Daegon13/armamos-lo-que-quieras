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
  tagline: "Armado e instalación de muebles a domicilio",
  description:
    "Servicio profesional para armar e instalar muebles en hogares y espacios de trabajo.",
  primaryCtaLabel: "Reservar horario",
  primaryCtaHref: "/agenda",
  contact: {
    phoneDisplay: "+54 9 11 0000-0000",
    whatsappNumber: configuredWhatsappNumber || "5491100000000",
    email: "hola@armamosloquequieras.com",
    city: "CABA y GBA",
  },
};

export const whatsappPlaceholderHref = "/contacto";
