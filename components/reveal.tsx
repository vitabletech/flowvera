"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up"
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "zoom";
}) {
  const reduceMotion = useReducedMotion();
  const offset =
    direction === "left"
      ? { x: -28, y: 0 }
      : direction === "right"
        ? { x: 28, y: 0 }
        : direction === "zoom"
          ? { scale: 0.97, y: 0 }
          : { x: 0, y: 24 };

  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduceMotion ? undefined : { opacity: [0.7, 1], x: [offset.x ?? 0, 0], y: [offset.y, 0], scale: [offset.scale ?? 1, 1] }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
