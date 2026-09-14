"use client";

import { useMemo, useState } from "react";
import { Check, Link2, PlusCircle } from "lucide-react";
import { operationRepository } from "@/data/repositories/operation-repository";
import { analyzeVehicle } from "@/lib/calculation-engine";

const euro = (value: number) => `${value.toLocaleString("ca-ES", { maximumFractionDigits: 0 })} €`;
const fieldClass = "w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20";

export function ManualCandidate() {
  const [title, setTitle] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [expectedSalePrice, setExpectedSalePrice] = useState("");
  const [saved, setSaved] = useState(false);

  const analysis = useMemo(() => {
    const purchase = Number(purchasePrice);
    const sale = Number(expectedSalePrice);
    if (!purchase || !sale) return null;
    return analyzeVehicle({ purchasePrice: purchase, expectedSalePrice: sale, holdingDays: 45, annualCapitalCostRate: 8, targetRoi: 18, costs: { transport: 900, itvAndHomologation: 150, agency: 300, registration: 200, preparation: 450, repairs: 0, contingency: 500, other: 180 } });
  }, [expectedSalePrice, purchasePrice]);

  const save = () => {
    if (!title.trim() || !analysis) return;
    operationRepository.create({ title: title.trim(), sourceUrl: sourceUrl.trim() || undefined, purchasePrice: Number(purchasePrice), expectedSalePrice: Number(expectedSalePrice), totalCost: analysis.totalCost, expectedProfit: analysis.adjustedProfit, stage: "analitzant" });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  return <section className="mt-6 rounded-2xl border bg-card p-5 shadow-sm">
    <div className="flex items-start gap-2"><PlusCircle size={19} className="mt-0.5 text-emerald-600" /><div><h2 className="font-bold">Afegir candidata manualment</h2><p className="mt-1 text-sm text-muted">Trobes un vehicle en un portal? Enganxa l&apos;enllaç i les dues xifres clau. L&apos;anàlisi usa els costos per defecte.</p></div></div>
    <div className="mt-5 grid gap-3 lg:grid-cols-2"><label className="grid gap-1.5 text-sm font-semibold">Vehicle<input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Ex. BMW 320d Touring 2021" className={fieldClass} /></label><label className="grid gap-1.5 text-sm font-semibold">Enllaç de l&apos;anunci <span className="text-xs font-normal text-muted">(opcional)</span><div className="relative"><Link2 size={16} className="pointer-events-none absolute left-3 top-3 text-muted" /><input type="url" value={sourceUrl} onChange={(event) => setSourceUrl(event.target.value)} placeholder="https://..." className={`${fieldClass} pl-9`} /></div></label><label className="grid gap-1.5 text-sm font-semibold">Preu de compra a Alemanya<input type="number" min="0" value={purchasePrice} onChange={(event) => setPurchasePrice(event.target.value)} placeholder="18.400" className={fieldClass} /></label><label className="grid gap-1.5 text-sm font-semibold">Venda prevista a Espanya<input type="number" min="0" value={expectedSalePrice} onChange={(event) => setExpectedSalePrice(event.target.value)} placeholder="24.900" className={fieldClass} /></label></div>
    {analysis && <div className="mt-5 grid gap-3 rounded-xl bg-emerald-50 p-4 sm:grid-cols-3 dark:bg-emerald-950/40"><div><p className="text-xs text-muted">Cost total estimat</p><b>{euro(analysis.totalCost)}</b></div><div><p className="text-xs text-muted">Benefici ajustat</p><b className={analysis.adjustedProfit >= 0 ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}>{euro(analysis.adjustedProfit)}</b></div><div><p className="text-xs text-muted">ROI estimat</p><b>{analysis.roi.toFixed(1)} %</b></div></div>}
    <div className="mt-5 flex justify-end"><button type="button" disabled={!title.trim() || !analysis} onClick={save} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50">{saved ? <><Check size={17} />Desada a “Els meus cotxes”</> : "Analitzar i desar candidata"}</button></div>
  </section>;
}
