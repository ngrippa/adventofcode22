import * as fs from "fs";
import * as path from "path";

const merge = (intervals: [number, number][]) => {
  if (intervals.length < 2) return intervals;

  intervals.sort((a, b) => a[0] - b[0]);

  const result = [];
  let previous = intervals[0];

  for (let i = 1; i < intervals.length; i += 1) {
    if (previous[1] >= intervals[i][0]) {
      previous = [previous[0], Math.max(previous[1], intervals[i][1])];
    } else {
      result.push(previous);
      previous = intervals[i];
    }
  }

  result.push(previous);

  return result;
};

export const day15 = (star: 1 | 2) => {
  const i = fs
    .readFileSync(path.join("day15", "input"))
    .toString()
    .split("\n")
    .filter(Boolean)
    .map((s) => {
      const res =
        /Sensor at x=(.*), y=(.*): closest beacon is at x=(.*), y=(.*)/g
          .exec(s)!
          .map((n) => Number(n));
      return {
        x: res[1],
        y: res[2],
        radius: Math.abs(res[1] - res[3]) + Math.abs(res[2] - res[4]),
        beaconX: res[3],
        beaconY: res[4],
      };
    });

  const getInRange = (targetY: number) => {
    const ranges: [number, number][] = [];
    i.forEach((s) => {
      const remaining = s.radius - Math.abs(s.y - targetY);
      if (remaining < 0) return;
      ranges.push([s.x - remaining, s.x + remaining]);
    });
    const merged = merge(ranges);
    const n = merged.reduce((p, c) => p + c[1] - c[0], 0);
    return { n, merged };
  };
  if (star === 1) {
    // const maxX = Math.max(...i.flatMap((b) => [b.beaconX, b.x]));
    const targetY = 2000000;
    return getInRange(targetY).n;
  } else {
    const b = 4000000;
    for (let y = 0; y <= b; y++) {
      if (!(y % 100000)) console.log(y / 100000);
      const { merged } = getInRange(y);
      if (merged.length > 1) return y + (merged[0][1] + 1) * b
    }
  }
};
