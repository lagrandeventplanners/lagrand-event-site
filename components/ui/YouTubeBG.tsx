"use client";

import { useEffect, useRef, useState } from "react";

/* ── Types ───────────────────────────────────────────────── */
interface YTPlayer {
  mute(): void;
  unMute(): void;
  playVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  setPlaybackQuality(q: string): void;
  getCurrentTime(): number;
  getDuration(): number;
  getIframe(): HTMLIFrameElement;
}

declare global {
  interface Window {
    YT: {
      Player: new (
        el: HTMLElement,
        opts: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (e: { target: YTPlayer }) => void;
            onStateChange?: (e: { data: number; target: YTPlayer }) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: { PLAYING: number; ENDED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

/* ── SVG icons ───────────────────────────────────────────── */
function VolumeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

function VolumeOnIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

/* ── Component ───────────────────────────────────────────── */
export default function YouTubeBG({ videoId }: { videoId: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [muted, setMuted] = useState(true);
  /*
   * `visible` starts false. The outer video container has opacity:0.
   * We only set it to true once the player fires its first PLAYING event (state=1).
   * This ensures ALL YouTube chrome (loading spinner, centre play/pause button,
   * buffering overlay, initial controls flash) is hidden behind opacity:0
   * and the user only ever sees clean, playing video.
   */
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    function createPlayer() {
      if (!wrapper) return;
      wrapper.innerHTML = "";

      const slot = document.createElement("div");
      slot.style.cssText =
        "position:absolute;top:0;left:0;width:100%;height:100%;";
      wrapper.appendChild(slot);

      playerRef.current = new window.YT.Player(slot, {
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: videoId,
          controls: 0,       // hides bottom control bar
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          iv_load_policy: 3, // hides info cards/annotations
          cc_load_policy: 0,
          disablekb: 1,
          fs: 0,
          color: "white",
          origin:
            typeof window !== "undefined" ? window.location.origin : "",
        },
        events: {
          onReady(e) {
            e.target.mute();
            e.target.playVideo();
            e.target.setPlaybackQuality("highres");

            /* Force iframe to fill cover-math wrapper & block all events */
            const iframe = e.target.getIframe();
            if (iframe) {
              iframe.removeAttribute("width");
              iframe.removeAttribute("height");
              iframe.style.cssText = [
                "position:absolute",
                "top:0",
                "left:0",
                "width:100%",
                "height:100%",
                "border:none",
                "display:block",
                "pointer-events:none", // blocks hover → controls never appear
              ].join(";");
            }

            /*
             * Poll every 500 ms. Seek back to 0 when within 3 s of the end.
             * This fires long before YouTube shows its end-screen, next-video
             * suggestions, channel cards, or the countdown timer.
             */
            if (timerRef.current) clearInterval(timerRef.current);
            timerRef.current = setInterval(() => {
              const p = playerRef.current;
              if (!p) return;
              const dur = p.getDuration();
              const cur = p.getCurrentTime();
              if (dur > 0 && cur >= dur - 3) {
                p.seekTo(0, true);
                p.playVideo();
              }
            }, 500);
          },

          onStateChange(e) {
            /*
             * State 1 = PLAYING.
             * First time we see PLAYING, reveal the video.
             * Subsequent PLAYING events (after seek) don't re-hide it —
             * we only ever transition from hidden → visible once.
             */
            if (e.data === 1) {
              setVisible(true);
            }
            /* State 0 = ENDED — belt-and-suspenders restart */
            if (e.data === 0) {
              e.target.seekTo(0, true);
              e.target.playVideo();
            }
          },
        },
      });
    }

    if (window.YT?.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const s = document.createElement("script");
        s.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(s);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      wrapper.innerHTML = "";
      playerRef.current = null;
    };
  }, [videoId]);

  function toggleAudio() {
    const p = playerRef.current;
    if (!p) return;
    if (muted) {
      p.unMute();
    } else {
      p.mute();
    }
    setMuted((m) => !m);
  }

  return (
    <>
      {/* ── Video background ──────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          backgroundColor: "#050510",
          pointerEvents: "none",
          zIndex: 0,
          /*
           * Start invisible; fade in only after onStateChange fires PLAYING.
           * This hides every piece of YouTube chrome (spinner, play button,
           * pause overlay, initial control flash) from the user.
           */
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease",
        }}
      >
        {/*
          Cover-math: scales 16:9 source to fill any viewport shape.
            width  = max(100vw, 100vh × 16/9)
            height = max(100vh, 100vw ×  9/16)
        */}
        <div
          ref={wrapperRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "max(100vw, calc(100vh * 1.7778))",
            height: "max(100vh, calc(100vw * 0.5625))",
          }}
        />

        {/*
          Click shield: transparent div that sits above the iframe in z-order.
          Captures any stray pointer events so they never reach the YouTube
          player — preventing hover-triggered controls from appearing.
        */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            backgroundColor: "transparent",
          }}
        />
      </div>

      {/* ── Audio toggle ──────────────────────────────────── */}
      <button
        onClick={toggleAudio}
        aria-label={muted ? "Unmute video" : "Mute video"}
        style={{
          position: "absolute",
          bottom: "6rem",
          right: "1.5rem",
          zIndex: 10,
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.07)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(201,169,110,0.35)",
          color: muted ? "rgba(255,255,255,0.55)" : "rgba(201,169,110,0.95)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "background 0.25s, border-color 0.25s, color 0.25s",
          outline: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(201,169,110,0.12)";
          e.currentTarget.style.borderColor = "rgba(201,169,110,0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.07)";
          e.currentTarget.style.borderColor = "rgba(201,169,110,0.35)";
        }}
      >
        {muted ? <VolumeOffIcon /> : <VolumeOnIcon />}
      </button>
    </>
  );
}
