import { test, expect } from "vitest";
import { UserRegistry } from "./map.js";

/**
 * /bin/bash test.sh src/test-examples/map.test.ts
 */
test("UserRegistry (Map usage)", () => {
  const registry = new UserRegistry();

  // Test addUser and getUser
  registry.addUser(1, "Alice");
  registry.addUser(2, "Bob");
  expect(registry.getUser(1)).toBe("Alice");
  expect(registry.getUser(2)).toBe("Bob");

  // Test totalUsers (size)
  expect(registry.totalUsers).toBe(2);

  // Test hasUser
  expect(registry.hasUser(1)).toBe(true);
  expect(registry.hasUser(3)).toBe(false);

  // Test getAllUserNames and getAllUserIds
  expect(registry.getAllUserNames()).toEqual(["Alice", "Bob"]);
  expect(registry.getAllUserIds()).toEqual([1, 2]);

  // Test removeUser
  const removed = registry.removeUser(1);
  expect(removed).toBe(true);
  expect(registry.hasUser(1)).toBe(false);
  expect(registry.totalUsers).toBe(1);

  // Test clearRegistry
  registry.clearRegistry();
  expect(registry.totalUsers).toBe(0);
});
