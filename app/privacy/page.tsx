import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Privacy Policy", "Draft FlowVera privacy notice explaining local enquiry preparation, WhatsApp and email handoff, and practices requiring confirmation.", "/privacy/", true);

const sections = [
  { title: "Information you choose to provide", text: "The enquiry and demo forms request a name, email address, optional company, project location and requirements. Demo requests may also include a preferred date, time and time zone. Provide only information needed for your business enquiry; do not include passwords, payment details or confidential documents." },
  { title: "How the website handles a prepared request", text: "Form information is held in the current page's memory to create a preview and pre-filled message. The forms do not submit to a FlowVera website backend and do not save the request in browser local storage or cookies. Editing the form clears its prepared preview; reloading the page discards the website's in-memory preview. Your browser may separately offer autofill or restore entered fields." },
  { title: "WhatsApp and email handoff", text: "Choosing WhatsApp places the prepared text into a WhatsApp URL. Choosing email passes it to your email application through a mailto link. Those applications may receive or retain the text as part of opening a draft even before you send it. Their providers' privacy policies apply. Complete sending in the selected application if you want FlowVera to receive the request." },
  { title: "Responding to enquiries", text: "Information sent to FlowVera is intended to support responding to your enquiry, reviewing requirements or arranging a demonstration. The business must confirm and document its actual access controls, recipients, lawful basis, retention periods and deletion procedures before approving this policy. No specific retention period or cross-border processing guarantee is asserted in this draft." },
  { title: "Site delivery, cookies and analytics", text: "This application's code does not add analytics, advertising trackers or enquiry-storage cookies. Images and videos are delivered as site assets. Hosting, DNS, network infrastructure and external applications may independently process technical information such as IP addresses and request logs. Their actual practices must be verified for the deployed site; this draft is not a guarantee that no technical data is collected." },
  { title: "Privacy requests", text: "You can contact FlowVera to ask about information you have sent, request a correction or seek deletion. The business must verify applicable requirements, your identity where necessary and any legal obligations before responding. This draft does not promise unverified response deadlines or describe itself as a compliance certification." },
  { title: "Changes and approval", text: "This notice should be updated if hosting, analytics, forms, booking services or other processing changes. The responsible legal entity, official policy date and any required disclosures remain subject to business and legal review." }
];

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" sections={sections} />;
}
