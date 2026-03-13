import { businessInfo } from "@/lib/site";
import type { Booking } from "@/lib/booking/types";

const FALLBACK_WHATSAPP_NUMBER = businessInfo.contact.whatsappNumber;

export function getWhatsappNumber(): string {
  const raw = process.env.WHATSAPP_NUMBER || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || FALLBACK_WHATSAPP_NUMBER;
  return raw.replace(/\D/g, "");
}

function formatDate(date: string): string {
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) {
    return date;
  }

  return `${day}/${month}/${year}`;
}

export function buildBookingWhatsappMessage(booking: Booking, serviceName: string): string {
  return [
    "Hola, quiero solicitar una agenda desde la web.",
    "",
    `Nombre: ${booking.customerFullName}`,
    `Teléfono: ${booking.customerPhone}`,
    `Servicio: ${serviceName}`,
    `Fecha solicitada: ${formatDate(booking.date)}`,
    `Hora solicitada: ${booking.time}`,
    `Dirección: ${booking.address}`,
    `Barrio/Zona: ${booking.neighborhood}`,
    `Detalles del trabajo: ${booking.details}`,
    "",
    "Quedo a la espera de confirmación. También puedo enviar fotos por este medio.",
  ].join("\n");
}

export function buildWhatsappUrl(message: string): string {
  const number = getWhatsappNumber();
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${number}?text=${encodedMessage}`;
}
