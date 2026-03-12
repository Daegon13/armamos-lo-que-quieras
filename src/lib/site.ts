import type { BusinessInfo, NavItem } from "@/types/site";

export const businessInfo: BusinessInfo = {
  brand: "Armamos lo que quieras",
  tagline: "Armado profesional de muebles para hogar y oficina.",
  phoneDisplay: "+54 9 11 0000-0000",
  whatsappNumber: "5491100000000",
  serviceArea: "CABA y GBA",
};

export const navItems: NavItem[] = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicio", href: "#servicio" },
  { label: "Contacto", href: "#contacto" },
];

export const whatsappPlaceholderHref = "#contacto";
