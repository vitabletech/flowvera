"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { assetPath } from "@/lib/asset-path";

export function ProcessVisual() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoSrc = assetPath("/assets/WhatsApp Video 2026-10-31 at 01.02.17.mp4");
  const poster = assetPath("/assets/optimized/process.webp");

  const playVideo = async () => {
    setStarted(true);
    setError(null);
    try {
      if (!videoRef.current) throw new Error("The video player is unavailable.");
      await videoRef.current.play();
    } catch {
      setError("The video could not be played. Please use the video link below to open it directly.");
    }
  };

  return (
    <>
      <div className="process-visual">
        <video
          ref={videoRef}
          className="process-video"
          src={videoSrc}
          poster={poster}
          hidden={!started}
          controls
          playsInline
          preload="none"
          aria-label="FlowVera water treatment process overview"
          onError={() => setError("The video could not be loaded. Please use the video link below to open it directly.")}
        >
          Your browser does not support embedded video.
        </video>
        {!started && (
          <>
            <Image src={poster} alt="FlowVera water treatment process from brackish water intake to pure water" fill sizes="100vw" />
            <span className="process-overlay" aria-hidden="true" />
            <button className="play-button" type="button" aria-label="Play water treatment overview" onClick={playVideo}>
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
