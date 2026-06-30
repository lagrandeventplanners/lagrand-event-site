import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEvents, getEventBySlug } from "@/lib/events-store";
import { WHATSAPP_URL, SITE_URL, COMPANY_NAME } from "@/lib/constants";
import GoldDivider from "@/components/ui/GoldDivider";
import SectionReveal from "@/components/ui/SectionReveal";
import { ArrowLeft, ArrowRight, MapPin, Users, Calendar, Building2, Tag } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const events = await getEvents();
  return events
    .filter((e) => e.status === "published")
    .map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Event Not Found" };
  const description = event.excerpt || `${event.eventType} event managed by ${COMPANY_NAME} in ${event.location || "Hyderabad"}.`;
  return {
    title: `${event.title} | ${COMPANY_NAME}`,
    description,
    openGraph: {
      title: `${event.title} | ${COMPANY_NAME}`,
      description,
      url: `${SITE_URL}/our-work/${event.slug}`,
      images: event.coverImage
        ? [{ url: event.coverImage, width: 1200, height: 630, alt: `${event.title} — ${COMPANY_NAME}` }]
        : [{ url: `${SITE_URL}/images/og-home.jpg`, width: 1200, height: 630, alt: `${COMPANY_NAME} — Premium Event Management Hyderabad` }],
    },
    alternates: {
      canonical: `${SITE_URL}/our-work/${event.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Minimal markdown → HTML (admin-authored content only)
function renderMarkdown(md: string): string {
  return md
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^---$/gm, '<hr/>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[a-z])(.+)$/gm, (m) => m.trim() ? m : '')
    .replace(/^<\/p><p>(<h[23]|<ul|<blockquote|<hr)/, '$1');
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event || event.status !== "published") notFound();

  const htmlContent = event.content ? `<p>${renderMarkdown(event.content)}</p>` : "";

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.excerpt || `${event.eventType} event managed by ${COMPANY_NAME}.`,
    ...(event.date ? { startDate: event.date } : {}),
    ...(event.coverImage ? { image: event.coverImage } : {}),
    location: {
      "@type": "Place",
      name: event.location || "Hyderabad",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        addressCountry: "IN",
      },
    },
    organizer: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#localbusiness`,
      name: COMPANY_NAME,
      url: SITE_URL,
    },
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Our Work", item: `${SITE_URL}/our-work` },
      { "@type": "ListItem", position: 3, name: event.title, item: `${SITE_URL}/our-work/${event.slug}` },
    ],
  };

  const metaItems = [
    event.date && { icon: <Calendar size={14} color="#C9A96E" />, label: "Date", value: new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) },
    event.location && { icon: <MapPin size={14} color="#C9A96E" />, label: "Location", value: event.location },
    event.guestCount && { icon: <Users size={14} color="#C9A96E" />, label: "Guests", value: event.guestCount },
    event.clientName && { icon: <Building2 size={14} color="#C9A96E" />, label: "Client", value: event.clientName },
    event.eventType && { icon: <Tag size={14} color="#C9A96E" />, label: "Category", value: event.eventType },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; value: string }[];

  return (
    <div style={{ minHeight: "100vh", background: "#050510" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── HERO ── */}
      <div style={{ position: "relative", height: "60vh", minHeight: "420px", maxHeight: "640px" }}>
        {event.coverImage ? (
          <Image src={event.coverImage} alt={event.title} fill style={{ objectFit: "cover" }} priority sizes="100vw" />
        ) : (
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(201,169,110,0.08), #050510)" }} />
        )}
        {/* Dark overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,16,1) 0%, rgba(5,5,16,0.6) 40%, rgba(5,5,16,0.2) 100%)" }} />

        {/* Back link */}
        <div style={{ position: "absolute", top: "90px", left: "max(2rem, calc((100vw - 1200px)/2))", zIndex: 10 }}>
          <Link href="/our-work" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(5,5,16,0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "100px", padding: "0.4rem 1rem", fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "rgba(245,240,232,0.55)", textDecoration: "none", letterSpacing: "0.08em" }}>
            <ArrowLeft size={12} /> Our Work
          </Link>
        </div>

        {/* Hero text */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 max(2rem, calc((100vw - 1200px)/2)) 3rem" }}>
          {event.eventType && (
            <div style={{ display: "inline-flex", alignItems: "center", background: "rgba(5,5,16,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(201,169,110,0.3)", borderRadius: "100px", padding: "0.3rem 1rem", fontFamily: "var(--font-body)", fontSize: "0.6rem", fontWeight: 600, color: "#C9A96E", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "1rem" }}>
              {event.eventType}
            </div>
          )}
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 300, color: "#F5F0E8", margin: "0 0 0.75rem", letterSpacing: "-0.02em", lineHeight: 1.1, maxWidth: "800px" }}>
            {event.title}
          </h1>
          {event.excerpt && (
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "rgba(245,240,232,0.55)", margin: 0, maxWidth: "600px", lineHeight: 1.7 }}>
              {event.excerpt}
            </p>
          )}
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="section-container" style={{ paddingTop: "3rem", paddingBottom: "5rem" }}>
        <div className="event-detail-grid">

          {/* LEFT: content + gallery */}
          <div>
            {/* Meta pills on mobile */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "2.5rem" }}>
              {metaItems.map(({ icon, label, value }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "100px", padding: "0.4rem 0.9rem" }}>
                  {icon}
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "rgba(245,240,232,0.5)" }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Markdown content */}
            {htmlContent && (
              <SectionReveal>
                <div
                  className="event-content"
                  style={{ fontSize: "0.95rem", lineHeight: 1.9, marginBottom: "3rem" }}
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </SectionReveal>
            )}

            {/* Gallery */}
            {event.gallery.length > 0 && (
              <SectionReveal>
                <div style={{ marginBottom: "1rem" }}>
                  <GoldDivider className="mb-4" />
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)", marginBottom: "1.25rem" }}>Gallery</p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "0.75rem" }}>
                  {event.gallery.map((src, i) => (
                    <div key={i} style={{ position: "relative", aspectRatio: "4/3", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <Image src={src} alt={`${event.title} — gallery ${i + 1}`} fill className="object-cover transition-transform duration-500 hover:scale-105" sizes="300px" />
                    </div>
                  ))}
                </div>
              </SectionReveal>
            )}

            {/* Tags */}
            {event.tags.length > 0 && (
              <div style={{ marginTop: "2.5rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(245,240,232,0.25)", marginBottom: "0.75rem" }}>Tags</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {event.tags.map((tag) => (
                    <span key={tag} style={{ background: "rgba(201,169,110,0.07)", border: "1px solid rgba(201,169,110,0.15)", color: "rgba(245,240,232,0.45)", borderRadius: "100px", padding: "0.25rem 0.75rem", fontFamily: "var(--font-body)", fontSize: "0.68rem" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: sticky sidebar */}
          <div className="event-detail-sidebar">
            {/* Event details card */}
            <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.5rem", marginBottom: "1rem" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,240,232,0.25)", marginBottom: "1.25rem" }}>Event Details</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {metaItems.map(({ icon, label, value }) => (
                  <div key={label} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <div style={{ marginTop: "1px", flexShrink: 0 }}>{icon}</div>
                    <div>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.58rem", color: "rgba(245,240,232,0.28)", textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 0.15rem" }}>{label}</p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(245,240,232,0.75)", margin: 0, fontWeight: 500 }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA card */}
            <div style={{ background: "linear-gradient(135deg, rgba(201,169,110,0.1), rgba(201,169,110,0.04))", border: "1px solid rgba(201,169,110,0.2)", borderRadius: "16px", padding: "1.5rem" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 400, color: "#F5F0E8", margin: "0 0 0.5rem", letterSpacing: "-0.01em" }}>
                Planning a similar event?
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(245,240,232,0.45)", margin: "0 0 1.25rem", lineHeight: 1.6 }}>
                Let&apos;s talk about your vision.
              </p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", background: "linear-gradient(135deg,#C9A96E,#A07840)", color: "#050510", padding: "0.8rem", borderRadius: "10px", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 700, textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase", boxShadow: "0 6px 20px rgba(201,169,110,0.2)" }}>
                Enquire Now <ArrowRight size={13} />
              </a>
            </div>

            {/* Back to portfolio */}
            <Link href="/our-work" style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "1rem", fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "rgba(245,240,232,0.3)", textDecoration: "none", padding: "0.5rem 0" }}>
              <ArrowLeft size={12} /> Back to Our Work
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
