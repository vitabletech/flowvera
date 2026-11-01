"use client";

import { useEffect, useRef, useState, type DragEvent, type FocusEvent, type MouseEvent, type PointerEvent } from "react";
import { useReducedMotion } from "framer-motion";

export function useCarousel(maxIndex: number) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);
  const gesture = useRef<{ id: number; x: number; y: number; horizontal: boolean } | null>(null);
  const suppressClick = useRef(false);
  const reducedMotion = useReducedMotion();
  const stopped = paused || hovered || focused || dragging || !inView || !pageVisible || !!reducedMotion;
  const currentIndex = Math.min(index, maxIndex);

  useEffect(() => {
    const region = regionRef.current;
    if (!region) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(region);
    const updateVisibility = () => setPageVisible(document.visibilityState === "visible");
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (stopped || maxIndex === 0) return;
    const timer = window.setTimeout(() => setIndex(value => value >= maxIndex ? 0 : value + 1), 4200);
    return () => window.clearTimeout(timer);
  }, [index, maxIndex, stopped]);

  const next = () => setIndex(value => value >= maxIndex ? 0 : value + 1);
  const previous = () => setIndex(value => value <= 0 ? maxIndex : Math.min(value - 1, maxIndex));

  function resetGesture(event: PointerEvent<HTMLDivElement>) {
    gesture.current = null;
    setDragOffset(0);
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return {
    index: currentIndex,
    setIndex,
    next,
    previous,
    dragOffset,
    dragging,
    paused,
    reducedMotion,
    stopped,
    togglePaused: () => setPaused(value => !value),
    regionProps: {
      ref: regionRef,
      onPointerEnter: (event: PointerEvent<HTMLDivElement>) => { if (event.pointerType === "mouse") setHovered(true); },
      onPointerLeave: () => setHovered(false),
      onFocus: () => setFocused(true),
      onBlur: (event: FocusEvent<HTMLDivElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }
    },
    swipeProps: {
      onPointerDown: (event: PointerEvent<HTMLDivElement>) => {
        if (!event.isPrimary || event.button !== 0) return;
        suppressClick.current = false;
        gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, horizontal: false };
      },
      onPointerMove: (event: PointerEvent<HTMLDivElement>) => {
        const start = gesture.current;
        if (!start || start.id !== event.pointerId) return;
        const dx = event.clientX - start.x;
        const dy = event.clientY - start.y;
        if (!start.horizontal) {
          if (Math.max(Math.abs(dx), Math.abs(dy)) < 8) return;
          if (Math.abs(dy) > Math.abs(dx)) { gesture.current = null; return; }
          start.horizontal = true;
          suppressClick.current = true;
          event.currentTarget.setPointerCapture(event.pointerId);
          setDragging(true);
        }
        event.preventDefault();
        setDragOffset(Math.max(-160, Math.min(160, dx)));
      },
      onPointerUp: (event: PointerEvent<HTMLDivElement>) => {
        const start = gesture.current;
        if (!start || start.id !== event.pointerId) return;
        if (start.horizontal && Math.abs(event.clientX - start.x) >= 40) {
          if (event.clientX < start.x) next();
          else previous();
        }
        resetGesture(event);
      },
      onPointerCancel: resetGesture,
      onLostPointerCapture: resetGesture,
      onDragStart: (event: DragEvent<HTMLDivElement>) => event.preventDefault(),
      onClickCapture: (event: MouseEvent<HTMLDivElement>) => {
        if (suppressClick.current && event.detail !== 0) {
          event.preventDefault();
          event.stopPropagation();
        }
      }
    }
  };
}
