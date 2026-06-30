import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Briefcase, Heart, Rocket, PartyPopper, Map, Sparkles, CheckCircle } from "lucide-react";
import SectionReveal from "@/components/ui/SectionReveal";
import GoldDivider from "@/components/ui/GoldDivider";
import StatCounter from "@/components/ui/StatCounter";
import ProcessSection from "@/components/sections/ProcessSection";
import { COMPANY_NAME, SERVICES, COMPANY_WHATSAPP, STATS, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Event Management Services in Hyderabad | Corporate, Wedding & More | ${COMPANY_NAME}`,
  description:
    "Complete event management services in Hyderabad — corporate conferences, weddings, sangeet, product launches, birthday parties, MICE corporate offsites, and full décor & production. End-to-end execution by expert planners.",
  keywords: [
    "corporate event management hyderabad",
    "wedding event planners hyderabad",
    "product launch event company hyderabad",
    "MICE corporate offsite hyderabad",
    "birthday party planners hyderabad",
    "sangeet event planners hyderabad",
    "event décor production hyderabad",
    "team outing organizers hyderabad",
  ],
  openGraph: {
    title: `Event Management Services in Hyderabad | ${COMPANY_NAME}`,
    description: "Every event type. One expert team. End-to-end execution across Hyderabad.",
    url: "/services",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Event Management Services — La Grandè Events Hyderabad",
  itemListElement: SERVICES.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title,
      description: s.description,
      areaServed: [
        { "@type": "City", name: "Hyderabad" },
        { "@type": "State", name: "Telangana" },
      ],
      provider: {
        "@type": "LocalBusiness",
        name: COMPANY_NAME,
        url: SITE_URL,
      },
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",     item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
  ],
};

const iconMap: Record<string, React.ReactNode> = {
  Briefcase: <Briefcase size={22} className="text-champagne" />,
  Heart: <Heart size={22} className="text-champagne" />,
  Rocket: <Rocket size={22} className="text-champagne" />,
  PartyPopper: <PartyPopper size={22} className="text-champagne" />,
  Map: <Map size={22} className="text-champagne" />,
  Sparkles: <Sparkles size={22} className="text-champagne" />,
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── HERO ── */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: "62vh", paddingTop: "9rem", paddingBottom: "5rem" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(88,28,235,0.08) 0%, rgba(5,5,16,1) 50%, rgba(201,169,110,0.06) 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 30% 50%, rgba(201,169,110,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(88,28,235,0.08) 0%, transparent 60%)",
          }}
        />
        <div className="section-container relative z-10 text-center">
          <SectionReveal>
            <GoldDivider delay={0.1} className="mb-4 mx-auto" />
            <p className="eyebrow mb-5">What We Do</p>
            <h1
              className="text-ivory font-light leading-tight mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Every Event Type.{" "}
              <span
                style={{
                  fontStyle: "italic",
                  background: "linear-gradient(135deg, #C9A96E 0%, #E8D5B0 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                One Expert Team.
              </span>
            </h1>
            <p
              className="font-light max-w-xl mx-auto"
              style={{ fontSize: "1rem", lineHeight: 1.75, color: "rgba(245,240,232,0.6)" }}
            >
              From intimate celebrations to large-scale corporate productions — we bring the same
              passion and precision to every occasion.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section
        className="py-12"
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
                      background:
                        "linear-gradient(to bottom, transparent, rgba(201,169,110,0.3), transparent)",
                    }}
                  />
                )}
                <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="py-16 md:py-32 relative overflow-hidden">
        {/* Atmospheric orbs */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-120px",
            right: "-80px",
            width: "580px",
            height: "580px",
            background: "radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 65%)",
            borderRadius: "50%",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "-60px",
            left: "-40px",
            width: "420px",
            height: "420px",
            background: "radial-gradient(circle, rgba(88,28,235,0.05) 0%, transparent 65%)",
            borderRadius: "50%",
          }}
        />

        <div className="section-container relative z-10">
          <SectionReveal className="mb-14 text-center">
            <GoldDivider delay={0} className="mb-4 mx-auto" />
            <p className="eyebrow mb-3">Our Services</p>
            <h2
              className="text-ivory font-light"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              What we do,{" "}
              <span className="gold-shimmer-text">exceptionally well</span>
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((service, i) => (
              <SectionReveal key={i} delay={i * 0.06}>
                <div
                  className="overflow-hidden group"
                  style={{
                    borderRadius: "20px",
                    background: "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    transition: "border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease",
                  }}
                >
                  {/* Image with overlays */}
                  <div className="relative" style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                    <Image
                      src={service.img}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(5,5,16,0.92) 0%, rgba(5,5,16,0.25) 55%, transparent 100%)",
                      }}
                    />
                    {/* Number counter */}
                    <div
                      className="absolute top-4 right-4"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.6rem",
                        fontWeight: 600,
                        color: "rgba(201,169,110,0.7)",
                        letterSpacing: "0.2em",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    {/* Tagline badge */}
                    <div
                      className="absolute top-4 left-4"
                      style={{
                        background: "rgba(5,5,16,0.6)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        border: "1px solid rgba(201,169,110,0.25)",
                        borderRadius: "100px",
                        padding: "0.3rem 0.85rem",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.58rem",
                        fontWeight: 500,
                        color: "#C9A96E",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase" as const,
                      }}
                    >
                      {service.tagline}
                    </div>
                    {/* Icon + title at bottom of image */}
                    <div className="absolute inset-x-0 bottom-0 p-5 flex items-center gap-3">
                      <div
                        style={{
                          background: "rgba(201,169,110,0.15)",
                          border: "1px solid rgba(201,169,110,0.3)",
                          width: "42px",
                          height: "42px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "10px",
                          flexShrink: 0,
                        }}
                      >
                        {iconMap[service.icon]}
                      </div>
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(1.35rem, 2.5vw, 1.7rem)",
                          fontWeight: 400,
                          color: "#F5F0E8",
                          letterSpacing: "-0.01em",
                          lineHeight: 1.15,
                        }}
                      >
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="p-6 md:p-7">
                    <p
                      className="font-light text-sm leading-relaxed mb-5"
                      style={{ color: "rgba(245,240,232,0.75)" }}
                    >
                      {service.description}
                    </p>

                    <div className="mb-5">
                      <p className="eyebrow mb-1">Best For</p>
                      <p className="text-muted text-sm font-light mt-1">{service.bestFor}</p>
                    </div>

                    {/* Divider */}
                    <div
                      className="my-5"
                      style={{ height: "1px", background: "rgba(255,255,255,0.06)" }}
                    />

                    <p
                      className="text-ivory text-xs uppercase mb-3"
                      style={{ letterSpacing: "0.12em" }}
                    >
                      What&apos;s Included
                    </p>
                    <ul className="grid grid-cols-2 gap-2 mb-6">
                      {service.includes.map((item, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <CheckCircle size={13} className="text-champagne mt-0.5 shrink-0" />
                          <span className="text-muted text-xs font-light leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={`https://wa.me/${COMPANY_WHATSAPP}?text=${encodeURIComponent(service.waText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-xs tracking-widest uppercase px-6 py-3 transition-all duration-300"
                      style={{
                        background: "rgba(201,169,110,0.18)",
                        backdropFilter: "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                        border: "1px solid rgba(201,169,110,0.45)",
                        color: "#F5F0E8",
                        letterSpacing: "0.12em",
                        borderRadius: "100px",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
                      }}
                    >
                      Enquire About This →
                    </a>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR APPROACH ── */}
      <section
        className="py-14 md:py-28 relative overflow-hidden"
        style={{ background: "#F5F0E8", borderRadius: "2.5rem" }}
      >
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: text */}
            <SectionReveal direction="left">
              <GoldDivider delay={0.1} className="mb-4" />
              <p className="eyebrow mb-4">Our Approach</p>
              <h2
                className="font-light mb-5"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3.25rem)",
                  letterSpacing: "-0.02em",
                  color: "#0D0A1A",
                  lineHeight: 1.1,
                }}
              >
                End-to-end execution.
                <br />
                <span style={{ fontStyle: "italic", color: "rgba(13,10,26,0.45)" }}>
                  Zero gaps.
                </span>
              </h2>
              <p
                className="font-light leading-relaxed"
                style={{ fontSize: "1rem", color: "rgba(13,10,26,0.65)", maxWidth: "460px" }}
              >
                Every La Grandè service comes with a dedicated event manager, transparent pricing,
                and our 48-hour response guarantee. One team, one commitment — from first call to
                final applause.
              </p>
              {/* Stats row */}
              <div className="flex gap-8 mt-8 flex-wrap">
                {[
                  ["48h", "Response Time"],
                  ["100%", "Tailored"],
                  ["0", "Hidden Costs"],
                ].map(([val, label]) => (
                  <div key={label}>
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "2rem",
                        fontWeight: 400,
                        color: "#C9A96E",
                        margin: 0,
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {val}
                    </p>
                    <p
                      style={{
                        fontSize: "0.62rem",
                        color: "rgba(13,10,26,0.45)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase" as const,
                        margin: "0.3rem 0 0",
                      }}
                    >
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </SectionReveal>

            {/* Right: image with glass quote */}
            <SectionReveal direction="right" delay={0.1}>
              <div
                className="relative overflow-hidden"
                style={{ borderRadius: "16px", aspectRatio: "4/3" }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&q=85&auto=format&fit=crop"
                  alt="La Grandè Events — event execution"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(5,5,16,0.72) 0%, rgba(5,5,16,0.35) 55%, rgba(5,5,16,0.55) 100%)",
                  }}
                />
                {/* Glass quote at bottom */}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div
                    style={{
                      background: "rgba(5,5,16,0.65)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid rgba(201,169,110,0.2)",
                      borderRadius: "12px",
                      padding: "1.25rem 1.5rem",
                    }}
                  >
                    <blockquote
                      className="text-ivory font-light"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                        fontStyle: "italic",
                        letterSpacing: "-0.01em",
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      &ldquo;From first call to final applause — one team, one commitment.&rdquo;
                    </blockquote>
                    <div
                      className="mt-3 h-px w-8"
                      style={{ background: "linear-gradient(90deg, #C9A96E, transparent)" }}
                    />
                    <p
                      className="mt-2 text-champagne"
                      style={{ fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase" }}
                    >
                      — La Grandè Promise
                    </p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <ProcessSection />

      {/* ── CTA ── */}
      <section className="py-24 text-center">
        <div className="section-container">
          <SectionReveal>
            <GoldDivider delay={0} className="mb-6 mx-auto" width="60px" />
            <h2
              className="text-ivory font-light mb-4"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Not Sure Which Service You Need?
            </h2>
            <p
              className="font-light mb-8 max-w-md mx-auto"
              style={{ fontSize: "0.9375rem", color: "rgba(245,240,232,0.55)" }}
            >
              Tell us about your event and we&apos;ll recommend the right approach for you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="text-sm tracking-widest uppercase px-8 py-4 transition-all duration-300 w-full sm:w-auto text-center"
                style={{
                  background: "rgba(201,169,110,0.25)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(201,169,110,0.55)",
                  color: "#F5F0E8",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  borderRadius: "100px",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.12), 0 4px 20px rgba(201,169,110,0.15)",
                }}
              >
                Get a Free Consultation
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
