"use client";

import { useState } from "react";
import Image from "next/image";
import SectionReveal from "@/components/ui/SectionReveal";
import GoldDivider from "@/components/ui/GoldDivider";

const VIDEO_ID = "1La4QzGeaaQ";
const THUMBNAIL = `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`;

export default function VideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "#050510" }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          height: "60%",
          background:
            "radial-gradient(ellipse at center, rgba(201,169,110,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <SectionReveal className="mb-12 text-center">
          <GoldDivider delay={0} className="mb-4 mx-auto" />
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.6rem",
              fontWeight: 600,
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              color: "#C9A96E",
              marginBottom: "0.75rem",
            }}
          >
            See the Magic
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
              fontWeight: 300,
              color: "#F5F0E8",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            Events That Move People
          </h2>
        </SectionReveal>

        {/* Video embed — lazy facade, loads iframe only on click */}
        <SectionReveal delay={0.15}>
          <div
            style={{
              position: "relative",
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid rgba(201,169,110,0.18)",
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,169,110,0.08)",
              aspectRatio: "16/9",
            }}
          >
            {playing ? (
              <iframe
                src={`https://www.youtube.com/embed/${VIDEO_ID}?rel=0&modestbranding=1&color=white&autoplay=1`}
                title="La Grande Events highlight reel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              />
            ) : (
              <>
                {/* Thumbnail */}
                <Image
                  src={THUMBNAIL}
                  alt="La Grande Events highlight reel"
                  fill
                  sizes="(max-width: 768px) 100vw, 90vw"
                  style={{ objectFit: "cover" }}
                />
                {/* Dark overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(5,5,16,0.4)",
                  }}
                />
                {/* Play button */}
                <button
                  onClick={() => setPlaying(true)}
                  aria-label="Play video"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                  }}
                >
                  <div
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "50%",
                      background: "rgba(201,169,110,0.92)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow:
                        "0 8px 40px rgba(201,169,110,0.45), 0 2px 12px rgba(0,0,0,0.4)",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = "scale(1.1)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        "0 12px 50px rgba(201,169,110,0.6), 0 2px 12px rgba(0,0,0,0.4)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        "0 8px 40px rgba(201,169,110,0.45), 0 2px 12px rgba(0,0,0,0.4)";
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="26"
                      height="26"
                      fill="#050510"
                      style={{ marginLeft: "3px" }}
                    >
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </div>
                </button>
              </>
            )}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
