import * as fs from "fs";
import * as path from "path";

const getInput = () =>
  fs
    .readFileSync(path.join("day9", "input"))
    .toString()
    .split("\n")
    .map((s) => [s[0], Number(s.slice(2))] as ["L" | "R" | "U" | "D", number]);

export const day9 = () => {
  let hx = 0,
    hy = 0,
    tx = 0,
    ty = 0;
  const pos: [number, number][] = [];
  const input = getInput();
  input.forEach((s) => {
    new Array(s[1]).fill(1).forEach(() => {
      switch (s[0]) {
        case "D":
          hy--;
          break;
        case "U":
          hy++;
          break;
        case "L":
          hx--;
          break;
        case "R":
          hx++;
      }
      if (Math.abs(hx - tx) > 1) {
        tx += hx > tx ? 1 : -1;
        ty = hy;
      } else if (Math.abs(hy - ty) > 1) {
        ty += hy > ty ? 1 : -1;
        tx = hx;
      }
      if (!pos.some((p) => p[0] === tx && p[1] === ty)) {
        pos.push([tx, ty]);
      }
    });
  });
  return pos.length;
};

const dirs = {
  R: [1, 0],
  L: [-1, 0],
  U: [0, -1],
  D: [0, 1],
};

export const day9S2 = (k: number) => {
  // not using fill because it gives each element the same memory address
  const knots = new Array(k).fill(1).map(() => [0, 0]);
  const pos: [number, number][] = [];
  const input = getInput();
  input.forEach((s) =>
    new Array(s[1]).fill(1).forEach(() =>
      knots.forEach((t, i) => {
        if (i === 0) {
          knots[0] = t.map((v, d) => v + dirs[s[0]][d]);
        } else {
          if (knots[i - 1].some((v, d) => Math.abs(v - knots[i][d]) > 1)) {
            knots[i] = knots[i].map(
              (v, d) => v + Math.sign(knots[i - 1][d] - v)
            );
          }
        }
        if (i === k - 1) {
          if (!pos.some((p) => p[0] === t[0] && p[1] === t[1])) {
            pos.push([t[0], t[1]]);
          }
        }
      })
    )
  );
  return pos.length + 1;
};
