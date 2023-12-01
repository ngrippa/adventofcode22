import * as fs from "fs";
import * as path from "path";

type XYZ = [number, number, number];

export const day18 = (star: 1 | 2) => {
  const input = fs
    .readFileSync(path.join("day18", "input"))
    .toString()
    .split("\n")
    .filter(Boolean)
    .map((c) => c.split(",").map(Number) as XYZ);

  const max = Math.max(...input.flat(2));
  const res: ("L" | "W")[][][] = [];
  input.forEach((p) => {
    const [x, y, z] = p;
    if (!res[x]) res[x] = [];
    if (!res[x][y]) res[x][y] = [];
    res[x][y][z] = "L";
  });
  if (star === 2) spreadWater(res, max);
  let sides = 0;
  for (let x = 0; x <= max; x++) {
    for (let y = 0; y <= max; y++) {
      for (let z = 0; z <= max; z++) {
        if (res[x]?.[y]?.[z] === "L") {
          sides += neighbors([x, y, z]).filter((n) => {
            if (n.some((a) => a < 0 || a > max)) return true;
            return star === 1 ? !res[n[0]]?.[n[1]]?.[n[2]] : res[n[0]]?.[n[1]]?.[n[2]] === "W"
          }).length
        }
      }
    }
  }
  return sides;

};

const spreadWater = (res: ("L" | "W")[][][], max: number) => {
  const toVisit = [[0, 0, 0]];
  let p;
  while ((p = toVisit.shift())) {
    const [x, y, z] = p;
    if (res[x]?.[y]?.[z]) continue;
    const relevant = neighbors(p as XYZ).filter(
      (n) => {
        if (n.some((a) => a < 0 || a > max)) return false;
        const [x, y, z] = n;
        return !res[x]?.[y]?.[z];
      }
    );
    if (!res[x]) res[x] = [];
    if (!res[x][y]) res[x][y] = [];
    res[x][y][z] = "W";
    toVisit.push(...relevant);
  }
};

const neighbors = (p: XYZ): XYZ[] => [
  [p[0] + 1, p[1], p[2]],
  [p[0] - 1, p[1], p[2]],
  [p[0], p[1] + 1, p[2]],
  [p[0], p[1] - 1, p[2]],
  [p[0], p[1], p[2] + 1],
  [p[0], p[1], p[2] - 1],
];

export const isAdjacent = (cube1: XYZ) => (cube2: XYZ) => {
  const s = sim(cube1, cube2);
  return s(0) || s(1) || s(2);
};

const sim = (cube1: XYZ, cube2: XYZ) => (n: 0 | 1 | 2) => {
  const others = [0, 1, 2].filter((l) => l !== n);
  return (
    Math.abs(cube1[n] - cube2[n]) === 1 &&
    others.every((o) => cube1[o] === cube2[o])
  );
};
