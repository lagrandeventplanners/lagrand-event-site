"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import SectionReveal from "@/components/ui/SectionReveal";
import GoldDivider from "@/components/ui/GoldDivider";
import { FAQS } from "@/lib/constants";

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&h=700&q=85&auto=format&fit=crop",
    alt: "Corporate event",
  },
  {
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&h=700&q=85&auto=format&fit=crop",
    alt: "Wedding celebration",
  },
  {
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=900&h=700&q=85&auto=format&fit=crop",
    alt: "Gala dinner",
  },
];

export default function FAQWithImages() {
  const [open, setOpen] = useState<number | null>(null);

  const left = FAQS.slice(0, 4);
  const right = FAQS.slice(4);

  return (
    <section
      className="py-14 md:py-28 overflow-hidden"
      style={{ background: "#F5F0E8", borderRadius: "2.5rem" }}
    >
      <div className="section-container">

        {/* ── Header row ── */}
        <SectionReveal className="mb-12">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <GoldDivider delay={0} className="mb-4" />
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
                Frequently Asked
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
                  fontWeight: 300,
                  color: "#0D0A1A",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  margin: 0,
                }}
              >
                Questions We Hear Often
              </h2>
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                color: "rgba(13,10,26,0.45)",
                lineHeight: 1.75,
                maxWidth: "280px",
                marginBottom: "0.25rem",
              }}
            >
              Everything you need to know before we start planning your event together.
            </p>
          </div>
        </SectionReveal>

        {/* ── 3 images in parallel — hidden on mobile ── */}
        <SectionReveal delay={0.1} className="hidden sm:block mb-14">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "1rem",
            }}
          >
            {IMAGES.map((img, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  borderRadius: "16px",
                  overflow: "hidden",
                  aspectRatio: "4/3",
                  marginTop: i === 1 ? "1.5rem" : "0",
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(13,10,26,0.25) 0%, transparent 50%)",
                  }}
                />
              </div>
            ))}
          </div>
        </SectionReveal>

        {/* ── FAQ grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
            gap: "1rem",
            alignItems: "start",
          }}
        >
          {[left, right].map((col, colIdx) => (
            <div key={colIdx} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {col.map((faq, rowIdx) => {
                const i = colIdx * 4 + rowIdx;
                const isOpen = open === i;
                return (
                  <SectionReveal key={i} delay={i * 0.04}>
                    <motion.div
                      layout
                      style={{
                        borderRadius: "14px",
                        overflow: "hidden",
                        background: isOpen ? "#fff" : "rgba(13,10,26,0.03)",
                        border: isOpen
                          ? "1px solid rgba(201,169,110,0.35)"
                          : "1px solid rgba(13,10,26,0.07)",
                        transition: "background 0.25s, border-color 0.25s",
                        boxShadow: isOpen
                          ? "0 4px 24px rgba(201,169,110,0.10)"
                          : "none",
                      }}
                    >
                      <button
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "1rem",
                          padding: "1.25rem 1.25rem 1.25rem 1rem",
                          textAlign: "left",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        {/* Question text */}
                        <span
                          style={{
                            flex: 1,
                            fontFamily: "var(--font-body)",
                            fontSize: "0.9rem",
                            fontWeight: 500,
                            color: isOpen ? "#0D0A1A" : "rgba(13,10,26,0.75)",
                            lineHeight: 1.45,
                            transition: "color 0.22s",
                          }}
                        >
                          {faq.question}
                        </span>

                        {/* Plus / Minus icon */}
                        <div
                          style={{
                            width: "26px",
                            height: "26px",
                            borderRadius: "50%",
                            background: isOpen ? "#C9A96E" : "rgba(13,10,26,0.06)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            transition: "background 0.25s",
                            marginTop: "1px",
                          }}
                        >
                          {isOpen ? (
                            <Minus size={13} color="#fff" strokeWidth={2.5} />
                          ) : (
                            <Plus size={13} color="rgba(13,10,26,0.45)" strokeWidth={2.5} />
                          )}
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                            style={{ overflow: "hidden" }}
                          >
                            {/* gold left accent bar + answer */}
                            <div
                              style={{
                                marginLeft: "1rem",
                                paddingLeft: "1rem",
                                paddingRight: "1.25rem",
                                paddingBottom: "1.25rem",
                                borderLeft: "2px solid #C9A96E",
                              }}
                            >
                              <p
                                style={{
                                  fontFamily: "var(--font-body)",
                                  fontSize: "0.85rem",
                                  fontWeight: 300,
                                  lineHeight: 1.8,
                                  color: "rgba(13,10,26,0.55)",
                                  margin: 0,
                                }}
                              >
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </SectionReveal>
                );
              })}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
