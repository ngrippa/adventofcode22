import * as fs from "fs";
import * as path from "path";
const treshold = 100000;
export const day7 = (star: 1 | 2) => {
  const input = fs
    .readFileSync(path.join("day7", "input"))
    .toString()
    .split("\n");
  const cdins = input
    .map((c, i) => (c.startsWith("$ cd") && !c.includes("..") ? i : -1))
    .filter((d) => d !== -1);

  const sizes = cdins.map((s) => {
    let fileSize = 0;
    let layer = 0;
    let i = s;
    while (layer >= 0 && (star === 2 || fileSize <= treshold)) {
      i++;
      const row = input[i];
      if (!row) break;
      if (row.startsWith("$ cd")) {
        row.includes("..") ? layer-- : layer++;
      } else if (!row.startsWith("$") && !row.startsWith("dir")) {
        fileSize += +row.split(" ")[0];
      }
    }
    return fileSize;
  });

  if (star === 1) {
    return sizes.filter((s) => s <= treshold).reduce((p, c) => p + c, 0);
  } else {
      const remaining = 70000000 - sizes[0];
      const toFree = 30000000 - remaining;
      sizes.sort((a, b) => a-b);
      return sizes.find((r) => r >= toFree);
  }
};
