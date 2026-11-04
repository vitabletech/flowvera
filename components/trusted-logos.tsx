"use client";

import Image from "next/image";
import { assetPath } from "@/lib/asset-path";

const logos = [
  { file: "Rectangle 63.png", name: "CodeLine" },
  { file: "Rectangle 64.png", name: "Pentair" },
  { file: "Rectangle 65.png", name: "Dow" },
  { file: "Rectangle 66.png", name: "Lowara" },
  { file: "Rectangle 67.png", name: "Grundfos" },
  { file: "Rectangle 68.png", name: "LG" },
  { file: "Rectangle 64-1.png", name: "Milton Roy" },
  { file: "Rectangle 65-1.png", name: "ProMinent" },
  { file: "Rectangle 66-1.png", name: "Nitto Hydranautics" },
  { file: "Rectangle 67-1.png", name: "Toray" },
  { file: "Rectangle 68-1.png", name: "WIKA" },
  { file: "Rectangle 63-1.png", name: "SEKO" },
  { file: "Rectangle 63-2.png", name: "DP Pumps" }
];

export function TrustedLogos() {
  return (
    <div className="trusted-marquee" role="region" aria-label="Trusted industry partners">
      <div className="trusted-marquee-window">
        <div className="trusted-marquee-track">
          <div className="trusted-marquee-group">
            {logos.map((logo, index) => (
              <div className="client-logo" key={`logo-a-${index}`}>
                <Image
                  src={assetPath(`/assets/Trusted Industry - Logo/${logo.file}`)}
                  alt={logo.name}
                  fill
                  sizes="(max-width: 680px) 140px, (max-width: 1024px) 160px, 180px"
                />
              </div>
            ))}
          </div>
          <div className="trusted-marquee-group" aria-hidden="true">
            {logos.map((logo, index) => (
              <div className="client-logo" key={`logo-b-${index}`}>
                <Image
                  src={assetPath(`/assets/Trusted Industry - Logo/${logo.file}`)}
                  alt=""
                  fill
                  sizes="(max-width: 680px) 140px, (max-width: 1024px) 160px, 180px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
