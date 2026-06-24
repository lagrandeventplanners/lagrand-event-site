import SectionReveal from "@/components/ui/SectionReveal";
import GoldDivider from "@/components/ui/GoldDivider";
import { PROCESS_STEPS } from "@/lib/constants";

export default function ProcessSection() {
  return (
    <section className="py-16 md:py-32 relative overflow-hidden">
      {/* Atmospheric orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-80px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "400px",
          background: "radial-gradient(ellipse at 50% 0%, rgba(201,169,110,0.1) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-60px",
          right: "-60px",
          width: "380px",
          height: "380px",
          background: "radial-gradient(circle, rgba(88,28,235,0.05) 0%, transparent 65%)",
          borderRadius: "50%",
        }}
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <SectionReveal className="mb-10 md:mb-20 text-center">
          <GoldDivider delay={0} className="mb-4 mx-auto" />
          <p className="eyebrow mb-3">How We Work</p>
          <h2
            className="text-ivory font-light"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            From Idea to{" "}
            <span
              style={{
                fontStyle: "italic",
                background: "linear-gradient(135deg, #C9A96E 0%, #E8D5B0 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Extraordinary
            </span>
          </h2>
          <p
            className="text-muted font-light mt-4 max-w-lg mx-auto"
            style={{ fontSize: "0.9375rem", lineHeight: 1.75 }}
          >
            Our proven 5-step process ensures your event is flawless — from the first conversation
            to the final curtain call.
          </p>
        </SectionReveal>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden lg:block absolute"
            style={{
              top: "2.5rem",
              left: "calc(10% + 2.5rem)",
              right: "calc(10% + 2.5rem)",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.25) 10%, rgba(201,169,110,0.25) 90%, transparent 100%)",
            }}
          />

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3">
            {PROCESS_STEPS.map((step, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div
                  className="group relative flex flex-col items-center text-center"
                  style={{ paddingTop: "0" }}
                >
                  {/* Step node */}
                  <div className="relative mb-6 z-10">
                    {/* Outer glow ring */}
                    <div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(201,169,110,0.2) 0%, transparent 70%)",
                        transform: "scale(2.2)",
                      }}
                    />
                    {/* Circle */}
                    <div
                      className="relative w-20 h-20 flex flex-col items-center justify-center transition-all duration-400"
                      style={{
                        background: "rgba(201,169,110,0.06)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        border: "1px solid rgba(201,169,110,0.25)",
                        borderRadius: "50%",
                        boxShadow: "0 0 0 6px rgba(201,169,110,0.04)",
                      }}
                    >
                      <span
                        className="text-champagne"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.35rem",
                          fontWeight: 400,
                          lineHeight: 1,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {step.step}
                      </span>
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className="w-full p-5 transition-all duration-400 group-hover:border-[rgba(201,169,110,0.3)]"
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: "16px",
                    }}
                  >
                    {/* Gold top accent */}
                    <div
                      className="mx-auto mb-4 transition-all duration-400 group-hover:w-12"
                      style={{
                        height: "1.5px",
                        width: "24px",
                        background: "linear-gradient(90deg, transparent, #C9A96E, transparent)",
                      }}
                    />
                    <h3
                      className="text-ivory font-medium mb-2"
                      style={{
                        fontSize: "0.9rem",
                        letterSpacing: "0.01em",
                        lineHeight: 1.3,
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-muted font-light leading-relaxed"
                      style={{ fontSize: "0.78rem" }}
                    >
                      {step.body}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>

        {/* Bottom callout */}
        <SectionReveal delay={0.5} className="mt-16">
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-6"
            style={{
              background:
                "linear-gradient(135deg, rgba(201,169,110,0.07) 0%, rgba(255,255,255,0.02) 100%)",
              border: "1px solid rgba(201,169,110,0.18)",
              borderRadius: "16px",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            <div className="flex items-center gap-4">
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(201,169,110,0.12)",
                  border: "1px solid rgba(201,169,110,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  className="text-champagne"
                  style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}
                >
                  ✦
                </span>
              </div>
              <p
                className="text-ivory font-light"
                style={{ fontSize: "0.9rem", lineHeight: 1.6 }}
              >
                Every event gets a{" "}
                <span className="text-champagne font-medium">dedicated event manager</span> as your
                single point of contact — from planning to post-event wrap.
              </p>
            </div>
            <div
              className="h-px sm:h-10 sm:w-px w-full"
              style={{ background: "rgba(201,169,110,0.2)", flexShrink: 0 }}
            />
            <div className="text-center sm:text-right shrink-0">
              <p
                className="text-champagne font-light"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.75rem",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                48h
              </p>
              <p
                className="text-muted"
                style={{ fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "0.2rem" }}
              >
                Response Guarantee
              </p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
