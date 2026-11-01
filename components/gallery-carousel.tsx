"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { assetPath } from "@/lib/asset-path";

const gallery = [
  { src: assetPath("/assets/optimized/project-water-softener.webp"), alt: "FlowVera water softener systems" },
  { src: assetPath("/assets/optimized/project-ro-chemicals.webp"), alt: "FlowVera reverse osmosis membrane chemicals" },
  { src: assetPath("/assets/optimized/project-cartridge-filters.webp"), alt: "FlowVera cartridge filter systems" }
];

export function GalleryCarousel() {
  const [index, setIndex] = useState(0);
  const [slideDistance, setSlideDistance] = useState(510);
  const [maxIndex, setMaxIndex] = useState(gallery.length - 1);

  useEffect(() => {
    const updateLayout = () => {
      const mobile = window.innerWidth <= 680;
      setSlideDistance((mobile ? window.innerWidth * 0.82 : 486) + 24);
      setMaxIndex(gallery.length - 1);
      setIndex((current) => Math.min(current, gallery.length - 1));
    };
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);
  return (
    <div className="gallery-carousel" role="region" aria-roledescription="carousel" aria-label="FlowVera project gallery">
      <div className="gallery-window">
        <div className="gallery-track" style={{ transform: "translateX(-" + index * slideDistance + "px)" }}>
          {gallery.map((item) => (
            <figure className="gallery-card" key={item.src}>
              <Image src={item.src} alt={item.alt} fill sizes="(max-width: 700px) 82vw, 486px" />
            </figure>
          ))}
        </div>
      </div>
      <div className="carousel-controls gallery-controls">
        <div className="carousel-dots" role="group" aria-label="Choose a project image">
          {gallery.map((item, dot) => (
            <button
              key={item.src}
              className={"carousel-dot" + (index === dot ? " active" : "")}
              type="button"
              aria-label={"Show project image " + (dot + 1)}
              aria-current={index === dot ? "true" : undefined}
              onClick={() => setIndex(dot)}
            />
          ))}
        </div>
        <div className="carousel-arrows">
          <button type="button" aria-label="Previous project images" onClick={() => setIndex((value) => value <= 0 ? maxIndex : value - 1)}>
            <ArrowLeft size={16} />
          </button>
          <button type="button" aria-label="Next project images" onClick={() => setIndex((value) => value >= maxIndex ? 0 : value + 1)}>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
