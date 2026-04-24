"use client";

import { useEffect, useRef, useState } from "react";
import type { VideoEntry } from "@/lib/video";

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  destroy: () => void;
};

type VimeoPlayer = {
  play: () => Promise<void>;
  pause: () => Promise<void>;
  setMuted: (m: boolean) => Promise<void>;
  on: (event: string, fn: () => void) => void;
  destroy: () => Promise<void>;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementOrId: string | HTMLElement,
        opts: Record<string, unknown>,
      ) => YTPlayer;
      PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
    Vimeo?: { Player: new (el: HTMLElement, opts?: Record<string, unknown>) => VimeoPlayer };
  }
}

let ytReady: Promise<void> | null = null;
function loadYouTube(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();
  if (ytReady) return ytReady;
  ytReady = new Promise<void>((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.async = true;
    document.head.appendChild(tag);
  });
  return ytReady;
}

let vimeoReady: Promise<void> | null = null;
function loadVimeo(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Vimeo?.Player) return Promise.resolve();
  if (vimeoReady) return vimeoReady;
  vimeoReady = new Promise<void>((resolve, reject) => {
    const tag = document.createElement("script");
    tag.src = "https://player.vimeo.com/api/player.js";
    tag.async = true;
    tag.onload = () => resolve();
    tag.onerror = () => reject(new Error("Vimeo SDK failed to load"));
    document.head.appendChild(tag);
  });
  return vimeoReady;
}

interface MinimalVideoPlayerProps {
  video: VideoEntry;
}

export default function MinimalVideoPlayer({ video }: MinimalVideoPlayerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const directRef = useRef<HTMLVideoElement>(null);
  const ytRef = useRef<YTPlayer | null>(null);
  const vmRef = useRef<VimeoPlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    if (video.provider === "youtube" && video.videoId) {
      const mount = document.createElement("div");
      mount.style.width = "100%";
      mount.style.height = "100%";
      wrapper.innerHTML = "";
      wrapper.appendChild(mount);

      loadYouTube().then(() => {
        if (cancelled || !window.YT) return;
        ytRef.current = new window.YT.Player(mount, {
          videoId: video.videoId,
          width: "100%",
          height: "100%",
          playerVars: {
            controls: 0,
            modestbranding: 1,
            rel: 0,
            iv_load_policy: 3,
            disablekb: 1,
            fs: 0,
            playsinline: 1,
          },
          events: {
            onStateChange: (e: { data: number }) => {
              const PS = window.YT?.PlayerState;
              if (!PS) return;
              setIsPlaying(e.data === PS.PLAYING);
            },
          },
        });
      });
      return () => {
        cancelled = true;
        ytRef.current?.destroy();
        ytRef.current = null;
      };
    }

    if (video.provider === "vimeo" && video.videoId) {
      const mount = document.createElement("div");
      mount.style.width = "100%";
      mount.style.height = "100%";
      wrapper.innerHTML = "";
      wrapper.appendChild(mount);

      loadVimeo()
        .then(() => {
          if (cancelled || !window.Vimeo) return;
          const player = new window.Vimeo.Player(mount, {
            id: Number(video.videoId),
            controls: false,
            byline: false,
            portrait: false,
            title: false,
            playsinline: true,
            responsive: true,
          });
          vmRef.current = player;
          player.on("play", () => setIsPlaying(true));
          player.on("pause", () => setIsPlaying(false));
          player.on("ended", () => setIsPlaying(false));
        })
        .catch(() => undefined);

      return () => {
        cancelled = true;
        vmRef.current?.destroy().catch(() => undefined);
        vmRef.current = null;
      };
    }

    // direct: nothing to mount; <video> renders below
    return () => {
      cancelled = true;
    };
  }, [video]);

  function togglePlay() {
    if (video.provider === "direct") {
      const v = directRef.current;
      if (!v) return;
      if (v.paused) v.play().catch(() => undefined);
      else v.pause();
      return;
    }
    if (video.provider === "youtube" && ytRef.current) {
      if (isPlaying) ytRef.current.pauseVideo();
      else ytRef.current.playVideo();
      return;
    }
    if (video.provider === "vimeo" && vmRef.current) {
      if (isPlaying) vmRef.current.pause().catch(() => undefined);
      else vmRef.current.play().catch(() => undefined);
    }
  }

  function toggleMute() {
    if (video.provider === "direct") {
      const v = directRef.current;
      if (!v) return;
      v.muted = !v.muted;
      setIsMuted(v.muted);
      return;
    }
    if (video.provider === "youtube" && ytRef.current) {
      const next = !isMuted;
      if (next) ytRef.current.mute();
      else ytRef.current.unMute();
      setIsMuted(next);
      return;
    }
    if (video.provider === "vimeo" && vmRef.current) {
      const next = !isMuted;
      vmRef.current.setMuted(next).catch(() => undefined);
      setIsMuted(next);
    }
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-black">
      {video.provider === "direct" ? (
        <video
          ref={directRef}
          src={video.embedUrl}
          playsInline
          preload="metadata"
          controlsList="nodownload"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <div ref={wrapperRef} className="absolute inset-0 h-full w-full" />
      )}

      {/* Click-to-play overlay so the iframe can't steal interaction */}
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="absolute inset-0 z-10 flex items-center justify-center"
        style={{ background: isPlaying ? "transparent" : "rgba(0,0,0,0.25)" }}
      >
        {!isPlaying && (
          <span className="grid h-16 w-16 place-items-center rounded-full bg-white/90 text-neutral-900 shadow-lg transition hover:bg-white">
            <svg width="22" height="24" viewBox="0 0 22 24" fill="currentColor" aria-hidden>
              <path d="M2 1.5v21l18-10.5L2 1.5z" />
            </svg>
          </span>
        )}
      </button>

      {/* Minimal control bar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center gap-3 bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="pointer-events-auto grid h-9 w-9 place-items-center rounded-full bg-white/95 text-neutral-900 hover:bg-white"
        >
          {isPlaying ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
              <rect x="2" y="1" width="3.5" height="12" />
              <rect x="8.5" y="1" width="3.5" height="12" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
              <path d="M2 1v12l11-6L2 1z" />
            </svg>
          )}
        </button>
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
          className="pointer-events-auto grid h-9 w-9 place-items-center rounded-full bg-white/95 text-neutral-900 hover:bg-white"
        >
          {isMuted ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
              <path d="M8 2L4.5 5H1v6h3.5L8 14V2zM12.5 6.5l-2 2m0-2l2 2" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
              <path d="M8 2L4.5 5H1v6h3.5L8 14V2z" />
              <path
                d="M11 5c1 1 1 5 0 6M13 3.5c1.8 1.8 1.8 7.2 0 9"
                stroke="currentColor"
                strokeWidth="1.3"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
