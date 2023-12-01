import { calcMaxElf, day1Star1 } from "../day1/star1";
import { calcTopThreeElves, day1Star2 } from "../day1/star2";
import {day3, day3Star2} from "./day3";

describe("day3", () => {
  it("should return the correct result for star 1", () => {
    expect(day3()).toBe(7908);
  });
    it("should return the correct result for star 2", () => {
        expect(day3Star2()).toBe(2838);
    });
});
