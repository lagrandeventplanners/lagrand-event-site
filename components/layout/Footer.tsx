"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";
import { InstagramIcon, FacebookIcon, YoutubeIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import {
  COMPANY_NAME,
  COMPANY_PHONE,
  COMPANY_PHONE_2,
  COMPANY_EMAIL,
  COMPANY_ADDRESS,
  COMPANY_INSTAGRAM,
  COMPANY_FACEBOOK,
  COMPANY_YOUTUBE,
  COMPANY_LINKEDIN,
  WHATSAPP_URL,
  GOOGLE_REVIEWS_LINK,
  NAV_LINKS,
  SERVICES,
} from "@/lib/constants";

const socialLinks = [
  { Icon: InstagramIcon, href: COMPANY_INSTAGRAM, label: "Instagram" },
  { Icon: FacebookIcon, href: COMPANY_FACEBOOK, label: "Facebook" },
  { Icon: YoutubeIcon, href: COMPANY_YOUTUBE, label: "YouTube" },
  { Icon: LinkedinIcon, href: COMPANY_LINKEDIN, label: "LinkedIn" },
];

const WHATSAPP_SVG = (
  <svg viewBox="0 0 32 32" fill="currentColor" className="w-3.5 h-3.5 shrink-0">
    <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.323.617 4.507 1.693 6.4L2.667 29.333l7.147-1.653A13.28 13.28 0 0 0 16.004 29.333C23.36 29.333 29.333 23.36 29.333 16S23.36 2.667 16.004 2.667zm6.027 18.093c-.333-.173-1.947-.96-2.253-1.067-.307-.107-.533-.16-.76.16-.227.32-.867 1.067-1.067 1.28-.2.213-.4.24-.733.08-.333-.173-1.413-.52-2.693-1.653-1-.88-1.68-1.973-1.88-2.307-.2-.333 0-.507.147-.68.16-.16.333-.413.507-.613.173-.2.227-.347.333-.573.107-.227.053-.427-.027-.6-.08-.173-.76-1.84-1.04-2.52-.28-.667-.56-.573-.76-.573h-.64c-.227 0-.587.08-.893.4s-1.173 1.147-1.173 2.8 1.2 3.253 1.36 3.48c.16.213 2.333 3.6 5.68 5.04.8.347 1.413.547 1.893.693.8.253 1.52.213 2.093.133.64-.093 1.947-.8 2.213-1.573.267-.773.267-1.44.187-1.573-.08-.133-.293-.213-.627-.387z" />
  </svg>
);

function CTAButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href="/contact"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.6rem",
        borderRadius: "100px",
        padding: "0.9rem 2.4rem",
        fontSize: "11px",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        textDecoration: "none",
        fontFamily: "var(--font-body)",
        fontWeight: 500,
        color: hovered ? "#050510" : "#F5F0E8",
        background: hovered
          ? "#C9A96E"
          : "rgba(201,169,110,0.1)",
        border: "1px solid rgba(201,169,110,0.45)",
        backdropFilter: "blur(16px)",
        transition: "background 0.3s ease, color 0.3s ease",
        position: "relative",
      }}
    >
      Plan Your Event
      <ArrowUpRight size={13} />
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: "#050510" }}>

      {/* Top champagne rule */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.25) 20%, #C9A96E 50%, rgba(201,169,110,0.25) 80%, transparent 100%)",
        }}
      />

      {/* ── CTA Card ──────────────────────────────── */}
      <div className="section-container" style={{ paddingTop: "3.5rem", paddingBottom: "3.5rem" }}>
        {/* Floating card with gradient border */}
        <div
          style={{
            borderRadius: "28px",
            padding: "clamp(2.5rem, 8vw, 5rem) clamp(1.25rem, 5vw, 2rem)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            background:
              "linear-gradient(rgba(10,10,24,0.97), rgba(7,7,18,0.99)) padding-box, " +
              "linear-gradient(135deg, rgba(201,169,110,0.55) 0%, rgba(201,169,110,0.08) 45%, rgba(201,169,110,0.55) 100%) border-box",
            border: "1px solid transparent",
          }}
        >
          {/* Inner radial glow */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "radial-gradient(ellipse 65% 65% at 50% -10%, rgba(201,169,110,0.1) 0%, transparent 70%)",
            }}
          />

          {/* Corner accent dots */}
          <span
            style={{
              position: "absolute",
              top: "1.4rem",
              left: "1.6rem",
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "rgba(201,169,110,0.35)",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: "1.4rem",
              right: "1.6rem",
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "rgba(201,169,110,0.35)",
            }}
          />
          <span
            style={{
              position: "absolute",
              bottom: "1.4rem",
              left: "1.6rem",
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "rgba(201,169,110,0.35)",
            }}
          />
          <span
            style={{
              position: "absolute",
              bottom: "1.4rem",
              right: "1.6rem",
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "rgba(201,169,110,0.35)",
            }}
          />

          {/* Eyebrow with diamond flanks */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.8rem",
              marginBottom: "1.75rem",
            }}
          >
            <span style={{ color: "rgba(201,169,110,0.45)", fontSize: "0.45rem", letterSpacing: 0 }}>◆</span>
            <p
              style={{
                margin: 0,
                fontSize: "10px",
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "#C9A96E",
                fontFamily: "var(--font-body)",
              }}
            >
              Ready to celebrate?
            </p>
            <span style={{ color: "rgba(201,169,110,0.45)", fontSize: "0.45rem", letterSpacing: 0 }}>◆</span>
          </div>

          {/* Headline */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.6rem, 6vw, 5.5rem)",
              fontWeight: 300,
              color: "#F5F0E8",
              lineHeight: 1.1,
              margin: "0 0 2.75rem",
              position: "relative",
            }}
          >
            Let&apos;s create something{" "}
            <span style={{ color: "#C9A96E", fontStyle: "italic" }}>
              extraordinary.
            </span>
          </h2>

          {/* Pill CTA button */}
          <CTAButton />
        </div>
      </div>

      {/* Section divider */}
      <div
        className="h-px w-full"
        style={{ background: "rgba(201,169,110,0.08)" }}
      />

      {/* ── Links grid ────────────────────────────── */}
      <div className="section-container" style={{ paddingTop: "clamp(2.5rem, 7vw, 5rem)", paddingBottom: "clamp(2.5rem, 7vw, 5rem)" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-10">

          {/* Brand col */}
          <div>
            <Link
              href="/"
              className="inline-block mb-5 transition-opacity duration-300 opacity-90 hover:opacity-100"
            >
              <Image
                src="/images/logo.png"
                alt={COMPANY_NAME}
                width={148}
                height={40}
                style={{ objectFit: "contain" }}
              />
            </Link>
            <p
              className="text-sm font-light leading-relaxed mb-7"
              style={{ color: "rgba(245,240,232,0.45)" }}
            >
              Hyderabad's premium event studio — crafting extraordinary experiences since 2021.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(245,240,232,0.45)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(201,169,110,0.5)";
                    e.currentTarget.style.color = "#C9A96E";
                    e.currentTarget.style.background = "rgba(201,169,110,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.color = "rgba(245,240,232,0.45)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <p className="text-[10px] tracking-[0.18em] uppercase text-champagne mb-6">
              Navigate
            </p>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-light text-muted hover:text-champagne-lt transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-[10px] tracking-[0.18em] uppercase text-champagne mb-6">
              Services
            </p>
            <ul className="space-y-3">
              {SERVICES.slice(0, 5).map((s) => (
                <li key={s.title}>
                  <Link
                    href="/services"
                    className="text-sm font-light text-muted hover:text-champagne-lt transition-colors duration-200"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              className="text-[10px] tracking-[0.18em] uppercase text-champagne mb-6"
            >
              Contact
            </p>
            <ul className="space-y-4 mb-7">
              <li className="flex items-start gap-3">
                <Phone size={11} className="shrink-0 mt-[3px]" style={{ color: "#C9A96E" }} />
                <div className="flex flex-col gap-1">
                  <a
                    href={`tel:${COMPANY_PHONE}`}
                    className="text-sm font-light text-muted hover:text-champagne-lt transition-colors"
                  >
                    {COMPANY_PHONE}
                  </a>
                  <a
                    href={`tel:${COMPANY_PHONE_2}`}
                    className="text-sm font-light text-muted hover:text-champagne-lt transition-colors"
                  >
                    {COMPANY_PHONE_2}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={11} className="shrink-0 mt-[3px]" style={{ color: "#C9A96E" }} />
                <a
                  href={`mailto:${COMPANY_EMAIL}`}
                  className="text-sm font-light text-muted hover:text-champagne-lt transition-colors break-all"
                >
                  {COMPANY_EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={11} className="shrink-0 mt-[3px]" style={{ color: "#C9A96E" }} />
                <span className="text-sm font-light text-muted">{COMPANY_ADDRESS}</span>
              </li>
            </ul>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] uppercase px-4 py-2.5 transition-all duration-300 rounded-full"
              style={{
                background: "rgba(37,211,102,0.06)",
                border: "1px solid rgba(37,211,102,0.18)",
                color: "#25D366",
                letterSpacing: "0.1em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(37,211,102,0.12)";
                e.currentTarget.style.borderColor = "rgba(37,211,102,0.38)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(37,211,102,0.06)";
                e.currentTarget.style.borderColor = "rgba(37,211,102,0.18)";
              }}
            >
              {WHATSAPP_SVG}
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* ── Watermark ─────────────────────────────── */}
      <div className="overflow-hidden -mb-2 md:-mb-4 select-none pointer-events-none">
        <p
          className="text-center font-light leading-none gold-shimmer-text"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(5rem, 16vw, 16rem)",
            letterSpacing: "-0.02em",
          }}
        >
          La Grandè
        </p>
      </div>

      {/* ── Bottom bar ────────────────────────────── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="section-container py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-light text-muted">
              © 2025 {COMPANY_NAME}. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <a
                href={GOOGLE_REVIEWS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs inline-flex items-center gap-1.5 text-muted hover:text-champagne transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3 h-3 shrink-0 text-champagne"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Leave a Review
              </a>
              <Link
                href="#"
                className="text-xs text-muted hover:text-champagne transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-xs text-muted hover:text-champagne transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
