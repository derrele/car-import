import { describe, expect, it } from "vitest";
import { getDgtRotation } from "./dgt-rotation-2025";

describe("DGT rotation 2025", () => {
  it("troba un model encara que l'anunci contingui una versió addicional", () => {
    expect(getDgtRotation("Volkswagen", "Golf GTI")?.transfers).toBe(54046);
  });

  it("no penalitza un model que no apareix a la mostra de top models", () => {
    expect(getDgtRotation("BMW", "320d Touring")).toBeUndefined();
  });
});
