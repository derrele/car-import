import type { NormalizedVehicle } from "@/domain/vehicles/normalized-vehicle";
export interface PriceObservation { recordedAt:string; price:number; }
export interface MarketListing extends NormalizedVehicle { price:number; country:"DE"|"ES"; firstSeenAt:string; lastSeenAt:string; priceHistory:PriceObservation[]; }
export interface MarketOpportunity { listing:MarketListing; expectedSalePrice:number; marketDiscount:number; totalCost:number; adjustedProfit:number; roi:number; score:number; daysListed:number; priceDrop:number; negotiationSignal:"high"|"medium"|"none"; }
