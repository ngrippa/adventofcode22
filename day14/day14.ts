import * as fs from "fs";
import * as path from "path";

enum Fill {
  ROCK = "R",
  AIR = "",
  SAND = "S",
}

export const length = 1000;

export const day14 = (star: 1 | 2) => {
  const input = fs
    .readFileSync(path.join("day14", "input"))
    .toString()
    .split("\n")
    .filter(Boolean)
    .map((s) => s.split(" -> "));

  if (star === 2) {
    const maxY =
      Math.max(
        ...input.map((f) => Math.max(...f.map((s) => Number(s.split(",")[1]))))
      ) + 2;
    input.push([`0,${maxY}`, `1000,${maxY}`]);
  }

  const field: Fill[][] = [];
  input.forEach((path) => {
    path.slice(1).forEach((s, i) => {
      const [cx, cy] = s.split(",").map((n) => Number(n));
      const [px, py] = path[i].split(",").map((n) => Number(n));
      const run =
        cx === px
          ? { dir: "y", start: Math.min(cy, py), end: Math.max(cy, py) }
          : { dir: "x", start: Math.min(cx, px), end: Math.max(cx, px) };
      for (let i = run.start; i <= run.end; i++) {
        const x = run.dir === "x" ? i : cx;
        const y = run.dir === "y" ? i : cy;
        if (!field[x]) field[x] = [];
        field[x][y] = Fill.ROCK;
      }
    });
  });

  let sands = 0;
  outer: while (true) {
    let x = 500;
    let y = 0;
    while (true) {
      y++;
      if (y === 1000 || !field[x]) break outer;
      if (!field[x][y]) {
      } else if (!field[x - 1]?.[y]) {
        x--;
      } else if (!field[x + 1]?.[y]) {
        x++;
      } else {
        if (!field[x]) break outer;
        field[x][y - 1] = Fill.SAND;
        break;
      }
    }
    sands++;
      if (field[500][0]) return sands;
  }
  return sands;
};
