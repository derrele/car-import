export interface ImportCosts { transport: number; itvAndHomologation: number; agency: number; registration: number; preparation: number; repairs: number; contingency: number; other: number; }
export interface AnalysisInput { purchasePrice: number; expectedSalePrice: number; costs: ImportCosts; holdingDays: number; annualCapitalCostRate: number; targetRoi: number; }
export interface Scenario { name: "Conservador" | "Normal" | "Optimista"; salePrice: number; adjustedProfit: number; roi: number; }
export interface ScoreBreakdown { roi: number; saleSpeed: number; absoluteProfit: number; risk: number; marketPrice: number; capitalRequired: number; total: number; }
export interface AnalysisResult { totalCost: number; grossProfit: number; capitalCost: number; adjustedProfit: number; roi: number; margin: number; profitPerDay: number; breakEven: number; maxBuyPrice: number; scenarios: Scenario[]; score?: ScoreBreakdown; }
