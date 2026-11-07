import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const filter = fileURLToPath(new URL("../.github/deploy/godaddy.rsync-filter", import.meta.url));

test("GoDaddy sync replaces build files and removes stale output without deleting hosting content", () => {
  const temporary = mkdtempSync(join(tmpdir(), "flowvera-deploy-test-"));
  const source = join(temporary, "out");
  const destination = join(temporary, "public_html");
  const write = (root, path, content) => {
    const target = join(root, path);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, content);
  };
  const protectedPaths = [
    ".htaccess",
    ".well-known/acme-challenge/token",
    "cgi-bin/tool.cgi",
    "test.flowveraarabia.com/index.html",
    "test.flowveraarabia.com/_next/old.js",
    "404.shtml",
    "manual-uploads/nested/document.txt",
    "hosting-config.txt"
  ];
  const stalePaths = [
    "_next/static/old.js",
    "assets/old.webp",
    "products/removed/index.html",
    "book-demo/index.html",
    "_not-found/index.html",
    "404/index.html",
    "layout-styles.css",
    "__next._full.txt",
    "__next.__PAGE__.txt"
  ];
  try {
    for (const path of protectedPaths) write(destination, path, `preserve ${path}`);
    for (const path of stalePaths) write(destination, path, "stale build");
    write(destination, "index.html", "old homepage");
    write(destination, "version.json", '{"version":"old"}');
    write(source, "index.html", "new homepage");
    write(source, "version.json", '{"version":"1.0.0+build.42.1"}');
    write(source, "_next/static/new.js", "new script");
    write(source, "products/current/index.html", "current product");
    write(source, "new-route/index.html", "new route");

    execFileSync("rsync", [
      "-rlpz", "--checksum", "--delay-updates", "--delete-delay", "--itemize-changes",
      "--chmod=Du=rwx,Dgo=rx,Fu=rw,Fgo=r", `--filter=merge ${filter}`,
      `${source}/`, `${destination}/`
    ], { encoding: "utf8" });

    for (const path of protectedPaths) {
      assert.equal(readFileSync(join(destination, path), "utf8"), `preserve ${path}`);
    }
    for (const path of stalePaths) {
      assert.equal(existsSync(join(destination, path)), false, `${path} should be deleted`);
    }
    for (const path of ["index.html", "version.json", "_next/static/new.js", "products/current/index.html", "new-route/index.html"]) {
      assert.equal(readFileSync(join(destination, path), "utf8"), readFileSync(join(source, path), "utf8"));
    }
    assert.equal(statSync(join(destination, "index.html")).mode & 0o777, 0o644);
    assert.equal(statSync(join(destination, "_next")).mode & 0o777, 0o755);
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});
