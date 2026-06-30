"use client";

const ITEMS = [
  "Corporate Events",
  "Weddings",
  "Product Launches",
  "Social Celebrations",
  "MICE Events",
  "Entertainment & Décor",
  "Award Nights",
  "Team Outings",
];

const SEP = (
  <span
    aria-hidden
    style={{ color: "#C9A96E", fontSize: "0.45rem", lineHeight: 1, flexShrink: 0 }}
  >
    ◆
  </span>
);

function Strip() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "2.4rem",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      {ITEMS.map((item, i) => (
        <span
          key={i}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "2.4rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.58rem",
              fontWeight: 500,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(201,169,110,0.55)",
            }}
          >
            {item}
          </span>
          {SEP}
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: "1px solid rgba(201,169,110,0.1)",
        borderBottom: "1px solid rgba(201,169,110,0.1)",
        padding: "0.9rem 0",
        background: "rgba(5,5,16,0.7)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "2.4rem",
          animation: "marqueeScroll 32s linear infinite",
          willChange: "transform",
        }}
      >
        {/* Duplicate strips so the loop is seamless */}
        <Strip />
        <Strip />
        <Strip />
      </div>
    </div>
  );
}
