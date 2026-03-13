import { NextResponse } from "next/server";
import { BookingRequestError, createPendingBooking } from "@/lib/booking/service";
import type { CreateBookingInput } from "@/lib/booking/types";
import { buildBookingWhatsappMessage, buildWhatsappUrl } from "@/lib/whatsapp";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as CreateBookingInput;
    const { booking, service } = await createPendingBooking(payload);
    const whatsappMessage = buildBookingWhatsappMessage(booking, service.name);
    const whatsappUrl = buildWhatsappUrl(whatsappMessage);

    return NextResponse.json(
      {
        booking: {
          id: booking.id,
          fullName: booking.customerFullName,
          phone: booking.customerPhone,
          service: service.name,
          date: booking.date,
          time: booking.time,
          address: booking.address,
          neighborhood: booking.neighborhood,
          details: booking.details,
          status: booking.status,
          holdUntil: booking.holdUntil,
        },
        whatsappUrl,
        message: "Solicitud creada en estado pendiente.",
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof BookingRequestError) {
      return NextResponse.json({ error: error.message, code: error.code }, { status: error.status });
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message, code: "UNKNOWN_ERROR" }, { status: 500 });
    }

    return NextResponse.json({ error: "No se pudo crear la solicitud.", code: "UNKNOWN_ERROR" }, { status: 500 });
  }
}
