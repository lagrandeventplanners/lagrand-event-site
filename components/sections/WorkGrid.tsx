"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Calendar } from "lucide-react";
import type { EventPost } from "@/lib/events-store";

function EventCard({ event, priority }: { event: EventPost; priority: boolean }) {
  const [hovered, setHovered] = useState(false);

  const date = event.date
    ? new Date(event.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })
    : null;

  return (
    <Link
      href={`/our-work/${event.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        borderRadius: "12px",
        overflow: "hidden",
        background: "rgba(255,255,255,0.025)",
        border: `1px solid ${hovered ? "rgba(201,169,110,0.35)" : "rgba(255,255,255,0.07)"}`,
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered ? "0 24px 56px rgba(0,0,0,0.45)" : "none",
        transition: "border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
      }}
    >
      {/* Image area */}
      <div style={{ position: "relative", height: "220px", flexShrink: 0, overflow: "hidden" }}>
        {event.coverImage ? (
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{
              objectFit: "cover",
              transform: hovered ? "scale(1.06)" : "scale(1)",
              transition: "transform 0.5s ease",
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(201,169,110,0.08), rgba(5,5,16,0.95))",
            }}
          />
        )}

        {/* Bottom gradient veil */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(5,5,16,0.65) 0%, transparent 55%)",
            pointerEvents: "none",
          }}
        />

        {/* Event type pill */}
        {event.eventType && (
          <span
            style={{
              position: "absolute",
              top: "0.85rem",
              left: "0.85rem",
              background: "rgba(5,5,16,0.72)",
              border: "1px solid rgba(201,169,110,0.28)",
              borderRadius: "4px",
              padding: "0.22rem 0.65rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.52rem",
              fontWeight: 600,
              color: "#C9A96E",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              backdropFilter: "blur(8px)",
            }}
          >
            {event.eventType}
          </span>
        )}
      </div>

      {/* Text area */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.55rem",
          padding: "1.2rem 1.35rem 1.35rem",
          flex: 1,
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.1rem",
            fontWeight: 400,
            color: "#F5F0E8",
            margin: 0,
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
          }}
        >
          {event.title}
        </h3>

        {(event.location || date) && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.7rem" }}>
            {event.location && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.63rem",
                  color: "rgba(245,240,232,0.32)",
                }}
              >
                <MapPin size={10} color="#C9A96E" strokeWidth={2} />
                {event.location}
              </span>
            )}
            {date && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.63rem",
                  color: "rgba(245,240,232,0.32)",
                }}
              >
                <Calendar size={10} color="#C9A96E" strokeWidth={2} />
                {date}
              </span>
            )}
          </div>
        )}

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            marginTop: "auto",
            paddingTop: "0.75rem",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            fontFamily: "var(--font-body)",
            fontSize: "0.6rem",
            fontWeight: 600,
            color: "#C9A96E",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          View event <ArrowUpRight size={11} />
        </div>
      </div>
    </Link>
  );
}

export default function WorkGrid({
  events,
  allTypes,
}: {
  events: EventPost[];
  allTypes: string[];
}) {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? events : events.filter((e) => e.eventType === active);

  return (
    <div>
      {/* Filter pills */}
      {allTypes.length > 1 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            paddingTop: "1.5rem",
            paddingBottom: "2.5rem",
          }}
        >
          {["All", ...allTypes].map((type) => {
            const isActive = active === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => setActive(type)}
                style={{
                  padding: "0.38rem 1.1rem",
                  borderRadius: "100px",
                  border: `1px solid ${isActive ? "rgba(201,169,110,0.45)" : "rgba(255,255,255,0.08)"}`,
                  background: isActive ? "rgba(201,169,110,0.08)" : "transparent",
                  color: isActive ? "#C9A96E" : "rgba(245,240,232,0.3)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.62rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                }}
              >
                {type}
              </button>
            );
          })}
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <p
          style={{
            color: "rgba(245,240,232,0.2)",
            fontFamily: "var(--font-body)",
            fontSize: "0.875rem",
            padding: "3rem 0",
          }}
        >
          No events in this category yet.
        </p>
      )}

      {/* Grid */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((event, i) => (
            <EventCard key={event.id} event={event} priority={i < 3} />
          ))}
        </div>
      )}
    </div>
  );
}
