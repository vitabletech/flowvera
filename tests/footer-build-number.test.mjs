import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";
import { createBuildVersion } from "../scripts/write-build-version.mjs";

const source = readFileSync(new URL("../lib/build-number.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const { footerBuildNumber } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled.outputText).toString("base64")}`
);

test("footer build number matches the deployed metadata run and attempt", () => {
  const env = {
    GITHUB_ACTIONS: "true",
    GITHUB_RUN_NUMBER: "42",
    GITHUB_RUN_ATTEMPT: "2",
    GITHUB_RUN_ID: "1234",
    GITHUB_REPOSITORY: "vitabletech/flowvera",
    GITHUB_SERVER_URL: "https://github.com"
  };
  const metadata = createBuildVersion("1.0.2", env, "a".repeat(40));
  assert.equal(footerBuildNumber(env), `Build ${metadata.buildNumber}.${metadata.runAttempt}`);
});

test("local builds do not present unrelated CI values as deployment numbers", () => {
  assert.equal(footerBuildNumber({}), "Local build");
  assert.equal(footerBuildNumber({ GITHUB_RUN_NUMBER: "42" }), "Local build");
});

test("missing or invalid GitHub build numbers fail explicitly", () => {
  for (const name of ["GITHUB_RUN_NUMBER", "GITHUB_RUN_ATTEMPT"]) {
    for (const value of [undefined, "", "0", "-1", "1.5", "01", "abc", "9007199254740992"]) {
      assert.throws(() => footerBuildNumber({
        GITHUB_ACTIONS: "true",
        GITHUB_RUN_NUMBER: "42",
        GITHUB_RUN_ATTEMPT: "1",
        [name]: value
      }), new RegExp(name));
    }
  }
});
