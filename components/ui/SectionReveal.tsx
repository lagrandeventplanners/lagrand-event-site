"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface SectionRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}

export default function SectionReveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  const getInitial = () => {
    if (shouldReduceMotion || direction === "none") return { opacity: 0 };
    if (direction === "up") return { opacity: 0, y: 18 };
    if (direction === "left") return { opacity: 0, x: -18 };
    if (direction === "right") return { opacity: 0, x: 18 };
    return { opacity: 0, y: 18 };
  };

  const getAnimate = () => {
    if (shouldReduceMotion || direction === "none") return { opacity: 1 };
    if (direction === "up") return { opacity: 1, y: 0 };
    if (direction === "left") return { opacity: 1, x: 0 };
    if (direction === "right") return { opacity: 1, x: 0 };
    return { opacity: 1, y: 0 };
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitial()}
      animate={isInView ? getAnimate() : getInitial()}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.5,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
