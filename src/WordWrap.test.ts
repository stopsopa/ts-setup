import { test } from "node:test";
import assert from "node:assert";
import { WordWrap, WordWrapByWords } from "./WordWrap.ts";

/**
 * /bin/bash ts.sh --test --watch src/WordWrap.test.ts
 */
test("WordWrap - simple", () => {
  const input = `Hello Word`;

  const expected: string[] = ["Hello Word"];

  const result = WordWrapByWords(input, 20);

  // console.log(JSON.stringify(result, null, 4));

  assert.deepStrictEqual(result, expected);
});

test("WordWrap - longer", () => {
  const input = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed `;

  const expected: string[] = [
    "Lorem ipsum dolor",
    "amet, consectetur",
    "elit, sed ",
  ];

  const result = WordWrapByWords(input, 20);

  // console.log(JSON.stringify(result, null, 4));

  assert.deepStrictEqual(result, expected);
});

test("WordWrap - longer", () => {
  const input = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed go`;

  const expected: string[] = [
    "Lorem ipsum dolor si",
    "t amet, consectetur ",
    "adipiscing elit, sed",
    " go",
  ];

  const result = WordWrap(input, 20);

  // console.log(JSON.stringify(result, null, 4));

  assert.deepStrictEqual(result, expected);
});

// WordWrap('Hello World', 4) => 'Hell', 'o Wo', 'rld'
test("WordWrap - longer count", () => {
  const input = `Hello Word`;

  const expected: string[] = ["Hell", "o Wo", "rd"];

  const result = WordWrap(input, 4);

  // console.log(JSON.stringify(result, null, 4));

  assert.deepStrictEqual(result, expected);
});

// WordWrap('Hello World', 4) => 'Hell', 'o Wo', 'rld'
test("WordWrap - longer count", () => {
  const input = `foobarbaz`;

  const expected: string[] = ["foo", "bar", "baz"];

  const result = WordWrap(input, 3);

  // console.log(JSON.stringify(result, null, 4));

  assert.deepStrictEqual(result, expected);
});

// WordWrap('Hello      World', 5) => 'Hello', 'World'

test("WordWrap - longer count", () => {
  const input = `Hello      World`;

  const expected: string[] = ["Hel", "lo ", "Wor", "ld"];

  const result = WordWrap(input, 3);

  // console.log(JSON.stringify(result, null, 4));

  assert.deepStrictEqual(result, expected);
});
