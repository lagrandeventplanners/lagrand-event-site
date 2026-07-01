"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import {
  Image as ImageIcon, Images, Tag, Calendar, MapPin, Users, Building2,
  Globe, Star, Plus, X, Upload, Save, Eye, EyeOff, ChevronDown,
  Sparkles, Bold, Italic, List, Heading2, Quote, Minus,
} from "lucide-react";
import { upsertEventAction } from "../../actions";

const EVENT_TYPES = [
  "Corporate Events", "Weddings & Sangeet", "Product Launches",
  "Social Celebrations", "MICE & Offsites", "Entertainment & Décor",
];

const DEFAULT_SUGGESTIONS = [
  "Hyderabad", "Premium", "Outdoor", "Indoor", "Luxury", "400+ Guests",
  "Theme Event", "Gala", "Corporate", "Destination",
];

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function insertMarkdown(
  ref: React.RefObject<HTMLTextAreaElement | null>,
  before: string,
  after = "",
  placeholder = "text"
) {
  const el = ref.current;
  if (!el) return;
  const start = el.selectionStart;
  const end = el.selectionEnd;
  const selected = el.value.slice(start, end) || placeholder;
  const newVal =
    el.value.slice(0, start) + before + selected + after + el.value.slice(end);
  el.value = newVal;
  el.focus();
  el.setSelectionRange(start + before.length, start + before.length + selected.length);
  el.dispatchEvent(new Event("input", { bubbles: true }));
}

