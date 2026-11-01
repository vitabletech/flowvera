import { ContentPage } from "@/components/content-page";
import { EnquiryForm } from "@/components/enquiry-form";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Book a Demo", "Request a FlowVera water treatment demonstration or consultation. Send your preferred date through WhatsApp or email for confirmation.", "/book-demo/");

export default function DemoPage() {
  return <ContentPage title="Book a Demo" intro="Request a demonstration or discussion of a solution. Share your preferred date and the team will contact you to confirm the format and availability."><EnquiryForm demo /></ContentPage>;
}
