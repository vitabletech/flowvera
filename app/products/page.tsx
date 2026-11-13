import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { ScrollToTop } from "@/components/scroll-to-top";
import { services, serviceHref } from "@/lib/services";
import { assetPath } from "@/lib/asset-path";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Products & Services",
  "Explore FlowVera water treatment systems, RO services, filtration, pumps, tanks and specialty chemicals in Saudi Arabia.",
  "/products/"
);

function ProductsHero() {
  return (
    <section className="products-hero" id="products">
      <div id="top" />
      <Image
        src={assetPath("/assets/optimized/products-hero.webp")}
        alt="FlowVera industrial water treatment plant and reverse osmosis system"
        fill
        priority
        className="products-hero-bg"
        sizes="100vw"
      />
      <div className="products-hero-shade" />
      <div className="products-hero-content">
        <nav className="breadcrumbs products-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Products &amp; Services</span>
        </nav>
        <h1>Products &amp; Services</h1>
        <p>Engineered water treatment systems, RO maintenance, filtration media, pumps, tanks, and specialty chemicals.</p>
      </div>
    </section>
  );
}

export default function ProductsPage() {
  return (
    <>
      <ScrollToTop />
      <SiteHeader />
      <ProductsHero />
      <main className="products-page-content section-wrap" id="main-content" tabIndex={-1}>
        <div className="products-grid-intro">
          <p className="eyebrow">OUR SOLUTIONS</p>
          <h2>Comprehensive Water Treatment &amp; Engineering Portfolio</h2>
          <p className="page-intro">
            Explore our full suite of industrial water treatment technologies, maintenance services, replacement spares, and treatment chemicals engineered for operations across Saudi Arabia.
          </p>
        </div>
        <div className="product-grid">
          {services.map(s => (
            <article className="service-card" key={s.slug}>
              <Link className="service-card-link" href={serviceHref(s.slug)}>
                <div className="service-image">
                  <Image
                    src={assetPath(s.image)}
                    alt={s.title}
                    fill
                    sizes="(max-width: 680px) 90vw, (max-width: 1023px) 44vw, 384px"
                  />
                </div>
                <div className="service-copy">
                  <h2>{s.title}</h2>
                  <p>{s.description}</p>
                  <span className="text-link">
                    View solution <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
        <div className="products-consultation">
          <div className="products-consultation-copy">
            <p className="eyebrow">CUSTOM APPLICATIONS</p>
            <h3>Need a Tailored Water Treatment System?</h3>
            <p>
              Our process engineering team provides raw water analysis, custom plant design, skid fabrication, and field commissioning across the Kingdom.
            </p>
          </div>
          <div className="products-consultation-action">
            <Link className="button button-primary" href="/about-us/#contact">
              Talk to an Engineer <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
      <a
        className="floating-whatsapp"
        href="https://wa.me/966508607349"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with FlowVera on WhatsApp"
      >
        <WhatsAppIcon size={26} />
      </a>
    </>
  );
}
