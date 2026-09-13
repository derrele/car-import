import type { NormalizedVehicle } from "@/domain/vehicles/normalized-vehicle"; export interface MarketProvider { search(criteria:Record<string,unknown>):Promise<NormalizedVehicle[]>; }
