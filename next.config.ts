import type { NextConfig } from "next";
import { productionSiteUrl, resolveSiteUrl } from "./lib/site-url";
import { footerBuildNumber } from "./lib/build-number";

const configuredSiteUrl = resolveSiteUrl(process.env.SITE_URL?.trim() || productionSiteUrl);
const basePath = configuredSiteUrl?.pathname.replace(/\/$/, "") ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_BUILD_NUMBER: footerBuildNumber(process.env)
  },
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true
};

export default nextConfig;
