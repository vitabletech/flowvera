import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { assetPath } from "@/lib/asset-path";
import { siteUrl, siteTitle, siteDescription, socialImage } from "@/lib/seo";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  ...(siteUrl ? { metadataBase: siteUrl, alternates: { canonical: siteUrl.href } } : {}),
  applicationName: "FlowVera",
  icons: { icon: assetPath("/assets/optimized/flowvera-logo.webp") },
  keywords: [
    "water treatment",
    "reverse osmosis",
    "RO membranes",
    "industrial water systems",
    "water treatment chemicals"
  ],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName: "FlowVera",
    locale: "en_US",
    ...(siteUrl ? { url: siteUrl.href } : {}),
    ...(socialImage ? { images: [{ url: socialImage, alt: "FlowVera industrial water treatment equipment" }] } : {}),
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    ...(socialImage ? { images: [socialImage] } : {})
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={manrope.variable + " " + inter.variable}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
