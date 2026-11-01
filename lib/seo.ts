import { productionSiteUrl, resolveSiteUrl } from "@/lib/site-url";
import type { Metadata } from "next";

export const siteUrl = resolveSiteUrl(process.env.SITE_URL?.trim() || productionSiteUrl, process.env.NEXT_PUBLIC_BASE_PATH);
export const siteTitle = "FlowVera | Water Treatment Solutions in Saudi Arabia";
export const siteDescription = "Water treatment systems, RO membranes, specialty chemicals and technical services in Saudi Arabia. Contact FlowVera in Al Khobar for your industrial water needs.";
export const socialImage = siteUrl
  ? new URL("assets/optimized/hero.webp", siteUrl).href
  : undefined;

export const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FlowVera",
  description: siteDescription,
  email: "info@flowveraarabia.com",
  telephone: "+966508607349",
  areaServed: { "@type": "Country", name: "Saudi Arabia" },
  ...(siteUrl ? {
    url: siteUrl.href,
    logo: new URL("assets/optimized/flowvera-logo.webp", siteUrl).href
  } : {})
};

export function pageMetadata(title: string, description: string, path: string, draft = false): Metadata {
  const url = siteUrl ? new URL(path.replace(/^\//, ""), siteUrl).href : undefined;
  const fullTitle = `${title} | FlowVera`;
  return {
    title: fullTitle,
    description,
    alternates: url ? { canonical: url } : {},
    openGraph: {
      title: fullTitle, description, type: "website", siteName: "FlowVera",
      ...(url ? { url } : {}),
      ...(socialImage ? { images: [{ url: socialImage, alt: "FlowVera water treatment equipment" }] } : {})
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, ...(socialImage ? { images: [socialImage] } : {}) },
    robots: { index: !draft, follow: true }
  };
}
