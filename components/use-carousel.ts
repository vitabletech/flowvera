"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type DragEvent, type FocusEvent, type MouseEvent, type PointerEvent, type SetStateAction, type TransitionEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { loopIndex, loopTarget } from "@/lib/carousel-loop";

export function useCarousel(maxIndex: number, looping = false) {
  const count = maxIndex + 1;
  const [position, setPosition] = useState(looping ? count : 0);
  const [snapping, setSnapping] = useState(false);
  const moving = useRef(false);
  const restoreFocus = useRef<number | null>(null);
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
  const currentIndex = looping ? loopIndex(position, count) : Math.min(position, maxIndex);

  const move = useCallback((target: (current: number) => number) => {
    if (looping && moving.current) return;
    const targetPosition = target(position);
    const nextPosition = looping && reducedMotion ? count + loopIndex(targetPosition, count) : targetPosition;
    if (nextPosition === position) return;
    moving.current = looping && !reducedMotion;
    setPosition(nextPosition);
  }, [count, looping, position, reducedMotion]);

  const setIndex = useCallback((value: SetStateAction<number>) => {
    move(current => {
      const logical = looping ? loopIndex(current, count) : Math.min(current, maxIndex);
      const target = typeof value === "function" ? value(logical) : value;
      return looping ? loopTarget(current, target, count) : Math.max(0, Math.min(target, maxIndex));
    });
  }, [count, looping, maxIndex, move]);

  const next = useCallback(() => move(current => looping ? current + 1 : current >= maxIndex ? 0 : current + 1), [looping, maxIndex, move]);
  const previous = useCallback(() => move(current => looping ? current - 1 : current <= 0 ? maxIndex : Math.min(current - 1, maxIndex)), [looping, maxIndex, move]);

  const finishTransition = useCallback(() => {
    moving.current = false;
    if (!looping || (position >= count && position < count * 2)) return;
    const active = document.activeElement;
    const activeCard = active instanceof HTMLElement && regionRef.current?.contains(active)
      ? active.closest<HTMLElement>("[data-carousel-position]")
      : null;
    const resetPosition = count + loopIndex(position, count);
    if (activeCard) restoreFocus.current = Number(activeCard.dataset.carouselPosition) + resetPosition - position;
    // Equivalent copies let us reset the track without a visible backward animation.
    setSnapping(true);
    setPosition(resetPosition);
  }, [count, looping, position]);

  useLayoutEffect(() => {
    if (!snapping || restoreFocus.current === null) return;
    regionRef.current?.querySelector<HTMLElement>(`[data-carousel-position="${restoreFocus.current}"] a`)?.focus({ preventScroll: true });
    restoreFocus.current = null;
  }, [position, snapping]);

  useEffect(() => {
    if (!looping || !moving.current) return;
    const timer = window.setTimeout(finishTransition, 650);
    return () => window.clearTimeout(timer);
  }, [finishTransition, looping, position]);

  useEffect(() => {
    if (!snapping) return;
    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => setSnapping(false));
    });
    const timer = window.setTimeout(() => setSnapping(false), 100);
    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      window.clearTimeout(timer);
    };
  }, [snapping]);

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
    const timer = window.setTimeout(next, 4200);
    return () => window.clearTimeout(timer);
  }, [position, maxIndex, next, stopped]);

  function resetGesture(event: PointerEvent<HTMLDivElement>) {
    gesture.current = null;
    setDragOffset(0);
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return {
    index: currentIndex,
    trackIndex: position,
    snapping,
    onTransitionEnd: (event: TransitionEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget && event.propertyName === "transform") finishTransition();
    },
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
        if (!event.isPrimary || event.button !== 0 || (looping && moving.current)) return;
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
