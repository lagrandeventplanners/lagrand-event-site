import type { Metadata } from "next";
import { getEvents } from "@/lib/events-store";
import { WHATSAPP_URL } from "@/lib/constants";
import WorkGrid from "@/components/sections/WorkGrid";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Work | La Grandè Events",
  description:
    "Portfolio of corporate events, weddings, product launches and celebrations across Hyderabad.",
};

export const dynamic = "force-dynamic";

export default async function OurWorkPage() {
  const allEvents = await getEvents();
  const events = allEvents.filter((e) => e.status === "published");
  const allTypes = Array.from(
    new Set(events.map((e) => e.eventType).filter(Boolean))
  );

  return (
    <main style={{ minHeight: "100vh", background: "#050510", paddingTop: "80px" }}>

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
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "4rem",
          paddingBottom: "5rem",
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
                color: "#F5F0E8",
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
                color: "rgba(245,240,232,0.3)",
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
              background: "#C9A96E",
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
            }}
          >
            Start Planning <ArrowRight size={13} />
          </a>
        </div>
      </section>

    </main>
  );
}
