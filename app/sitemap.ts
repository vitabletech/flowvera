import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { publicPages } from "@/lib/services";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteUrl ? publicPages
    .filter(page => page.href !== "/terms/" && page.href !== "/privacy/")
    .map(page => ({ url: new URL(page.href.replace(/^\//, ""), siteUrl).href })) : [];
}
