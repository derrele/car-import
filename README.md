# Car Import

Aplicació per analitzar la rendibilitat d'importar vehicles, inicialment d'Alemanya a Espanya.

## Sprint 1

- Next.js, TypeScript, Tailwind CSS i estructura preparada per a shadcn/ui.
- Layout automotive/dashboard responsive amb tema clar i fosc.
- Rutes base: Dashboard, Calculadora, Market Scanner, Els meus cotxes, Guia d'importació i Configuració.
- Separació inicial entre `components` (UI), `features` (pantalles), `domain` (models), `data` (providers) i `lib/calculation-engine` (lògica pura futura).
- Sense càlculs fiscals, integracions de mercat ni scraping.

## Mobile.de

El connector del Search API oficial està preparat, però necessita credencials autoritzades per Mobile.de. Copia `.env.example` a `.env.local` i omple les dues variables només quan Mobile.de t'hagi concedit l'accés. Aquest fitxer no es puja a GitHub.

## Executar en local

Amb pnpm disponible, executa `pnpm dev` dins la carpeta del projecte i obre la URL que aparegui al navegador.

## Properes fases

1. Configuració de costos i objectius.
2. Calculation Engine amb proves automatitzades.
3. Calculadora ràpida i avançada.
