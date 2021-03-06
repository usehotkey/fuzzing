import {testNonConsequentArray} from "../__tests__/array.spec";
import {cornerCaseNumberArray, mathNumberArray, nonConsequentNumberArray} from "../number";

describe("boolean checker", () => {
    testNonConsequentArray({
        expected: 13,
        func: nonConsequentNumberArray,
        message: "nonConsequentNumberArray should contain undefined under set value",
    });

    test("cornerCaseNumbers should contain correct array", () => {
        const numbers = cornerCaseNumberArray();

        expect(numbers).toEqual([
            0,
            1,
            -1,
            Number.MIN_VALUE,
            Number.MAX_VALUE,
            Number.NaN,
            Number.NEGATIVE_INFINITY,
            Number.POSITIVE_INFINITY,
        ]);
    });

    test("mathNumberArray should contain correct array", () => {
        const numbers = mathNumberArray();

        expect(numbers).toEqual([
            Math.E,
            Math.PI,
            Math.LN2,
            Math.LN10,
            Math.LOG2E,
            Math.LOG10E,
            Math.SQRT1_2,
            Math.SQRT2,
        ]);
    });
});
