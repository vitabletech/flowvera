import { ArrowUpRight, Check, Mail, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/enquiry-form";
import { OfficeMap } from "@/components/office-map";
import { Reveal } from "@/components/reveal";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

export function ContactSection({ topic }: { topic?: string }) {
  const subject = topic ? `?subject=${encodeURIComponent(`Enquiry: ${topic}`)}` : "";
  const message = topic ? `?text=${encodeURIComponent(`Hello FlowVera, I would like to discuss ${topic}.`)}` : "";

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
          <a href={`mailto:info@flowveraarabia.com${subject}`} aria-label="Email FlowVera">
            <Mail size={28} />
            <span>Email Us <ArrowUpRight size={15} /></span>
          </a>
          <a href="tel:+966508607349" aria-label="Call FlowVera">
            <Phone size={28} />
            <span>Call Us <ArrowUpRight size={15} /></span>
          </a>
          <a href={`https://wa.me/966508607349${message}`} target="_blank" rel="noreferrer" aria-label="Contact FlowVera on WhatsApp">
            <WhatsAppIcon size={28} />
            <span>WhatsApp <ArrowUpRight size={15} /></span>
          </a>
        </div>
        {topic && <details className="service-enquiry">
          <summary>Prepare a project enquiry <ArrowUpRight size={15} aria-hidden="true" /></summary>
          <EnquiryForm topic={topic} />
        </details>}
      </Reveal>
      <Reveal direction="right"><OfficeMap /></Reveal>
    </section>
  );
}
