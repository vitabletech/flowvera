"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { useLoopingCarousel } from "@/components/use-looping-carousel";

const gallery = [
  { src: assetPath("/assets/optimized/project-water-softener.webp"), alt: "FlowVera water softener systems" },
  { src: assetPath("/assets/optimized/project-ro-chemicals.webp"), alt: "FlowVera reverse osmosis membrane chemicals" },
  { src: assetPath("/assets/optimized/project-cartridge-filters.webp"), alt: "FlowVera cartridge filter systems" }
];

export function GalleryCarousel() {
  const { index, setIndex, next, previous, dragging, regionProps, swipeProps, stopped, paused, reducedMotion, togglePaused, trackRef, windowRef, slides, isVisible, trackStyle, onTransitionEnd } = useLoopingCarousel(gallery, 510);
  return (
    <div {...regionProps} className="gallery-carousel" role="region" aria-roledescription="carousel" aria-label="FlowVera project gallery">
      <div {...swipeProps} ref={windowRef} className={"gallery-window carousel-swipe" + (dragging ? " is-dragging" : "")}>
        <div className="gallery-track" ref={trackRef} style={trackStyle} onTransitionEnd={onTransitionEnd}>
          {slides.map(({ item, position, logicalIndex }) => (
            <figure className="gallery-card" key={position} aria-hidden={!isVisible(position)} role="group" aria-roledescription="slide" aria-label={`${logicalIndex + 1} of ${gallery.length}`}>
              <Image src={item.src} alt={item.alt} fill sizes="(max-width: 700px) 82vw, 486px" />
            </figure>
          ))}
        </div>
        <p className="sr-only" aria-live={stopped ? "polite" : "off"} aria-atomic="true">Project image {index + 1} of {gallery.length}</p>
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
      </div>
    </div>
  );
}
