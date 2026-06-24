"use client";

import { useEffect, useState } from "react";
import { WHATSAPP_URL } from "@/lib/constants";

export default function WhatsAppFAB() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center gap-3 transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* Tooltip */}
      <span
        className={`hidden md:block text-sm font-medium text-ivory bg-[rgba(0,0,0,0.7)] backdrop-blur px-3 py-1.5 rounded transition-all duration-300 whitespace-nowrap ${
          hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
        }`}
        style={{ border: "1px solid rgba(255,255,255,0.08)" }}
      >
        Chat with us
      </span>

      {/* Button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 hover:scale-110"
        style={{ backgroundColor: "#25D366" }}
      >
        {/* Pulse ring */}
        <span
          className="absolute inset-0 rounded-full"
          style={{
            animation: "pulse-ring 2.5s ease-out infinite",
            backgroundColor: "rgba(37, 211, 102, 0.35)",
          }}
        />
        <span
          className="absolute inset-0 rounded-full"
          style={{
            animation: "pulse-ring 2.5s ease-out 1.25s infinite",
            backgroundColor: "rgba(37, 211, 102, 0.2)",
          }}
        />

        {/* WhatsApp Icon */}
        <svg
          viewBox="0 0 32 32"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 relative z-10"
        >
          <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.323.617 4.507 1.693 6.4L2.667 29.333l7.147-1.653A13.28 13.28 0 0 0 16.004 29.333C23.36 29.333 29.333 23.36 29.333 16S23.36 2.667 16.004 2.667zm0 24a11 11 0 0 1-5.6-1.533l-.4-.24-4.24.98 1.013-4.107-.267-.413A11.013 11.013 0 0 1 5 16C5 9.937 9.937 5 16 5s11 4.937 11 11-4.937 11-11 11zm6.027-8.24c-.333-.173-1.947-.96-2.253-1.067-.307-.107-.533-.16-.76.16-.227.32-.867 1.067-1.067 1.28-.2.213-.4.24-.733.08-.333-.173-1.413-.52-2.693-1.653-1-.88-1.68-1.973-1.88-2.307-.2-.333 0-.507.147-.68.16-.16.333-.413.507-.613.173-.2.227-.347.333-.573.107-.227.053-.427-.027-.6-.08-.173-.76-1.84-1.04-2.52-.28-.667-.56-.573-.76-.573h-.64c-.227 0-.587.08-.893.4s-1.173 1.147-1.173 2.8 1.2 3.253 1.36 3.48c.16.213 2.333 3.6 5.68 5.04.8.347 1.413.547 1.893.693.8.253 1.52.213 2.093.133.64-.093 1.947-.8 2.213-1.573.267-.773.267-1.44.187-1.573-.08-.133-.293-.213-.627-.387z" />
        </svg>
      </a>
    </div>
  );
}
