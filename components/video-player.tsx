"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface VideoPlayerProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export function VideoPlayer({
  src,
  className = "",
  style,
  autoPlay = true,
  loop = true,
  muted = false,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-black group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
      style={style}
    >
      <video
        ref={videoRef}
        src={src}
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
        autoPlay={autoPlay}
        loop={loop}
        playsInline
        style={style}
      />

      {/* Controls Container */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-20 transition-opacity duration-300 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-8 pb-4 px-6 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center justify-between gap-6">
          {/* Play/Pause Button */}
          <button
            onClick={handlePlayPause}
            className="flex-shrink-0 p-2.5 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 text-white"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause size={20} className="fill-current" />
            ) : (
              <Play size={20} className="fill-current" />
            )}
          </button>

          {/* Volume Control */}
          <div className="flex items-center gap-4 flex-1 max-w-xs">
            {/* Mute Button */}
            <button
              onClick={handleMuteToggle}
              className="flex-shrink-0 p-2.5 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 text-white"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX size={20} />
              ) : (
                <Volume2 size={20} />
              )}
            </button>

            {/* Volume Slider */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                const newVolume = parseFloat(e.target.value);
                setVolume(newVolume);
                if (newVolume > 0 && isMuted) {
                  setIsMuted(false);
                }
              }}
              className="h-1.5 rounded-full bg-white/30 cursor-pointer accent-white flex-1 appearance-none"
              style={{
                background: `linear-gradient(to right, white ${
                  isMuted ? 0 : volume * 100
                }%, rgba(255,255,255,0.3) ${isMuted ? 0 : volume * 100}%)`,
              }}
              aria-label="Volume"
            />
          </div>
        </div>
      </div>

      {/* Center Play Button (when paused) */}
      {!isPlaying && (
        <button
          onClick={handlePlayPause}
          className="absolute inset-0 z-10 flex items-center justify-center group/play hover:bg-black/20 transition-colors duration-200"
          aria-label="Play"
        >
          <div className="p-6 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/40 transition-all duration-200 group-hover/play:scale-110">
            <Play size={32} className="fill-white text-white" />
          </div>
        </button>
      )}
    </div>
  );
}
