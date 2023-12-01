import * as fs from "fs";
import * as path from "path";

type Monkey = {
  n: number;
  items: number[];
  operation: string;
  test: number;
  targetTrue: number;
  targetFalse: number;
};

export const getMonkeys = () => {
  const input = fs
    .readFileSync(path.join("day11", "input"))
    .toString()
    .split("\n");
  const monkeys: Monkey[] = [];
  for (let i = 0; i < input.length; i += 7) {
    const n = Number(/Monkey (.*):/g.exec(input[i])![1]);
    const items = input[i + 1]
      .split(": ")[1]
      .split(", ")
      .map((s) => Number(s));
    const operation = input[i + 2].split("new = ")[1];
    const test = Number(input[i + 3].split("by ")[1]);
    const targetTrue = Number(input[i + 4].split("monkey ")[1]);
    const targetFalse = Number(input[i + 5].split("monkey ")[1]);
    monkeys.push({
      n,
      items,
      operation,
      test,
      targetTrue,
      targetFalse,
    });
  }
  return monkeys;
};

export const day11 = (star: 1 | 2) => {
  const monkeys = getMonkeys();
  const div = monkeys.reduce((p, c) => p * c.test, 1);
  const inspections = new Array(monkeys.length).fill(0);
  new Array(star === 1 ? 20 : 10000).fill(1).forEach((_, round) => {
    monkeys.forEach((monkey) => {
      monkey.items.forEach((old) => {
        let newLvl = eval(monkey.operation);
        newLvl = star === 1 ? Math.floor(newLvl / 3) : newLvl % div;
        monkeys[
          newLvl % monkey.test ? monkey.targetFalse : monkey.targetTrue
        ].items.push(newLvl);
        inspections[monkey.n]++;
      });
      monkey.items = [];
    });
  });
  inspections.sort((a, b) => b - a);
  return inspections[0] * inspections[1];
};
