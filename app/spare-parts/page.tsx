import { ServiceDetailPage } from "@/components/service-detail-page";
import { sparePartsContent } from "@/lib/service-pages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Spare Parts & Instrumentation",
  "FlowVera genuine OEM spare parts, vertical multistage pumps, digital dosing equipment, precision water analyzers, and filter media across Saudi Arabia.",
  "/spare-parts/"
);

export default function SparePartsPage() {
  return (
    <ServiceDetailPage
      title="Spare Parts & Instrumentation"
      content={sparePartsContent}
    />
  );
}
