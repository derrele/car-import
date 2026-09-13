import type { NormalizedVehicle } from "@/domain/vehicles/normalized-vehicle";
export interface MarketListing extends NormalizedVehicle { price:number; country:"DE"|"ES"; firstSeenAt:string; lastSeenAt:string; }
export interface MarketOpportunity { listing:MarketListing; expectedSalePrice:number; marketDiscount:number; totalCost:number; adjustedProfit:number; roi:number; score:number; }
