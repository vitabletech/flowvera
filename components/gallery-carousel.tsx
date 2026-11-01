"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { assetPath } from "@/lib/asset-path";
import { useCarousel } from "@/components/use-carousel";
import { CarouselPause } from "@/components/carousel-pause";

const gallery = [
  { src: assetPath("/assets/optimized/project-water-softener.webp"), alt: "FlowVera water softener systems" },
  { src: assetPath("/assets/optimized/project-ro-chemicals.webp"), alt: "FlowVera reverse osmosis membrane chemicals" },
  { src: assetPath("/assets/optimized/project-cartridge-filters.webp"), alt: "FlowVera cartridge filter systems" }
];

export function GalleryCarousel() {
  const [slideDistance, setSlideDistance] = useState(510);
  const maxIndex = gallery.length - 1;
  const { index, setIndex, next, previous, dragOffset, dragging, regionProps, swipeProps, stopped, paused, reducedMotion, togglePaused } = useCarousel(maxIndex);

  useEffect(() => {
    const updateLayout = () => {
      const mobile = window.innerWidth <= 680;
      setSlideDistance((mobile ? window.innerWidth * 0.82 : 486) + 24);
      setIndex((current) => Math.min(current, gallery.length - 1));
    };
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [setIndex]);
  return (
    <div {...regionProps} className="gallery-carousel" role="region" aria-roledescription="carousel" aria-label="FlowVera project gallery">
      <div {...swipeProps} className={"gallery-window carousel-swipe" + (dragging ? " is-dragging" : "")} aria-live={stopped ? "polite" : "off"}>
        <div className="gallery-track" style={{ transform: `translateX(${-index * slideDistance + dragOffset}px)`, transition: dragging ? "none" : undefined }}>
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
          <button type="button" aria-label="Previous project images" onClick={previous}>
            <ArrowLeft size={16} />
          </button>
          <button type="button" aria-label="Next project images" onClick={next}>
            <ArrowRight size={16} />
          </button>
        </div>
        <CarouselPause paused={paused} reducedMotion={reducedMotion} onClick={togglePaused} label="gallery" />
      </div>
    </div>
  );
}
