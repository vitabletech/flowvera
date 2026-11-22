import { ServiceDetailPage } from "@/components/service-detail-page";
import { tanksContent } from "@/lib/service-pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Industrial Water Tanks & Storage Solutions",
  "FlowVera heavy-duty industrial water tanks including Glass-Fused-to-Steel (GLS), GRP sectional panel, and certified polyethylene storage solutions in Saudi Arabia.",
  "/tanks/"
);

export default function TanksPage() {
  return (
    <ServiceDetailPage
      title="Industrial Tanks & Storage Solutions"
      content={tanksContent}
    />
  );
}
