import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { publicPages } from "@/lib/services";
import { assetPath } from "@/lib/asset-path";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Sitemap", "Browse FlowVera pages, product categories, enquiry and demo requests, and draft legal policies.", "/site-map/");

export default function SitemapPage() {
  return <ContentPage title="Sitemap" intro="Find every public page and the main sections of the FlowVera website.">
    <div className="sitemap-columns">
      <section><h2>Pages</h2><ul>{publicPages.map(page => <li key={page.href}><Link href={page.href}>{page.title}</Link></li>)}</ul></section>
      <section><h2>Homepage sections</h2><ul>{[
        ["Water treatment process", "journey"], ["Solutions", "services"],
        ["Projects", "projects"], ["Specialty chemicals", "chemicals"], ["Contact and office locations", "contact"]
      ].map(([title, id]) => <li key={id}><Link href={`/#${id}`}>{title}</Link></li>)}</ul><h2>For search engines</h2><a href={assetPath("/sitemap.xml")}>View XML sitemap</a><p>Draft legal pages are available above but excluded from the XML sitemap until approved.</p></section>
    </div>
  </ContentPage>;
}
