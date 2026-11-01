"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { assetPath } from "@/lib/asset-path";
import { services, serviceHref } from "@/lib/services";
import { useCarousel } from "@/components/use-carousel";
import { CarouselPause } from "@/components/carousel-pause";

const carouselServices = services.slice(0, 5);

export function ServicesCarousel() {
  const [visible, setVisible] = useState(3);
  const [slideDistance, setSlideDistance] = useState(408);
  const trackRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const maxIndex = Math.max(0, carouselServices.length - visible);
  const { index, setIndex, next, previous, dragOffset, dragging, regionProps, swipeProps, paused, reducedMotion, togglePaused } = useCarousel(maxIndex);

  useEffect(() => {
    const updateVisible = () => {
      const card = trackRef.current?.firstElementChild;
      const frame = windowRef.current;
      if (!card || !frame) return;
      const cardWidth = card.getBoundingClientRect().width;
      const distance = cardWidth + 24;
      const nextVisible = Math.max(1, Math.floor((frame.clientWidth + 24) / distance));
      setVisible(nextVisible);
      setIndex((current) => Math.min(current, carouselServices.length - nextVisible));
      setSlideDistance(distance);
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, [setIndex]);

  return (
    <div {...regionProps} className="services-carousel" role="region" aria-roledescription="carousel" aria-label="Water treatment solutions">
      <div {...swipeProps} className={"services-window carousel-swipe" + (dragging ? " is-dragging" : "")} ref={windowRef}>
        <div className="services-track" ref={trackRef} style={{ transform: `translateX(${-index * slideDistance + dragOffset}px)`, transition: dragging ? "none" : undefined }}>
          {carouselServices.map((service, serviceIndex) => (
            <article className="service-card" key={service.title} aria-hidden={serviceIndex < index || serviceIndex > index + visible} inert={serviceIndex < index || serviceIndex > index + visible}>
              <Link className="service-card-link" href={serviceHref(service.slug)} aria-label={"View " + service.title} onFocus={() => {
                if (serviceIndex >= index + visible) setIndex(Math.min(serviceIndex - visible + 1, maxIndex));
              }}>
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
      <div className="carousel-controls">
        <div className="carousel-dots" role="group" aria-label="Choose a service slide">
          {Array.from({ length: maxIndex + 1 }).map((_, dot) => (
            <button
              key={dot}
              className={"carousel-dot" + (index === dot ? " active" : "")}
              type="button"
              aria-label={"Show service group " + (dot + 1)}
              aria-current={index === dot ? "true" : undefined}
              onClick={() => setIndex(dot)}
            />
          ))}
        </div>
        <div className="carousel-arrows">
          <button type="button" aria-label="Previous services" onClick={previous}>
            <ArrowLeft size={16} />
          </button>
          <button type="button" aria-label="Next services" onClick={next}>
            <ArrowRight size={16} />
          </button>
        </div>
        <CarouselPause paused={paused} reducedMotion={reducedMotion} onClick={togglePaused} label="services" />
      </div>
    </div>
  );
}
