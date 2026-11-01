"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { assetPath } from "@/lib/asset-path";

export function ProcessVisual() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);
  const manuallyPaused = useRef(false);
  const manuallyStarted = useRef(false);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoSrc = assetPath("/assets/WhatsApp Video 2026-10-31 at 01.02.17.mp4");
  const poster = assetPath("/assets/optimized/process.webp");

  const playVideo = useCallback(async (manual: boolean) => {
    if (manual) {
      manuallyPaused.current = false;
      manuallyStarted.current = true;
    }
    setError(null);
    try {
      if (!videoRef.current) throw new Error("The video player is unavailable.");
      await videoRef.current.play();
    } catch (cause) {
      // Scrolling away can interrupt a pending play request.
      if (cause instanceof DOMException && cause.name === "AbortError") return;
      setError("The video could not be played automatically. Use the play button or open the video link below.");
    }
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    const video = videoRef.current;
    if (!frame || !video) return;
    let inView = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePlayback = () => {
      visibleRef.current = inView && document.visibilityState === "visible";
      if (!visibleRef.current) {
        video.pause();
      } else if (!manuallyPaused.current && (!reducedMotion.matches || manuallyStarted.current)) {
        void playVideo(false);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio >= 0.15;
      updatePlayback();
    }, { threshold: 0.15 });
    observer.observe(frame);
    document.addEventListener("visibilitychange", updatePlayback);
    reducedMotion.addEventListener("change", updatePlayback);
    return () => {
      visibleRef.current = false;
      observer.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      reducedMotion.removeEventListener("change", updatePlayback);
      video.pause();
    };
  }, [playVideo]);

  return (
    <>
      <div ref={frameRef} className="process-visual">
        <video
          ref={videoRef}
          className="process-video"
          src={videoSrc}
          poster={poster}
          controls
          muted
          loop
          playsInline
          preload="none"
          aria-label="FlowVera water treatment process overview"
          onPlay={() => {
            setStarted(true);
            manuallyPaused.current = false;
            if (!visibleRef.current) videoRef.current?.pause();
          }}
          onPause={() => {
            if (visibleRef.current) manuallyPaused.current = true;
          }}
          onError={() => setError("The video could not be loaded. Please use the video link below to open it directly.")}
        >
          Your browser does not support embedded video.
        </video>
        {!started && (
          <>
            <Image src={poster} alt="FlowVera water treatment process from brackish water intake to pure water" fill sizes="100vw" />
            <span className="process-overlay" aria-hidden="true" />
            <button className="play-button" type="button" aria-label="Play water treatment overview" onClick={() => void playVideo(true)}>
              <Play size={25} fill="currentColor" aria-hidden="true" />
            </button>
          </>
        )}
      </div>
      {error && (
        <p className="process-error" role="alert">
          {error} <a href={videoSrc} target="_blank" rel="noopener noreferrer">Open water treatment video (opens in a new tab)</a>
        </p>
      )}
    </>
  );
}
