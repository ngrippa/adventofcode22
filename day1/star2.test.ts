import {calcMaxElf, day1Star1} from "./star1";
import {calcTopThreeElves, day1Star2} from "./star2";

describe("star 2", () => {
    it("should return 1300", () => {
        const input = "3000\n8000\n\n12000\n\n7000\n6000"
        expect(calcTopThreeElves(input)).toBe(36000)
    })
    it("should return 71124", () => {
        expect(day1Star2()).toBe(204639)
    })
})
