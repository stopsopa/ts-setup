import { test, expect } from "vitest";

/**
 * /bin/bash test.sh src/test-examples/promises.test.ts
 *
 * A function that mimics an asynchronous operation.
 * It succeeds if the input is valid, and fails otherwise.
 */
async function processData(
  input: string | null,
  delay: number = 100,
): Promise<string> {
  // Simulate an async delay
  await new Promise((resolve) => setTimeout(resolve, delay));

  if (!input) {
    throw new Error("Input is required");
  }

  if (input === "trigger-error") {
    throw new Error("Generic processing error");
  }

  return `Processed: ${input}`;
}

test("processData - success case", async () => {
  // This test will fail automatically if it takes longer than 50ms
  const result = await processData("hello world", 20);

  // Verify the success result
  expect(result).toBe("Processed: hello world");
}, 50);

test("processData - manual timeout with Promise.race", async () => {
  // If you need to CATCH a timeout in your logic, use Promise.race
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Manual timeout")), 50),
  );

  await expect(
    Promise.race([processData("too slow", 100), timeoutPromise]),
  ).rejects.toThrow("Manual timeout");
});

test("processData - failure case (missing input)", async () => {
  // Use expect().rejects to test for Promise rejections
  await expect(processData(null)).rejects.toThrow("Input is required");
});

test("processData - failure case (specific trigger)", async () => {
  await expect(processData("trigger-error")).rejects.toThrow(
    "Generic processing error",
  );
});
