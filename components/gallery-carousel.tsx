"use client";

import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import { useLoopingCarousel } from "@/components/use-looping-carousel";

const gallery = [
  {
    src: assetPath("/assets/optimized/project-water-pumps.webp"),
    alt: "FlowVera high-performance water pumps for water treatment and industrial applications"
  },
  {
    src: assetPath("/assets/optimized/project-ro-plant.webp"),
    alt: "FlowVera industrial and commercial reverse osmosis standard plant"
  },
  {
    src: assetPath("/assets/optimized/project-multimedia-filter.webp"),
    alt: "FlowVera multimedia filter (MMF) pre-filtration system"
  },
  {
    src: assetPath("/assets/optimized/project-water-softener.webp"),
    alt: "FlowVera water softener systems for scale prevention"
  },
  {
    src: assetPath("/assets/optimized/project-dm-plant.webp"),
    alt: "FlowVera demineralization (DM) plant solutions"
  },
  {
    src: assetPath("/assets/optimized/project-activated-carbon-filter.webp"),
    alt: "FlowVera activated carbon filter (ACF) system"
  },
  {
    src: assetPath("/assets/optimized/project-sewage-treatment.webp"),
    alt: "FlowVera sewage treatment and grey water system plant"
  },
  {
    src: assetPath("/assets/optimized/project-specialty-chemicals.webp"),
    alt: "FlowVera specialty water treatment chemicals"
  },
  {
    src: assetPath("/assets/optimized/project-water-tanks.webp"),
    alt: "FlowVera specialized water tanks including GLS, FRP, and polyethylene"
  },
  {
    src: assetPath("/assets/optimized/project-spares-instruments.webp"),
    alt: "FlowVera genuine spares and precision instruments"
  }
];

export function GalleryCarousel() {
  const {
    index,
    setIndex,
    dragging,
    regionProps,
    swipeProps,
    stopped,
    trackRef,
    windowRef,
    slides,
    isVisible,
    trackStyle,
    onTransitionEnd
  } = useLoopingCarousel(gallery, 446, 3200);

  return (
    <div {...regionProps} className="gallery-carousel" role="region" aria-roledescription="carousel" aria-label="FlowVera project gallery">
      <div {...swipeProps} ref={windowRef} className={"gallery-window carousel-swipe" + (dragging ? " is-dragging" : "")}>
        <div className="gallery-track" ref={trackRef} style={trackStyle} onTransitionEnd={onTransitionEnd}>
          {slides.map(({ item, position, logicalIndex }) => (
            <figure
              className="gallery-card"
              key={position}
              data-carousel-position={position}
              aria-hidden={!isVisible(position)}
              role="group"
              aria-roledescription="slide"
              aria-label={`${logicalIndex + 1} of ${gallery.length}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                priority={logicalIndex < 3}
                sizes="(max-width: 680px) 82vw, 422px"
              />
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
