import Link from "next/link";
import { ContentPage } from "@/components/content-page";

export function LegalPage({ title, sections }: { title: string; sections: { title: string; text: string }[] }) {
  return <ContentPage title={title} intro="Draft website policy for review. This text has not been approved by FlowVera or legal counsel.">
    <aside className="draft-notice" aria-label="Draft policy notice"><strong>Draft — not an approved legal policy.</strong><p>FlowVera must review this wording, confirm its legal entity and operational practices, and obtain appropriate legal advice before treating it as an official policy. No effective date is assigned.</p></aside>
    <article className="legal-copy">
      {sections.map(section => <section key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}
      <section><h2>Contact and clarification</h2><p>For questions about this draft or your enquiry, contact <a href="mailto:info@flowveraarabia.com">info@flowveraarabia.com</a> or <a href="tel:+966508607349">+966 50 860 7349</a>.</p><p><Link href="/terms/">Terms and Conditions</Link> · <Link href="/privacy/">Privacy Policy</Link></p></section>
    </article>
  </ContentPage>;
}
