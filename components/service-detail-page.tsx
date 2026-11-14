import Image from "next/image";
import Link from "next/link";
import { Check, Phone, ShieldCheck } from "lucide-react";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { assetPath } from "@/lib/asset-path";
import type { ServicePageContent } from "@/lib/service-pages";
import "./service-detail-page.css";
import stepOne from "@/assets/services-page/Background.png";
import stepTwo from "@/assets/services-page/Background (1).png";
import stepThree from "@/assets/services-page/Background (2).png";
import stepFour from "@/assets/services-page/Background (3).png";
import valueOne from "@/assets/services-page/Background (4).png";
import valueTwo from "@/assets/services-page/Background (5).png";
import valueThree from "@/assets/services-page/Background (6).png";
import valueFour from "@/assets/services-page/Background (7).png";

const stepIcons = [stepOne, stepTwo, stepThree, stepFour];
const values = [
  { title: "Application-Based Engineering", copy: "Configurations modelled specifically against raw feed water parameters and facility load to ensure optimal recovery and minimal reject waste.", tag: "Parameter-specific", icon: valueOne },
  { title: "Reliable System Configuration", copy: "Precision valve manifolds, automatic telemetry, and robust components designed for continuous duty and harsh Middle Eastern operational climates.", tag: "Continuous uptime", icon: valueTwo },
  { title: "Quality Equipment & Components", copy: "High-spec ASME, NSF, and SASO compliant pressure vessels, multi-stage stainless pumps, and world-class membrane housings.", tag: "Tier-1 manufacturers", icon: valueThree },
  { title: "Kingdom Technical Support", copy: "Technical assistance across Saudi Arabia with product selection, commissioning guidance, troubleshooting, and chemical stabilization support.", tag: "Application support", icon: valueFour }
];

export function ServiceDetailPage({ title, content }: { title: string; content: ServicePageContent }) {
  return (
    <div className="service-page">
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <section className={`service-hero${title === "Water Treatment Plants & Systems" ? "" : " service-hero-shaded"}`}>
          <Image src={assetPath(content.heroImage)} alt="" fill loading="eager" sizes="100vw" />
          <div className="service-container service-hero-content"><h1>{title}</h1></div>
        </section>

        <section className="service-container service-introduction" aria-label="About this solution">
          <div className="service-intro-row">
            <div className="service-engineering-visual">
              <div className="service-large-image">
                <Image src={assetPath(content.engineeringImage)} alt={content.engineeringAlt} fill loading="eager" sizes="(max-width: 960px) 90vw, 588px" />
              </div>
              <div className="service-quality">
                <h3><ShieldCheck size={17} aria-hidden="true" />{content.qualityLabel}</h3>
                <p>{content.qualityCopy}</p>
              </div>
            </div>
            <div className="service-detail-copy">
              <h2>{content.engineeringTitle}</h2>
              <p>{content.engineeringCopy}</p>
            </div>
          </div>
          <div className="service-intro-row service-intro-row-reverse">
            <div className="service-detail-copy">
              <h2>{content.overviewTitle}</h2>
              <h3>{content.overviewLead}</h3>
              {content.overviewCopy.map(copy => <p key={copy}>{copy}</p>)}
            </div>
            <div className="service-large-image">
              <Image src={assetPath(content.overviewImage)} alt={content.overviewAlt} fill sizes="(max-width: 960px) 90vw, 588px" />
            </div>
          </div>
        </section>

        <section className="service-systems">
          <div className="service-container">
            <p className="service-eyebrow">OUR SYSTEMS</p>
            <h2>{content.systemsTitle}</h2>
            <p className="service-section-intro">{content.systemsCopy}</p>
            <div className="service-system-grid">
              {content.systems.map(system => (
                <a className="service-system-card" href="#contact" key={system.title} aria-label={`Discuss ${system.title}`}>
                  <div className="service-system-image"><Image src={assetPath(system.image)} alt={system.title} fill sizes="(max-width: 680px) 44vw, (max-width: 960px) 28vw, 220px" /></div>
                  <h3>{system.title}</h3>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="service-workflow">
          <Image className="service-workflow-background" src={assetPath("/assets/optimized/service-details/process.webp")} alt="" fill sizes="100vw" />
          <div className="service-container">
            <div className="service-centered-heading">
              <p className="service-eyebrow">HOW WE WORK</p>
              <h2>{content.processTitle}</h2>
              <p className="service-section-intro">{content.processCopy}</p>
            </div>
            <div className="service-step-grid">
              {content.steps.map((step, index) => (
                <article className="service-step" key={step.title}>
                  <div className="service-step-top"><span>0{index + 1}</span><Image src={stepIcons[index]} alt="" width={40} height={40} /></div>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="service-values">
          <div className="service-container">
            <div className="service-centered-heading">
              <p className="service-eyebrow">VALUE &amp; INTEGRITY</p>
              <h2>Built Around Practical Performance</h2>
              <p className="service-section-intro">Engineered reliability that safeguards your daily water production and downstream industrial capital.</p>
            </div>
            <div className="service-value-grid">
              {values.map(value => (
                <article className="service-value" key={value.title}>
                  <Image src={value.icon} alt="" width={48} height={48} />
                  <h3>{value.title}</h3>
                  <p>{value.copy}</p>
                  <div className="service-value-tag"><Check size={12} aria-hidden="true" />{value.tag}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section service-cta">
          <div>
            <h2>Let’s Talk About Your Water Needs.</h2>
            <p>From complete plant engineering and membrane selection to on-site testing and chemicals, our team is ready to consult.</p>
            <Link href="#contact" className="button cta-button">Contact Us <Phone size={15} aria-hidden="true" /></Link>
          </div>
        </section>
        <ContactSection topic={title} />
      </main>
      <SiteFooter />
    </div>
  );
}
