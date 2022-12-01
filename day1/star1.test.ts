import {calcMaxElf, day1Star1} from "./star1";

describe("star 1", () => {
    it("should return 1300", () => {
        const input = "3000\n8000\n\n12000\n\n7000\n6000"
        expect(calcMaxElf(input)).toBe(13000)
    })
    it("should return 71124", () => {
        expect(day1Star1()).toBe(71124)
    })
})
