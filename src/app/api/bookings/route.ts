import { NextResponse } from "next/server";
import { createPendingBooking } from "@/lib/booking/service";
import type { CreateBookingInput } from "@/lib/booking/types";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as CreateBookingInput;
    const booking = await createPendingBooking(payload);

    return NextResponse.json(
      {
        booking: {
          id: booking.id,
          status: booking.status,
          holdUntil: booking.holdUntil,
        },
        message: "Solicitud creada en estado pendiente.",
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "No se pudo crear la solicitud." }, { status: 500 });
  }
}
