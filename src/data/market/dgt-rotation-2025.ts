export interface DgtRotationRecord { make: string; model: string; transfers: number; }

/** Agregació pròpia dels microdades mensuals de transferències DGT 2025, només turismes (COD_TIPO 40). */
export const dgtRotation2025: DgtRotationRecord[] = [
  { make: "FORD", model: "FOCUS", transfers: 59646 }, { make: "RENAULT", model: "CLIO", transfers: 54694 },
  { make: "VOLKSWAGEN", model: "GOLF", transfers: 54046 }, { make: "SEAT", model: "IBIZA", transfers: 50058 },
  { make: "RENAULT", model: "MEGANE", transfers: 44700 }, { make: "NISSAN", model: "NISSAN QASHQAI", transfers: 34951 },
  { make: "OPEL", model: "ASTRA", transfers: 31339 }, { make: "SEAT", model: "LEON", transfers: 31190 },
  { make: "VOLKSWAGEN", model: "POLO", transfers: 31014 }, { make: "FORD", model: "FIESTA", transfers: 28955 },
  { make: "SEAT", model: "ARONA", transfers: 27885 }, { make: "FIAT", model: "FIAT 500", transfers: 25918 },
  { make: "DACIA", model: "SANDERO", transfers: 25292 }, { make: "OPEL", model: "CORSA", transfers: 25051 },
  { make: "TOYOTA", model: "TOYOTA C-HR", transfers: 24722 }, { make: "TOYOTA", model: "TOYOTA COROLLA", transfers: 24687 },
  { make: "KIA", model: "SPORTAGE", transfers: 23656 }, { make: "RENAULT", model: "CAPTUR", transfers: 21687 },
  { make: "HYUNDAI", model: "TUCSON", transfers: 20371 }, { make: "TOYOTA", model: "TOYOTA YARIS", transfers: 19217 },
  { make: "VOLKSWAGEN", model: "TIGUAN", transfers: 18722 }, { make: "VOLKSWAGEN", model: "T-ROC", transfers: 17954 },
  { make: "FORD", model: "KUGA", transfers: 17855 }, { make: "VOLKSWAGEN", model: "PASSAT", transfers: 16448 },
  { make: "CITROEN", model: "C4", transfers: 15786 }, { make: "TOYOTA", model: "TOYOTA RAV4", transfers: 15462 },
  { make: "NISSAN", model: "NISSAN JUKE", transfers: 15338 }, { make: "KIA", model: "STONIC", transfers: 14391 },
  { make: "DACIA", model: "DUSTER", transfers: 14209 }, { make: "VOLKSWAGEN", model: "T-CROSS", transfers: 14067 },
];

const normalize = (value: string) => value.toUpperCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/[^A-Z0-9]/g, "");

export function getDgtRotation(make: string, model: string) {
  const candidate = dgtRotation2025.find((item) => normalize(item.make) === normalize(make) && (normalize(item.model).includes(normalize(model)) || normalize(model).includes(normalize(item.model))));
  return candidate ? { transfers: candidate.transfers, demand: Math.max(0.5, candidate.transfers / dgtRotation2025[0].transfers) } : undefined;
}
