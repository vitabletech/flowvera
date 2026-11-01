import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

const source = readFileSync(new URL("../lib/carousel-loop.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const { loopIndex, loopTarget, repeatSlides } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled.outputText).toString("base64")}`
);

test("three images repeat in order across multiple forward and backward cycles", () => {
  assert.deepEqual(Array.from({ length: 12 }, (_, position) => loopIndex(position, 3)), [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2]);
  assert.deepEqual([0, -1, -2, -3, -4].map(position => loopIndex(position, 3)), [0, 2, 1, 0, 2]);
});

test("dot navigation chooses the nearest copy, including either loop boundary", () => {
  assert.equal(loopTarget(5, 0, 3), 6);
  assert.equal(loopTarget(3, 2, 3), 2);
  assert.equal(loopTarget(4, 1, 3), 4);
  assert.equal(loopTarget(5, 1, 3), 4);
});

test("repeated slides fill wide windows even when fewer images exist than visible slots", () => {
  for (const visible of [1, 3, 8]) {
    const slides = repeatSlides(["1", "2", "3"], visible);
    for (const start of [2, 3, 5, 6]) {
      assert.equal(slides.slice(start, start + visible).length, visible);
      assert.deepEqual(slides.slice(start, start + visible).map(slide => slide.item),
        Array.from({ length: visible }, (_, offset) => String(loopIndex(start + offset, 3) + 1)));
    }
    assert.ok(slides.every((slide, position) => slide.position === position && slide.logicalIndex === position % 3));
  }
});

test("single-slide and empty collections are safe", () => {
  assert.equal(loopIndex(-1, 1), 0);
  assert.equal(loopTarget(1, 0, 1), 1);
  assert.deepEqual(repeatSlides([], 3), []);
  assert.deepEqual(repeatSlides(["1"], 2).map(slide => slide.item), ["1", "1", "1", "1", "1"]);
});
