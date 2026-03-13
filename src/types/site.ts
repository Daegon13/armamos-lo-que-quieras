export type NavItem = {
  label: string;
  href: string;
};

export type ContactInfo = {
  phoneDisplay: string;
  whatsappNumber: string;
  email: string;
  city: string;
};

export type BusinessInfo = {
  brand: string;
  tagline: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  contact: ContactInfo;
};
