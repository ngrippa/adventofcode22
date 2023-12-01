import { day15 } from "./day15";

describe("Day 15", () => {
  it("S1 should work correctly", () => {
    const res = day15(1);
    expect(res).toBe(4951427);
  });
  it("S2 should work correctly", () => {
    const res = day15(2);
    expect(res).toBe(13029714573243);
  });
});
