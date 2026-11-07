import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export function createBuildVersion(releaseVersion, env, commitSha, builtAt = new Date().toISOString()) {
  if (typeof releaseVersion !== "string" ||
      !/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(releaseVersion)) {
    throw new Error("package.json must contain a semantic release version.");
  }
  if (!/^(?:[0-9a-f]{40}|[0-9a-f]{64})$/i.test(commitSha)) {
    throw new Error("Build metadata requires a valid full Git commit SHA.");
  }

  const githubBuild = env.GITHUB_ACTIONS === "true";
  let buildNumber = null;
  let runAttempt = null;
  let workflowRunUrl = null;
  if (githubBuild) {
    for (const name of ["GITHUB_RUN_NUMBER", "GITHUB_RUN_ATTEMPT", "GITHUB_RUN_ID"]) {
      if (!/^[1-9]\d*$/.test(env[name] ?? "") || !Number.isSafeInteger(Number(env[name]))) {
        throw new Error(`${name} must be a positive safe integer for GitHub builds.`);
      }
    }
    if (!/^[\w.-]+\/[\w.-]+$/.test(env.GITHUB_REPOSITORY ?? "")) {
      throw new Error("GITHUB_REPOSITORY must identify the repository for GitHub builds.");
    }
    const server = new URL(env.GITHUB_SERVER_URL);
    if (!["http:", "https:"].includes(server.protocol) || server.username || server.password ||
        server.pathname !== "/" || server.search || server.hash) {
      throw new Error("GITHUB_SERVER_URL must be an HTTP(S) server-root URL.");
    }
    buildNumber = Number(env.GITHUB_RUN_NUMBER);
    runAttempt = Number(env.GITHUB_RUN_ATTEMPT);
    workflowRunUrl = `${server.origin}/${env.GITHUB_REPOSITORY}/actions/runs/${env.GITHUB_RUN_ID}`;
  }

  const suffix = githubBuild ? `build.${buildNumber}.${runAttempt}` : `local.${commitSha.slice(0, 7)}`;
  return {
    version: `${releaseVersion}${releaseVersion.includes("+") ? "." : "+"}${suffix}`,
    releaseVersion,
    buildNumber,
    runAttempt,
    commitSha,
    builtAt,
    workflowRunUrl
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const { version } = JSON.parse(readFileSync("package.json", "utf8"));
  const commitSha = process.env.GITHUB_ACTIONS === "true"
    ? process.env.GITHUB_SHA
    : execFileSync("git", ["rev-parse", "--verify", "HEAD"], { encoding: "utf8" }).trim();
  const metadata = createBuildVersion(version, process.env, commitSha);
  writeFileSync("out/version.json", `${JSON.stringify(metadata, null, 2)}\n`);
  console.log(`Build version: ${metadata.version} (${metadata.commitSha})`);
}
