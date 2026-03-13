import ts from "typescript";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, basename } from "node:path";
import { stdin } from "node:process";

const COMPILER_OPTIONS = {
  target: ts.ScriptTarget.ESNext,
  module: ts.ModuleKind.ESNext,
  lib: ["lib.esnext.d.ts"],
  esModuleInterop: true,
  forceConsistentCasingInFileNames: true,
  skipLibCheck: true,
  verbatimModuleSyntax: true,
  removeComments: false,
  isolatedModules: true,
  indentSize: 2,
};

function stripTypes(filePath) {
  try {
    const source = readFileSync(filePath, "utf8");

    const result = ts.transpileModule(source, {
      compilerOptions: COMPILER_OPTIONS,
      reportDiagnostics: true,
    });

    let outputText = result.outputText;

    // Respect the indentSize setting from our configuration
    if (COMPILER_OPTIONS.indentSize === 2) {
      // 1. Convert 4-space indentation to 2-space, including after comment markers
      outputText = outputText.replace(
        /^(\s*(?:\*|\/\/)?\s*)(.*)/gm,
        (_, prefix, content) => {
          return prefix.replace(/ {4}/g, "  ") + content;
        }
      );

      // 2. Unjam "} else {" and "} catch {" which TS outputs on separate lines
      outputText = outputText.replace(/\}\s*\n\s*(else|catch|finally)/g, "} $1");
    }

    const outPath = join(
      dirname(filePath),
      basename(filePath).replace(/\.ts$/, ".js")
    );

    writeFileSync(outPath, outputText);
    console.log(`Transpiled: ${filePath} -> ${outPath}`);
  } catch (err) {
    console.error(`Error processing ${filePath}: ${err.message}`);
  }
}

function showHelp() {
  console.log(`
Usage:
  find public -name '*.ts' | NODE_OPTIONS="" node transpile.mjs

Description:
  Transpiles TypeScript files to JavaScript, stripping types and applying
  custom formatting (2-space indentation, unjamming braces).
  It accepts a newline-separated list of files from stdin.
  
Built-in Config:
${JSON.stringify(COMPILER_OPTIONS, null, 2)}
`);
}

async function main() {
  if (stdin.isTTY) {
    showHelp();
    process.exit(0);
  }

  let input = "";
  stdin.setEncoding("utf8");

  for await (const chunk of stdin) {
    input += chunk;
  }

  const files = input
    .split(/\r?\n/)
    .map((f) => f.trim())
    .filter((f) => f.length > 0);

  if (files.length === 0) {
    showHelp();
    process.exit(0);
  }

  files.forEach(stripTypes);
}

main();