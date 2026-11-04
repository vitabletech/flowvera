import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Phone } from "lucide-react";
import { ContentPage } from "@/components/content-page";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { assetPath } from "@/lib/asset-path";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Industrial Water Tanks",
  "FlowVera specialized industrial and commercial water tanks including bolted steel, GLS, FRP/GRP, and polyethylene storage solutions.",
  "/tanks/"
);

const features = [
  "Glass-Fused-to-Steel (GLS) & Bolted Steel Heavy-Duty Tanks",
  "Fiberglass Reinforced Plastic (FRP / GRP) Industrial Vessels",
  "Food-Grade Polyethylene (Plastic) Storage Tanks",
  "Corrosion-resistant construction with long service lifecycle",
  "Custom sizing, foundation engineering, and turnkey site installation",
  "Compliant with international standards for potable water and chemical containment"
];

export default function TanksPage() {
  return (
    <ContentPage
      title="Specialized Water Tanks"
      intro="Our specialized industrial water tanks and containment systems catalog is launching soon."
    >
      <div className="upcoming-grid">
        <div className="upcoming-copy">
          <div className="upcoming-badge">
            <span className="upcoming-badge-dot" aria-hidden="true" />
            Upcoming Solution
          </div>
          <h2>Engineered Storage for Industrial Reliability.</h2>
          <p>
            From bulk industrial water storage to specialized process holding vessels,
            our tank solutions are engineered for extreme weather resilience,
            corrosion protection, and zero contamination.
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
              <strong>Planning a new storage or water project?</strong> We are already
              consulting on site specifications, capacity planning, and foundation design.
            </p>
          </div>

          <div className="upcoming-actions">
            <Link className="button button-primary" href="/enquiry/">
              Enquire About Tanks <ArrowUpRight size={15} aria-hidden="true" />
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
            src={assetPath("/assets/optimized/project-water-tanks.webp")}
            alt="FlowVera Specialized Water Tanks Showcase"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 440px"
          />
        </div>
      </div>
    </ContentPage>
  );
}

