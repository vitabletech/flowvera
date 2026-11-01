import { Pause, Play } from "lucide-react";

export function CarouselPause({ paused, reducedMotion, onClick, label }: { paused: boolean; reducedMotion: boolean | null; onClick: () => void; label: string }) {
  if (reducedMotion) return null;
  return (
    <button className="carousel-pause" type="button" aria-label={`${paused ? "Resume" : "Pause"} ${label} autoplay`} onClick={onClick}>
      {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
    </button>
  );
}
