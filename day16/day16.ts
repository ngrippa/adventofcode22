import * as fs from "fs";
import * as path from "path";

type N = {
  valve: number;
  flow: number;
  targets: number[];
  start: boolean;
};

export const day16 = (star: 1 | 2) => {
  const input = prepareInput();
  const distances = floydWarshall(input);
  const without0Flow = input.filter((v) => v.flow);
  const start = input.find((i) => i.start)!
  const p1 = rec(
    distances,
    start,
    without0Flow,
    0,
    0,
    star === 1 ? 30 : 26,
    []
  );
  if (star === 1) return p1[0];
  const remaining = without0Flow.filter((n) => !p1[1].some((v) => v.valve === n.valve));
  const p2 = rec(
      distances,
      start,
      remaining,
      0,
      0,
      26,
      []
  );



  return p2[0] + p1[0];
};

const rec = (
  dist: number[][],
  currentNode: N,
  remaining: N[],
  flowPerMinute: number,
  totalFlow: number,
  remainingMinutes: number,
  hist: N[]
): [number, N[]] => {
  const hists: N[][] = [];
  if (!remaining.length) {
    return [totalFlow + remainingMinutes * flowPerMinute, hist];
  }
  const flows = [];

  for (let n = 0; n < remaining.length; n++) {
    const next = remaining[n];
    const nextRemaining = remaining.filter((v) => v.valve !== next.valve);
    const distance = dist[currentNode.valve][next.valve] + 1;
    const distanceTraveled = Math.min(distance, remainingMinutes);
    const thisTotFlow = totalFlow + distanceTraveled * flowPerMinute;
    if (remainingMinutes - distance <= 0) {
      flows.push(thisTotFlow);
    } else {
      const [nextFlow, nextHist] = rec(
        dist,
        next,
        nextRemaining,
        flowPerMinute + next.flow,
        thisTotFlow,
        remainingMinutes - distance,
        hist
      );
      flows.push(nextFlow);
      hists.push(nextHist);
    }
  }
  const max = Math.max(...flows, 0);
  const i = flows.findIndex((f) => f === max);
  const h: N[] = [...(hists[i] || []), remaining[i]];
  return [max, h];
};

const prepareInput = (): N[] =>
  fs
    .readFileSync(path.join("day16", "input"))
    .toString()
    .split("\n")
    .filter(Boolean)
    .map((s) => {
      const res =
        /Valve (.*) has flow rate=(.*); tunnels? leads? to valves? (.*)/g.exec(
          s
        )!;
      return {
        valve: res[1],
        flow: Number(res[2]),
        targets: res[3].split(", "),
      };
    })
    .map((v, i, a) => {
      return {
        valve: i,
        flow: v.flow,
        targets: v.targets.map((t) => a.findIndex((s) => s.valve === t)),
        start: v.valve === "AA",
      };
    });

const floydWarshall = (v: N[]) => {
  const dist: number[][] = new Array(v.length)
    .fill(1)
    .map((n) => new Array(v.length).fill(Infinity));
  v.forEach((v) => {
    dist[v.valve][v.valve] = 0;
    v.targets.forEach((t) => (dist[v.valve][t] = 1));
  });
  for (let k = 0; k < v.length; k++) {
    for (let i = 0; i < v.length; i++) {
      for (let j = 0; j < v.length; j++) {
        if (dist[i][j] > dist[i][k] + dist[k][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  return dist;
};
