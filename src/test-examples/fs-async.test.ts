import { describe, it, beforeAll, afterAll, expect } from "vitest";
import path from "node:path";
import fs from "node:fs/promises";
import { getPathStatus, writeFile, readFile, removePath } from "./fs-async.js";

/**
 * /bin/bash test.sh src/test-examples/fs-async.test.ts
 */
describe("fs-async example tests", () => {
  const testDir = path.resolve("temp-test-dir");
  const testFile = path.resolve(testDir, "example.txt");
  const testSubDir = path.resolve(testDir, "subdir");

  beforeAll(async () => {
    // Cleanup any leftovers
    await fs.rm(testDir, { recursive: true, force: true });
  });

  afterAll(async () => {
    // Cleanup
    await fs.rm(testDir, { recursive: true, force: true });
  });

  it("should write and read a file successfully", async () => {
    const content = "Hello Modern FS!";
    await writeFile(testFile, content);

    const readContent = await readFile(testFile);
    expect(readContent).toBe(content);
  });

  it("should check path status correctly (file, dir, exists)", async () => {
    await fs.mkdir(testSubDir, { recursive: true });

    // Check file status
    const fileStatus = await getPathStatus(testFile);
    expect(fileStatus.exists).toBe(true);
    expect(fileStatus.isFile).toBe(true);
    expect(fileStatus.isDirectory).toBe(false);
    expect(fileStatus.isReadable).toBe(true);
    expect(fileStatus.isWritable).toBe(true);

    // Check directory status
    const dirStatus = await getPathStatus(testSubDir);
    expect(dirStatus.exists).toBe(true);
    expect(dirStatus.isFile).toBe(false);
    expect(dirStatus.isDirectory).toBe(true);

    // Check non-existent path
    const nonExistentStatus = await getPathStatus(
      path.resolve(testDir, "ghost.txt"),
    );
    expect(nonExistentStatus.exists).toBe(false);
  });

  it("should handle reading non-existent file with custom error message", async () => {
    const ghostPath = path.resolve(testDir, "ghost.txt");
    await expect(readFile(ghostPath)).rejects.toThrow(
      `fs-async.ts error: Failed to read ${ghostPath}`,
    );
  });

  it("should remove paths correctly", async () => {
    // Test file removal
    await removePath(testFile);
    const fileStatus = await getPathStatus(testFile);
    expect(fileStatus.exists).toBe(false);

    // Test directory removal
    await removePath(testSubDir);
    const dirStatus = await getPathStatus(testSubDir);
    expect(dirStatus.exists).toBe(false);
  });

  it("should check symlink status (if supported by OS/permissions)", async () => {
    const symlinkPath = path.resolve(testDir, "link-to-readme.md");
    const targetPath = path.resolve("README.md");

    try {
      // Create a symlink for testing
      await fs.symlink(targetPath, symlinkPath);

      const status = await getPathStatus(symlinkPath);
      expect(status.exists).toBe(true);
      expect(status.isSymbolicLink).toBe(true);

      // Cleanup symlink
      await fs.unlink(symlinkPath);
    } catch (e: any) {
      if (e.code === "EPERM") {
        // Skip link test if no permissions (common on Windows without dev mode)
        console.warn("Skipping symlink test due to lack of permissions");
      } else {
        throw e;
      }
    }
  });
});
