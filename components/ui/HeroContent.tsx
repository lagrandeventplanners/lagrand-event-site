"use client";

import { motion } from "framer-motion";

const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const lines = [
  { text: "Crafting",      gold: false },
  { text: "Extraordinary", gold: true  },
  { text: "Events",        gold: false },
];

export default function HeroContent() {
  return (
    <div style={{ maxWidth: "520px" }}>

      {/* Headline — each line blurs in independently */}
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(3rem, 7vw, 7rem)",
          lineHeight: 1.0,
          fontWeight: 300,
          color: "#F5F0E8",
          letterSpacing: "-0.01em",
          margin: 0,
        }}
      >
        {lines.map((line, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.75, delay: 0.15 + i * 0.18, ease: EASE }}
            style={{
              display: "block",
              color: line.gold ? "#C9A96E" : "#F5F0E8",
              fontWeight: line.gold ? 600 : 300,
            }}
          >
            {line.text}
          </motion.span>
        ))}
      </h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.72, ease: EASE }}
        style={{
          color: "rgba(245,240,232,0.45)",
          fontSize: "1rem",
          lineHeight: 1.8,
          maxWidth: "520px",
          marginTop: "1.5rem",
          marginBottom: "2.25rem",
          fontFamily: "var(--font-body)",
          fontWeight: 300,
          letterSpacing: "0.02em",
        }}
      >
        Corporate events, weddings &amp; product launches — executed with precision across India.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.92, ease: EASE }}
        style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
      >
        <a
          href="/contact"
          style={{
            display: "inline-block",
            background: "rgba(201,169,110,0.25)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(201,169,110,0.55)",
            color: "#F5F0E8",
            padding: "0.8rem 2rem",
            fontSize: "0.6rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            textDecoration: "none",
            borderRadius: "100px",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 4px 20px rgba(201,169,110,0.15)",
          }}
        >
          Plan Your Event
        </a>
        <a
          href="/services"
          style={{
            display: "inline-block",
            background: "rgba(255,255,255,0.07)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(245,240,232,0.75)",
            padding: "0.8rem 1.75rem",
            fontSize: "0.6rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            textDecoration: "none",
            borderRadius: "100px",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          Our Services
        </a>
      </motion.div>
    </div>
  );
}
