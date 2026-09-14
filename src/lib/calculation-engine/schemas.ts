import { z } from "zod";
const money = z.number().finite().min(0);
export const importCostsSchema = z.object({ transport: money, itvAndHomologation: money, agency: money, registration: money, preparation: money, repairs: money, contingency: money, other: money });
const scoreWeightsSchema=z.object({roi:money,saleSpeed:money,absoluteProfit:money,risk:money,marketPrice:money,capitalRequired:money});
export const analysisInputSchema = z.object({ purchasePrice: money, expectedSalePrice: money, costs: importCostsSchema, holdingDays: z.number().finite().min(1), annualCapitalCostRate: z.number().finite().min(0).max(100), targetRoi: z.number().finite().min(0).max(100),scoreWeights:scoreWeightsSchema.optional() });
