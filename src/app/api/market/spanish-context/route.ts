import { NextResponse } from "next/server";
import { getAutozaMarketContext } from "@/data/providers/autoza-market-provider";

export async function GET() {
  try {
    return NextResponse.json(await getAutozaMarketContext());
  } catch {
    return NextResponse.json({ error: "No s'ha pogut actualitzar el context del mercat espanyol." }, { status: 502 });
  }
}
