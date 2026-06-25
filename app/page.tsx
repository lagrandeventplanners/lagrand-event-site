import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin, CheckCircle, Users, Star, ArrowRight, Quote } from "lucide-react";
import SectionReveal from "@/components/ui/SectionReveal";
import GoldDivider from "@/components/ui/GoldDivider";
import StatCounter from "@/components/ui/StatCounter";
import HeroBG from "@/components/ui/HeroBG";
import HeroContent from "@/components/ui/HeroContent";
import Marquee from "@/components/ui/Marquee";
import FAQWithImages from "@/components/sections/FAQWithImages";
import VideoSection from "@/components/sections/VideoSection";
import {
  COMPANY_NAME,
  COMPANY_PHONE,
  COMPANY_PHONE_2,
  COMPANY_EMAIL,
  COMPANY_INSTAGRAM,
  COMPANY_FACEBOOK,
  COMPANY_YOUTUBE,
  COMPANY_LINKEDIN,
  SITE_URL,
  STATS,
  EVENT_TYPES,
  PORTFOLIO_ITEMS,
  WHY_US,
  TESTIMONIALS,
  FAQS,
  WHATSAPP_URL,
  COMPANY_WHATSAPP,
} from "@/lib/constants";
import { getEvents, type EventPost } from "@/lib/events-store";

export const metadata: Metadata = {
  title: "Best Event Management Company in Hyderabad | Corporate & Personal Events",
  description:
    "Hyderabad's premier event management company. We craft extraordinary corporate events, weddings, product launches, and social celebrations. Trusted by 50+ leading brands. Call +91 9989838909 for a free quote.",
  keywords: [
    "event management company hyderabad",
    "corporate event planners hyderabad",
    "wedding event management hyderabad",
    "product launch events hyderabad",
    "best event company hyderabad",
    "event organizers banjara hills hyderabad",
    "annual day event planners hyderabad",
    "sangeet wedding planners hyderabad",
    "team outing corporate events hyderabad",
    "MICE hyderabad event management",
  ],
  openGraph: {
    title: "Best Event Management Company in Hyderabad | La Grande Events",
    description:
      "Crafting extraordinary corporate events, weddings, product launches, and social celebrations across Hyderabad.",
    url: "/",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "La Grandè Events — Premium Event Management Hyderabad" }],
  },
  alternates: {
    canonical: "https://www.lagrandeinc.com",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "EventPlanningService"],
  "@id": `${SITE_URL}/#localbusiness`,
  name: COMPANY_NAME,
  description:
    "Premium event management company in Hyderabad specializing in corporate events, weddings, product launches, MICE, and social celebrations. Serving Hyderabad, Telangana and across India.",
  url: SITE_URL,
  telephone: COMPANY_PHONE,
  telephone2: COMPANY_PHONE_2,
  email: COMPANY_EMAIL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    addressCountry: "IN",
    postalCode: "500034",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 17.412609,
    longitude: 78.2575,
  },
  hasMap: "https://maps.google.com/?q=La+Grande+Events+Hyderabad",
  areaServed: [
    { "@type": "City", name: "Hyderabad" },
    { "@type": "State", name: "Telangana" },
    { "@type": "Country", name: "India" },
  ],
  priceRange: "₹₹₹",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday", "Tuesday", "Wednesday", "Thursday",
      "Friday", "Saturday", "Sunday",
    ],
    opens: "09:00",
    closes: "21:00",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "50",
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: [
    COMPANY_INSTAGRAM,
    COMPANY_FACEBOOK,
    COMPANY_YOUTUBE,
    COMPANY_LINKEDIN,
  ],
  knowsAbout: [
    "Corporate Event Management",
    "Wedding Planning",
    "Sangeet Planning",
    "Product Launch Events",
    "Social Celebrations",
    "MICE Corporate Offsites",
    "Event Decoration & Theming",
    "Artist & Entertainment Booking",
    "AV & Stage Production",
  ],
  image: `${SITE_URL}/images/og-home.jpg`,
  logo: `${SITE_URL}/images/logo.png`,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const iconMap: Record<string, React.ReactNode> = {
  MapPin: <MapPin size={22} className="text-champagne" />,
  CheckCircle: <CheckCircle size={22} className="text-champagne" />,
  Users: <Users size={22} className="text-champagne" />,
  Star: <Star size={22} className="text-champagne" />,
};

