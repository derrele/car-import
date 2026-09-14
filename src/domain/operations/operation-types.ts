export const operationStages=["analitzant","negociant","comprat","transport","matriculacio","preparacio","en-venda","venut"] as const;
export type OperationStage=typeof operationStages[number];
export interface Operation { id:string; title:string; sourceUrl?:string; purchasePrice:number; expectedSalePrice:number; totalCost:number; expectedProfit:number; stage:OperationStage; createdAt:string; }
