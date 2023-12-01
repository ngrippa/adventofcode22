import * as fs from "fs";
import * as path from "path";

const lower = "abcdefghijklmnopqrstuvwxyz";
const all = (lower + lower.toUpperCase()).split("");

const getCommonPrio = (a: string, b: string, c?: string) => {
    const l = a.split("").find((l) => b.includes(l) && (!c || c.includes(l)));
    return all.findIndex((c) => c === l) + 1;
}

export const day3 = () => {
    return fs.readFileSync(path.join("day3", "input")).toString().split("\n").map((s) => {
        const half = s.length / 2;
        return getCommonPrio(s.slice(0, half), s.slice(half))
    }).reduce((prev, curr) => prev + curr, 0);
}

export const day3Star2 = () => {
    const split =  fs.readFileSync(path.join("day3", "input")).toString().split("\n");
    const prios = [];
    for (let i = 0; i < split.length; i+=3) {
        prios.push(getCommonPrio(split[i], split[i + 1], split[i + 2]))
    }
    return prios.reduce((prev, curr) => prev + curr, 0);
}
