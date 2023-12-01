import {d6} from "./day6";

describe("day 6", () => {
    test("D6S1C1", () => {
        expect(d6(1, "bvwbjplbgvbhsrlpgdmjqwftvncz")).toBe(5)
    })

    test("D6S1C2", () => {
        expect(d6(1, "nppdvjthqldpwncqszvftbrmjlhg")).toBe(6)
    })

    test("D6S1C3", () => {
        expect(d6(1, "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")).toBe(10)
    })

    test("D6S1C4", () => {
        expect(d6(1, "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")).toBe(11)
    })

    test("D6S1", () => {
        expect(d6(1 )).toBe(1155)
    })

    test("D6S2", () => {
        expect(d6(2 )).toBe(2789)
    })
})