export default function NewEventForm({ suggestedTags }: { suggestedTags: string[] }) {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [coverPreview, setCoverPreview] = useState("");
  const [coverUrlInput, setCoverUrlInput] = useState("");
  const [galleryPreviews, setGalleryPreviews] = useState<{ url: string; name: string }[]>([]);
  const [galleryUrlInput, setGalleryUrlInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [featured, setFeatured] = useState(false);
  const [eventType, setEventType] = useState("");
  const [typeOpen, setTypeOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [content, setContent] = useState("");
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  // Merge default suggestions with dynamic tags from existing events
  const allSuggestions = [...new Set([...DEFAULT_SUGGESTIONS, ...suggestedTags])].sort();

  function handleCoverFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setCoverPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
    setCoverUrlInput("");
  }

  function handleGalleryFiles(e: React.ChangeEvent<HTMLInputElement>) {
    Array.from(e.target.files || []).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) =>
        setGalleryPreviews((p) => [...p, { url: ev.target?.result as string, name: file.name }]);
      reader.readAsDataURL(file);
    });
  }

  function addTag(val?: string) {
    const t = (val ?? tagInput).trim();
    if (t && !tags.includes(t)) setTags((p) => [...p, t]);
    if (!val) setTagInput("");
  }

  function handleSubmit(submitStatus: "draft" | "published") {
    if (!formRef.current) return;
    startTransition(async () => {
      const fd = new FormData(formRef.current!);
      fd.set("status", submitStatus);
      fd.set("featured", String(featured));
      fd.set("tags", tags.join(","));
      fd.set("slug", slug);
      fd.set("galleryUrls", galleryPreviews.filter(p => p.url.startsWith("http")).map(p => p.url).join("\n"));
      await upsertEventAction(fd);
    });
  }

  const input: React.CSSProperties = {
    width: "100%", background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.09)", borderRadius: "10px",
    color: "#F5F0E8", padding: "0.75rem 1rem",
    fontFamily: "var(--font-body)", fontSize: "0.875rem",
    outline: "none", boxSizing: "border-box",
  };

  const lbl: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: "0.4rem",
    fontFamily: "var(--font-body)", fontSize: "0.6rem", fontWeight: 700,
    color: "rgba(245,240,232,0.35)", letterSpacing: "0.18em",
    textTransform: "uppercase", marginBottom: "0.5rem",
  };

  const card: React.CSSProperties = {
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "16px", padding: "1.5rem",
    marginBottom: "1.25rem",
  };

  const toolbarBtn = (title: string, onClick: () => void, icon: React.ReactNode) => (
    <button type="button" title={title} onClick={onClick}
      style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(245,240,232,0.5)", padding: "0.35rem 0.5rem", borderRadius: "6px", display: "flex", alignItems: "center" }}>
      {icon}
    </button>
  );

  const coverSrc = coverPreview || coverUrlInput;

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto" }}>

      {/* TOP BAR */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem", gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "#F5F0E8", margin: 0, fontWeight: 400, letterSpacing: "-0.02em" }}>
            New Event Post
          </h1>
          <p style={{ color: "rgba(245,240,232,0.3)", fontSize: "0.72rem", margin: "0.3rem 0 0", fontFamily: "var(--font-body)" }}>
            Fill in the details · images · content · tags, then publish or save as draft.
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.6rem", flexShrink: 0 }}>
          <button type="button" onClick={() => handleSubmit("draft")} disabled={isPending}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(245,240,232,0.75)", padding: "0.6rem 1.25rem", borderRadius: "10px", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 600, opacity: isPending ? 0.5 : 1 }}>
            <Save size={13} /> {isPending ? "Saving…" : "Save Draft"}
          </button>
          <button type="button" onClick={() => handleSubmit("published")} disabled={isPending}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", background: "linear-gradient(135deg,#C9A96E,#A07840)", color: "#050510", padding: "0.6rem 1.35rem", borderRadius: "10px", cursor: "pointer", border: "none", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 700, boxShadow: "0 4px 18px rgba(201,169,110,0.28)", opacity: isPending ? 0.5 : 1 }}>
            <Globe size={13} /> {isPending ? "Publishing…" : "Publish"}
          </button>
        </div>
      </div>

      <form ref={formRef} encType="multipart/form-data">
        <input type="hidden" name="createdAt" value={new Date().toISOString()} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "1.25rem", alignItems: "start" }}>

          {/* LEFT COLUMN */}
          <div>

            {/* TITLE + SLUG */}
            <div style={{ ...card, padding: "1.5rem 1.75rem" }}>
              <textarea name="title" value={title}
                onChange={(e) => { setTitle(e.target.value); if (!slugEdited) setSlug(slugify(e.target.value)); }}
                placeholder="Event title…"
                rows={2}
                required
                style={{ ...input, background: "transparent", border: "none", fontSize: "1.85rem", fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "-0.025em", resize: "none", lineHeight: 1.25, padding: 0, borderRadius: 0, color: "#F5F0E8" }}
              />
              <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "1rem 0 0.9rem" }} />
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ ...lbl, margin: 0, flexShrink: 0 }}>Slug</span>
                <input name="slug" value={slug}
                  onChange={(e) => { setSlug(e.target.value); setSlugEdited(true); }}
                  placeholder="auto-from-title"
                  style={{ ...input, fontSize: "0.78rem", padding: "0.35rem 0.7rem", color: "rgba(245,240,232,0.4)", fontFamily: "monospace", flex: 1 }}
                />
                <button type="button" onClick={() => { setSlug(slugify(title)); setSlugEdited(false); }}
                  title="Regenerate slug"
                  style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.25)", color: "#C9A96E", padding: "0.35rem 0.6rem", borderRadius: "8px", cursor: "pointer", flexShrink: 0, display: "flex" }}>
                  <Sparkles size={13} />
                </button>
              </div>
            </div>

            {/* EXCERPT */}
            <div style={card}>
              <label style={lbl}>Excerpt</label>
              <textarea name="excerpt" placeholder="One-liner that appears in listings and link previews…" rows={2}
                style={{ ...input, resize: "vertical" }} />
            </div>

            {/* CONTENT EDITOR */}
            <div style={card}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <label style={{ ...lbl, margin: 0 }}>Content</label>
                <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                  {(["write", "preview"] as const).map(t => (
                    <button key={t} type="button" onClick={() => setActiveTab(t)}
                      style={{ padding: "0.25rem 0.75rem", borderRadius: "6px", border: "none", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", background: activeTab === t ? "rgba(201,169,110,0.15)" : "transparent", color: activeTab === t ? "#C9A96E" : "rgba(245,240,232,0.3)" }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {activeTab === "write" && (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.15rem", padding: "0.4rem 0.6rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                    {toolbarBtn("Bold", () => insertMarkdown(contentRef, "**", "**", "bold text"), <Bold size={13} />)}
                    {toolbarBtn("Italic", () => insertMarkdown(contentRef, "*", "*", "italic text"), <Italic size={13} />)}
                    <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.1)", margin: "0 0.25rem" }} />
                    {toolbarBtn("Heading", () => insertMarkdown(contentRef, "\n## ", "", "Section Heading"), <Heading2 size={13} />)}
                    {toolbarBtn("Quote", () => insertMarkdown(contentRef, "\n> ", "", "quote"), <Quote size={13} />)}
                    {toolbarBtn("List item", () => insertMarkdown(contentRef, "\n- ", "", "item"), <List size={13} />)}
                    {toolbarBtn("Divider", () => insertMarkdown(contentRef, "\n\n---\n\n", ""), <Minus size={13} />)}
                    <div style={{ marginLeft: "auto", fontSize: "0.6rem", color: "rgba(245,240,232,0.2)", fontFamily: "var(--font-body)" }}>
                      Markdown supported
                    </div>
                  </div>
                  <textarea
                    ref={contentRef}
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={`## About the Event\n\nDescribe what made this event special…\n\n## The Setup\n\nHow the venue, decor, and flow came together.\n\n## Highlights\n\n- Guest count\n- Key moments\n- Client quote\n\n---\n\n> "The team delivered beyond our expectations." — Client name`}
                    rows={20}
                    style={{ ...input, resize: "vertical", lineHeight: 1.8, fontFamily: "monospace", fontSize: "0.83rem" }}
                  />
                </>
              )}

              {activeTab === "preview" && (
                <div style={{ minHeight: "300px", padding: "1rem", background: "rgba(0,0,0,0.15)", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.06)" }}>
                  {content ? (
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "rgba(245,240,232,0.8)", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
                      {content}
                    </div>
                  ) : (
                    <p style={{ color: "rgba(245,240,232,0.2)", fontFamily: "var(--font-body)", fontSize: "0.8rem", textAlign: "center", marginTop: "4rem" }}>
                      Nothing to preview yet.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* EVENT DETAILS */}
            <div style={card}>
              <p style={{ ...lbl, marginBottom: "1.25rem" }}>
                <Calendar size={12} /> Event Details
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={lbl}><Calendar size={10} /> Date</label>
                  <input name="date" type="date" style={input} />
                </div>
                <div>
                  <label style={lbl}><MapPin size={10} /> Location</label>
                  <input name="location" type="text" placeholder="e.g. Jubilee Hills, Hyderabad" style={input} />
                </div>
                <div>
                  <label style={lbl}><Users size={10} /> Guest Count</label>
                  <input name="guestCount" type="text" placeholder="e.g. 250" style={input} />
                </div>
                <div>
                  <label style={lbl}><Building2 size={10} /> Client / Brand</label>
                  <input name="clientName" type="text" placeholder="e.g. TechCorp India" style={input} />
                </div>
              </div>
            </div>

            {/* COVER IMAGE */}
            <div style={card}>
              <p style={lbl}><ImageIcon size={12} /> Cover Image</p>
              <label htmlFor="coverImageFile" style={{
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                border: `2px dashed ${coverSrc ? "rgba(201,169,110,0.4)" : "rgba(255,255,255,0.1)"}`,
                borderRadius: "12px", overflow: "hidden", cursor: "pointer",
                position: "relative", minHeight: "220px", transition: "border-color 0.2s",
              }}>
                {coverSrc ? (
                  <>
                    <Image src={coverSrc} alt="Cover preview" fill style={{ objectFit: "cover" }} sizes="800px" unoptimized={coverSrc.startsWith("data:")} />
                    <div style={{ position: "absolute", inset: 0, background: "rgba(5,5,16,0.55)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                      onMouseLeave={e => (e.currentTarget.style.opacity = "0")}>
                      <Upload size={22} color="#C9A96E" />
                      <span style={{ color: "#C9A96E", fontSize: "0.75rem", fontFamily: "var(--font-body)", marginTop: "0.4rem" }}>Change image</span>
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
                    <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                      <Upload size={22} color="rgba(201,169,110,0.6)" />
                    </div>
                    <p style={{ color: "rgba(245,240,232,0.55)", fontFamily: "var(--font-body)", fontSize: "0.85rem", margin: "0 0 0.3rem", fontWeight: 500 }}>
                      Click to upload cover image
                    </p>
                    <p style={{ color: "rgba(245,240,232,0.25)", fontFamily: "var(--font-body)", fontSize: "0.7rem", margin: 0 }}>
                      PNG, JPG, WEBP · Max 20MB · Recommended 1200×800
                    </p>
                  </div>
                )}
              </label>
              <input id="coverImageFile" type="file" name="coverImageFile" accept="image/*" onChange={handleCoverFile}
                style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }} />
              <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <span style={{ color: "rgba(245,240,232,0.25)", fontSize: "0.68rem", fontFamily: "var(--font-body)", flexShrink: 0 }}>or URL</span>
                <input type="text" name="coverImageUrl" value={coverUrlInput}
                  onChange={(e) => { setCoverUrlInput(e.target.value); if (e.target.value) setCoverPreview(""); }}
                  placeholder="https://…"
                  style={{ ...input, padding: "0.5rem 0.75rem", fontSize: "0.8rem" }} />
              </div>
            </div>

            {/* GALLERY */}
            <div style={card}>
              <p style={lbl}><Images size={12} /> Gallery</p>

              {galleryPreviews.length > 0 ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "0.75rem", marginBottom: "1rem" }}>
                  {galleryPreviews.map((p, i) => (
                    <div key={i} style={{ position: "relative", aspectRatio: "4/3", borderRadius: "10px", overflow: "hidden", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <Image src={p.url} alt={`Gallery ${i + 1}`} fill style={{ objectFit: "cover" }} sizes="160px" unoptimized={p.url.startsWith("data:")} />
                      <button type="button" onClick={() => setGalleryPreviews(prev => prev.filter((_, j) => j !== i))}
                        style={{ position: "absolute", top: 5, right: 5, width: 22, height: 22, borderRadius: "50%", border: "none", cursor: "pointer", background: "rgba(5,5,16,0.85)", color: "#F5F0E8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <X size={11} />
                      </button>
                    </div>
                  ))}
                  <label htmlFor="galleryFiles" style={{ aspectRatio: "4/3", borderRadius: "10px", border: "2px dashed rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", gap: "0.35rem" }}>
                    <Plus size={18} color="rgba(245,240,232,0.25)" />
                    <span style={{ fontSize: "0.62rem", color: "rgba(245,240,232,0.25)", fontFamily: "var(--font-body)" }}>Add more</span>
                  </label>
                </div>
              ) : (
                <label htmlFor="galleryFiles" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "2px dashed rgba(255,255,255,0.08)", borderRadius: "12px", padding: "2rem", textAlign: "center", cursor: "pointer", marginBottom: "1rem" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.75rem" }}>
                    <Images size={20} color="rgba(245,240,232,0.2)" />
                  </div>
                  <p style={{ color: "rgba(245,240,232,0.35)", fontFamily: "var(--font-body)", fontSize: "0.82rem", margin: "0 0 0.2rem", fontWeight: 500 }}>Upload gallery images</p>
                  <p style={{ color: "rgba(245,240,232,0.2)", fontFamily: "var(--font-body)", fontSize: "0.68rem", margin: 0 }}>Select multiple files at once</p>
                </label>
              )}

              <input id="galleryFiles" type="file" name="galleryFiles" accept="image/*" multiple onChange={handleGalleryFiles}
                style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }} />

              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <span style={{ color: "rgba(245,240,232,0.25)", fontSize: "0.68rem", fontFamily: "var(--font-body)", flexShrink: 0 }}>Add URL</span>
                <input type="text" value={galleryUrlInput} onChange={(e) => setGalleryUrlInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); const u = galleryUrlInput.trim(); if (u) { setGalleryPreviews(p => [...p, { url: u, name: u }]); setGalleryUrlInput(""); } } }}
                  placeholder="https://… (press Enter)"
                  style={{ ...input, padding: "0.5rem 0.75rem", fontSize: "0.8rem" }} />
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div style={{ position: "sticky", top: "76px", display: "flex", flexDirection: "column", gap: "1rem" }}>

            {/* STATUS */}
            <div style={card}>
              <p style={{ ...lbl, marginBottom: "1rem" }}>Publish Settings</p>

              <label style={lbl}>Status</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "1rem" }}>
                {(["draft", "published"] as const).map((s) => (
                  <button key={s} type="button" onClick={() => setStatus(s)}
                    style={{ padding: "0.55rem", borderRadius: "8px", cursor: "pointer", border: "1px solid", borderColor: status === s ? "rgba(201,169,110,0.5)" : "rgba(255,255,255,0.07)", background: status === s ? "rgba(201,169,110,0.1)" : "rgba(255,255,255,0.02)", color: status === s ? "#C9A96E" : "rgba(245,240,232,0.35)", fontFamily: "var(--font-body)", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.3rem" }}>
                    {s === "published" ? <Eye size={11} /> : <EyeOff size={11} />} {s}
                  </button>
                ))}
              </div>

              <label style={lbl}><Star size={10} /> Featured</label>
              <button type="button" onClick={() => setFeatured(!featured)}
                style={{ width: "100%", padding: "0.55rem", borderRadius: "8px", cursor: "pointer", border: `1px solid ${featured ? "rgba(201,169,110,0.5)" : "rgba(255,255,255,0.07)"}`, background: featured ? "rgba(201,169,110,0.1)" : "rgba(255,255,255,0.02)", color: featured ? "#C9A96E" : "rgba(245,240,232,0.35)", fontFamily: "var(--font-body)", fontSize: "0.68rem", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", marginBottom: "1rem" }}>
                <Star size={11} fill={featured ? "#C9A96E" : "none"} /> {featured ? "Featured ✓" : "Mark as Featured"}
              </button>

              <label style={lbl}><ChevronDown size={10} /> Event Type</label>
              <div style={{ position: "relative" }}>
                <input type="hidden" name="eventType" value={eventType} />
                <button
                  type="button"
                  onClick={() => setTypeOpen(!typeOpen)}
                  style={{ ...input, width: "100%", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}
                >
                  <span style={{ color: eventType ? "rgba(245,240,232,0.85)" : "rgba(245,240,232,0.3)" }}>
                    {eventType || "Select type…"}
                  </span>
                  <ChevronDown size={13} style={{ color: "rgba(245,240,232,0.3)", flexShrink: 0, transition: "transform 0.2s", transform: typeOpen ? "rotate(180deg)" : "none" }} />
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

            {/* TAGS */}
            <div style={card}>
              <label style={{ ...lbl, marginBottom: "0.75rem" }}><Tag size={11} /> Tags</label>

              {tags.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "0.75rem" }}>
                  {tags.map(t => (
                    <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.22)", color: "#C9A96E", borderRadius: "100px", padding: "0.22rem 0.6rem", fontFamily: "var(--font-body)", fontSize: "0.68rem", fontWeight: 500 }}>
                      {t}
                      <button type="button" onClick={() => setTags(p => p.filter(x => x !== t))} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(201,169,110,0.55)", padding: 0, display: "flex", alignItems: "center" }}>
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.75rem" }}>
                <input type="text" value={tagInput} onChange={e => setTagInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(); } }}
                  placeholder="Type tag + Enter"
                  style={{ ...input, padding: "0.5rem 0.7rem", fontSize: "0.78rem", flex: 1 }} />
                <button type="button" onClick={() => addTag()}
                  style={{ background: "rgba(201,169,110,0.12)", border: "1px solid rgba(201,169,110,0.25)", color: "#C9A96E", padding: "0.5rem 0.7rem", borderRadius: "8px", cursor: "pointer", flexShrink: 0, display: "flex" }}>
                  <Plus size={14} />
                </button>
              </div>

              {allSuggestions.filter(s => !tags.includes(s)).length > 0 && (
                <>
                  <p style={{ fontSize: "0.6rem", color: "rgba(245,240,232,0.2)", fontFamily: "var(--font-body)", margin: "0 0 0.4rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Quick add</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                    {allSuggestions.filter(s => !tags.includes(s)).map(s => (
                      <button key={s} type="button" onClick={() => addTag(s)}
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(245,240,232,0.35)", borderRadius: "100px", padding: "0.18rem 0.55rem", fontFamily: "var(--font-body)", fontSize: "0.62rem", cursor: "pointer" }}>
                        + {s}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* LIVE SUMMARY */}
            <div style={{ ...card, background: "rgba(201,169,110,0.04)", borderColor: "rgba(201,169,110,0.14)" }}>
              <p style={{ ...lbl, color: "rgba(201,169,110,0.5)", marginBottom: "0.9rem" }}>Summary</p>
              {[
                ["Title", title || "—"],
                ["Slug", slug || "—"],
                ["Status", status],
                ["Featured", featured ? "Yes" : "No"],
                ["Tags", tags.length ? `${tags.length} tag${tags.length > 1 ? "s" : ""}` : "None"],
                ["Cover", coverSrc ? "Set ✓" : "Not set"],
                ["Gallery", galleryPreviews.length ? `${galleryPreviews.length} image${galleryPreviews.length > 1 ? "s" : ""}` : "None"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.68rem", color: "rgba(245,240,232,0.28)", fontFamily: "var(--font-body)", flexShrink: 0 }}>{k}</span>
                  <span style={{ fontSize: "0.68rem", color: v === "—" || v === "None" || v === "Not set" ? "rgba(245,240,232,0.2)" : "rgba(245,240,232,0.65)", fontFamily: "var(--font-body)", fontWeight: 500, maxWidth: "140px", textAlign: "right", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v}</span>
                </div>
              ))}
            </div>

            {/* BOTTOM ACTIONS */}
            <button type="button" onClick={() => handleSubmit("published")} disabled={isPending}
              style={{ width: "100%", padding: "0.85rem", border: "none", borderRadius: "12px", background: "linear-gradient(135deg,#C9A96E,#A07840)", color: "#050510", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", boxShadow: "0 6px 22px rgba(201,169,110,0.25)", opacity: isPending ? 0.5 : 1 }}>
              <Globe size={14} /> {isPending ? "Publishing…" : "Publish Event"}
            </button>
            <button type="button" onClick={() => handleSubmit("draft")} disabled={isPending}
              style={{ width: "100%", padding: "0.7rem", borderRadius: "12px", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(245,240,232,0.45)", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.72rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", opacity: isPending ? 0.5 : 1 }}>
              <Save size={13} /> {isPending ? "Saving…" : "Save as Draft"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
