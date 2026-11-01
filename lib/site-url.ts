export const productionSiteUrl = "http://www.flowveraarabia.com/";

export function resolveSiteUrl(value: string | undefined, basePath = ""): URL | undefined {
  if (!value?.trim()) return undefined;
  let url;
  try {
    url = new URL(value.trim());
  } catch {
    throw new Error("SITE_URL must be an absolute HTTP or HTTPS URL.");
  }
  if (!["https:", "http:"].includes(url.protocol) || url.username || url.password || url.search || url.hash) {
    throw new Error("SITE_URL must use HTTP or HTTPS without credentials, query parameters, or fragments.");
  }
  const path = url.pathname.replace(/\/+$/, "");
  if (basePath && path && path !== basePath) {
    throw new Error("SITE_URL path must match the configured GitHub Pages base path.");
  }
  url.pathname = `${path || basePath}/`;
  return url;
}
