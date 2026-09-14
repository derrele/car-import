import type { MarketListing } from "@/domain/market/market-listing";

export interface MobileDeAd {
  mobileAdId?: string;
  creationDate?: string;
  modificationDate?: string;
  make?: string;
  model?: string;
  modelDescription?: string;
  firstRegistration?: string;
  mileage?: number;
  fuel?: string;
  gearbox?: string;
  co2?: number;
  detailPageUrl?: string;
  price?: { consumerPriceGross?: string };
}

export interface MobileDeSearchResponse { ads?: MobileDeAd[]; }

const fuelLabels: Record<string, string> = {
  DIESEL: "Diesel",
  PETROL: "Gasolina",
  ELECTRICITY: "Elèctric",
  HYBRID: "Híbrid",
  LPG: "GLP",
  CNG: "GNC",
};

/** Transforma només els camps documentats del nou format JSON de la Search API. */
export function normalizeMobileDeSearchResponse(payload: MobileDeSearchResponse, seenAt = new Date().toISOString()): MarketListing[] {
  return (payload.ads ?? []).flatMap((ad) => {
    const price = Number(ad.price?.consumerPriceGross);
    const year = Number(ad.firstRegistration?.slice(0, 4));
    const mileage = ad.mileage;
    if (!ad.mobileAdId || !ad.make || !ad.model || !Number.isFinite(price) || !Number.isFinite(year) || typeof mileage !== "number" || !Number.isFinite(mileage)) return [];

    return [{
      id: `mobile-de-${ad.mobileAdId}`,
      make: ad.make,
      model: ad.modelDescription || ad.model,
      year,
      mileageKm: mileage,
      fuelType: fuelLabels[ad.fuel ?? ""] ?? ad.fuel ?? "No especificat",
      transmission: ad.gearbox,
      co2GKm: ad.co2,
      sourceUrl: ad.detailPageUrl,
      price,
      country: "DE" as const,
      firstSeenAt: ad.creationDate ?? seenAt,
      lastSeenAt: ad.modificationDate ?? seenAt,
      priceHistory: [{ recordedAt: seenAt, price }],
    }];
  });
}