export default async function HomePage() {
  const allEvents = await getEvents();
  const publishedEvents = allEvents.filter((e) => e.status === "published");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden"
        style={{ height: "100dvh", minHeight: "640px" }}
      >
        {/* Full-viewport YouTube background — sits behind the glassmorphic navbar */}
        <HeroBG />

        {/* Overlays */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
          {/* Left gradient — text readability */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(105deg, rgba(5,5,16,0.78) 0%, rgba(5,5,16,0.42) 50%, rgba(5,5,16,0.05) 100%)",
          }} />
          {/* Bottom fade for logos strip */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "160px",
            background: "linear-gradient(to top, rgba(5,5,16,0.72) 0%, transparent 100%)",
          }} />
          {/* NO top mask — navbar glass handles the top area; removing this
              lets the video show clearly behind the glassmorphic navbar */}
        </div>

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col" style={{ zIndex: 3 }}>
          {/* Navbar height spacer */}
          <div style={{ height: "88px", flexShrink: 0 }} />

          {/* Text block */}
          <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-20">
            <HeroContent />
          </div>

        </div>
      </section>

      {/* ── MARQUEE ── */}
      <Marquee />

      {/* ── TRUST BAR ── */}
      <section
        className="py-10"
        style={{
          background: "rgba(5,5,16,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(201,169,110,0.12)",
          borderBottom: "1px solid rgba(201,169,110,0.12)",
        }}
      >
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
            {STATS.map((stat, i) => (
              <div key={i} className="flex items-center justify-center">
                {i > 0 && (
                  <div
                    className="hidden md:block w-px h-12 mr-8"
                    style={{
                      background: "linear-gradient(to bottom, transparent, rgba(201,169,110,0.3), transparent)",
                    }}
                  />
                )}
                <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENT TYPE SELECTOR ── */}
      <section
        id="event-type-selector"
        className="py-16 md:py-32"
        style={{ background: "#050510" }}
      >
        <div className="section-container">
          <SectionReveal className="mb-14 text-center">
            <GoldDivider delay={0} className="mb-4 mx-auto" />
            <p className="text-champagne text-xs tracking-widest uppercase mb-3" style={{ letterSpacing: "0.4em" }}>
              Our Expertise
            </p>
            <h2
              className="text-ivory font-light"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Every Occasion, Delivered with{" "}
              <span className="gold-shimmer-text">Precision</span>
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {EVENT_TYPES.map((type, i) => (
              <SectionReveal key={i} delay={i * 0.08}>
                <a
                  href={`https://wa.me/${COMPANY_WHATSAPP}?text=${encodeURIComponent(type.waText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group event-card-dark block h-full"
                >
                  {/* Full image with overlay */}
                  <div style={{ position: "relative", aspectRatio: "4/3.8", overflow: "hidden" }}>
                    <Image
                      src={type.image}
                      alt={type.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-108"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Always-on dark base so text is readable */}
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(5,5,16,0.95) 0%, rgba(5,5,16,0.4) 50%, rgba(5,5,16,0.1) 100%)" }}
                    />
                    {/* Gold shimmer on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "linear-gradient(135deg, rgba(201,169,110,0.12) 0%, transparent 60%)" }}
                    />

                    {/* Content overlaid at bottom */}
                    <div
                      className="absolute inset-x-0 bottom-0"
                      style={{ padding: "1.75rem 1.75rem 2rem" }}
                    >
                      <div className="flex items-end justify-between gap-3">
                        <div>
                          <h3
                            style={{
                              fontFamily: "var(--font-display)",
                              fontSize: "1.55rem",
                              fontWeight: 400,
                              color: "#F5F0E8",
                              marginBottom: "0.4rem",
                              letterSpacing: "-0.01em",
                              lineHeight: 1.2,
                            }}
                          >
                            {type.title}
                          </h3>
                          <p
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: "0.75rem",
                              color: "rgba(245,240,232,0.55)",
                              lineHeight: 1.6,
                            }}
                          >
                            {type.sub}
                          </p>
                        </div>
                        <div
                          className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 shrink-0"
                          style={{
                            color: "#C9A96E",
                            fontSize: "0.62rem",
                            letterSpacing: "0.16em",
                            textTransform: "uppercase",
                            fontFamily: "var(--font-body)",
                            fontWeight: 600,
                            paddingBottom: "0.15rem",
                          }}
                        >
                          Enquire <ArrowRight size={10} />
                        </div>
                      </div>
                    </div>

                    {/* Thin gold border on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                      style={{ border: "1px solid rgba(201,169,110,0.35)", borderRadius: "20px" }}
                    />
                  </div>
                </a>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.5} className="mt-16">
            <div
              style={{
                position: "relative",
                background: "linear-gradient(135deg, rgba(201,169,110,0.07) 0%, rgba(255,255,255,0.02) 50%, rgba(201,169,110,0.04) 100%)",
                border: "1px solid rgba(201,169,110,0.22)",
                borderRadius: "24px",
                padding: "clamp(1.5rem, 6vw, 3rem) clamp(1.25rem, 5vw, 3.5rem)",
                overflow: "hidden",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              {/* Gold glow orb */}
              <div style={{
                position: "absolute",
                top: "-60px",
                right: "-60px",
                width: "280px",
                height: "280px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute",
                bottom: "-40px",
                left: "10%",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />

              <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "3rem",
                position: "relative",
                flexWrap: "wrap",
              }}>
                {/* Left: heading + sub */}
                <div style={{ flex: "1", minWidth: "260px" }}>
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.6rem",
                    fontWeight: 600,
                    letterSpacing: "0.38em",
                    textTransform: "uppercase",
                    color: "#C9A96E",
                    marginBottom: "0.75rem",
                  }}>
                    Free Consultation
                  </p>
                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                    fontWeight: 400,
                    color: "#F5F0E8",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                    margin: "0 0 1rem",
                  }}>
                    Not sure where<br />to start?
                  </h3>
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    color: "rgba(245,240,232,0.5)",
                    lineHeight: 1.75,
                    margin: 0,
                    maxWidth: "360px",
                  }}>
                    Tell us about your event and we&apos;ll craft the perfect plan — no commitment needed.
                  </p>
                </div>

                {/* Right: stats + CTA */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "2rem" }}>
                  {/* Trust stats */}
                  <div style={{ display: "flex", gap: "2.5rem" }}>
                    {[["500+", "Events"], ["48h", "Response"], ["100%", "Tailored"]].map(([val, label]) => (
                      <div key={label}>
                        <p style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.6rem",
                          fontWeight: 400,
                          color: "#C9A96E",
                          margin: 0,
                          lineHeight: 1,
                          letterSpacing: "-0.02em",
                        }}>{val}</p>
                        <p style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.65rem",
                          color: "rgba(245,240,232,0.4)",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          margin: "0.3rem 0 0",
                        }}>{label}</p>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      background: "linear-gradient(135deg, #C9A96E 0%, #A07840 100%)",
                      color: "#050510",
                      padding: "0.9rem 2.2rem",
                      borderRadius: "100px",
                      fontSize: "0.65rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      fontFamily: "var(--font-body)",
                      fontWeight: 700,
                      textDecoration: "none",
                      boxShadow: "0 8px 32px rgba(201,169,110,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
                      transition: "box-shadow 0.3s ease, transform 0.2s ease",
                    }}
                  >
                    Speak with us <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── VIDEO ── */}
      <VideoSection />

      {/* ── PORTFOLIO ── */}
      <section
        id="portfolio"
        className="py-16 md:py-32 relative overflow-hidden"
        style={{ background: "#F5F0E8", borderRadius: "2.5rem" }}
      >
        <div className="section-container relative z-10">
          <SectionReveal className="mb-14">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <GoldDivider delay={0} className="mb-4" />
                <p className="text-champagne text-xs tracking-widest uppercase mb-3" style={{ letterSpacing: "0.38em" }}>Portfolio</p>
                <h2 className="font-light" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 5vw, 4.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05, color: "#0D0A1A" }}>
                  Selected Work
                </h2>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(13,10,26,0.48)", lineHeight: 1.75, maxWidth: "320px", marginBottom: "0.25rem" }}>
                A curated look at events we&apos;ve produced across Hyderabad and beyond.
              </p>
            </div>
          </SectionReveal>

          {publishedEvents.length > 0 ? (
            /* ── Dynamic: published events from CMS ── */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5" style={{ gridAutoRows: "380px" }}>
              {publishedEvents.slice(0, 6).map((event: EventPost, i: number) => {
                const isWide = i === 0 && publishedEvents.length > 1;
                return (
                  <SectionReveal key={event.id} delay={i * 0.1} className={`${isWide ? "col-span-1 md:col-span-2" : "col-span-1"} h-full`}>
                    <Link href={`/our-work/${event.slug}`} className="relative overflow-hidden group cursor-pointer h-full block" style={{ borderRadius: "16px", boxShadow: "0 6px 28px rgba(13,10,26,0.13), 0 1px 4px rgba(13,10,26,0.07)" }}>
                      {event.coverImage ? (
                        <Image
                          src={event.coverImage}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(201,169,110,0.08), rgba(5,5,16,0.8))" }} />
                      )}
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,5,16,0.9) 0%, rgba(5,5,16,0.2) 45%, transparent 100%)" }} />
                      <div style={{ position: "absolute", top: "1.25rem", right: "1.25rem", fontFamily: "var(--font-body)", fontSize: "0.6rem", fontWeight: 600, color: "rgba(201,169,110,0.7)", letterSpacing: "0.2em" }}>
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div style={{ position: "absolute", top: "1.25rem", left: "1.25rem", background: "rgba(5,5,16,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(201,169,110,0.25)", borderRadius: "100px", padding: "0.3rem 0.85rem", fontFamily: "var(--font-body)", fontSize: "0.58rem", fontWeight: 500, color: "#C9A96E", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                        {event.eventType}
                      </div>
                      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "1.5rem" }}>
                        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 400, color: "#F5F0E8", margin: 0, letterSpacing: "-0.01em", lineHeight: 1.2 }}>
                          {event.title}
                        </h3>
                        {event.location && (
                          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "rgba(245,240,232,0.45)", margin: "0.3rem 0 0" }}>{event.location}</p>
                        )}
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-400" style={{ marginTop: "0.6rem" }}>
                          <div style={{ height: "1px", width: "24px", background: "#C9A96E" }} />
                          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", color: "#C9A96E", letterSpacing: "0.14em", textTransform: "uppercase" }}>View event</span>
                        </div>
                      </div>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ borderRadius: "16px", border: "1px solid rgba(201,169,110,0.45)", boxShadow: "0 12px 40px rgba(13,10,26,0.22)" }} />
                    </Link>
                  </SectionReveal>
                );
              })}
            </div>
          ) : (
            /* ── Static fallback ── */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5" style={{ gridAutoRows: "380px" }}>
              {PORTFOLIO_ITEMS.map((item, i) => (
                <SectionReveal key={i} delay={i * 0.1} className={`${item.span} h-full`}>
                  <div className="relative overflow-hidden group cursor-pointer h-full" style={{ borderRadius: "16px", boxShadow: "0 6px 28px rgba(13,10,26,0.13), 0 1px 4px rgba(13,10,26,0.07)" }}>
                    <Image src={item.src} alt={`${item.label} — ${item.type}`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,5,16,0.88) 0%, rgba(5,5,16,0.2) 45%, transparent 100%)" }} />
                    <div style={{ position: "absolute", top: "1.25rem", right: "1.25rem", fontFamily: "var(--font-body)", fontSize: "0.6rem", fontWeight: 600, color: "rgba(201,169,110,0.7)", letterSpacing: "0.2em" }}>{String(i + 1).padStart(2, "0")}</div>
                    <div style={{ position: "absolute", top: "1.25rem", left: "1.25rem", background: "rgba(5,5,16,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(201,169,110,0.25)", borderRadius: "100px", padding: "0.3rem 0.85rem", fontFamily: "var(--font-body)", fontSize: "0.58rem", fontWeight: 500, color: "#C9A96E", letterSpacing: "0.14em", textTransform: "uppercase" }}>{item.type}</div>
                    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "1.5rem" }}>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 400, color: "#F5F0E8", margin: 0, letterSpacing: "-0.01em", lineHeight: 1.2 }}>{item.label}</h3>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-400" style={{ marginTop: "0.6rem" }}>
                        <div style={{ height: "1px", width: "24px", background: "#C9A96E" }} />
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", color: "#C9A96E", letterSpacing: "0.14em", textTransform: "uppercase" }}>View event</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ borderRadius: "16px", border: "1px solid rgba(201,169,110,0.45)", boxShadow: "0 12px 40px rgba(13,10,26,0.22)" }} />
                  </div>
                </SectionReveal>
              ))}
            </div>
          )}

          <SectionReveal delay={0.4} className="mt-12 flex items-center justify-between">
            <div className="hidden sm:block" style={{ height: "1px", flex: 1, background: "linear-gradient(to right, transparent, rgba(13,10,26,0.15))" }} />
            <Link
              href="/our-work"
              className="sm:mx-8 inline-flex items-center gap-3 transition-all duration-300"
              style={{ padding: "0.85rem 2rem", border: "1px solid rgba(13,10,26,0.2)", color: "#0D0A1A", letterSpacing: "0.14em", borderRadius: "100px", fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 600, background: "transparent", textDecoration: "none", textTransform: "uppercase" }}
            >
              View All Work <ArrowRight size={13} />
            </Link>
            <div className="hidden sm:block" style={{ height: "1px", flex: 1, background: "linear-gradient(to left, transparent, rgba(13,10,26,0.15))" }} />
          </SectionReveal>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-16 md:py-32 relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,169,110,0.1) 0%, transparent 70%)", width: "100%", maxWidth: "900px", height: "500px" }}
        />
        <div className="section-container relative z-10">
          <SectionReveal className="mb-16 text-center">
            <GoldDivider delay={0} className="mb-4 mx-auto" />
            <p className="text-champagne text-xs tracking-widest uppercase mb-3" style={{ letterSpacing: "0.18em" }}>Why La Grande</p>
            <h2 className="text-ivory font-light" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 5vw, 4.5rem)", letterSpacing: "-0.03em" }}>
              What Sets Us Apart
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WHY_US.map((item, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div className="relative p-8 overflow-hidden card-glass" style={{ minHeight: "170px" }}>
                  <span
                    className="absolute top-2 right-4 text-ivory font-light pointer-events-none select-none"
                    style={{ fontFamily: "var(--font-display)", fontSize: "6rem", opacity: 0.03, lineHeight: 1 }}
                  >
                    {item.number}
                  </span>
                  <div className="flex items-start gap-4 relative z-10">
                    <div
                      className="shrink-0 w-10 h-10 flex items-center justify-center mt-0.5"
                      style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)", borderRadius: "10px" }}
                    >
                      {iconMap[item.icon]}
                    </div>
                    <div>
                      <h3 className="text-ivory font-medium mb-2" style={{ fontSize: "1.0625rem" }}>{item.title}</h3>
                      <p className="text-muted text-sm font-light leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section
        className="py-16 md:py-32"
        style={{ background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div className="section-container">
          <SectionReveal className="mb-14 text-center">
            <GoldDivider delay={0} className="mb-4 mx-auto" />
            <p className="text-champagne text-xs tracking-widest uppercase mb-3" style={{ letterSpacing: "0.18em" }}>Testimonials</p>
            <h2 className="text-ivory font-light" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 5vw, 4.5rem)", letterSpacing: "-0.03em" }}>
              From Our Clients
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <SectionReveal key={i} delay={i * 0.12}>
                <div className="card-glass p-8 flex flex-col h-full" style={{ minHeight: "280px" }}>
                  <Quote size={36} className="mb-4 shrink-0" style={{ color: "rgba(201,169,110,0.35)" }} />
                  <p className="text-[rgba(245,240,232,0.85)] text-sm font-light leading-relaxed flex-1 mb-6">&ldquo;{t.quote}&rdquo;</p>
                  <div className="h-px w-10 mb-4" style={{ background: "#C9A96E" }} />
                  <div>
                    <p className="text-ivory font-medium text-sm">{t.name}</p>
                    <p className="text-champagne text-xs font-light mt-0.5">{t.eventType}</p>
                    <div className="flex gap-0.5 mt-2">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} size={12} fill="#C9A96E" className="text-champagne" />
                      ))}
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.4} className="mt-10 text-center">
            <a
              href="#"
              className="inline-flex items-center gap-3 px-6 py-3 transition-all duration-300"
              style={{ background: "rgba(201,169,110,0.1)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(201,169,110,0.3)", borderRadius: "100px", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)" }}
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#C9A96E" className="text-champagne" />)}
              </div>
              <span className="text-ivory text-sm font-light">Rated 5 Stars on Google</span>
            </a>
          </SectionReveal>
        </div>
      </section>

      {/* ── FAQ + IMAGES ── */}
      <FAQWithImages />
    </>
  );
}
