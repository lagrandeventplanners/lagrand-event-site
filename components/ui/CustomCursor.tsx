"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [active, setActive] = useState(false); // mouse-down
  const [mounted, setMounted] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Only on real pointer devices (desktop with mouse)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    setMounted(true);

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onDown = () => setActive(true);
    const onUp = () => setActive(false);

    const onEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      if (target.matches("a, button, [role='button'], label, input, textarea, select")) {
        setHovering(true);
      }
    };
    const onLeave = () => setHovering(false);

    const addListeners = () => {
      document.querySelectorAll("a, button, [role='button'], label").forEach(el => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    const animate = () => {
      // Lerp outer ring to cursor position (smooth lag)
      current.current.x += (pos.current.x - current.current.x) * 0.1;
      current.current.y += (pos.current.y - current.current.y) * 0.1;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`;
      }
      // Dot follows exactly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    addListeners();
    rafRef.current = requestAnimationFrame(animate);

    // Re-attach after any dynamic DOM changes
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  if (!mounted) return null;

  const size = hovering ? 44 : active ? 22 : 32;

  return (
    <>
      {/* Outer glowing ring — lags behind cursor */}
      <div
        ref={outerRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${size}px`,
          height: `${size}px`,
          marginLeft: `-${size / 2}px`,
          marginTop: `-${size / 2}px`,
          borderRadius: "50%",
          border: `1px solid rgba(201,169,110,${hovering ? 0.7 : 0.4})`,
          background: hovering
            ? "radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 99998,
          transition: "width 0.25s ease, height 0.25s ease, margin 0.25s ease, border-color 0.25s ease, background 0.25s ease",
          willChange: "transform",
          mixBlendMode: "screen",
        }}
      />
      {/* Inner dot — tracks cursor exactly */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "4px",
          height: "4px",
          marginLeft: "-2px",
          marginTop: "-2px",
          borderRadius: "50%",
          background: "#C9A96E",
          opacity: hovering ? 0 : 0.8,
          pointerEvents: "none",
          zIndex: 99999,
          transition: "opacity 0.2s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
