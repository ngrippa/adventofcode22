import {day5, parseInput} from "./day5";

test("Parse input", () => {
  const i = parseInput();
  expect(i.initialState).toHaveLength(9);
  expect(i.initialState[0]).toHaveLength(5);
  expect(i.initialState[0][0]).toBe("Z");
  expect(i.initialState[1]).toHaveLength(4);
  expect(i.initialState[1][3]).toBe("B");
  expect(i.moveOrders[0]).toEqual({n: 7, source: 2, target: 8})
  expect(i.moveOrders[i.moveOrders.length - 1]).toEqual({n: 3, source: 4, target: 0})
});

test("d5", () => {
  expect(day5(1)).toBe("VQZNJMWTR")
  expect(day5(2)).toBe("NLCDCLVMQ")
})
