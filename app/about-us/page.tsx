import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, CheckCircle2, Mail, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { SiteHeader } from "@/components/site-header";
import { Reveal } from "@/components/reveal";
import { ServicesCarousel } from "@/components/services-carousel";
import { OfficeMap } from "@/components/office-map";
import { TrustedLogos } from "@/components/trusted-logos";
import { SiteFooter } from "@/components/site-footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { assetPath } from "@/lib/asset-path";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "About Us",
  "Engineered for Better Water Solutions. FlowVera provides industrial water treatment, reverse osmosis plants, specialty chemicals and process engineering in Saudi Arabia.",
  "/about-us/"
);

function AboutHero() {
  return (
    <section className="about-hero" id="about">
      <div id="top" />
      <Image
        src={assetPath("/assets/optimized/about-hero.webp")}
        alt="FlowVera industrial water treatment plant at dusk"
        fill
        priority
        className="about-hero-bg"
        sizes="100vw"
      />
      <div className="about-hero-shade" />
      <div className="about-hero-content">
        <h1>About Us</h1>
        <p>Engineered for Better Water Solutions.</p>
      </div>
    </section>
  );
}

function ExpertiseSection() {
  return (
    <section className="about-expertise section-wrap">
      <Reveal className="about-expertise-copy" direction="left">
        <h2>
          Water Expertise.<br />
          Practical Solutions.<br />
          Lasting Value.
        </h2>
        <p>
          At FlowVera, we deliver engineered water treatment solutions tailored to meet the highest standards of industrial, commercial, and municipal operations. From brackish water desalination to advanced chemical conditioning, our systems ensure maximum uptime, regulatory compliance, and resource recovery.
        </p>
        <p>
          Backed by seasoned water process engineers and field technicians, we partner with clients across the Kingdom of Saudi Arabia and the GCC to solve complex water challenges with reliability, efficiency, and environmental stewardship.
        </p>
      </Reveal>
      <Reveal className="about-expertise-card" direction="right">
        <div className="about-expertise-img">
          <Image
            src={assetPath("/assets/optimized/about-expertise.webp")}
            alt="FlowVera process engineer inspecting reverse osmosis PLC control panel"
            fill
            sizes="(max-width: 900px) 100vw, 560px"
          />
        </div>
        <div className="about-expertise-bar">
          <span className="about-expertise-tag">
            <CheckCircle2 size={16} aria-hidden="true" />
            <span>Certified Water Treatment Specialists</span>
          </span>
          <span className="about-expertise-tag">
            <CheckCircle2 size={16} aria-hidden="true" />
            <span>Precision Engineering &amp; Execution</span>
          </span>
        </div>
      </Reveal>
    </section>
  );
}

function PrinciplesSection() {
  return (
    <section className="about-principles">
      <div className="section-wrap">
        <div className="principles-heading">
          <Reveal direction="left">
            <h2>Guiding Principles for Sustainable Industrial Growth</h2>
          </Reveal>
          <Reveal direction="right">
            <p>Our core foundation driving water innovation, quality assurance, and environmental stewardship.</p>
          </Reveal>
        </div>
        <div className="principles-grid">
          <Reveal className="mission-card" direction="up">
            <div className="principles-card-top">
              <div className="principles-card-header">
                <h3>Our Mission</h3>
                <span className="principles-icon-btn" aria-hidden="true">
                  <ArrowUpRight size={18} />
                </span>
              </div>
              <p>
                To deliver reliable, high-performance water treatment plants, specialty chemicals, and operational services that protect critical industrial infrastructure, optimize operating costs, and secure pure water for future generations.
              </p>
            </div>
            <div className="principles-card-bottom">
              <span>Process Excellence · Maximum Uptime · Sustainable Solutions</span>
            </div>
          </Reveal>

          <Reveal className="vision-card" direction="up" delay={0.1}>
            <div className="principles-card-top">
              <div className="principles-card-header">
                <h3>Our Vision</h3>
                <span className="principles-icon-btn is-light" aria-hidden="true">
                  <ArrowUpRight size={18} />
                </span>
              </div>
              <p>
                To be the Kingdom&apos;s most trusted partner in sustainable industrial water management, setting benchmarks in technical excellence, membrane longevity, and advanced water circularity.
              </p>
            </div>
            <div className="principles-card-bottom">
              <span>Setting benchmarks in industrial water circularity across the GCC</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ProcessStepsSection() {
  const steps = [
    {
      num: "01",
      title: "Initial Water Assessment",
      desc: "Comprehensive raw water laboratory testing, SDI analysis, and site-specific operational requirements.",
      phase: "Phase 1: Lab & Site Analysis"
    },
    {
      num: "02",
      title: "Engineering & Sizing",
      desc: "Membrane projection modeling, pre-treatment design, chemical dosing calculations, and hydraulic balance.",
      phase: "Phase 2: Technical Design"
    },
    {
      num: "03",
      title: "Manufacturing & Integration",
      desc: "Skid fabrication, high-grade stainless piping, instrumentation integration, and automated PLC control systems.",
      phase: "Phase 3: Assembly & QA"
    },
    {
      num: "04",
      title: "Commissioning & Support",
      desc: "On-site performance verification, operator training, chemical supply, and preventative RO membrane maintenance.",
      phase: "Phase 4: Site Handover"
    }
  ];

  return (
    <section className="about-process">
      <div className="section-wrap">
        <div className="about-process-heading">
          <Reveal direction="left">
            <h2>From Raw Water Characterization to Commissioning</h2>
          </Reveal>
          <Reveal direction="right">
            <p>A disciplined, engineering-first approach from laboratory feed analysis to post-handover support.</p>
          </Reveal>
        </div>
        <div className="about-process-grid">
          {steps.map((step, idx) => (
            <Reveal key={step.num} className="process-step-card" direction="up" delay={idx * 0.08}>
              <div>
                <span className="process-step-number">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
              <div className="process-step-phase">
                <CheckCircle2 size={15} aria-hidden="true" />
                <span>{step.phase}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- 5 Exact Reused Home Page Sections --- */

function ServiceSection() {
  return (
    <section className="services-section about-services-section" id="services">
      <div className="section-heading">
        <Reveal><h2 className="section-title">Solutions for Every Stage.</h2></Reveal>
        <Link href="/products/" className="all-services">View all Products &amp; Services <ArrowRight size={15} aria-hidden="true" /></Link>
      </div>
      <ServicesCarousel />
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
      </Reveal>
      <Reveal direction="right"><OfficeMap /></Reveal>
    </section>
  );
}

export default function AboutUsPage() {
  return (
    <>
      <ScrollToTop />
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <AboutHero />
        <ExpertiseSection />
        <PrinciplesSection />
        <ServiceSection />
        <ProcessStepsSection />
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

