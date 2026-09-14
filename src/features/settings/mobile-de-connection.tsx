"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, CircleAlert, ExternalLink, Radio } from "lucide-react";

interface Status { configured: boolean; }

export function MobileDeConnection() {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    fetch("/api/integrations/mobile-de/status")
      .then((response) => response.json())
      .then((data: Status) => setStatus(data))
      .catch(() => setStatus({ configured: false }));
  }, []);

  const connected = status?.configured === true;
  return <section className="mt-6 rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex gap-3"><div className={`grid size-10 place-items-center rounded-xl ${connected ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" : "bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-300"}`}><Radio size={19} /></div><div><h2 className="font-bold">Mobile.de</h2><p className="mt-1 text-sm text-muted">Font alemanya mitjançant API oficial.</p></div></div>
      {status === null ? <span className="text-sm text-muted">Comprovant...</span> : connected ? <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"><CheckCircle2 size={16} />Configurat</span> : <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-200"><CircleAlert size={16} />Pendent d&apos;activar</span>}
    </div>
    <p className="mt-5 text-sm leading-6 text-muted">{connected ? "Les credencials estan disponibles al servidor. El següent desplegament connectarà els resultats de la cerca al normalitzador de vehicles." : "El connector ja està instal·lat, però Mobile.de ha d&apos;autoritzar un usuari i una contrasenya d&apos;API. No introdueixis cap clau dins de la web: es guarda només al servidor."}</p>
    {!connected && <a href="https://services.mobile.de/docs/search-api.html" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-300">Veure documentació oficial <ExternalLink size={15} /></a>}
  </section>;
}
