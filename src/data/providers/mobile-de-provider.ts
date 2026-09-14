import "server-only";

export interface MobileDeSearchCriteria {
  make?: string;
  model?: string;
  minimumPrice?: number;
  maximumPrice?: number;
  minimumYear?: number;
  maximumMileage?: number;
  page?: number;
  pageSize?: number;
}

export interface MobileDeConnectionStatus {
  configured: boolean;
  provider: "mobile.de";
}

const baseUrl = "https://services.mobile.de/search-api/search";

export function getMobileDeConnectionStatus(): MobileDeConnectionStatus {
  return {
    configured: Boolean(process.env.MOBILE_DE_API_USERNAME && process.env.MOBILE_DE_API_PASSWORD),
    provider: "mobile.de",
  };
}

/**
 * Connector oficial de Mobile.de. Les credencials només s'utilitzen al servidor.
 * La normalització de la resposta es connectarà quan l'accés API del compte estigui actiu.
 */
export class MobileDeProvider {
  async searchRaw(criteria: MobileDeSearchCriteria): Promise<unknown> {
    const username = process.env.MOBILE_DE_API_USERNAME;
    const password = process.env.MOBILE_DE_API_PASSWORD;

    if (!username || !password) {
      throw new Error("Mobile.de no està configurat. Afegeix les credencials al fitxer .env.local.");
    }

    const classification = criteria.make
      ? `refdata/classes/Car/makes/${criteria.make.trim().toUpperCase()}`
      : "refdata/classes/Car";
    const params = new URLSearchParams({
      classification,
      country: "DE",
      condition: "USED",
      "page.number": String(criteria.page ?? 1),
      "page.size": String(Math.min(criteria.pageSize ?? 20, 100)),
    });

    if (criteria.model) params.set("modelDescription", criteria.model);
    if (criteria.minimumPrice) params.set("price.min", String(criteria.minimumPrice));
    if (criteria.maximumPrice) params.set("price.max", String(criteria.maximumPrice));
    if (criteria.minimumYear) params.set("firstRegistrationDate.min", `${criteria.minimumYear}-01`);
    if (criteria.maximumMileage) params.set("mileage.max", String(criteria.maximumMileage));

    const response = await fetch(`${baseUrl}?${params.toString()}`, {
      headers: {
        Accept: "application/vnd.de.mobile.api+json",
        Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Mobile.de ha respost amb l'estat ${response.status}.`);
    }

    return response.json();
  }
}
