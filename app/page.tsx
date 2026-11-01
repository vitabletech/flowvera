import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Mail, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { SiteHeader } from "@/components/site-header";
import { Reveal } from "@/components/reveal";
import { ServicesCarousel } from "@/components/services-carousel";
import { GalleryCarousel } from "@/components/gallery-carousel";
import { ProcessPlayer } from "@/components/process-player";
import { OfficeMap } from "@/components/office-map";
import { TrustedLogos } from "@/components/trusted-logos";
import { assetPath } from "@/lib/asset-path";
import { organizationData } from "@/lib/seo";
import { SiteFooter } from "@/components/site-footer";
import { serviceHref } from "@/lib/services";

function Hero() {
  return (
    <section className="hero" id="home">
      <Image
        className="hero-image"
        src={assetPath("/assets/optimized/hero.webp")}
        alt="Industrial water treatment plant with FlowVera filtration equipment"
        fill
        priority
        sizes="100vw"
      />
      <div className="hero-shade" />
      <SiteHeader />
      <div className="hero-content">
        <h1>Pure water for industries and life</h1>
        <p>RO membranes, speciality chemicals and water treatment systems</p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/enquiry/">Request a quotation <ArrowUpRight size={17} aria-hidden="true" /></Link>
          <Link className="button button-outline" href="/products/">Explore our solutions <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="about-section section-wrap" id="about">
      <Reveal className="about-copy" direction="left">
        <h2>Engineering Better Water Solutions.</h2>
        <p>Water treatment demands precision engineering, robust equipment, and dedicated technical care. At FlowVera, we unite industrial-grade filtration, treatment systems, and field expertise to keep critical infrastructure operating smoothly.</p>
        <p>Whether addressing high-salinity brackish intake, delicate beverage standards, or strict pharmaceutical feed loops, we provide unified single-source reliability across hardware, chemicals, and service.</p>
        <Link className="button button-primary" href="#contact">Talk to our team <ArrowUpRight size={15} aria-hidden="true" /></Link>
      </Reveal>
      <Reveal className="about-image" direction="right">
        <Image
          src={assetPath("/assets/optimized/facility.webp")}
          alt="FlowVera engineers at a water treatment facility beside reverse osmosis equipment"
          fill
          sizes="(max-width: 900px) 100vw, 588px"
        />
      </Reveal>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="process-section" id="journey">
      <Reveal><h2 className="section-title">Smarter Journey to Pure Water.</h2></Reveal>
      <Reveal className="process-frame" direction="zoom"><ProcessPlayer /></Reveal>
    </section>
  );
}

function ServiceSection() {
  return (
    <section className="services-section" id="services">
      <div className="section-heading">
        <Reveal><h2 className="section-title">Solutions for Every Stage.</h2></Reveal>
        <Link href="/products/" className="all-services">View all Products &amp; Services <ArrowRight size={15} aria-hidden="true" /></Link>
      </div>
      <ServicesCarousel />
    </section>
  );
}

function GallerySection() {
  return (
    <section className="gallery-section" id="projects">
      <Reveal><h2 className="section-title">A Look at What We Do.</h2></Reveal>
      <GalleryCarousel />
    </section>
  );
}

function ChemicalsSection() {
  return (
    <section className="chemicals-band" id="chemicals">
      <div className="chemicals-inner">
        <Reveal className="chemicals-copy" direction="left">
          <h2>Specialty Water Treatment Chemicals</h2>
          <p>The right chemicals help keep water treatment systems clean and running smoothly. Explore our range of chemicals for membrane care, cleaning and equipment protection.</p>
          <ul>
            <li>Antiscalants</li>
            <li>Biocides</li>
            <li>Corrosion &amp; Scale Inhibitors</li>
            <li>Molybdate</li>
            <li>Acidic Cleaner</li>
          </ul>
          <p className="more-chemicals">and more...!</p>
          <Link className="button button-primary" href={serviceHref("specialty-chemicals")}>Explore More <ArrowUpRight size={15} aria-hidden="true" /></Link>
        </Reveal>
        <Reveal className="chemicals-image" direction="right">
          <Image
            src={assetPath("/assets/optimized/chemicals.webp")}
            alt="Specialty water treatment chemicals for membrane care and equipment protection"
            fill
            sizes="(max-width: 900px) 100vw, 588px"
          />
        </Reveal>
      </div>
    </section>
  );
}

function ClientsSection() {
  return (
    <section className="clients-section" aria-label="Trusted industry partners">
      <Reveal><h2>Trusted by Industry leaders</h2></Reveal>
      <TrustedLogos />
    </section>
  );
}

function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <Reveal className="contact-copy" direction="left">
        <div>
          <p className="eyebrow">GET IN TOUCH</p>
          <h2>Let’s Talk About Your Water Treatment Needs.</h2>
          <p className="contact-intro">Have a project in mind or need help finding the right solution? Tell us what you’re looking for. Our team is ready to help.</p>
        </div>
        <div className="help-list">
          <h3>How Can We Help?</h3>
          <p><Check size={17} />Help choosing the right solution</p>
          <p><Check size={17} />Support with products and services</p>
          <p><Check size={17} />Assistance with your requirements</p>
        </div>
        <div className="contact-shortcuts">
          <a href="mailto:info@flowveraarabia.com" aria-label="Email FlowVera">
            <Mail size={28} />
            <span>Email Us <ArrowUpRight size={15} /></span>
          </a>
          <a href="tel:+966508607349" aria-label="Call FlowVera">
            <Phone size={28} />
            <span>Call Us <ArrowUpRight size={15} /></span>
          </a>
          <a href="https://wa.me/966508607349" target="_blank" rel="noreferrer" aria-label="Contact FlowVera on WhatsApp">
            <WhatsAppIcon size={28} />
            <span>WhatsApp <ArrowUpRight size={15} /></span>
          </a>
        </div>
        <div className="contact-details">
          <a href="mailto:info@flowveraarabia.com">info@flowveraarabia.com</a>
          <a href="tel:+966508607349">+966 50 860 7349</a>
          <p>For a quotation, share your water source, required capacity and project location.</p>
        </div>
        <div className="request-actions">
          <Link className="button button-primary" href="/enquiry/">Request a quotation</Link>
          <Link className="button button-secondary" href="/book-demo/">Book a demo</Link>
        </div>
      </Reveal>
      <Reveal direction="right"><OfficeMap /></Reveal>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="cta-section">
      <Reveal>
        <h2>Let’s Talk About Your Water Needs.</h2>
        <p>From complete plant engineering and membrane selection to on-site testing and chemicals, our team is ready to consult.</p>
        <Link href="#contact" className="button cta-button">Contact Us <ArrowUpRight size={15} /></Link>
      </Reveal>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData).replace(/</g, "\\u003c") }} />
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <AboutSection />
      <ProcessSection />
      <ServiceSection />
      <GallerySection />
      <ChemicalsSection />
      <ClientsSection />
      <CallToAction />
      <ContactSection />
    </main>
      <SiteFooter />
      <a className="floating-whatsapp" href="https://wa.me/966508607349" target="_blank" rel="noreferrer" aria-label="Chat with FlowVera on WhatsApp">
        <WhatsAppIcon size={26} />
      </a>
    </>
  );
}
