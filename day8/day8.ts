import * as fs from "fs";
import * as path from "path";

const smaller = (num: number) => (el: number) => el < num;
const greaterEqual = (num: number) => (el: number) => el >= num;

const isVisible = (i: number, j: number, all: number[][]) => {
  const num = all[i][j];
  const d1 =
    all[i].slice(0, j).every(smaller(num)) ||
    all[i].slice(j + 1).every(smaller(num));
  if (d1) return d1;
  const m = all.map((el) => el[j]);
  return (
    m.slice(0, i).every(smaller(num)) || m.slice(i + 1).every(smaller(num))
  );
};

export const day8 = (s: 1 | 2) => {
  const input = fs
    .readFileSync(path.join("day8", "input"))
    .toString()
    .split("\n")
    .filter(Boolean)
    .map((s) => s.split("").map((n) => Number(n)));
  if (s === 1) {
    return input.reduce((p, c, i) => {
      const vis = c.filter((_, j) => isVisible(i, j, input));
      return p + vis.length;
    }, 0);
  } else {
    const res = input.map((a, i) => a.map((_, j) => scenicScore(i, j, input)));
    return Math.max(...res.flat());
  }
};

const getFullLength = (i: number, j: number, all: number[][], ind: number) => {
  switch (ind) {
    case 0:
      return j;
    case 1:
      return all[0].length - j - 1;
    case 2:
      return i;
    case 3:
    default:
      return all.length - i - 1;
  }
};

const scenicScore = (i: number, j: number, all: number[][]) => {
  const num = all[i][j];
  const m = all.map((el) => el[j]);
  const res1 = [
    all[i].slice(0, j).reverse().findIndex(greaterEqual(num)),
    all[i].slice(j + 1).findIndex(greaterEqual(num)),
    m.slice(0, i).reverse().findIndex(greaterEqual(num)),
    m.slice(i + 1).findIndex(greaterEqual(num)),
  ];

  const res = res1.map((s, ind) =>
    s >= 0 ? s + 1 : getFullLength(i, j, all, ind)
  );
  return res.reduce((p, c, ind) => p * c, 1);
};
