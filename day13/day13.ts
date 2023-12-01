import * as fs from "fs";
import * as path from "path";

type A = (number | A)[];

export const day13 = (star: 1 | 2) => {
  const input = fs
    .readFileSync(path.join("day13", "input"))
    .toString()
    .split("\n\n")
    .map((s) =>
      s
        .split("\n")
        .filter(Boolean)
        .map((j) => JSON.parse(j) as A)
    );
  if (star === 1)
    return input.reduce((p, c, i) => {
      const comp = compare(c[0], c[1], i);
      return comp ? p + i + 1 : p;
    }, 0);
  if (star === 2) {
    const sorted = [...input.flat(), [[2]], [[6]]].sort((a, b) =>
      compare(a, b, 0) ? -1 : 1
    );
    const div2 =
        // @ts-ignore
      sorted.findIndex((e) => e.flat().length === 1 && e.flat()[0] === 2 && e[0].length === 1) + 1;
    const div6 =
        // @ts-ignore
      sorted.findIndex((e) => e.flat().length === 1 && e.flat()[0] === 6 && e[0].length === 1) + 1;
    return div2 * div6;
  }
};

const isNumber = (a: unknown): a is number => typeof a === "number";

export const compare = (
  inputA: A,
  inputB: A,
  ind: number
): boolean | undefined => {
  for (let i = 0; i < inputA.length; i++) {
    const a = inputA[i],
      b = inputB[i];
    if (b === undefined) return false;
    if (isNumber(a) && isNumber(b)) {
      if (a > b) return false;
      if (a < b) return true;
    } else {
      const comp = compare(isNumber(a) ? [a] : a, isNumber(b) ? [b] : b, ind);
      if (comp !== undefined) return comp;
    }
  }
  if (inputA.length < inputB.length) return true;
  return undefined;
};
