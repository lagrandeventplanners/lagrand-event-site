"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import {
  Image as ImageIcon, Images, Tag, Calendar, MapPin, Users, Building2,
  FileText, Globe, Star, Plus, X, Upload, Save, Eye, EyeOff,
  ChevronDown, Sparkles,
} from "lucide-react";
import { upsertEventAction } from "../../../actions";
import type { EventPost } from "@/lib/events-store";

const EVENT_TYPES = [
  "Corporate Events", "Weddings & Sangeet", "Product Launches",
  "Social Celebrations", "MICE & Offsites", "Entertainment & Décor",
];

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const DEFAULT_SUGGESTIONS = [
  "Hyderabad", "Premium", "Outdoor", "Indoor", "Luxury", "400+ Guests",
  "Theme Event", "Gala", "Corporate", "Destination",
];

export default function EditEventForm({ event, suggestedTags = [] }: { event: EventPost; suggestedTags?: string[] }) {
  const allSuggestions = [...new Set([...DEFAULT_SUGGESTIONS, ...suggestedTags])].sort();
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const [coverPreview, setCoverPreview] = useState(event.coverImage || "");
  const [coverUrlInput, setCoverUrlInput] = useState(event.coverImage?.startsWith("http") ? event.coverImage : "");

  const [galleryPreviews, setGalleryPreviews] = useState<{ url: string; name: string }[]>(
    event.gallery.map((u) => ({ url: u, name: u }))
  );
  const [galleryUrlInput, setGalleryUrlInput] = useState("");

  const [tags, setTags] = useState<string[]>(event.tags);
  const [tagInput, setTagInput] = useState("");
  const [status, setStatus] = useState<"draft" | "published">(event.status);
  const [featured, setFeatured] = useState(event.featured);
  const [eventType, setEventType] = useState(event.eventType || "");
  const [typeOpen, setTypeOpen] = useState(false);
  const [title, setTitle] = useState(event.title);
  const [slug, setSlug] = useState(event.slug);
  const [slugEdited, setSlugEdited] = useState(true);

  function handleCoverFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setCoverPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
    setCoverUrlInput("");
  }

  function handleGalleryFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) =>
        setGalleryPreviews((prev) => [...prev, { url: ev.target?.result as string, name: file.name }]);
      reader.readAsDataURL(file);
    });
  }

  function addGalleryUrl() {
    const url = galleryUrlInput.trim();
    if (!url) return;
    setGalleryPreviews((prev) => [...prev, { url, name: url }]);
    setGalleryUrlInput("");
  }

  function addTag() {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) setTags((prev) => [...prev, t]);
    setTagInput("");
  }

  function handleSubmit(submitStatus: "draft" | "published") {
    if (!formRef.current) return;
    startTransition(async () => {
      const fd = new FormData(formRef.current!);
      fd.set("id", event.id);
      fd.set("createdAt", event.createdAt);
      fd.set("status", submitStatus);
      fd.set("featured", String(featured));
      fd.set("tags", tags.join(","));
      fd.set("slug", slug);
      const externalUrls = galleryPreviews
        .filter((p) => !p.url.startsWith("data:"))
        .map((p) => p.url)
        .join("\n");
      fd.set("galleryUrls", externalUrls);
      await upsertEventAction(fd);
    });
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px",
    color: "#F5F0E8", padding: "0.75rem 1rem",
    fontFamily: "var(--font-body)", fontSize: "0.875rem",
    outline: "none", boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: "0.4rem",
    fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 600,
    color: "rgba(245,240,232,0.4)", letterSpacing: "0.14em",
    textTransform: "uppercase", marginBottom: "0.5rem",
  };

  const sectionCard: React.CSSProperties = {
    background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "16px", padding: "1.75rem",
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", color: "#F5F0E8", margin: 0, fontWeight: 400, letterSpacing: "-0.02em" }}>
            Edit Event
          </h1>
          <p style={{ color: "rgba(245,240,232,0.35)", fontSize: "0.75rem", margin: "0.3rem 0 0", fontFamily: "var(--font-body)" }}>
            Last updated {new Date(event.updatedAt).toLocaleString("en-IN")}
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button type="button" onClick={() => handleSubmit("draft")} disabled={isPending}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(245,240,232,0.75)", padding: "0.65rem 1.4rem", borderRadius: "10px", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 600, opacity: isPending ? 0.6 : 1 }}>
            <Save size={14} /> {isPending ? "Saving…" : "Save Draft"}
          </button>
          <button type="button" onClick={() => handleSubmit("published")} disabled={isPending}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "linear-gradient(135deg, #C9A96E 0%, #A07840 100%)", color: "#050510", padding: "0.65rem 1.4rem", borderRadius: "10px", cursor: "pointer", border: "none", fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 700, boxShadow: "0 4px 20px rgba(201,169,110,0.3)", opacity: isPending ? 0.6 : 1 }}>
            <Globe size={14} /> {isPending ? "Publishing…" : "Update & Publish"}
          </button>
        </div>
      </div>

      <form ref={formRef} encType="multipart/form-data">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "1.5rem", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Title */}
            <div style={sectionCard}>
              <textarea name="title" value={title} onChange={(e) => { setTitle(e.target.value); if (!slugEdited) setSlug(slugify(e.target.value)); }} placeholder="Event title…" rows={2} required
                style={{ ...inputStyle, background: "transparent", border: "none", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "-0.02em", resize: "none", lineHeight: 1.3, padding: "0", borderRadius: 0 }} />
              <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", margin: "1rem 0" }} />
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ ...labelStyle, margin: 0, flexShrink: 0 }}>Slug</span>
                <input name="slug" value={slug} onChange={(e) => { setSlug(e.target.value); setSlugEdited(true); }} style={{ ...inputStyle, fontSize: "0.8rem", padding: "0.4rem 0.75rem", color: "rgba(245,240,232,0.5)", fontFamily: "monospace" }} />
                <button type="button" onClick={() => { setSlug(slugify(title)); setSlugEdited(true); }} style={{ background: "none", border: "none", color: "#C9A96E", cursor: "pointer", padding: "0.4rem", flexShrink: 0 }}><Sparkles size={14} /></button>
              </div>
            </div>

            <div style={sectionCard}>
              <label style={labelStyle}><FileText size={12} /> Excerpt</label>
              <textarea name="excerpt" defaultValue={event.excerpt} placeholder="Short description…" rows={3} style={{ ...inputStyle, resize: "vertical" }} />
            </div>

            <div style={sectionCard}>
              <label style={labelStyle}><FileText size={12} /> Content</label>
              <textarea name="content" defaultValue={event.content} placeholder="Write your content here…" rows={18} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.8, fontFamily: "monospace", fontSize: "0.85rem" }} />
            </div>

            <div style={sectionCard}>
              <p style={{ ...labelStyle, marginBottom: "1.25rem" }}><Calendar size={13} /> Event Details</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div><label style={labelStyle}><Calendar size={11} /> Event Date</label><input name="date" type="date" defaultValue={event.date} style={inputStyle} /></div>
                <div><label style={labelStyle}><MapPin size={11} /> Location</label><input name="location" defaultValue={event.location} type="text" style={inputStyle} /></div>
                <div><label style={labelStyle}><Users size={11} /> Guest Count</label><input name="guestCount" defaultValue={event.guestCount} type="text" style={inputStyle} /></div>
                <div><label style={labelStyle}><Building2 size={11} /> Client / Brand</label><input name="clientName" defaultValue={event.clientName} type="text" style={inputStyle} /></div>
              </div>
            </div>

            {/* Cover Image */}
            <div style={sectionCard}>
              <label style={labelStyle}><ImageIcon size={12} /> Cover Image</label>
              <label htmlFor="editCoverImageFile" style={{ border: `2px dashed ${coverPreview ? "rgba(201,169,110,0.4)" : "rgba(255,255,255,0.1)"}`, borderRadius: "12px", overflow: "hidden", cursor: "pointer", position: "relative", minHeight: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {coverPreview ? (
                  <Image src={coverPreview} alt="Cover" fill style={{ objectFit: "cover" }} sizes="800px" unoptimized={coverPreview.startsWith("data:")} />
                ) : (
                  <div style={{ textAlign: "center", padding: "2rem" }}>
                    <Upload size={28} color="rgba(201,169,110,0.4)" style={{ margin: "0 auto 0.75rem" }} />
                    <p style={{ color: "rgba(245,240,232,0.4)", fontFamily: "var(--font-body)", fontSize: "0.8rem", margin: 0 }}>Click to upload</p>
                  </div>
                )}
              </label>
              <input id="editCoverImageFile" type="file" name="coverImageFile" accept="image/*" onChange={handleCoverFile} style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }} />
              <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <span style={{ color: "rgba(245,240,232,0.3)", fontSize: "0.7rem", fontFamily: "var(--font-body)", flexShrink: 0 }}>or URL</span>
                <input type="text" name="coverImageUrl" value={coverUrlInput} onChange={(e) => { setCoverUrlInput(e.target.value); if (e.target.value) setCoverPreview(e.target.value); }} placeholder="https://…" style={{ ...inputStyle, padding: "0.5rem 0.75rem", fontSize: "0.8rem" }} />
              </div>
            </div>

            {/* Gallery */}
            <div style={sectionCard}>
              <label style={labelStyle}><Images size={12} /> Gallery</label>
              {galleryPreviews.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "0.75rem", marginBottom: "1rem" }}>
                  {galleryPreviews.map((p, i) => (
                    <div key={i} style={{ position: "relative", aspectRatio: "4/3", borderRadius: "8px", overflow: "hidden", background: "rgba(255,255,255,0.05)" }}>
                      <Image src={p.url} alt={`Gallery ${i + 1}`} fill style={{ objectFit: "cover" }} sizes="160px" unoptimized={p.url.startsWith("data:")} />
                      <button type="button" onClick={() => setGalleryPreviews(prev => prev.filter((_, idx) => idx !== i))} style={{ position: "absolute", top: 4, right: 4, width: 22, height: 22, borderRadius: "50%", border: "none", cursor: "pointer", background: "rgba(5,5,16,0.8)", color: "#F5F0E8", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={11} /></button>
                    </div>
                  ))}
                  <label htmlFor="editGalleryFiles" style={{ aspectRatio: "4/3", borderRadius: "8px", border: "2px dashed rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Plus size={18} color="rgba(245,240,232,0.25)" /></label>
                </div>
              )}
              {galleryPreviews.length === 0 && (
                <label htmlFor="editGalleryFiles" style={{ border: "2px dashed rgba(255,255,255,0.08)", borderRadius: "12px", padding: "2rem", textAlign: "center", cursor: "pointer", marginBottom: "1rem", display: "block" }}>
                  <Images size={24} color="rgba(245,240,232,0.2)" style={{ margin: "0 auto 0.5rem" }} />
                  <p style={{ color: "rgba(245,240,232,0.3)", fontFamily: "var(--font-body)", fontSize: "0.8rem", margin: 0 }}>Upload gallery images</p>
                </label>
              )}
              <input id="editGalleryFiles" type="file" name="galleryFiles" accept="image/*" multiple onChange={handleGalleryFiles} style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }} />
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <span style={{ color: "rgba(245,240,232,0.3)", fontSize: "0.7rem", fontFamily: "var(--font-body)", flexShrink: 0 }}>Add URL</span>
                <input type="text" value={galleryUrlInput} onChange={(e) => setGalleryUrlInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addGalleryUrl())} placeholder="https://… (Enter)" style={{ ...inputStyle, padding: "0.5rem 0.75rem", fontSize: "0.8rem" }} />
                <button type="button" onClick={addGalleryUrl} style={{ background: "rgba(201,169,110,0.15)", border: "1px solid rgba(201,169,110,0.3)", color: "#C9A96E", padding: "0.5rem 0.75rem", borderRadius: "8px", cursor: "pointer", flexShrink: 0 }}><Plus size={14} /></button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", position: "sticky", top: "80px" }}>
            <div style={sectionCard}>
              <p style={{ ...labelStyle, marginBottom: "1.25rem" }}>Publish Settings</p>
              <div style={{ marginBottom: "1.25rem" }}>
                <label style={labelStyle}>Status</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                  {(["draft", "published"] as const).map((s) => (
                    <button key={s} type="button" onClick={() => setStatus(s)} style={{ padding: "0.6rem", borderRadius: "8px", cursor: "pointer", border: "1px solid", borderColor: status === s ? "rgba(201,169,110,0.5)" : "rgba(255,255,255,0.08)", background: status === s ? "rgba(201,169,110,0.12)" : "transparent", color: status === s ? "#C9A96E" : "rgba(245,240,232,0.4)", fontFamily: "var(--font-body)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem" }}>
                      {s === "published" ? <Eye size={12} /> : <EyeOff size={12} />} {s}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: "1.25rem" }}>
                <label style={labelStyle}><Star size={11} /> Featured</label>
                <button type="button" onClick={() => setFeatured(!featured)} style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", cursor: "pointer", border: `1px solid ${featured ? "rgba(201,169,110,0.5)" : "rgba(255,255,255,0.08)"}`, background: featured ? "rgba(201,169,110,0.1)" : "transparent", color: featured ? "#C9A96E" : "rgba(245,240,232,0.4)", fontFamily: "var(--font-body)", fontSize: "0.7rem", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
                  <Star size={12} fill={featured ? "#C9A96E" : "none"} /> {featured ? "Featured" : "Mark as Featured"}
                </button>
              </div>
              <div>
                <label style={labelStyle}><ChevronDown size={11} /> Event Type</label>
                <div style={{ position: "relative" }}>
                  <input type="hidden" name="eventType" value={eventType} />
                  <button
                    type="button"
                    onClick={() => setTypeOpen(!typeOpen)}
                    style={{ ...inputStyle, width: "100%", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}
                  >
                    <span style={{ color: eventType ? "rgba(245,240,232,0.85)" : "rgba(245,240,232,0.3)" }}>
                      {eventType || "Select type…"}
                    </span>
                    <ChevronDown size={14} style={{ color: "rgba(245,240,232,0.3)", flexShrink: 0, transition: "transform 0.2s", transform: typeOpen ? "rotate(180deg)" : "none" }} />
                  </button>
                  {typeOpen && (
                    <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "#0D0D1C", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", zIndex: 200, overflow: "hidden", boxShadow: "0 12px 32px rgba(0,0,0,0.5)" }}>
                      {["", ...EVENT_TYPES].map((t) => (
                        <div
                          key={t || "__placeholder__"}
                          onClick={() => { setEventType(t); setTypeOpen(false); }}
                          style={{ padding: "0.65rem 1rem", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.8rem", color: t === eventType ? "#C9A96E" : t ? "rgba(245,240,232,0.75)" : "rgba(245,240,232,0.3)", background: t === eventType ? "rgba(201,169,110,0.08)" : "transparent", transition: "background 0.15s" }}
                          onMouseEnter={e => { if (t !== eventType) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                          onMouseLeave={e => { if (t !== eventType) e.currentTarget.style.background = t === eventType ? "rgba(201,169,110,0.08)" : "transparent"; }}
                        >
                          {t || "Select type…"}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div style={sectionCard}>
              <label style={{ ...labelStyle, marginBottom: "0.75rem" }}><Tag size={12} /> Tags</label>
              {tags.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.75rem" }}>
                  {tags.map((t) => (
                    <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.25)", color: "#C9A96E", borderRadius: "100px", padding: "0.25rem 0.65rem", fontFamily: "var(--font-body)", fontSize: "0.7rem" }}>
                      {t}<button type="button" onClick={() => setTags(prev => prev.filter(x => x !== t))} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(201,169,110,0.6)", padding: 0, display: "flex" }}><X size={10} /></button>
                    </span>
                  ))}
                </div>
              )}
              <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.75rem" }}>
                <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(); } }} placeholder="Add tag, press Enter" style={{ ...inputStyle, padding: "0.5rem 0.75rem", fontSize: "0.8rem", flex: 1 }} />
                <button type="button" onClick={addTag} style={{ background: "rgba(201,169,110,0.15)", border: "1px solid rgba(201,169,110,0.3)", color: "#C9A96E", padding: "0.5rem 0.75rem", borderRadius: "8px", cursor: "pointer" }}><Plus size={14} /></button>
              </div>
              {allSuggestions.filter(s => !tags.includes(s)).length > 0 && (
                <>
                  <p style={{ fontSize: "0.6rem", color: "rgba(245,240,232,0.2)", fontFamily: "var(--font-body)", margin: "0 0 0.4rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Quick add</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                    {allSuggestions.filter(s => !tags.includes(s)).map(s => (
                      <button key={s} type="button" onClick={() => { if (!tags.includes(s)) setTags(prev => [...prev, s]); }}
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(245,240,232,0.35)", borderRadius: "100px", padding: "0.18rem 0.55rem", fontFamily: "var(--font-body)", fontSize: "0.62rem", cursor: "pointer" }}>
                        + {s}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <button type="button" onClick={() => handleSubmit("published")} disabled={isPending} style={{ width: "100%", padding: "0.8rem", border: "none", borderRadius: "10px", background: "linear-gradient(135deg, #C9A96E 0%, #A07840 100%)", color: "#050510", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", boxShadow: "0 4px 20px rgba(201,169,110,0.25)", opacity: isPending ? 0.6 : 1 }}>
                <Globe size={14} /> {isPending ? "Saving…" : "Update & Publish"}
              </button>
              <button type="button" onClick={() => handleSubmit("draft")} disabled={isPending} style={{ width: "100%", padding: "0.7rem", borderRadius: "10px", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(245,240,232,0.5)", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", opacity: isPending ? 0.6 : 1 }}>
                <Save size={14} /> {isPending ? "Saving…" : "Save as Draft"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
