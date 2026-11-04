"use client";

import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { assetPath } from "@/lib/asset-path";

interface WebkitVideoElement extends HTMLVideoElement {
  webkitEnterFullscreen?: () => void;
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function ProcessVisual() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const videoSrc = assetPath("/assets/WhatsApp Video 2026-10-31 at 01.02.17.mp4");
  const poster = assetPath("/assets/optimized/process.webp");

  // Show center button when paused (Play icon) or when hovering while playing (Pause icon)
  const showCenterButton = !isPlaying || isHovered;

  // Toggle Play / Pause
  const togglePlayPause = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    setError(null);
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);

    if (video.paused) {
      try {
        setHasStarted(true);
        video.muted = isMuted;
        await video.play();
        setIsPlaying(true);
        setIsHovered(false);
      } catch (cause) {
        if (cause instanceof DOMException && cause.name === "NotAllowedError" && !video.muted) {
          video.muted = true;
          setIsMuted(true);
          try {
            await video.play();
            setIsPlaying(true);
            setIsHovered(false);
            return;
          } catch {
            // ignore
          }
        }
        if (cause instanceof DOMException && cause.name === "AbortError") return;
        setError("The video could not be played. Please use the video link below to open it directly.");
      }
    } else {
      video.pause();
      setIsPlaying(false);
      setIsHovered(false);
    }
  }, [isMuted]);

  // Toggle Mute
  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  }, []);

  // Toggle Fullscreen
  const toggleFullscreen = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    const frame = frameRef.current;
    const video = videoRef.current;
    if (!frame) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (frame.requestFullscreen) {
        await frame.requestFullscreen();
      } else {
        const webkitVideo = video as WebkitVideoElement;
        if (typeof webkitVideo.webkitEnterFullscreen === "function") {
          webkitVideo.webkitEnterFullscreen();
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Timeline Scrubbing
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video || isScrubbing) return;
    setCurrentTime(video.currentTime);
    if (isFinite(video.duration) && video.duration > 0) {
      setDuration(video.duration);
    }
  }, [isScrubbing]);

  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isFinite(video.duration) && video.duration > 0) {
      setDuration(video.duration);
    }
  }, []);

  const handleSeekChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    const video = videoRef.current;
    if (video) {
      video.currentTime = newTime;
    }
  }, []);

  const handleSeekStart = useCallback(() => {
    setIsScrubbing(true);
  }, []);

  const handleSeekEnd = useCallback(() => {
    setIsScrubbing(false);
  }, []);

  // Cursor Hover Handling for Desktop
  const handleMouseMove = useCallback(() => {
    if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) {
      return;
    }
    setIsHovered(true);
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 2800);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) {
      return;
    }
    setIsHovered(true);
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 2800);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setIsHovered(false);
  }, []);

  const handlePlay = useCallback(() => {
    setHasStarted(true);
    setIsPlaying(true);
    setIsHovered(false);
  }, []);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    setIsHovered(false);
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    const video = videoRef.current;
    if (!frame || !video) return;

    // Ensure audio starts unmuted
    video.muted = false;

    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    const handleVisibility = () => {
      if (document.visibilityState !== "visible" && !video.paused) {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && !video.paused) {
        video.pause();
      }
    }, { threshold: 0.1 });

    observer.observe(frame);
    document.addEventListener("visibilitychange", handleVisibility);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      video.pause();
    };
  }, []);

  const progressPercent = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;
  const timeDisplay = duration > 0 ? `${formatTime(currentTime)} / ${formatTime(duration)}` : formatTime(currentTime);

  return (
    <>
      <div
        ref={frameRef}
        className="process-visual"
        onClick={togglePlayPause}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="region"
        aria-label="FlowVera water treatment process video player"
      >
        <video
          ref={videoRef}
          className="process-video"
          src={videoSrc}
          poster={poster}
          loop
          playsInline
          preload="metadata"
          aria-label="FlowVera water treatment process overview"
          onPlay={handlePlay}
          onPause={handlePause}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onError={() => setError("The video could not be loaded. Please use the video link below to open it directly.")}
        >
          Your browser does not support embedded video.
        </video>

        {!hasStarted && (
          <Image
            src={poster}
            alt="FlowVera water treatment process from brackish water intake to pure water"
            fill
            sizes="100vw"
            priority={false}
            style={{ objectFit: "cover", pointerEvents: "none" }}
          />
        )}

        {/* Darkening overlay when paused or hovered */}
        <span
          className={`process-overlay ${showCenterButton ? "is-visible" : "is-hidden"}`}
          aria-hidden="true"
        />

        {/* Center Play / Pause Icon Button */}
        <button
          className={`play-button ${showCenterButton ? "is-visible" : "is-hidden"} ${isPlaying ? "is-pause" : "is-play"}`}
          type="button"
          aria-label={isPlaying ? "Pause water treatment video" : "Play water treatment video"}
          onClick={(e) => {
            e.stopPropagation();
            void togglePlayPause();
          }}
        >
          {isPlaying ? (
            <Pause size={28} fill="currentColor" aria-hidden="true" />
          ) : (
            <Play size={28} fill="currentColor" aria-hidden="true" />
          )}
        </button>

        {/* Bottom Timeline and Controls Bar (Visible during play and on hover/pause) */}
        {hasStarted && (
          <div
            className={`process-controls-bottom ${isPlaying && !isHovered ? "is-dimmed" : "is-active"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="process-timeline-wrap">
              <input
                type="range"
                className="process-timeline"
                min={0}
                max={duration > 0 ? duration : 100}
                step={0.1}
                value={currentTime}
                onChange={handleSeekChange}
                onMouseDown={handleSeekStart}
                onMouseUp={handleSeekEnd}
                onTouchStart={handleSeekStart}
                onTouchEnd={handleSeekEnd}
                aria-label="Video timeline scrubber"
                style={{
                  background: `linear-gradient(to right, #0070f3 0%, #0070f3 ${progressPercent}%, rgba(255, 255, 255, 0.35) ${progressPercent}%, rgba(255, 255, 255, 0.35) 100%)`
                }}
              />
            </div>

            <div className="process-controls-row">
              <div className="process-controls-left">
                <button
                  type="button"
                  className="process-mini-btn"
                  onClick={togglePlayPause}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? (
                    <Pause size={18} fill="currentColor" aria-hidden="true" />
                  ) : (
                    <Play size={18} fill="currentColor" aria-hidden="true" />
                  )}
                </button>
                <span className="process-time">{timeDisplay}</span>
              </div>

              <div className="process-controls-right">
                <button
                  type="button"
                  className="process-mini-btn"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute video audio" : "Mute video audio"}
                >
                  {isMuted ? (
                    <VolumeX size={19} aria-hidden="true" />
                  ) : (
                    <Volume2 size={19} aria-hidden="true" />
                  )}
                </button>
                <button
                  type="button"
                  className="process-mini-btn"
                  onClick={toggleFullscreen}
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? (
                    <Minimize size={18} aria-hidden="true" />
                  ) : (
                    <Maximize size={18} aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>
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
