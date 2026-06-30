import type { Metadata } from "next";
import { getEvents } from "@/lib/events-store";
import { WHATSAPP_URL, SITE_URL } from "@/lib/constants";
import WorkGrid from "@/components/sections/WorkGrid";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Work & Portfolio | Corporate Events, Weddings, Product Launches — La Grandè Events Hyderabad",
  description:
    "Browse La Grandè Events' portfolio — corporate conferences, annual days, sangeet nights, product launches, award galas, and social celebrations executed flawlessly across Hyderabad.",
  keywords: [
    "event portfolio hyderabad",
    "corporate event portfolio hyderabad",
    "wedding event portfolio hyderabad",
    "la grande events portfolio",
    "event management work hyderabad",
  ],
  openGraph: {
    title: "Our Work & Portfolio | La Grandè Events Hyderabad",
    description: "Real events. Real results. Browse our portfolio of corporate, wedding, and celebration events across Hyderabad.",
    url: "/our-work",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: `${SITE_URL}/our-work`,
  },
};

export const dynamic = "force-dynamic";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",     item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Our Work", item: `${SITE_URL}/our-work` },
  ],
};

export default async function OurWorkPage() {
  const allEvents = await getEvents();
  const events = allEvents.filter((e) => e.status === "published");
  const allTypes = Array.from(
    new Set(events.map((e) => e.eventType).filter(Boolean))
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    <div style={{ minHeight: "100vh", background: "#050510", paddingTop: "80px" }}>

      {/* Header */}
      <section style={{ paddingTop: "4rem", paddingBottom: "2rem" }}>
        <div className="section-container">
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#C9A96E",
              margin: "0 0 1rem",
            }}
          >
            Portfolio
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "2rem",
              flexWrap: "wrap",
              marginBottom: "2.5rem",
            }}
          >
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.6rem, 5vw, 4.2rem)",
                fontWeight: 300,
                color: "#F5F0E8",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                margin: 0,
              }}
            >
              Events We&apos;ve<br />Brought to Life
            </h1>
            {events.length > 0 && (
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.7rem",
                  color: "rgba(245,240,232,0.25)",
                  margin: 0,
                  letterSpacing: "0.06em",
                  flexShrink: 0,
                }}
              >
                {events.length} {events.length === 1 ? "event" : "events"}
              </p>
            )}
          </div>
          <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />
        </div>
      </section>

      {/* Grid */}
      <section style={{ paddingBottom: "6rem" }}>
        <div className="section-container">
          {events.length === 0 ? (
            <div style={{ textAlign: "center", padding: "6rem 1rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.75rem",
                  fontWeight: 400,
                  color: "rgba(245,240,232,0.15)",
                  margin: "0 0 1.5rem",
                }}
              >
                Portfolio coming soon
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "#C9A96E",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  letterSpacing: "0.1em",
                }}
              >
                Enquire about your event <ArrowRight size={13} />
              </a>
            </div>
          ) : (
            <WorkGrid events={events} allTypes={allTypes} />
          )}
        </div>
      </section>

      {/* CTA strip */}
      <section
        style={{
          background: "#F5F0E8",
          borderRadius: "2.5rem",
          paddingTop: "4rem",
          paddingBottom: "5rem",
          marginTop: "1rem",
        }}
      >
        <div
          className="section-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.7rem, 3vw, 2.6rem)",
                fontWeight: 300,
                color: "#0D0A1A",
                margin: "0 0 0.4rem",
                letterSpacing: "-0.02em",
              }}
            >
              Planning something?
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.82rem",
                color: "rgba(13,10,26,0.5)",
                margin: 0,
              }}
            >
              Let&apos;s create something worth remembering.
            </p>
          </div>
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
              padding: "0.85rem 2rem",
              borderRadius: "100px",
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              flexShrink: 0,
              transition: "opacity 0.2s ease",
              boxShadow: "0 6px 24px rgba(201,169,110,0.3)",
            }}
          >
            Start Planning <ArrowRight size={13} />
          </a>
        </div>
      </section>

    </div>
    </>
  );
}
