"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { assetPath } from "@/lib/asset-path";

const videoFile = "/assets/gemini_generated_video_e799f989_gwr_video_mvp.mp4";

export function ProcessPlayer() {
  const [started, setStarted] = useState(false);
  const [error, setError] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (!started) return;
    const video = videoRef.current;
    if (!video) return;
    let cancelled = false;
    video.focus();
    video.play().catch(() => {
      if (!cancelled) setError("Playback could not start. Use the video controls to try again or open the video file below.");
    });
    return () => { cancelled = true; video.pause(); };
  }, [started]);

  function startVideo() {
    setError("");
    setStarted(true);
  }
  const reportLoadError = () => setError("This video could not be loaded. Try again using the controls or open the file below.");

  return (
    <div className="inline-process">
      <div className="process-media">
        <video ref={videoRef} src={assetPath(videoFile)} className="inline-process-video" hidden={!started} controls playsInline preload="none" tabIndex={0} poster={assetPath("/assets/optimized/process.webp")} aria-label="Water treatment overview" onPlaying={() => setError("")} onError={reportLoadError}>
          Your browser does not support embedded video.
        </video>
        {!started && <button className="process-visual" type="button" onClick={startVideo} aria-label="Play water treatment overview">
          <Image src={assetPath("/assets/optimized/process.webp")} alt="FlowVera water treatment process from brackish water intake to pure water" fill sizes="100vw" />
          <span className="process-overlay" />
          <span className="play-button"><Play size={25} fill="currentColor" aria-hidden="true" /></span>
        </button>}
      </div>
      {error && <div className="inline-video-error">
        <p className="video-error" role="alert">{error}</p>
        <a className="text-link" href={assetPath(videoFile)} target="_blank" rel="noreferrer">Open video file</a>
      </div>}
    </div>
  );
}
