import { sum } from "./add.ts";

/**
 * /bin/bash test.sh src/test-examples/add.test.ts
 */
test("sum function", () => {
  expect(sum(1, 2)).toBe(3);
});
