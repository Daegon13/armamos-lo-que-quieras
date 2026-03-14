import { NextResponse } from "next/server";
import { AdminRequestError, blockSlot } from "@/lib/booking/admin";

export async function POST(request: Request) {
  const payload = (await request.json()) as { date?: string; time?: string; reason?: string };

  try {
    const block = await blockSlot({
      date: payload.date ?? "",
      time: payload.time ?? "",
      reason: payload.reason,
    });

    return NextResponse.json({ block }, { status: 201 });
  } catch (error) {
    if (error instanceof AdminRequestError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json({ error: "No pudimos bloquear el horario." }, { status: 500 });
  }
}
