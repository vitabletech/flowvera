"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
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

const pages = [0, 4, 8].map((start) =>
  Array.from({ length: 6 }, (_, offset) => logos[(start + offset) % logos.length])
);

export function TrustedLogos() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((current) => (current + 1) % pages.length);
  const previous = () => setIndex((current) => (current + pages.length - 1) % pages.length);

  return (
    <div className="trusted-slider" role="region" aria-roledescription="carousel" aria-label="Industry brands">
      <div className="client-logos" aria-live="polite">
        {pages[index].map((logo, position) => (
          <div className="client-logo" key={`${index}-${logo.name}-${position}`}>
            <Image src={assetPath(`/assets/Trusted Industry - Logo/${logo.file}`)} alt={logo.name} fill sizes="(max-width: 680px) 44vw, (max-width: 1024px) 29vw, 180px" />
          </div>
        ))}
      </div>
      <div className="client-pagination">
        <div className="carousel-dots" role="group" aria-label="Choose trusted industry logo group">
          {pages.map((_, dot) => <button key={dot} className={`carousel-dot${index === dot ? " active" : ""}`} type="button" aria-label={`Show trusted logo group ${dot + 1}`} aria-current={index === dot ? "true" : undefined} onClick={() => setIndex(dot)} />)}
        </div>
        <div className="carousel-arrows">
          <button type="button" aria-label="Previous trusted logos" onClick={previous}><ArrowLeft size={16} /></button>
          <button type="button" aria-label="Next trusted logos" onClick={next}><ArrowRight size={16} /></button>
        </div>
      </div>
    </div>
  );
}
