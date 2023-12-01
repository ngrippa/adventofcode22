import * as fs from "fs";
import * as path from "path";

export const day4 = (task: 1 | 2) => {
  const r = fs
    .readFileSync(path.join("day4", "input"))
    .toString()
    .split("\n")
    .filter((s, i) => {
      if (!s.length) return false;
      const [a, b, c, d] = s
        .split(",")
        .flatMap((e) => e.split("-").map((n) => Number(n)));
      return task === 1
        ? (a >= c && b <= d) || (a <= c && b >= d)
        : b >= c && d >= a
    });
  return r.length;
};
