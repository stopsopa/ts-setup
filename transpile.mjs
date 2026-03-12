import ts from "typescript";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, basename } from "node:path";

function stripTypes(filePath) {
  const source = readFileSync(filePath, "utf8");

  const result = ts.transpileModule(source, {
    compilerOptions: {
      target: "ESNext",
      module: "ESNext",
      removeComments: false
    }
  });

  const outPath = join(
    dirname(filePath),
    basename(filePath).replace(/\.ts$/, ".js")
  );

  writeFileSync(outPath, result.outputText);
}

const files = process.argv.slice(2);
files.forEach(stripTypes);