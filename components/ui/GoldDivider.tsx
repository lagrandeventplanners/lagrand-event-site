"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface GoldDividerProps {
  width?: string;
  delay?: number;
  className?: string;
}

export default function GoldDivider({
  width = "48px",
  delay = 0,
  className = "",
}: GoldDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={
          isInView
            ? { width, opacity: 1 }
            : { width: 0, opacity: 0 }
        }
        transition={{
          duration: shouldReduceMotion ? 0 : 0.6,
          delay: shouldReduceMotion ? 0 : delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, #C9A96E, rgba(201,169,110,0.3))",
        }}
      />
    </div>
  );
}
