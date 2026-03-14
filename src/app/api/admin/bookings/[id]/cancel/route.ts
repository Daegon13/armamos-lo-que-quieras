import { NextResponse } from "next/server";
import { AdminRequestError, cancelBooking } from "@/lib/booking/admin";

export async function POST(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  try {
    const booking = await cancelBooking(id);
    return NextResponse.json({ booking });
  } catch (error) {
    if (error instanceof AdminRequestError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json({ error: "No pudimos actualizar la reserva." }, { status: 500 });
  }
}
