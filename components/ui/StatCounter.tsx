"use client";

import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  value: number;
  suffix: string;
  label: string;
  duration?: number;
}

export default function StatCounter({
  value,
  suffix,
  label,
  duration = 2000,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          observer.disconnect();

          const isDecimal = value % 1 !== 0;
          const steps = 60;
          const stepDuration = duration / steps;
          let current = 0;

          const timer = setInterval(() => {
            current++;
            const progress = current / steps;
            const eased = 1 - Math.pow(1 - progress, 3);
            const next = isDecimal
              ? parseFloat((eased * value).toFixed(1))
              : Math.round(eased * value);
            setCount(next);
            if (current >= steps) clearInterval(timer);
          }, stepDuration);
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <span
        className="font-display text-4xl md:text-5xl font-light text-gradient-gold"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {count}
        {suffix}
      </span>
      <span
        className="text-xs tracking-widest uppercase text-[#8A8A9A]"
        style={{ letterSpacing: "0.12em" }}
      >
        {label}
      </span>
    </div>
  );
}
