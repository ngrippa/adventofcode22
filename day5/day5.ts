import * as fs from "fs";
import * as path from "path";

export const parseLine = (str: string) => {
  const arr: (false | string)[] = [];
  for (let i = 1; i < str.length; i += 4) {
    const el = str[i];
    arr.push(el === " " ? false : el);
  }
  return arr;
};

export const parseInput = () => {
  const sections = fs
    .readFileSync(path.join("day5", "input"))
    .toString()
    .split("\n\n");
  const split = sections[0].split("\n");
  split.pop();
  split.reverse();
  const initialState: string[][] = [];
  split.forEach((l) => {
    const parsed = parseLine(l);
    parsed.forEach((el, i) => {
      if (!initialState[i]) initialState[i] = [];
      if (el) initialState[i].push(el);
    });
  });

  const moveOrders = sections[1].split("\n").filter(Boolean).map((s) => {
    const res = /move (.*) from (.*) to (.*)/g.exec(s)!;
    return {
      n: Number(res[1]),
      source: Number(res[2]) - 1,
      target: Number(res[3]) - 1,
    };
  });
  return {initialState, moveOrders}
};

export const day5 = (star: 1 | 2) => {
    const input = parseInput();
    const state = input.initialState;
    input.moveOrders.forEach((mo) => {
        const i = state[mo.source].length - mo.n;
        const res = state[mo.source].splice(i, mo.n);
        star === 1 && res.reverse();
        state[mo.target].push(...res);
    });
    return state.map((s) => s[s.length - 1]).join("");
}
