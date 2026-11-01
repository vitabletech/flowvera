"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { assetPath } from "@/lib/asset-path";

const services = [
  {
    title: "Water Treatment Plants & Systems",
    description: "We supply water treatment plants designed to meet different water quality and industrial requirements.",
    image: assetPath("/assets/optimized/service-1.webp"),
    href: "#contact"
  },
  {
    title: "RO Maintenance & Technical Services",
    description: "From routine servicing to membrane replacement, we help keep your RO systems running smoothly.",
    image: assetPath("/assets/optimized/service-2.webp"),
    href: "#contact"
  },
  {
    title: "Membranes, Filtration & Ion Exchange",
    description: "Find the right membranes, filter media and ion exchange products for your water treatment needs.",
    image: assetPath("/assets/optimized/service-3.webp"),
    href: "#contact"
  },
  {
    title: "Pumps, Dosing & Automation Systems",
    description: "Explore pumps, dosing equipment and automatic control systems for reliable water treatment operations.",
    image: assetPath("/assets/optimized/service-4.webp"),
    href: "#contact"
  },
  {
    title: "Industrial Tanks & Storage Solutions",
    description: "We offer a range of industrial tanks for water storage and filtration applications.",
    image: assetPath("/assets/optimized/service-5.webp"),
    href: "#contact"
  }
];

export function ServicesCarousel() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(3);
  const [slideDistance, setSlideDistance] = useState(408);

  useEffect(() => {
    const updateVisible = () => {
      const width = window.innerWidth;
      const nextVisible = width <= 680 ? 1 : width <= 1023 ? 2 : 3;
      setVisible(nextVisible);
      setIndex((current) => Math.min(current, services.length - nextVisible));
      const cardWidth = width <= 680 ? width - 40 : width <= 1023 ? (width - 88) / 2 : width <= 1250 ? (width - 112) / 3 : 384;
      setSlideDistance(cardWidth + 24);
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const maxIndex = Math.max(0, services.length - visible);

  return (
    <div className="services-carousel" role="region" aria-roledescription="carousel" aria-label="Water treatment solutions">
      <div className="services-window">
        <div className="services-track" style={{ transform: "translateX(-" + index * slideDistance + "px)" }}>
          {services.map((service, serviceIndex) => (
            <article className="service-card" key={service.title} inert={serviceIndex < index || serviceIndex >= index + visible}>
              <Link className="service-card-link" href={service.href} aria-label={"Enquire about " + service.title}>
                <div className="service-image">
                  <Image src={service.image} alt="" fill sizes="(max-width: 680px) 88vw, (max-width: 1024px) 44vw, 384px" />
                </div>
                <div className="service-copy">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span className="text-link">Discuss this solution <ArrowUpRight size={15} aria-hidden="true" /></span>
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
          <button type="button" aria-label="Previous services" onClick={() => setIndex((value) => value <= 0 ? maxIndex : value - 1)}>
            <ArrowLeft size={16} />
          </button>
          <button type="button" aria-label="Next services" onClick={() => setIndex((value) => value >= maxIndex ? 0 : value + 1)}>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
