import * as fs from "fs";

export const day1Star2 = () => {
    const i = fs.readFileSync("./day1/star1input");
    return calcTopThreeElves(i.toString());
};

export const calcTopThreeElves = (input: string) => {
    const groups = input.split("\n\n");
    const scores = groups.map((g) =>
        g.split("\n").reduce((prev, curr) => prev + Number(curr), 0)
    ).sort((a, b) => b-a).slice(0, 3);
    return scores.reduce((prev, curr) => prev + curr, 0);
};
