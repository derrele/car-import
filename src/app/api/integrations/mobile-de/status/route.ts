import { NextResponse } from "next/server";
import { getMobileDeConnectionStatus } from "@/data/providers/mobile-de-provider";

export function GET() {
  return NextResponse.json(getMobileDeConnectionStatus());
}
