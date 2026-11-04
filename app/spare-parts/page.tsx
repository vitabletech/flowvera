import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Phone } from "lucide-react";
import { ContentPage } from "@/components/content-page";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { assetPath } from "@/lib/asset-path";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Spare Parts & Instruments",
  "FlowVera genuine spare parts, replacement pumps, precision sensors, and instrumentation for commercial and industrial water treatment systems.",
  "/spare-parts/"
);

const features = [
  "High-Pressure & Centrifugal Pumps (Vertical multistage, SS 316L)",
  "Precision Monitoring Instruments (Conductivity, pH, ORP controllers, flow meters)",
  "Chemical Dosing & Metering Pumps with digital control heads",
  "High-flow cartridge filters, filter housings, and sealing elements",
  "Genuine OEM replacement components and consumables",
  "Rapid availability and technical installation support across Saudi Arabia"
];

export default function SparePartsPage() {
  return (
    <ContentPage
      title="Spare Parts & Instrumentation"
      intro="Our comprehensive catalog of genuine spares, precision instruments, and high-performance pumps is launching soon."
    >
      <div className="upcoming-grid">
        <div className="upcoming-copy">
          <div className="upcoming-badge">
            <span className="upcoming-badge-dot" aria-hidden="true" />
            Upcoming Solution
          </div>
          <h2>Genuine Spares for Maximum Plant Uptime.</h2>
          <p>
            Reliable components and precision instruments keep your water treatment
            systems running efficiently. We are currently curating an expanded direct
            supply line for critical plant components across Saudi Arabia.
          </p>

          <ul className="upcoming-features">
            {features.map((feature) => (
              <li key={feature}>
                <Check size={18} aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="upcoming-notice">
            <p>
              <strong>Need urgent spares or instruments?</strong> Our engineering team
              is actively taking direct enquiries for active projects and plant maintenance.
            </p>
          </div>

          <div className="upcoming-actions">
            <Link className="button button-primary" href="/enquiry/">
              Enquire About Spares <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <a
              className="button button-secondary"
              href="https://wa.me/966508607349"
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon size={18} />
              <span>WhatsApp Us</span>
            </a>
            <a className="button button-secondary" href="tel:+966508607349">
              <Phone size={15} />
              <span>Call Team</span>
            </a>
          </div>
        </div>

        <div className="upcoming-visual">
          <Image
            src={assetPath("/assets/optimized/project-spares-instruments.webp")}
            alt="FlowVera Spares & Instruments Showcase"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 440px"
          />
        </div>
      </div>
    </ContentPage>
  );
}

