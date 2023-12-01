import * as fs from "fs";
import * as path from "path";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

type N = {
  index: number;
  elevation: number;
  visited: boolean;
  distance: number;
};

type Dim = {
  x: number;
  y: number;
};

export const day12 = (s: 1 | 2) => {
    const input = fs
        .readFileSync(path.join("day12", "input"))
        .toString()
        .split("\n")
        .map((s) => s.split(""));
    const dim = { x: input[0].length, y: input.length };
    const f = input.flat();
    const allNodes: N[] = f.map((n, i) => {
        const l = n === "S" ? "a" : n === "E" ? "z" : n;
        return {
            index: i,
            elevation: alphabet.findIndex((s) => s === l),
            visited: false,
            distance: n === "E" ? 0 : Infinity,
        };
    });
    let notVisited = allNodes.slice();
    const target = f.findIndex((s) => s === "E");
    const start = f.findIndex((n) => n === "S");
    let current: N = { index: target, elevation: alphabet.length - 1, visited: false, distance: 0 };
    while (true) {
        if (s === 1 && current.index === start) return allNodes[start].distance;
        if (s === 2 && current.elevation === 0) return current.distance;
        getNeighbors(notVisited, current, dim).forEach((n) => {
            n.distance = Math.min(n.distance, current.distance + 1);
        });
        notVisited = notVisited.filter((n) => n.index !== current.index);
        current = notVisited.sort((a, b) => a.distance - b.distance)[0];
        if (!current) return false;
    }
};

export const getNeighbors = (field: N[], node: N, dim: Dim) => {
  return [-dim.x, dim.x, -1, 1]
    .map((off) => field.find((n) => n.index === node.index + off))
    .filter((n) => n && node.elevation - n.elevation <= 1) as N[];
};
