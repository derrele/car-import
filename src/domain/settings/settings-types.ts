export interface CostProfile { id: string; name: string; description: string; transport: number; itv: number; agency: number; plates: number; preparation: number; inspection: number; contingency: number; }
export interface ProfitabilityTargets { minimumProfit: number; minimumRoi: number; targetRoi: number; minimumMargin: number; targetSaleDays: number; maximumSaleDays: number; annualCapitalCost: number; }
export interface AppSettings { activeProfileId: string; costProfiles: CostProfile[]; targets: ProfitabilityTargets; }
