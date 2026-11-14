import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

async function loadModule(file) {
  const source = readFileSync(new URL(file, import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
  return import(`data:text/javascript;base64,${Buffer.from(compiled.outputText).toString("base64")}`);
}

const { servicePages } = await loadModule("../lib/service-pages.ts");
const { services } = await loadModule("../lib/services.ts");

test("the five core catalog services have complete, distinct detail pages", () => {
  const coreServices = services.filter(service => service.slug !== "specialty-chemicals");
  assert.deepEqual(Object.keys(servicePages).sort(), coreServices.map(service => service.slug).sort());
  assert.equal(servicePages["specialty-chemicals"], undefined);
  assert.equal(new Set(Object.values(servicePages).map(page => page.engineeringCopy)).size, 5);
  assert.equal(new Set(Object.values(servicePages).map(page => page.processTitle)).size, 5);
  for (const { slug } of coreServices) {
    const page = servicePages[slug];
    assert.equal(page.systems.length, 5, slug);
    assert.equal(page.steps.length, 4, slug);
    assert.equal(page.overviewCopy.length, 2, slug);
    for (const field of ["engineeringTitle", "engineeringCopy", "engineeringAlt", "overviewTitle", "overviewLead", "overviewAlt", "systemsTitle", "systemsCopy", "processTitle", "processCopy", "qualityLabel", "qualityCopy"]) {
      assert.ok(page[field].trim(), `${slug}: ${field}`);
    }
    for (const step of page.steps) {
      assert.ok(step.title.trim() && step.copy.trim(), slug);
    }
  }
});

test("every service detail image is a local, existing delivery asset", () => {
  for (const [slug, page] of Object.entries(servicePages)) {
    const images = [page.heroImage, page.engineeringImage, page.overviewImage, ...page.systems.map(system => system.image)];
    for (const image of images) {
      assert.match(image, /^\/assets\/optimized\/[\w/-]+\.webp$/, slug);
      assert.ok(existsSync(new URL(`../public${image}`, import.meta.url)), `${slug}: ${image}`);
    }
  }
  assert.ok(existsSync(new URL("../public/assets/optimized/service-details/process.webp", import.meta.url)));
});

test("water treatment retains the five reference system categories", () => {
  assert.deepEqual(servicePages["water-treatment-systems"].systems.map(system => system.title), [
    "RO Standard Plants",
    "Booster Systems",
    "Water Softener Plants",
    "Demineralisation (DM) Plants",
    "CIP Systems"
  ]);
});
