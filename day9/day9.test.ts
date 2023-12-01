import { day9, day9S2 } from "./day9";

describe("day 9", () => {
  it("should work correctly", () => {
    expect(day9()).toBe(6197);
  });
  it("should work with the s2 solution as well", () => {
    expect(day9S2(2)).toBe(6197);
  });
  it("should produce the correct solution for 10 knots", () => {
    expect(day9S2(10)).toBe(2562);
  });
});
