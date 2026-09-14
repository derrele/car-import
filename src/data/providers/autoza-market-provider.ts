import "server-only";

export interface SpanishMarketPrice {
  label: string;
  averagePrice: number;
  marketShare?: string;
}

export interface SpanishMarketContext {
  source: "Autoza";
  sourceUrl: string;
  updatedAt: string;
  averagePrice: number;
  pricesByMake: SpanishMarketPrice[];
  pricesByFuelType: SpanishMarketPrice[];
}

interface AutozaResponse {
  meta?: { lastUpdated?: string; sourceUrl?: string };
  summary?: { averagePrice?: number };
  pricesByMake?: { make?: string; averagePrice?: number; marketShare?: string }[];
  pricesByFuelType?: { fuelType?: string; averagePrice?: number }[];
}

const endpoint = "https://autoza.es/api/public/market-stats";

export async function getAutozaMarketContext(): Promise<SpanishMarketContext> {
  const response = await fetch(endpoint, { next: { revalidate: 3600 } });
  if (!response.ok) throw new Error("No s'han pogut carregar les dades d'Autoza.");

  const data = await response.json() as AutozaResponse;
  if (!data.summary?.averagePrice || !data.meta?.lastUpdated) {
    throw new Error("La resposta d'Autoza no té el format esperat.");
  }

  return {
    source: "Autoza",
    sourceUrl: data.meta.sourceUrl ?? "https://autoza.es",
    updatedAt: data.meta.lastUpdated,
    averagePrice: data.summary.averagePrice,
    pricesByMake: (data.pricesByMake ?? []).filter((item) => item.make && item.averagePrice).map((item) => ({ label: item.make!, averagePrice: item.averagePrice!, marketShare: item.marketShare })).slice(0, 6),
    pricesByFuelType: (data.pricesByFuelType ?? []).filter((item) => item.fuelType && item.averagePrice).map((item) => ({ label: item.fuelType!, averagePrice: item.averagePrice! })).slice(0, 5),
  };
}
