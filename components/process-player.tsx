"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { assetPath } from "@/lib/asset-path";

export function ProcessPlayer() {
  const [open, setOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const videos = [
    { label: "Facility walkthrough", file: "/assets/WhatsApp Video 2026-10-31 at 01.02.17.mp4" },
    { label: "Water treatment overview", file: "/assets/gemini_generated_video_e799f989_gwr_video_mvp.mp4" }
  ];


  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab") {
        const controls = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('a[href], button, video[controls], [tabindex="0"]') ?? []);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button ref={triggerRef} className="process-visual" type="button" onClick={() => setOpen(true)} aria-label="Explore the water treatment process">
        <Image src={assetPath("/assets/optimized/process.webp")} alt="FlowVera water treatment process from brackish water intake to pure water" fill sizes="100vw" />
        <span className="process-overlay" />
        <span className="play-button"><Play size={25} fill="currentColor" aria-hidden="true" /></span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="modal-backdrop"
            role="presentation"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
          >
            <motion.section
              ref={dialogRef}
              className="process-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="process-dialog-title"
              initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              <button ref={closeRef} className="dialog-close" type="button" aria-label="Close process overview" onClick={() => setOpen(false)}><X size={20} /></button>
              <p className="eyebrow">FROM SOURCE TO SUPPLY</p>
              <h2 id="process-dialog-title">A smarter journey to pure water.</h2>
              <p>Every system is designed around your water source and operating needs. FlowVera brings intake, pretreatment, membrane filtration and ongoing technical care together as one reliable solution.</p>
              <ol className="process-steps">
                <li><span>01</span><div><strong>Understand the source</strong><small>Water analysis and application review.</small></div></li>
                <li><span>02</span><div><strong>Engineer the treatment</strong><small>Equipment and membranes selected for performance.</small></div></li>
                <li><span>03</span><div><strong>Support every stage</strong><small>Commissioning, chemicals and technical service.</small></div></li>
              </ol>
              <div className="process-video-block">
                <div className="process-video-tabs" role="group" aria-label="Choose a FlowVera video">
                  {videos.map((video, index) => <button key={video.file} type="button" aria-pressed={activeVideo === index} className={activeVideo === index ? "is-active" : ""} onClick={() => setActiveVideo(index)}>{video.label}</button>)}
                </div>
                <video key={videos[activeVideo].file} className="process-video" controls playsInline preload="metadata" poster={assetPath("/assets/optimized/process.webp")} aria-label={videos[activeVideo].label}>
                  <source src={assetPath(videos[activeVideo].file)} type="video/mp4" />
                  Your browser does not support embedded MP4 video.
                </video>
              </div>
              <a className="text-link" href="#contact" onClick={() => setOpen(false)}>Talk to our team <ArrowRight size={16} /></a>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
