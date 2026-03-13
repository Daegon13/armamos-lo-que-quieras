import { NextResponse } from "next/server";
import { listActiveServices } from "@/lib/booking/service";

export async function GET() {
  const services = await listActiveServices();
  return NextResponse.json({ services });
}
