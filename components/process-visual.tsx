import { Play } from "lucide-react";
import Image from "next/image";
import { assetPath } from "@/lib/asset-path";

export function ProcessVisual() {
  return (
    <div className="process-visual">
      <Image src={assetPath("/assets/optimized/process.webp")} alt="FlowVera water treatment process from brackish water intake to pure water" fill sizes="100vw" />
      <span className="process-overlay" aria-hidden="true" />
      <span className="play-button" aria-hidden="true"><Play size={25} fill="currentColor" /></span>
    </div>
  );
}
