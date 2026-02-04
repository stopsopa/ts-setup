import { sum } from "./add.ts";

test("sum function", () => {
  expect(sum(1, 2)).toBe(3);
});
