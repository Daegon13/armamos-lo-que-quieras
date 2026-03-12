import type { BusinessInfo, NavItem } from "@/types/site";

export const businessInfo: BusinessInfo = {
  brand: "Armamos lo que quieras",
  tagline: "Armado e instalación de muebles a domicilio",
  phoneDisplay: "+54 9 11 0000-0000",
  whatsappNumber: "5491100000000",
  emailDisplay: "contacto@armamosloquequieras.com",
  serviceArea: "CABA y GBA",
};

export const navItems: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Trabajos", href: "/trabajos" },
  { label: "Agenda", href: "/agenda" },
  { label: "Contacto", href: "/contacto" },
];

export const whatsappPlaceholderHref = "/contacto";
