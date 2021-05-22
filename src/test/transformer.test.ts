import { Transformer } from "../lib/transformer"

it("sample test", () => {
    expect(Transformer.basisMatrix.get([1,1])).toBe(1);
});