import { test, expect } from "vitest";

/**
 * /bin/bash test.sh src/test-examples/test.test.ts
 */

test("strictEqual", () => {
  const arr = [1, 2];

  expect(arr).toBe(arr); // ✅ passes (reference equality)

  // expect(1).toBe("1"); // ❌ fails (strict equality)
  /**
   * Expected: "1"
   * Received: 1
   */

  // expect([1, 2]).toBe([1, 2]); // ❌ fails (different instances)
});

test("deepStrictEqual", () => {
  const arr = [1, 2];

  expect(arr).toEqual(arr); // ✅ passes

  expect([1, 2]).toEqual([1, 2]); // ✅ passes (deep equality)
});
