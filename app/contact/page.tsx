import type { Metadata } from "next";
import { Phone, Mail, MapPin, Star, Award, Handshake } from "lucide-react";
import SectionReveal from "@/components/ui/SectionReveal";
import GoldDivider from "@/components/ui/GoldDivider";
import SocialLinksBar from "@/components/ui/SocialLinksBar";
import ContactForm from "@/components/sections/ContactForm";
import {
  COMPANY_NAME,
  COMPANY_PHONE,
  COMPANY_EMAIL,
  COMPANY_ADDRESS,
  WHATSAPP_URL,
  SITE_URL,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: `Contact Us | Get a Free Event Quote | ${COMPANY_NAME} Hyderabad`,
  description:
    "Get in touch with Hyderabad's premier event management team. Fill out our inquiry form or WhatsApp us directly for a free consultation. We respond within 2 hours. Call +91 9989838909.",
  keywords: [
    "contact event management company hyderabad",
    "free event consultation hyderabad",
    "event planning enquiry hyderabad",
    "la grande events contact",
  ],
  openGraph: {
    title: `Contact ${COMPANY_NAME} | Free Event Consultation Hyderabad`,
    description: "Reach out for a free event consultation. Call, WhatsApp or email — we respond within 2 hours.",
    url: "/contact",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact ${COMPANY_NAME}`,
  url: `${SITE_URL}/contact`,
  mainEntity: {
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: COMPANY_NAME,
    telephone: COMPANY_PHONE,
    email: COMPANY_EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 17.412609,
      longitude: 78.2575,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday",
      ],
      opens: "09:00",
      closes: "21:00",
    },
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",       item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Contact Us", item: `${SITE_URL}/contact` },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── HERO ── */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: "52vh", paddingTop: "9rem", paddingBottom: "5rem" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(88,28,235,0.08) 0%, rgba(5,5,16,1) 55%, rgba(201,169,110,0.06) 100%)",
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
            <p className="eyebrow mb-5">Get in Touch</p>
            <h1
              className="text-ivory font-light leading-tight mb-6"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 5.5vw, 5rem)", letterSpacing: "-0.03em" }}
            >
              Let&apos;s Plan Your{" "}
              <span
                style={{
                  fontStyle: "italic",
                  background: "linear-gradient(135deg, #C9A96E 0%, #E8D5B0 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Perfect Event
              </span>
            </h1>
            <p
              className="font-light max-w-xl mx-auto"
              style={{ fontSize: "1rem", lineHeight: 1.75, color: "rgba(245,240,232,0.6)" }}
            >
              Tell us about your vision and we&apos;ll handle every detail — from concept to curtain call.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-12 md:py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Form — wider column */}
            <div className="lg:col-span-3">
              <SectionReveal direction="left">
                <div className="card-glass p-8 md:p-10">
                  <GoldDivider delay={0} className="mb-5" />
                  <h2
                    className="text-ivory font-light mb-2"
                    style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", letterSpacing: "-0.01em" }}
                  >
                    Tell Us About Your Event
                  </h2>
                  <p className="text-muted text-sm font-light mb-8">
                    Fill in the details below and we&apos;ll reach out within 2 hours.
                  </p>
                  <ContactForm />
                </div>
              </SectionReveal>
            </div>

            {/* Info panel */}
            <div className="lg:col-span-2">
              <SectionReveal direction="right" delay={0.1}>
                <div className="space-y-6">
                  <div>
                    <GoldDivider delay={0.1} className="mb-5" />
                    <h2
                      className="text-ivory font-light mb-6"
                      style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", letterSpacing: "-0.01em" }}
                    >
                      We&apos;re Based in Hyderabad
                    </h2>
                  </div>

                  {/* Contact info blocks */}
                  {[
                    {
                      Icon: MapPin,
                      label: "Location",
                      content: COMPANY_ADDRESS,
                      href: undefined,
                    },
                    {
                      Icon: Phone,
                      label: "Phone",
                      content: COMPANY_PHONE,
                      sub: "Available: Mon–Sun, 9am–9pm",
                      href: `tel:${COMPANY_PHONE}`,
                    },
                    {
                      Icon: Mail,
                      label: "Email",
                      content: COMPANY_EMAIL,
                      href: `mailto:${COMPANY_EMAIL}`,
                    },
                  ].map(({ Icon, label, content, sub, href }) => (
                    <div
                      key={label}
                      className="card-glass flex items-start gap-4 p-5"
                    >
                      <div
                        className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg"
                        style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)" }}
                      >
                        <Icon size={16} className="text-champagne" />
                      </div>
                      <div>
                        <p className="eyebrow mb-1">{label}</p>
                        {href ? (
                          <a href={href} className="text-ivory text-sm font-light hover:text-champagne transition-colors">
                            {content}
                          </a>
                        ) : (
                          <p className="text-ivory text-sm font-light">{content}</p>
                        )}
                        {sub && <p className="text-muted text-xs font-light mt-0.5">{sub}</p>}
                      </div>
                    </div>
                  ))}

                  {/* WhatsApp */}
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl flex items-center gap-4 p-5 transition-all duration-300 group"
                    style={{
                      background: "rgba(37,211,102,0.06)",
                      border: "1px solid rgba(37,211,102,0.25)",
                      backdropFilter: "blur(16px)",
                    }}
                  >
                    <div
                      className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg"
                      style={{ background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.3)" }}
                    >
                      <svg viewBox="0 0 32 32" fill="#25D366" className="w-4 h-4">
                        <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.323.617 4.507 1.693 6.4L2.667 29.333l7.147-1.653A13.28 13.28 0 0 0 16.004 29.333C23.36 29.333 29.333 23.36 29.333 16S23.36 2.667 16.004 2.667zm6.027 18.093c-.333-.173-1.947-.96-2.253-1.067-.307-.107-.533-.16-.76.16-.227.32-.867 1.067-1.067 1.28-.2.213-.4.24-.733.08-.333-.173-1.413-.52-2.693-1.653-1-.88-1.68-1.973-1.88-2.307-.2-.333 0-.507.147-.68.16-.16.333-.413.507-.613.173-.2.227-.347.333-.573.107-.227.053-.427-.027-.6-.08-.173-.76-1.84-1.04-2.52-.28-.667-.56-.573-.76-.573h-.64c-.227 0-.587.08-.893.4s-1.173 1.147-1.173 2.8 1.2 3.253 1.36 3.48c.16.213 2.333 3.6 5.68 5.04.8.347 1.413.547 1.893.693.8.253 1.52.213 2.093.133.64-.093 1.947-.8 2.213-1.573.267-.773.267-1.44.187-1.573-.08-.133-.293-.213-.627-.387z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#25D366" }}>WhatsApp Us</p>
                      <p className="text-muted text-xs font-light">Quick responses within 30 mins</p>
                    </div>
                  </a>

                  {/* Trust signals */}
                  <div className="glass-gold rounded-2xl p-5 space-y-3">
                    {[
                      { Icon: Star, text: "Rated 4.9 on Google" },
                      { Icon: Award, text: "200+ Events Successfully Executed" },
                      { Icon: Handshake, text: "Trusted by Leading Hyderabad Brands" },
                    ].map(({ Icon, text }) => (
                      <div key={text} className="flex items-center gap-3">
                        <Icon size={14} className="text-champagne shrink-0" />
                        <span className="text-muted text-sm font-light">{text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Social links */}
                  <div>
                    <p className="eyebrow mb-3">Follow Us</p>
                    <SocialLinksBar />
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section
        className="pb-20"
        style={{ background: "#F5F0E8", borderRadius: "2.5rem", paddingTop: "3rem" }}
      >
        <div className="section-container">
          <p
            className="eyebrow mb-3"
            style={{ textAlign: "center" }}
          >
            Find Us
          </p>
          <p
            className="text-center font-light mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
              letterSpacing: "-0.01em",
              color: "#0D0A1A",
            }}
          >
            Based in Hyderabad, Serving All of India
          </p>
          <div
            className="overflow-hidden rounded-2xl"
            style={{ border: "1px solid rgba(13,10,26,0.1)", height: "400px", boxShadow: "0 8px 32px rgba(13,10,26,0.08)" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242841.52521266456!2d78.2575!3d17.412609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="La Grande Events Location — Hyderabad"
            />
          </div>
          <p
            className="mt-3 text-center"
            style={{ fontSize: "0.72rem", letterSpacing: "0.08em", color: "rgba(13,10,26,0.45)" }}
          >
            Hyderabad, Telangana · Available nationwide for destination events
          </p>
        </div>
      </section>
    </>
  );
}
