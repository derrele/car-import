import { describe, expect, it } from "vitest";
import { normalizeMobileDeSearchResponse } from "./mobile-de-normalizer";

describe("Mobile.de normalizer", () => {
  it("converteix el format JSON oficial a un anunci normalitzat", () => {
    const listings = normalizeMobileDeSearchResponse({ ads: [{ mobileAdId: "15012", make: "BMW", model: "320d", modelDescription: "320d Touring", firstRegistration: "202103", mileage: 68000, fuel: "DIESEL", gearbox: "AUTOMATIC_GEAR", co2: 130, detailPageUrl: "https://suchen.mobile.de/example", price: { consumerPriceGross: "18400.00" } }] }, "2026-09-15T10:00:00.000Z");
    expect(listings).toEqual([expect.objectContaining({ id: "mobile-de-15012", model: "320d Touring", year: 2021, mileageKm: 68000, fuelType: "Diesel", price: 18400, country: "DE" })]);
  });

  it("descarta anuncis incomplets en comptes de calcular amb dades incertes", () => {
    expect(normalizeMobileDeSearchResponse({ ads: [{ mobileAdId: "incomplete", make: "BMW" }] })).toEqual([]);
  });
});
