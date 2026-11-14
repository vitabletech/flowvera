import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { services, serviceHref } from "@/lib/services";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand-col">
          <Link className="footer-brand" href="/#home" aria-label="FlowVera home">
            <Image src={assetPath("/assets/optimized/flowvera-logo.webp")} alt="FlowVera" fill sizes="194px" />
          </Link>
          <p>Looking for the right water treatment solution? FlowVera brings together the products, expertise and support to help you get started.</p>
          <div className="certifications"><span>ISO 9001:2015</span><span>NSF/ANSI Certified</span></div>
        </div>
        <div className="footer-links-group">
          <div className="footer-col">
            <h2>Quick Links</h2>
            <Link href="/#home">Home</Link>
            <Link href="/about-us/" scroll={true}>About Us</Link>
            <Link href={serviceHref("specialty-chemicals")}>Specialty Chemicals</Link>
            <Link href="/spare-parts/">Spare Parts</Link>
            <Link href="/tanks/">Tanks</Link>
            <Link href="/#contact">Contact Us</Link>
          </div>
          <div className="footer-col product-col">
            <h2>Products &amp; Services</h2>
            <Link href="/products/">View all Product &amp; Service</Link>
            {services.slice(0, 5).map((service) => <Link key={service.slug} href={serviceHref(service.slug)}>{service.title}</Link>)}
          </div>
          <div className="footer-col operations-col">
            <h2>Operations Desk</h2>
            <p><MapPin size={14} aria-hidden="true" />Prince Bader Ibn Abdulaziz, Al Khubar Ash Shamaliyah Dist.
              AL KHOBAR, Kingdom of Saudi Arabia. (34428)</p>
            <a href="tel:+966508607349"><Phone size={14} aria-hidden="true" />+966 50 860 7349</a>
            <a href="mailto:info@flowveraarabia.com"><Mail size={14} aria-hidden="true" />info@flowveraarabia.com</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} FlowVera. All rights reserved.<span className="footer-build-number">{process.env.NEXT_PUBLIC_BUILD_NUMBER}</span></p>
        <div className="footer-legal">
          <Link href="/terms/">Terms and Conditions</Link>
          <Link href="/privacy/">Privacy Policy</Link>
          <Link href="/site-map/">Sitemap</Link>
          <Link href="/#home">Back to top <ArrowUpRight size={14} aria-hidden="true" /></Link>
        </div>
        <p className="footer-credit">This site is developed by the <a href="https://vitabletech.in/" target="_blank" rel="noopener noreferrer">Vitabletech team<span className="sr-only"> (opens in a new tab)</span></a>.</p>
      </div>
    </footer>
  );
}
