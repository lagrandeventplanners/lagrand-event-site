import Link from "next/link";
import { getEvents } from "@/lib/events-store";
import { deleteEventAction, duplicateEventAction, reorderEventAction } from "./actions";
import { PlusCircle, Edit3, Trash2, Star, Eye, EyeOff, Calendar, ChevronUp, ChevronDown, Copy } from "lucide-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const events = await getEvents();

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "#F5F0E8", margin: 0, fontWeight: 400, letterSpacing: "-0.02em" }}>
            Event Posts
          </h1>
          <p style={{ color: "rgba(245,240,232,0.4)", fontSize: "0.8rem", margin: "0.3rem 0 0", fontFamily: "var(--font-body)" }}>
            {events.length} total · {events.filter(e => e.status === "published").length} published · {events.filter(e => e.status === "draft").length} drafts
          </p>
        </div>
        <Link href="/admin/events/new" style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          background: "linear-gradient(135deg, #C9A96E 0%, #A07840 100%)",
          color: "#050510", padding: "0.65rem 1.4rem", borderRadius: "10px",
          textDecoration: "none", fontFamily: "var(--font-body)", fontSize: "0.75rem",
          fontWeight: 700, letterSpacing: "0.06em",
          boxShadow: "0 4px 20px rgba(201,169,110,0.25)",
        }}>
          <PlusCircle size={15} /> New Event
        </Link>
      </div>

      {events.length === 0 ? (
        <div style={{
          border: "2px dashed rgba(201,169,110,0.2)", borderRadius: "16px",
          padding: "4rem 2rem", textAlign: "center",
        }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "rgba(245,240,232,0.3)", margin: "0 0 0.75rem" }}>
            No events yet
          </p>
          <p style={{ color: "rgba(245,240,232,0.25)", fontSize: "0.8rem", fontFamily: "var(--font-body)", margin: "0 0 1.5rem" }}>
            Create your first event post to get started
          </p>
          <Link href="/admin/events/new" style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(201,169,110,0.12)", border: "1px solid rgba(201,169,110,0.3)",
            color: "#C9A96E", padding: "0.65rem 1.4rem", borderRadius: "10px",
            textDecoration: "none", fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 600,
          }}>
            <PlusCircle size={14} /> Create first event
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(255,255,255,0.04)", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
          {/* Table header */}
          <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 160px 130px 110px 190px", gap: "1rem", padding: "0.75rem 1.25rem", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            {["Cover", "Title", "Type", "Date", "Status", "Actions"].map(h => (
              <span key={h} style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", fontWeight: 600, color: "rgba(245,240,232,0.3)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                {h}
              </span>
            ))}
          </div>

          {events.map((event, idx) => (
            <div key={event.id} style={{ display: "grid", gridTemplateColumns: "80px 1fr 160px 130px 110px 190px", gap: "1rem", padding: "1rem 1.25rem", alignItems: "center", background: "rgba(5,5,16,0.6)", borderBottom: "1px solid rgba(255,255,255,0.04)", transition: "background 0.2s" }}>
              {/* Cover */}
              <div style={{ width: 64, height: 44, borderRadius: 8, overflow: "hidden", background: "rgba(255,255,255,0.05)", flexShrink: 0, position: "relative" }}>
                {event.coverImage ? (
                  <Image src={event.coverImage} alt={event.title} fill style={{ objectFit: "cover" }} sizes="64px" />
                ) : (
                  <div style={{ width: "100%", height: "100%", background: "rgba(201,169,110,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Eye size={14} color="rgba(201,169,110,0.3)" />
                  </div>
                )}
              </div>

              {/* Title */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                  {event.featured && <Star size={11} color="#C9A96E" fill="#C9A96E" />}
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "1rem", color: "#F5F0E8", fontWeight: 400, letterSpacing: "-0.01em" }}>
                    {event.title || "Untitled"}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {event.tags.slice(0, 3).map(tag => (
                    <span key={tag} style={{ fontSize: "0.6rem", color: "rgba(201,169,110,0.7)", background: "rgba(201,169,110,0.08)", padding: "0.1rem 0.5rem", borderRadius: "100px", border: "1px solid rgba(201,169,110,0.15)", fontFamily: "var(--font-body)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Type */}
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "rgba(245,240,232,0.5)" }}>
                {event.eventType || "—"}
              </span>

              {/* Date */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <Calendar size={11} color="rgba(245,240,232,0.3)" />
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "rgba(245,240,232,0.45)" }}>
                  {event.date ? new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                </span>
              </div>

              {/* Status */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                {event.status === "published" ? (
                  <Eye size={12} color="#4ade80" />
                ) : (
                  <EyeOff size={12} color="rgba(245,240,232,0.3)" />
                )}
                <span style={{
                  fontSize: "0.65rem", fontFamily: "var(--font-body)", fontWeight: 600,
                  color: event.status === "published" ? "#4ade80" : "rgba(245,240,232,0.4)",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                }}>
                  {event.status}
                </span>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                {/* Move up */}
                <form action={reorderEventAction.bind(null, event.id, "up")}>
                  <button type="submit" disabled={idx === 0} title="Move up" style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    width: 30, height: 30, borderRadius: 7, cursor: idx === 0 ? "default" : "pointer",
                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                    color: idx === 0 ? "rgba(245,240,232,0.15)" : "rgba(245,240,232,0.5)",
                  }}>
                    <ChevronUp size={13} />
                  </button>
                </form>
                {/* Move down */}
                <form action={reorderEventAction.bind(null, event.id, "down")}>
                  <button type="submit" disabled={idx === events.length - 1} title="Move down" style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    width: 30, height: 30, borderRadius: 7, cursor: idx === events.length - 1 ? "default" : "pointer",
                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                    color: idx === events.length - 1 ? "rgba(245,240,232,0.15)" : "rgba(245,240,232,0.5)",
                  }}>
                    <ChevronDown size={13} />
                  </button>
                </form>
                {/* Duplicate */}
                <form action={duplicateEventAction.bind(null, event.id)}>
                  <button type="submit" title="Duplicate as draft" style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    width: 30, height: 30, borderRadius: 7, cursor: "pointer",
                    background: "rgba(201,169,110,0.07)", border: "1px solid rgba(201,169,110,0.2)",
                    color: "rgba(201,169,110,0.7)",
                  }}>
                    <Copy size={12} />
                  </button>
                </form>
                {/* Edit */}
                <Link href={`/admin/events/${event.id}/edit`} title="Edit" style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 30, height: 30, borderRadius: 7,
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(245,240,232,0.6)", textDecoration: "none",
                }}>
                  <Edit3 size={13} />
                </Link>
                {/* Delete */}
                <form action={async () => { "use server"; await deleteEventAction(event.id); }}>
                  <button type="submit" title="Delete" style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    width: 30, height: 30, borderRadius: 7, cursor: "pointer",
                    background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
                    color: "rgba(239,68,68,0.7)",
                  }}>
                    <Trash2 size={13} />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
