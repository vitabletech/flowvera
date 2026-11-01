"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import { services, serviceHref } from "@/lib/services";
import { useLoopingCarousel } from "@/components/use-looping-carousel";

const carouselServices = services.slice(0, 5);

export function ServicesCarousel() {
  const { index, setIndex, next, previous, dragging, regionProps, swipeProps, paused, reducedMotion, togglePaused, stopped, trackRef, windowRef, slides, isVisible, revealOnFocus, trackStyle, onTransitionEnd } = useLoopingCarousel(carouselServices, 408);

  return (
    <div {...regionProps} className="services-carousel" role="region" aria-roledescription="carousel" aria-label="Water treatment solutions">
      <div {...swipeProps} className={"services-window carousel-swipe" + (dragging ? " is-dragging" : "")} ref={windowRef}>
        <div className="services-track" ref={trackRef} style={trackStyle} onTransitionEnd={onTransitionEnd}>
          {slides.map(({ item: service, position, logicalIndex }) => (
            <article className="service-card" key={position} data-carousel-position={position} aria-hidden={!isVisible(position)} inert={!isVisible(position)} aria-label={`${logicalIndex + 1} of ${carouselServices.length}`}>
              <Link className="service-card-link" href={serviceHref(service.slug)} aria-label={"View " + service.title} onFocus={() => revealOnFocus(position)}>
                <div className="service-image">
                  <Image src={assetPath(service.image)} alt="" fill sizes="(max-width: 680px) 84vw, (max-width: 1024px) 44vw, 384px" />
                </div>
                <div className="service-copy">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span className="text-link">Explore More <ArrowUpRight size={15} aria-hidden="true" /></span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
      <p className="sr-only" aria-live={stopped ? "polite" : "off"} aria-atomic="true">Service {index + 1} of {carouselServices.length}</p>
      <div className="carousel-controls">
        <div className="carousel-dots" role="group" aria-label="Choose a service slide">
          {carouselServices.map((_, dot) => (
            <button
              key={dot}
              className={"carousel-dot" + (index === dot ? " active" : "")}
              type="button"
              aria-label={"Show service slide " + (dot + 1)}
              aria-current={index === dot ? "true" : undefined}
              onClick={() => setIndex(dot)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
