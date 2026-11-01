import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Terms and Conditions", "Draft FlowVera website terms covering information, enquiries, demo requests and third-party services. Pending business and legal review.", "/terms/", true);

const sections = [
  { title: "Website information", text: "This website introduces FlowVera products and services. General descriptions, images and videos are illustrative and do not establish a binding quotation, a technical specification, a certification for a particular product or a guarantee of suitability." },
  { title: "Product selection and safety", text: "Treatment systems, components and chemicals require application-specific review. Confirm compatibility, operating requirements and relevant safety documentation with qualified professionals before purchase, installation or use. Website content is not a substitute for engineering or safety advice." },
  { title: "Enquiries and quotations", text: "Preparing a request on this website does not send it. WhatsApp and email buttons open an external service or your email application, where you must complete sending. Product availability, pricing, delivery and any purchase terms must be separately confirmed with FlowVera." },
  { title: "Demo requests", text: "A demo request is not a confirmed appointment. Preferred dates and times are suggestions. The team must separately confirm availability, the demonstration format and any conditions." },
  { title: "Responsible use", text: "Use the website and contact channels for genuine business enquiries. Do not send malicious files, impersonate another person, interfere with the site or submit information you are not authorised to share." },
  { title: "Third-party services and materials", text: "WhatsApp, email applications and external services operate under their own terms and policies. Third-party names and logos identify their respective owners and do not by themselves establish an endorsement. Rights and permissions for website materials should be confirmed before reuse." },
  { title: "Terms requiring business approval", text: "The legal entity, applicable law, dispute process, warranties, liability provisions and commercial terms have not been verified for this draft. These must be reviewed and agreed in the official policy or the applicable written commercial agreement; this draft does not invent or waive those rights." }
];

export default function TermsPage() {
  return <LegalPage title="Terms and Conditions" sections={sections} />;
}
