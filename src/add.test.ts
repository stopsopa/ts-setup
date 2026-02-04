import { test } from "node:test";
import assert from "node:assert";
import { sum } from "./add.ts";

test("sum function", () => {
  assert.strictEqual(sum(1, 2), 3);
});
