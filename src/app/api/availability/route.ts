import { NextRequest, NextResponse } from "next/server";
import { getAvailabilityByDate } from "@/lib/booking/service";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "La fecha es obligatoria." }, { status: 400 });
  }

  try {
    const slots = await getAvailabilityByDate(date);
    return NextResponse.json({ date, slots });
  } catch (error) {
    if (error instanceof Error && error.message === "INVALID_DATE") {
      return NextResponse.json({ error: "Fecha inválida. Usá formato YYYY-MM-DD." }, { status: 400 });
    }

    return NextResponse.json({ error: "No se pudo obtener la disponibilidad." }, { status: 500 });
  }
}
