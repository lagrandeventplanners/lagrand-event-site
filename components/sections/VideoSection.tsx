import SectionReveal from "@/components/ui/SectionReveal";
import GoldDivider from "@/components/ui/GoldDivider";

// Replace VIDEO_ID with your own YouTube video ID
const VIDEO_ID = "1La4QzGeaaQ";

export default function VideoSection() {
  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "#050510" }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          height: "60%",
          background:
            "radial-gradient(ellipse at center, rgba(201,169,110,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <SectionReveal className="mb-12 text-center">
          <GoldDivider delay={0} className="mb-4 mx-auto" />
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.6rem",
              fontWeight: 600,
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              color: "#C9A96E",
              marginBottom: "0.75rem",
            }}
          >
            See the Magic
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
              fontWeight: 300,
              color: "#F5F0E8",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            Events That Move People
          </h2>
        </SectionReveal>

        {/* Video embed */}
        <SectionReveal delay={0.15}>
          <div
            style={{
              position: "relative",
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid rgba(201,169,110,0.18)",
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,169,110,0.08)",
              aspectRatio: "16/9",
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_ID}?rel=0&modestbranding=1&color=white`}
              title="La Grande Events highlight reel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
