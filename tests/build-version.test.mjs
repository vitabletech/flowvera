import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { createBuildVersion } from "../scripts/write-build-version.mjs";

const commitSha = "a".repeat(40);
const builtAt = "2026-11-07T14:00:00.000Z";
const env = {
  GITHUB_ACTIONS: "true",
  GITHUB_RUN_NUMBER: "42",
  GITHUB_RUN_ATTEMPT: "1",
  GITHUB_RUN_ID: "12345",
  GITHUB_REPOSITORY: "vitabletech/flowvera",
  GITHUB_SERVER_URL: "https://github.com"
};

test("GitHub builds expose an exact version, commit, timestamp, and run link", () => {
  assert.deepEqual(createBuildVersion("1.0.0", env, commitSha, builtAt), {
    version: "1.0.0+build.42.1",
    releaseVersion: "1.0.0",
    buildNumber: 42,
    runAttempt: 1,
    commitSha,
    builtAt,
    workflowRunUrl: "https://github.com/vitabletech/flowvera/actions/runs/12345"
  });
  assert.equal(createBuildVersion("1.0.0", { ...env, GITHUB_RUN_ATTEMPT: "2" }, commitSha).version,
    "1.0.0+build.42.2");
  assert.equal(createBuildVersion("1.0.0", { ...env, GITHUB_RUN_NUMBER: "43" }, commitSha).version,
    "1.0.0+build.43.1");
});

test("local builds are distinguishable and existing release metadata is preserved", () => {
  const metadata = createBuildVersion("1.2.0-beta.1+release", {}, commitSha, builtAt);
  assert.equal(metadata.version, "1.2.0-beta.1+release.local.aaaaaaa");
  assert.equal(metadata.buildNumber, null);
  assert.equal(metadata.runAttempt, null);
  assert.equal(metadata.workflowRunUrl, null);
});

test("invalid or missing CI metadata fails instead of reporting a local build", () => {
  for (const name of Object.keys(env).filter(name => name !== "GITHUB_ACTIONS")) {
    const incomplete = { ...env };
    delete incomplete[name];
    assert.throws(() => createBuildVersion("1.0.0", incomplete, commitSha));
  }
  for (const invalid of ["0", "-1", "1.5", "not-a-number", "9007199254740992"]) {
    assert.throws(() => createBuildVersion("1.0.0", { ...env, GITHUB_RUN_NUMBER: invalid }, commitSha));
  }
  assert.throws(() => createBuildVersion("1.0.0", env, undefined), /commit SHA/);
  assert.throws(() => createBuildVersion("invalid", env, commitSha), /release version/);
});

test("postbuild writes version.json into the static export without changing package.json", () => {
  const temporary = mkdtempSync(join(tmpdir(), "flowvera-version-test-"));
  try {
    mkdirSync(join(temporary, "out"));
    const packageJson = '{"version":"1.0.0"}\n';
    writeFileSync(join(temporary, "package.json"), packageJson);
    const script = fileURLToPath(new URL("../scripts/write-build-version.mjs", import.meta.url));
    execFileSync(process.execPath, [script], {
      cwd: temporary,
      env: { ...process.env, ...env, GITHUB_SHA: commitSha },
      encoding: "utf8"
    });
    const metadata = JSON.parse(readFileSync(join(temporary, "out/version.json"), "utf8"));
    assert.equal(metadata.version, "1.0.0+build.42.1");
    assert.equal(metadata.commitSha, commitSha);
    assert.equal(new Date(metadata.builtAt).toISOString(), metadata.builtAt);
    assert.equal(readFileSync(join(temporary, "package.json"), "utf8"), packageJson);
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});
