import * as fs from "fs";
import * as path from "path";

export const d6 = (s: 1 | 2, input?: string) =>
  (input || fs.readFileSync(path.join("day6", "input")).toString())
    .split("")
    .findIndex((_, i, a) => {
        const r = s === 1 ? 3 : 13;
      if (i < r) return false;
      const l = a.slice(i - r, i + 1);
     return  l.every((s) => l.filter((d) => d === s).length === 1);
    }) + 1;
