import { ContentPage } from "@/components/content-page";
import { EnquiryForm } from "@/components/enquiry-form";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Request a Quotation", "Prepare a water treatment enquiry for FlowVera and send your requirements through WhatsApp or email.", "/enquiry/");

export default function EnquiryPage() {
  return <ContentPage title="Request a Quotation" intro="Tell us which solution you need and share your project requirements."><EnquiryForm /></ContentPage>;
}
