import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Award, Clock, Mail, MapPin, Phone, ShieldCheck, Truck } from "lucide-react";
import { EnquiryForm } from "@/components/enquiry-form";
import { OfficeMap } from "@/components/office-map";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ScrollToTop } from "@/components/scroll-to-top";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { assetPath } from "@/lib/asset-path";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Contact Us & Request a Quotation",
  "Contact FlowVera for industrial water treatment systems, RO maintenance, specialty chemicals, tanks, and spare parts across Saudi Arabia. Direct WhatsApp and engineering support.",
  "/enquiry/"
);

export default function EnquiryPage() {
  const waGreeting = encodeURIComponent(
    "Hello FlowVera team, I would like to connect with an engineer regarding a water treatment requirement in Saudi Arabia."
  );

  return (
    <>
      <ScrollToTop />
      <SiteHeader />

      <section className="contact-hero" id="contact-top">
        <Image
          src={assetPath("/assets/optimized/about-hero.webp")}
          alt="FlowVera water treatment engineering plant at dusk"
          fill
          priority
          className="contact-hero-bg"
          sizes="100vw"
        />
        <div className="contact-hero-shade" />
        <div className="contact-hero-content">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/" style={{ color: "#a5d8f3" }}>Home</Link>
            <span aria-hidden="true" style={{ color: "rgba(255,255,255,0.6)" }}>/</span>
            <span aria-current="page" style={{ color: "white" }}>Contact Us</span>
          </nav>
          <h1>Contact Us &amp; Request a Quotation</h1>
          <p>
            Connect directly with our senior water process engineers across Saudi Arabia. Submit your enquiry below to receive an instant WhatsApp response or formal proposal.
          </p>
        </div>
      </section>

      <main className="section-wrap contact-main-wrap" id="main-content" tabIndex={-1}>
        <section className="contact-quick-strip" aria-label="Quick contact channels">
          <a
            href={`https://wa.me/966508607349?text=${waGreeting}`}
            target="_blank"
            rel="noreferrer"
            className="contact-quick-card"
          >
            <div className="contact-quick-header">
              <div className="contact-quick-icon is-whatsapp">
                <WhatsAppIcon size={24} />
              </div>
              <span className="contact-badge-live">
                <span className="contact-badge-dot" aria-hidden="true" />
                Live WhatsApp
              </span>
            </div>
            <h3>WhatsApp Support</h3>
            <strong>+966 50 860 7349</strong>
            <p>Average response &lt; 15 mins during business hours</p>
          </a>

          <a href="tel:+966508607349" className="contact-quick-card">
            <div className="contact-quick-header">
              <div className="contact-quick-icon">
                <Phone size={22} />
              </div>
              <ArrowUpRight size={16} color="#2c77a7" />
            </div>
            <h3>Direct Phone Line</h3>
            <strong>+966 50 860 7349</strong>
            <p>Sun – Thu, 8:00 AM – 6:00 PM (AST)</p>
          </a>

          <a href="mailto:info@flowveraarabia.com?subject=Enquiry%20via%20FlowVera%20Website" className="contact-quick-card">
            <div className="contact-quick-header">
              <div className="contact-quick-icon">
                <Mail size={22} />
              </div>
              <ArrowUpRight size={16} color="#2c77a7" />
            </div>
            <h3>Official Email</h3>
            <strong>info@flowveraarabia.com</strong>
            <p>For formal RFPs, bids &amp; tender packages</p>
          </a>

          <div className="contact-quick-card">
            <div className="contact-quick-header">
              <div className="contact-quick-icon">
                <MapPin size={22} />
              </div>
            </div>
            <h3>Regional Offices</h3>
            <strong>Riyadh, Dammam &amp; Jeddah</strong>
            <p>Active engineering field teams across Saudi Arabia</p>
          </div>
        </section>

        <div className="contact-page-layout">
          <div>
            <EnquiryForm />
          </div>

          <aside className="contact-sidebar" aria-label="Office locations and operating hours">
            <OfficeMap />

            <div className="contact-support-card">
              <h3>Direct Engineering Consultation</h3>
              <p>
                Whether you need urgent replacement membranes, custom skid fabrication, or antiscalant scaling projection calculations, our technical staff is on call to review water parameters and provide rapid solutions.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px", color: "var(--ink)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Clock size={16} color="var(--blue)" />
                  <span><strong>Operating Hours:</strong> Sun – Thu: 8:00 AM – 6:00 PM AST</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Truck size={16} color="var(--blue)" />
                  <span><strong>Chemical &amp; Spares Dispatch:</strong> Riyadh, Dammam &amp; Jeddah</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <section className="contact-trust-strip" aria-label="Why choose FlowVera">
          <div className="contact-trust-item">
            <ShieldCheck size={28} color="var(--blue)" />
            <strong>SASO &amp; NSF Certified</strong>
            <p>All skids, vessels, and chemical programs strictly comply with Saudi Arabian and international standards.</p>
          </div>
          <div className="contact-trust-item">
            <Truck size={28} color="var(--blue)" />
            <strong>Rapid Kingdom Dispatch</strong>
            <p>Warehouse hubs in Riyadh, Eastern Province, and Western Province for rapid component and chemical mobilization.</p>
          </div>
          <div className="contact-trust-item">
            <Award size={28} color="var(--blue)" />
            <strong>Wet-Tested Validation</strong>
            <p>Every reverse osmosis and softening plant undergoes pressurized hydraulic testing before client handover.</p>
          </div>
          <div className="contact-trust-item">
            <span style={{ color: "#25d366", display: "inline-flex" }}>
              <WhatsAppIcon size={28} />
            </span>
            <strong>Direct WhatsApp Line</strong>
            <p>Direct communication with experienced water engineers without call center delays or automated gatekeepers.</p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
