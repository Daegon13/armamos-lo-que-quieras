import { NextRequest, NextResponse } from "next/server";
import { AdminRequestError, getAdminAgendaByDate } from "@/lib/booking/admin";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date") ?? "";

  try {
    const data = await getAdminAgendaByDate(date);
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof AdminRequestError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json({ error: "No pudimos cargar la agenda del día." }, { status: 500 });
  }
}
