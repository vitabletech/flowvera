"use client";

import { useEffect, useRef, useState } from "react";
import { useCarousel } from "@/components/use-carousel";
import { repeatSlides } from "@/lib/carousel-loop";

export function useLoopingCarousel<T>(items: readonly T[], initialDistance: number) {
  const carousel = useCarousel(items.length - 1, true);
  const trackRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState({ distance: initialDistance, visible: 3, full: 2 });

  useEffect(() => {
    const track = trackRef.current;
    const frame = windowRef.current;
    const card = track?.firstElementChild;
    if (!track || !frame || !card) return;
    const updateLayout = () => {
      const gap = Number.parseFloat(getComputedStyle(track).columnGap);
      const distance = card.getBoundingClientRect().width + gap;
      const slots = (frame.clientWidth + gap) / distance;
      setLayout({ distance, visible: Math.ceil(slots), full: Math.max(1, Math.floor(slots)) });
    };
    updateLayout();
    const observer = new ResizeObserver(updateLayout);
    observer.observe(frame);
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return {
    ...carousel,
    trackRef,
    windowRef,
    slides: repeatSlides(items, layout.visible),
    isVisible: (position: number) => position >= carousel.trackIndex && position < carousel.trackIndex + layout.visible,
    revealOnFocus: (position: number) => {
      if (position >= carousel.trackIndex + layout.full) carousel.setIndex(carousel.index + 1);
    },
    trackStyle: {
      transform: `translateX(${-carousel.trackIndex * layout.distance + carousel.dragOffset}px)`,
      transition: carousel.dragging || carousel.snapping || carousel.reducedMotion ? "none" : undefined
    }
  };
}
