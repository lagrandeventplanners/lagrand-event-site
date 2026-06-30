"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import { COMPANY_NAME, NAV_LINKS } from "@/lib/constants";

/* Set to true once you've placed /public/images/logo.png (or .svg) */
const HAS_LOGO = true;
const LOGO_SRC = "/images/logo.png"; /* change to /images/logo.svg if SVG */

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(5, 5, 16, 0.82)"
            : "rgba(5, 5, 16, 0.06)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          borderBottom: scrolled
            ? "1px solid rgba(201, 169, 110, 0.12)"
            : "1px solid rgba(255, 255, 255, 0.06)",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        <div className="flex items-center h-22 px-4 sm:px-8 md:px-16">
          {/* Logo — left third */}
          <div className="flex-1 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              {HAS_LOGO ? (
                <div style={{ position: "relative", width: "min(340px, 42vw)", height: "82px", flexShrink: 0 }}>
                  <Image
                    src={LOGO_SRC}
                    alt={COMPANY_NAME}
                    fill
                    sizes="(max-width: 640px) 42vw, 340px"
                    style={{ objectFit: "contain", objectPosition: "left center" }}
                    priority
                  />
                </div>
              ) : (
                <>
                  <span className="text-champagne text-xl" style={{ fontFamily: "var(--font-display)" }}>◆</span>
                  <span className="text-ivory text-xl font-light tracking-wide group-hover:text-champagne transition-colors duration-300" style={{ fontFamily: "var(--font-display)" }}>
                    {COMPANY_NAME}
                  </span>
                </>
              )}
            </Link>
          </div>

          {/* Nav — true center */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs tracking-widest uppercase transition-all duration-300"
                  style={{
                    color: isActive ? "#C9A96E" : "rgba(245,240,232,0.65)",
                    letterSpacing: "0.12em",
                    padding: "0.45rem 1.1rem",
                    borderRadius: "100px",
                    background: isActive ? "rgba(201,169,110,0.10)" : "transparent",
                    backdropFilter: isActive ? "blur(16px)" : "none",
                    WebkitBackdropFilter: isActive ? "blur(16px)" : "none",
                    border: isActive ? "1px solid rgba(201,169,110,0.18)" : "1px solid transparent",
                    boxShadow: isActive ? "inset 0 1px 0 rgba(255,255,255,0.07), 0 1px 8px rgba(201,169,110,0.08)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                      e.currentTarget.style.color = "#F5F0E8";
                      e.currentTarget.style.backdropFilter = "blur(16px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "transparent";
                      e.currentTarget.style.color = "rgba(245,240,232,0.65)";
                      e.currentTarget.style.backdropFilter = "none";
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA — right third */}
          <div className="flex-1 flex items-center justify-end gap-3">
            <div className="hidden md:block">
              <Link
                href="/contact"
                className="text-xs tracking-widest uppercase px-6 py-3 transition-all duration-300"
                style={{
                  background: "rgba(201,169,110,0.2)",
                  border: "1px solid rgba(201,169,110,0.5)",
                  color: "#F5F0E8",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  letterSpacing: "0.12em",
                  borderRadius: "100px",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(201,169,110,0.35)";
                  e.currentTarget.style.borderColor = "rgba(201,169,110,0.7)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(201,169,110,0.2)";
                  e.currentTarget.style.borderColor = "rgba(201,169,110,0.5)";
                }}
              >
                Get a Quote
              </Link>
            </div>
            {/* Mobile hamburger */}
            <button
              className="md:hidden text-[#F5F0E8] p-2"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>{/* end right wrapper */}
        </div>{/* end flex row */}
      </nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-50 flex flex-col"
            style={{
              background: "rgba(5, 5, 16, 0.97)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Close button */}
            <div className="flex justify-between items-center px-6 h-22">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-[#C9A96E] text-xl" style={{ fontFamily: "var(--font-display)" }}>◆</span>
                <span className="text-[#F5F0E8] text-xl font-light" style={{ fontFamily: "var(--font-display)" }}>{COMPANY_NAME}</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-[#8A8A9A] hover:text-[#C9A96E] transition-colors p-2"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex flex-col justify-center flex-1 px-8 gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className="block py-4 border-b transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "2.5rem",
                      fontWeight: 300,
                      color: pathname === link.href ? "#C9A96E" : "#F5F0E8",
                      borderColor: "rgba(255,255,255,0.06)",
                      lineHeight: 1.2,
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-8"
              >
                <Link
                  href="/contact"
                  className="inline-block text-xs tracking-widest uppercase px-8 py-4 transition-all duration-300"
                  style={{
                    background: "rgba(201,169,110,0.25)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(201,169,110,0.55)",
                    color: "#F5F0E8",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    borderRadius: "100px",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
                  }}
                >
                  Get a Free Quote
                </Link>
              </motion.div>
            </div>

            {/* Bottom decoration */}
            <div className="px-8 pb-10">
              <div className="h-px bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.3)] to-transparent mb-6" />
              <p className="text-[#5A5A7A] text-xs tracking-widest uppercase">
                Hyderabad's Premium Event Experience
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
