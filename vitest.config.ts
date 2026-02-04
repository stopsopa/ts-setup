import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["src/**"],
      reporter: process.env.SILENT
        ? ["lcov", "html"]
        : ["lcov", "html", "text"],
      reportsDirectory: "./coverage",
      enabled: false, // will be enabled via CLI --coverage
    },
  },
});
