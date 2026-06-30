"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Preloader() {
  // "enter" = first paint (invisible), "show" = animating in, "exit" = sliding out, "done" = unmounted
  const [phase, setPhase] = useState<"enter" | "show" | "exit" | "done">("enter");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const MIN_MS = 1800;
    const start = Date.now();

    let exitTimer: ReturnType<typeof setTimeout>;
    let doneTimer: ReturnType<typeof setTimeout>;

    const triggerExit = () => {
      const remaining = Math.max(0, MIN_MS - (Date.now() - start));
      exitTimer = setTimeout(() => {
        setPhase("exit");
        doneTimer = setTimeout(() => {
          setPhase("done");
          document.body.style.overflow = "";
        }, 800);
      }, remaining);
    };

    const onLoaded = () => {
      if (document.fonts?.ready) {
        document.fonts.ready.then(triggerExit);
      } else {
        triggerExit();
      }
    };

    // Kick off the fade-in immediately after mount
    const enterTimer = setTimeout(() => setPhase("show"), 30);

    // Fallback: never block longer than 5s total
    const fallbackTimer = setTimeout(() => {
      setPhase("exit");
      setTimeout(() => {
        setPhase("done");
        document.body.style.overflow = "";
      }, 800);
    }, 5000);

    if (document.readyState === "complete") {
      onLoaded();
    } else {
      window.addEventListener("load", onLoaded, { once: true });
    }

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      clearTimeout(fallbackTimer);
      window.removeEventListener("load", onLoaded);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  const isEnter = phase === "enter";
  const isExit = phase === "exit";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#050510",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        // Curtain slides up on exit
        transform: isExit ? "translateY(-100%)" : "translateY(0)",
        transition: isExit ? "transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)" : "none",
        pointerEvents: isExit ? "none" : "all",
      }}
    >
      {/* Ambient gold glow orb behind logo */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: "420px",
          height: "260px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(201,169,110,0.16) 0%, rgba(201,169,110,0.06) 40%, transparent 70%)",
          animation: "preloaderGlow 2.4s ease-in-out infinite alternate",
          pointerEvents: "none",
        }}
      />

      {/* Logo wrapper — fades + floats in */}
      <div
        style={{
          position: "relative",
          opacity: isEnter ? 0 : 1,
          transform: isEnter ? "translateY(16px)" : "translateY(0)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        {/* Logo image */}
        <div style={{ position: "relative", width: "240px", height: "88px" }}>
          <Image
            src="/images/logo.png"
            alt="La Grande Events"
            fill
            priority
            sizes="240px"
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Shimmer sweep over logo */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            pointerEvents: "none",
            borderRadius: "4px",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.22) 50%, transparent 75%)",
              animation: "preloaderShimmer 2.6s ease-in-out infinite",
              animationDelay: "0.5s",
            }}
          />
        </div>
      </div>

      {/* Thin gold scanning bar */}
      <div
        style={{
          width: "160px",
          height: "1px",
          background: "rgba(201,169,110,0.12)",
          position: "relative",
          overflow: "hidden",
          opacity: isEnter ? 0 : 1,
          transition: "opacity 0.6s ease 0.35s",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "50%",
            background:
              "linear-gradient(90deg, transparent, #C9A96E, transparent)",
            animation: "preloaderScan 1.6s ease-in-out infinite",
          }}
        />
      </div>

      {/* Subtle tagline */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.58rem",
          letterSpacing: "0.42em",
          textTransform: "uppercase",
          color: "rgba(201,169,110,0.45)",
          margin: 0,
          opacity: isEnter ? 0 : 1,
          transition: "opacity 0.7s ease 0.5s",
        }}
      >
        Crafting Extraordinary Events
      </p>
    </div>
  );
}
