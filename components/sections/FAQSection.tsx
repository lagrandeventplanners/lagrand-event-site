"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionReveal from "@/components/ui/SectionReveal";
import GoldDivider from "@/components/ui/GoldDivider";
import { FAQS } from "@/lib/constants";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      className="py-24 md:py-32 relative"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="section-container">
        <SectionReveal className="mb-14 text-center">
          <GoldDivider delay={0} className="mb-4 mx-auto" />
          <p
            className="text-[#C9A96E] text-xs tracking-widest uppercase mb-3"
            style={{ letterSpacing: "0.18em" }}
          >
            Frequently Asked
          </p>
          <h2
            className="text-[#F5F0E8] font-light"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Questions We Hear Often
          </h2>
        </SectionReveal>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, i) => (
            <SectionReveal key={i} delay={i * 0.05}>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  background: open === i
                    ? "rgba(201,169,110,0.05)"
                    : "rgba(255,255,255,0.03)",
                  border: open === i
                    ? "1px solid rgba(201,169,110,0.25)"
                    : "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                  aria-expanded={open === i}
                >
                  <span
                    className="font-medium text-sm md:text-base transition-colors duration-300"
                    style={{ color: open === i ? "#C9A96E" : "#F5F0E8" }}
                  >
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: open === i ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    className="shrink-0"
                  >
                    <ChevronDown
                      size={18}
                      style={{ color: open === i ? "#C9A96E" : "#8A8A9A" }}
                    />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <div
                        className="px-6 pb-5 text-sm font-light leading-relaxed"
                        style={{ color: "#8A8A9A" }}
                      >
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
