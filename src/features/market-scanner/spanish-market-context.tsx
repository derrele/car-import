"use client";

import { useEffect, useState } from "react";
import { BarChart3, ExternalLink, LoaderCircle } from "lucide-react";

interface MarketPrice { label: string; averagePrice: number; marketShare?: string; }
interface Context { source: "Autoza"; sourceUrl: string; updatedAt: string; averagePrice: number; pricesByMake: MarketPrice[]; pricesByFuelType: MarketPrice[]; }
const euro = (value: number) => `${value.toLocaleString("ca-ES", { maximumFractionDigits: 0 })} €`;

export function SpanishMarketContext() {
  const [context, setContext] = useState<Context | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch("/api/market/spanish-context")
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data: Context) => setContext(data))
      .catch(() => setFailed(true));
  }, []);

  return <section className="mt-6 rounded-2xl border bg-card p-5 shadow-sm">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex items-center gap-2"><BarChart3 size={19} className="text-emerald-600" /><div><h2 className="font-bold">Context del mercat espanyol</h2><p className="text-sm text-muted">Dades agregades; no són comparables individuals.</p></div></div>
      {context && <a href={context.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-300">Font: Autoza <ExternalLink size={14} /></a>}
    </div>
    {!context && !failed && <div className="mt-5 flex items-center gap-2 text-sm text-muted"><LoaderCircle size={17} className="animate-spin" />Carregant referència de mercat...</div>}
    {failed && <p className="mt-5 text-sm text-muted">La referència pública d&apos;Autoza no està disponible ara mateix. El Scanner continua funcionant amb les dades locals.</p>}
    {context && <><div className="mt-5 grid gap-3 sm:grid-cols-3"><Metric label="Preu mitjà Espanya" value={euro(context.averagePrice)} /><Metric label="Actualitzat" value={new Intl.DateTimeFormat("ca-ES", { dateStyle: "medium" }).format(new Date(context.updatedAt))} /><Metric label="Cobertura" value="Anuncis agregats" /></div><div className="mt-5 grid gap-5 lg:grid-cols-2"><PriceList title="Marques amb més presència" prices={context.pricesByMake} /><PriceList title="Preu per combustible" prices={context.pricesByFuelType} /></div><p className="mt-5 text-xs leading-5 text-muted">Dades de mercat d&apos;ocasió d&apos;Autoza sota CC BY 4.0. Es mostren com a referència general, no com a preu estimat d&apos;un vehicle concret.</p></>}
  </section>;
}

function Metric({ label, value }: { label: string; value: string }) { return <div className="rounded-xl bg-background p-3"><p className="text-xs text-muted">{label}</p><p className="mt-1 font-bold">{value}</p></div>; }
function PriceList({ title, prices }: { title: string; prices: MarketPrice[] }) { return <div><h3 className="text-sm font-bold">{title}</h3><div className="mt-2 space-y-2">{prices.map((item) => <div key={item.label} className="flex items-center justify-between rounded-lg bg-background px-3 py-2 text-sm"><span>{item.label}{item.marketShare && <small className="ml-1 text-muted">({item.marketShare})</small>}</span><b>{euro(item.averagePrice)}</b></div>)}</div></div>; }
