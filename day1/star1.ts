import * as fs from "fs";

export const day1Star1 = () => {
  const i = fs.readFileSync("./day1/star1input");
  return calcMaxElf(i.toString());
};

export const calcMaxElf = (input: string) => {
  const groups = input.split("\n\n");
  const scores = groups.map((g) =>
    g.split("\n").reduce((prev, curr) => prev + Number(curr), 0)
  );
  return Math.max(...scores);
};
