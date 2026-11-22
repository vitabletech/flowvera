import { ArrowUpRight, Check, Clock, Mail, MessageSquare, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/enquiry-form";
import { OfficeMap } from "@/components/office-map";
import { Reveal } from "@/components/reveal";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

export function ContactSection({ topic }: { topic?: string }) {
  const subject = topic ? `?subject=${encodeURIComponent(`Enquiry: ${topic}`)}` : "";
  const waGreeting = topic
    ? `Hello FlowVera team, I would like to enquire about ${topic}. Please share specifications and pricing.`
    : "Hello FlowVera team, I would like to discuss a water treatment project in Saudi Arabia.";
  const message = `?text=${encodeURIComponent(waGreeting)}`;

  return (
    <section className="contact-section" id="contact">
      <Reveal className="contact-copy" direction="left">
        <div>
          <div className="contact-badge-pill">
            <span className="contact-badge-dot" aria-hidden="true" />
            <Clock size={13} aria-hidden="true" />
            <span>Fast WhatsApp Response (&lt; 15 mins)</span>
          </div>
          <p className="eyebrow">GET IN TOUCH</p>
          <h2>Let’s Talk About Your Water Treatment Needs.</h2>
          <p className="contact-intro">
            Have a project in mind, need replacement spares, or require chemical dosage calculations?
            Reach out directly to our engineers across Saudi Arabia.
          </p>
        </div>

        <div className="help-list">
          <h3>How Can We Assist You?</h3>
          <p><Check size={17} />Plant design, RO skid selection &amp; sizing calculations</p>
          <p><Check size={17} />Specialty antiscalants, biocides &amp; dosage simulation</p>
          <p><Check size={17} />Emergency pumps, instruments &amp; OEM spare supply</p>
          <p><Check size={17} />On-site commissioning &amp; wet-testing across the Kingdom</p>
        </div>

        <div className="contact-shortcuts">
          <a
            href={`https://wa.me/966508607349${message}`}
            target="_blank"
            rel="noreferrer"
            className="contact-shortcut-whatsapp"
            aria-label="Chat with FlowVera on WhatsApp"
          >
            <WhatsAppIcon size={30} />
            <span>WhatsApp Us <ArrowUpRight size={15} /></span>
          </a>
          <a href="tel:+966508607349" aria-label="Call FlowVera">
            <Phone size={26} />
            <span>Call Team <ArrowUpRight size={15} /></span>
          </a>
          <a href={`mailto:info@flowveraarabia.com${subject}`} aria-label="Email FlowVera">
            <Mail size={26} />
            <span>Email Us <ArrowUpRight size={15} /></span>
          </a>
        </div>

        <details className="service-enquiry" open={Boolean(topic)}>
          <summary>
            <MessageSquare size={16} aria-hidden="true" />
            <span>{topic ? `Send WhatsApp enquiry for ${topic}` : "Submit detailed project enquiry form"}</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </summary>
          <EnquiryForm topic={topic} />
        </details>
      </Reveal>

      <Reveal direction="right">
        <OfficeMap />
      </Reveal>
    </section>
  );
}
