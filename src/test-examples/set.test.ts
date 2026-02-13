import { test, expect } from "vitest";
import { TagManager } from "./set.js";

/**
 * /bin/bash test.sh src/test-examples/set.test.ts
 */
test("TagManager (Set usage)", () => {
  const manager = new TagManager();

  // Test addTag (should handle duplicates and normalization)
  manager.addTag("TypeScript");
  manager.addTag("typescript "); // Normalized to 'typescript'
  manager.addTag("JAVASCRIPT");

  expect(manager.count).toBe(2);
  expect(manager.hasTag("typescript")).toBe(true);
  expect(manager.hasTag("TYPESCRIPT")).toBe(true);
  expect(manager.hasTag("javascript")).toBe(true);

  // Test getTags
  expect(manager.getTags().sort()).toEqual(["javascript", "typescript"]);

  // Test getIntersection
  const common = manager.getIntersection([
    "typescript",
    "python",
    "javascript",
  ]);
  expect(common.sort()).toEqual(["javascript", "typescript"]);

  // Test removeTag
  const removed = manager.removeTag("typescript");
  expect(removed).toBe(true);
  expect(manager.count).toBe(1);
  expect(manager.hasTag("typescript")).toBe(false);

  // Test clear
  manager.clear();
  expect(manager.count).toBe(0);
});
