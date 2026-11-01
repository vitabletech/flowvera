import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ContentPage } from "@/components/content-page";
import { services, serviceHref } from "@/lib/services";
import { assetPath } from "@/lib/asset-path";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Products & Services", "Explore FlowVera water treatment systems, RO services, filtration, pumps, tanks and specialty chemicals in Saudi Arabia.", "/products/");

export default function ProductsPage() {
  return <ContentPage title="Products & Services" intro="Explore our solutions, review what to share with our team, and send a product-specific enquiry.">
    <div className="product-grid">
      {services.map(s => <article className="service-card" key={s.slug}>
        <Link className="service-card-link" href={serviceHref(s.slug)}>
          <div className="service-image"><Image src={assetPath(s.image)} alt="" fill sizes="(max-width: 680px) 90vw, (max-width: 1023px) 44vw, 384px" /></div>
          <div className="service-copy"><h2>{s.title}</h2><p>{s.description}</p><span className="text-link">View solution <ArrowUpRight size={16} aria-hidden="true" /></span></div>
        </Link>
      </article>)}
    </div>
  </ContentPage>;
}
