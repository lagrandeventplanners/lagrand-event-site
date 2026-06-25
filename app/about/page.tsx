import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SectionReveal from "@/components/ui/SectionReveal";
import GoldDivider from "@/components/ui/GoldDivider";
import StatCounter from "@/components/ui/StatCounter";
import { COMPANY_NAME, STATS, VALUES } from "@/lib/constants";

export const metadata: Metadata = {
  title: `About Us | ${COMPANY_NAME} — Hyderabad Event Management`,
  description:
    "Meet the team behind Hyderabad's most trusted event management company. 3+ years, 50+ corporate events, 1000+ delegates managed — and a 4.9 Google rating. Born in Hyderabad, built for extraordinary events.",
  keywords: [
    "about la grande events hyderabad",
    "event management team hyderabad",
    "best event planners hyderabad",
    "trusted event company telangana",
  ],
  openGraph: {
    title: `About Us | ${COMPANY_NAME}`,
    description: "Born in Hyderabad. Built for extraordinary events. 4.9 Google rating, 50+ corporate events.",
    url: "/about",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://www.lagrandeinc.com/about",
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.lagrandeinc.com/#organization",
  name: COMPANY_NAME,
  description:
    "Premium event management company in Hyderabad, Telangana, India. Specialising in corporate events, weddings, product launches, and social celebrations.",
  url: "https://www.lagrandeinc.com",
  logo: "https://www.lagrandeinc.com/images/logo.png",
  foundingLocation: "Hyderabad, Telangana, India",
  areaServed: ["Hyderabad", "Telangana", "India"],
  sameAs: [
    "https://www.instagram.com/lagrande_events_planners/",
    "https://www.facebook.com/profile.php?id=61558597568999",
    "https://youtube.com/@lagrandeevents",
    "https://linkedin.com/company/lagrandeevents",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9989838909",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi", "Telugu"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",     item: "https://www.lagrandeinc.com" },
    { "@type": "ListItem", position: 2, name: "About Us", item: "https://www.lagrandeinc.com/about" },
  ],
};


// TODO: Replace with real founder name, photo, and personal message
const FOUNDER = {
  name: "Founder Name",
  title: "Founder & Creative Director",
  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&q=85&auto=format&fit=crop",
  words: [
    "I started La Grandè Events because I believed Hyderabad deserved better. Not just well-organised events — but events that people felt. That created memory. That made them lean over to the person next to them and say 'this is something special.'",
    "Every room we walk into, we ask ourselves one question: how do we want the last guest to feel when they walk out? That question has guided every decision we've made — from the vendors we choose to the details we refuse to skip.",
    "This isn't a business built on spreadsheets. It's built on moments. And I'm proud that Hyderabad has trusted us with some of theirs.",
  ],
};

// TODO: Replace with real team data and photos
const TEAM = [
  {
    name: "Founder Name",
    role: "Founder & Creative Director",
    bio: "The person who started it all. Obsessed with first impressions and final moments.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=625&q=85&auto=format&fit=crop",
  },
  {
    name: "Team Member",
    role: "Head of Operations",
    bio: "The one who makes sure everything that's supposed to happen, happens — on time.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=625&q=85&auto=format&fit=crop",
  },
  {
    name: "Team Member",
    role: "Client Relations",
    bio: "Your first call and your last debrief. Makes sure your brief is understood before a single vendor is called.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=625&q=85&auto=format&fit=crop",
  },
];

// TODO: Replace with real event highlights and photos
const HIGHLIGHT_EVENTS = [
  {
    name: "TechHyd Summit 2024",
    type: "Corporate Conference",
    desc: "500 delegates, 3 stages, 0 technical failures.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=480&q=85&auto=format&fit=crop",
  },
  {
    name: "Illuminate Awards Night",
    type: "Corporate Awards",
    desc: "A black-tie evening for 200 leaders that people still talk about.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=480&q=85&auto=format&fit=crop",
  },
  {
    name: "Brand Launch — [Client]",
    type: "Product Launch",
    desc: "From concept to curtain call in 3 weeks flat.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=480&q=85&auto=format&fit=crop",
  },
];

const HYDERABAD_AREAS = [
  "Banjara Hills",
  "Jubilee Hills",
  "HITEC City",
  "Gachibowli",
  "Madhapur",
  "Film Nagar",
  "Kondapur",
  "Secunderabad",
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── HERO ── */}
      <section
        id="hero"
        className="relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: "62vh", paddingTop: "8rem", paddingBottom: "5rem" }}
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
            <p className="eyebrow mb-5">About Us</p>
            <h1
              className="text-ivory font-light leading-tight mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.6rem, 5.5vw, 5.5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              We don&apos;t plan events.
              <br />
              <span
                style={{
                  fontStyle: "italic",
                  background: "linear-gradient(135deg, #C9A96E 0%, #E8D5B0 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                We engineer how people feel.
              </span>
            </h1>
            <p
              className="font-light max-w-xl mx-auto"
              style={{ fontSize: "1rem", lineHeight: 1.75, color: "rgba(245,240,232,0.6)" }}
            >
              La Grandè Events was founded in Hyderabad with one belief — that every room we walk
              into should leave people with a feeling they carry home.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── STORY ── */}
      <section
        id="story"
        className="py-14 md:py-28 relative overflow-hidden"
      >
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Brand story — left */}
            <SectionReveal direction="left">
              <GoldDivider delay={0.1} className="mb-4" />
              <p className="eyebrow mb-4">Our Story</p>
              <div className="space-y-5">
                <p
                  className="font-light leading-relaxed"
                  style={{ fontSize: "1rem", color: "rgba(245,240,232,0.6)" }}
                >
                  La Grandè Events started not with a business plan, but with a frustration. We
                  attended too many events in Hyderabad that were technically fine but emotionally
                  forgettable. Good food, decent AV, nothing to talk about the next morning.
                </p>
                <p
                  className="font-light leading-relaxed"
                  style={{ fontSize: "1rem", color: "rgba(245,240,232,0.6)" }}
                >
                  We started with corporate events — conferences, award nights, product launches —
                  and built a reputation for one thing: obsessive attention to the moments most
                  planners rush past. The welcome. The transition between sessions. The last
                  impression as guests walk out.
                </p>
                <p
                  className="font-light leading-relaxed"
                  style={{ fontSize: "1rem", color: "rgba(245,240,232,0.6)" }}
                >
                  Today we manage 50+ corporate events, have handled 1000+ delegates, and hold a
                  4.9 Google rating — but the number we care most about is zero. Zero events where
                  a client said &ldquo;it was just okay.&rdquo;
                </p>
              </div>
            </SectionReveal>

            {/* Founder/event image with quote overlaid — right */}
            {/* TODO: Replace image with real founder or team photo */}
            <SectionReveal direction="right" delay={0.1}>
              <div
                className="relative overflow-hidden h-full"
                style={{ minHeight: "420px", borderRadius: "16px" }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=700&q=85&auto=format&fit=crop"
                  alt="La Grandè Events team at work"
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
                {/* Quote glass card at bottom */}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div
                    style={{
                      background: "rgba(5,5,16,0.65)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid rgba(201,169,110,0.2)",
                      borderRadius: "12px",
                      padding: "1.5rem 1.75rem",
                    }}
                  >
                    <div
                      className="text-champagne opacity-50 mb-2"
                      style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", lineHeight: 1 }}
                    >
                      &ldquo;
                    </div>
                    <blockquote
                      className="text-ivory font-light"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)",
                        fontStyle: "italic",
                        letterSpacing: "-0.01em",
                        lineHeight: 1.5,
                      }}
                    >
                      Events are not about logistics. They are about how people feel when they walk
                      into the room.
                    </blockquote>
                    <div
                      className="mt-3 h-px w-10"
                      style={{ background: "linear-gradient(90deg, #C9A96E, transparent)" }}
                    />
                    <p
                      className="mt-2 text-champagne"
                      style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase" }}
                    >
                      — Our founding philosophy
                    </p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── STATS ── matching homepage trust bar */}
      <section
        id="numbers"
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
          <p
            className="text-center mt-8 text-muted font-light"
            style={{ fontSize: "0.8rem", letterSpacing: "0.02em" }}
          >
            Every number above represents a room full of real people who trusted us with a moment
            that mattered.
          </p>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section id="values" className="py-16 md:py-32 relative overflow-hidden" style={{ background: "#F5F0E8", borderRadius: "2.5rem" }}>
        <div className="section-container relative z-10">
          <SectionReveal className="mb-14 text-center">
            <GoldDivider delay={0} className="mb-4 mx-auto" />
            <p className="eyebrow mb-3">What We Stand For</p>
            <h2
              className="font-light"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
                letterSpacing: "-0.03em",
                color: "#0D0A1A",
              }}
            >
              Three things we never compromise on
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((val, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div
                  className="p-8 text-center"
                  style={{
                    minHeight: "200px",
                    background: "rgba(255,255,255,0.65)",
                    border: "1px solid rgba(13,10,26,0.08)",
                    borderRadius: "16px",
                    boxShadow: "0 4px 20px rgba(13,10,26,0.06)",
                  }}
                >
                  <div
                    className="text-champagne text-3xl mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {val.symbol}
                  </div>
                  <h3
                    className="font-medium mb-3"
                    style={{ fontSize: "1.125rem", color: "#0D0A1A" }}
                  >
                    {val.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(13,10,26,0.6)" }}>{val.body}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER'S WORDS ── */}
      <section id="founder" className="py-16 md:py-32 relative overflow-hidden">
        {/* Atmospheric gold glow top-right */}
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
        {/* Purple glow bottom-left */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "-60px",
            left: "0%",
            width: "420px",
            height: "420px",
            background: "radial-gradient(circle, rgba(88,28,235,0.05) 0%, transparent 65%)",
            borderRadius: "50%",
          }}
        />
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-14 lg:gap-20 items-center">
            {/* Founder message — left */}
            <SectionReveal direction="left">
              <GoldDivider delay={0.1} className="mb-5" />
              <p className="eyebrow mb-4">From the Founder</p>
              {/* TODO: Replace with real founder name */}
              <h2
                className="text-ivory font-light mb-2"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  letterSpacing: "-0.02em",
                  fontStyle: "italic",
                  lineHeight: 1.1,
                }}
              >
                {FOUNDER.name}
              </h2>
              <p
                className="text-champagne mb-8"
                style={{ fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase" }}
              >
                {FOUNDER.title}
              </p>
              {/* TODO: Replace with real founder words */}
              <div className="space-y-5">
                {FOUNDER.words.map((para, i) => (
                  <p
                    key={i}
                    className="font-light leading-relaxed"
                    style={{ fontSize: "1rem", color: "rgba(245,240,232,0.75)" }}
                  >
                    {para}
                  </p>
                ))}
              </div>
              {/* Signature */}
              <div className="mt-10 flex items-center gap-5">
                <div className="h-px w-10 shrink-0" style={{ background: "#C9A96E" }} />
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontStyle: "italic",
                      fontSize: "1.25rem",
                      color: "#F5F0E8",
                      lineHeight: 1.2,
                    }}
                  >
                    {FOUNDER.name}
                  </p>
                  <p
                    className="text-champagne"
                    style={{
                      fontSize: "0.62rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginTop: "0.25rem",
                    }}
                  >
                    {FOUNDER.title}, La Grandè Events
                  </p>
                </div>
              </div>
            </SectionReveal>

            {/* Founder portrait — right */}
            {/* TODO: Replace with real founder photo */}
            <SectionReveal direction="right" delay={0.2}>
              <div
                className="relative overflow-hidden"
                style={{ borderRadius: "16px", aspectRatio: "4/5" }}
              >
                <Image
                  src={FOUNDER.image}
                  alt={`${FOUNDER.name} — Founder, La Grandè Events`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 380px"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 50%, rgba(5,5,16,0.55) 100%)",
                  }}
                />
                {/* Name badge at bottom */}
                <div
                  className="absolute inset-x-0 bottom-0 p-5"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(5,5,16,0.88) 0%, transparent 100%)",
                  }}
                >
                  <p
                    className="text-ivory font-light"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.15rem",
                      fontStyle: "italic",
                    }}
                  >
                    {FOUNDER.name}
                  </p>
                  <p
                    className="text-champagne"
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      marginTop: "0.2rem",
                    }}
                  >
                    {FOUNDER.title}
                  </p>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── MEET THE TEAM ── */}
      <section
        id="team"
        className="py-14 md:py-28 relative overflow-hidden"
      >
        <div className="section-container">
          <SectionReveal className="mb-14 text-center">
            <GoldDivider delay={0} className="mb-4" />
            <p className="eyebrow mb-3">The People</p>
            <h2
              className="font-light mb-4"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
                letterSpacing: "-0.03em",
                color: "#F5F0E8",
              }}
            >
              The people in the room
            </h2>
            <p
              className="font-light max-w-lg mx-auto"
              style={{ fontSize: "0.9375rem", color: "rgba(245,240,232,0.5)" }}
            >
              When you work with La Grandè, you meet your team on day one — and that same team
              shows up on event day.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {TEAM.map((member, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                {/* TODO: Replace image with real team photo */}
                <div
                  className="overflow-hidden"
                  style={{
                    borderRadius: "16px",
                    boxShadow:
                      "0 6px 28px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,169,110,0.12)",
                  }}
                >
                  <div className="relative" style={{ aspectRatio: "4/5" }}>
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(13,10,26,0.92) 0%, rgba(13,10,26,0.28) 52%, transparent 100%)",
                      }}
                    />
                    <div
                      className="absolute inset-0 flex flex-col justify-end"
                      style={{ padding: "1.75rem" }}
                    >
                      {/* TODO: Replace with real name */}
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.45rem",
                          fontWeight: 400,
                          color: "#F5F0E8",
                          letterSpacing: "-0.01em",
                          lineHeight: 1.2,
                        }}
                      >
                        {member.name}
                      </h3>
                      {/* TODO: Replace with real role */}
                      <p
                        style={{
                          color: "#C9A96E",
                          fontSize: "0.62rem",
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          margin: "0.35rem 0 0.6rem",
                        }}
                      >
                        {member.role}
                      </p>
                      {/* TODO: Replace with real bio */}
                      <p
                        style={{
                          color: "rgba(245,240,232,0.6)",
                          fontSize: "0.82rem",
                          lineHeight: 1.65,
                        }}
                      >
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTS WE'VE LOVED ── real images with overlay like homepage event cards */}
      <section id="work" className="py-16 md:py-32">
        <div className="section-container">
          <SectionReveal className="mb-14 text-center">
            <GoldDivider delay={0} className="mb-4 mx-auto" />
            <p className="eyebrow mb-3">Our Work</p>
            <h2
              className="text-ivory font-light"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              A few events we&apos;re proud of
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HIGHLIGHT_EVENTS.map((event, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    transition: "border-color 0.3s ease, transform 0.3s ease",
                  }}
                >
                  {/* TODO: Replace with real event photo */}
                  <div className="relative" style={{ height: "220px" }}>
                    <Image
                      src={event.image}
                      alt={event.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(5,5,16,0.75) 0%, rgba(5,5,16,0.15) 60%, transparent 100%)",
                      }}
                    />
                    {/* Event type badge */}
                    <div
                      className="absolute top-4 left-4"
                      style={{
                        background: "rgba(5,5,16,0.6)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(201,169,110,0.25)",
                        borderRadius: "100px",
                        padding: "0.3rem 0.85rem",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.58rem",
                        fontWeight: 500,
                        color: "#C9A96E",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                      }}
                    >
                      {event.type}
                    </div>
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
                  </div>
                  <div className="p-6">
                    <h3 className="text-ivory font-medium mb-2" style={{ fontSize: "1.1rem" }}>
                      {event.name}
                    </h3>
                    <p className="text-muted text-sm font-light">{event.desc}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/our-work"
              className="text-champagne text-sm font-light transition-opacity hover:opacity-70"
              style={{
                letterSpacing: "0.08em",
                borderBottom: "1px solid rgba(201,169,110,0.3)",
                paddingBottom: "2px",
              }}
            >
              See all our work →
            </Link>
          </div>
        </div>
      </section>

      {/* ── OUR CITY ── */}
      <section
        id="city"
        className="pt-10 pb-12 md:pt-14 md:pb-28 relative overflow-hidden"
        style={{
          background: "#F5F0E8",
          borderRadius: "2.5rem",
        }}
      >
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: text + pills */}
            <SectionReveal direction="left">
              <GoldDivider delay={0.1} className="mb-4" />
              <p className="eyebrow mb-3">Proudly Local</p>
              <h2
                className="font-light mb-5"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  letterSpacing: "-0.02em",
                  color: "#0D0A1A",
                }}
              >
                Hyderabad is home.
                <br />
                <span style={{ fontStyle: "italic", color: "rgba(13,10,26,0.5)" }}>
                  Not just headquarters.
                </span>
              </h2>
              <p
                className="font-light leading-relaxed text-sm mb-7"
                style={{ color: "rgba(13,10,26,0.65)", maxWidth: "480px" }}
              >
                We know this city the way only locals do — the venues that photograph well but
                serve badly, the caterers who deliver when it matters, the AV teams you can trust
                at 11pm the night before. That knowledge took years to build, and you get it from
                day one.
              </p>
              {/* Fully-rounded area pills */}
              <div className="flex flex-wrap gap-2">
                {HYDERABAD_AREAS.map((area) => (
                  <div
                    key={area}
                    className="px-4 py-1.5 text-xs"
                    style={{
                      background: "rgba(201,169,110,0.12)",
                      border: "1px solid rgba(201,169,110,0.3)",
                      color: "#8B6A2E",
                      letterSpacing: "0.08em",
                      borderRadius: "100px",
                    }}
                  >
                    {area}
                  </div>
                ))}
              </div>
            </SectionReveal>

            {/* Right: curved map */}
            <SectionReveal direction="right" delay={0.1}>
              <div
                className="overflow-hidden"
                style={{
                  borderRadius: "20px",
                  border: "1px solid rgba(13,10,26,0.12)",
                  height: "380px",
                  boxShadow: "0 12px 48px rgba(13,10,26,0.1)",
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242841.52521266456!2d78.2575!3d17.412609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="380"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Hyderabad Map"
                />
              </div>
              {/* Caption below map */}
              <p
                className="mt-3 text-center"
                style={{ fontSize: "0.72rem", letterSpacing: "0.08em", color: "rgba(13,10,26,0.45)" }}
              >
                Hyderabad, Telangana · Our home city
              </p>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section id="cta" className="py-24 text-center">
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
              Your next event starts with one conversation.
            </h2>
            <p
              className="font-light mb-8 max-w-md mx-auto"
              style={{ fontSize: "0.9375rem", color: "rgba(245,240,232,0.55)" }}
            >
              Tell us what you&apos;re planning. We&apos;ll tell you how we&apos;d make it
              extraordinary.
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
                Plan Your Event
              </Link>
              <Link
                href="/services"
                className="text-sm tracking-widest uppercase px-8 py-4 transition-all duration-300 w-full sm:w-auto text-center"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(245,240,232,0.8)",
                  letterSpacing: "0.12em",
                  borderRadius: "100px",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                See Our Services
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
