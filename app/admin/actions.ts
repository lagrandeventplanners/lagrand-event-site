"use server";

import { saveEvent, saveAllEvents, getEvents, deleteEvent, getEventById, EventPost } from "@/lib/events-store";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { redirect } from "next/navigation";

async function uploadFile(file: File, prefix = ""): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext = file.name.split(".").pop() ?? "jpg";
  const filename = `${prefix}${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", "events");
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), buffer);
  return `/uploads/events/${filename}`;
}

export async function upsertEventAction(formData: FormData) {
  const now = new Date().toISOString();
  const id = (formData.get("id") as string) || Date.now().toString();

  // Cover image
  let coverImage = (formData.get("coverImageUrl") as string) || "";
  const coverFile = formData.get("coverImageFile") as File | null;
  if (coverFile && coverFile.size > 0) {
    coverImage = await uploadFile(coverFile, "cover-");
  }

  // Gallery
  const galleryUrlsRaw = (formData.get("galleryUrls") as string) || "";
  const gallery: string[] = galleryUrlsRaw
    .split("\n")
    .map((u) => u.trim())
    .filter(Boolean);
  const galleryFiles = formData.getAll("galleryFiles") as File[];
  for (const f of galleryFiles) {
    if (f.size > 0) {
      gallery.push(await uploadFile(f, "gallery-"));
    }
  }

  // Tags
  const tags = ((formData.get("tags") as string) || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const event: EventPost = {
    id,
    title: (formData.get("title") as string) || "",
    slug: (formData.get("slug") as string) || "",
    eventType: (formData.get("eventType") as string) || "",
    status: ((formData.get("status") as string) || "draft") as "draft" | "published",
    featured: formData.get("featured") === "true",
    date: (formData.get("date") as string) || "",
    location: (formData.get("location") as string) || "",
    guestCount: (formData.get("guestCount") as string) || "",
    clientName: (formData.get("clientName") as string) || "",
    coverImage,
    gallery,
    excerpt: (formData.get("excerpt") as string) || "",
    content: (formData.get("content") as string) || "",
    tags,
    createdAt: (formData.get("createdAt") as string) || now,
    updatedAt: now,
  };

  await saveEvent(event);
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteEventAction(id: string) {
  await deleteEvent(id);
  revalidatePath("/admin");
}

export async function duplicateEventAction(id: string) {
  const events = await getEvents();
  const idx = events.findIndex((e) => e.id === id);
  if (idx < 0) return;
  const src = events[idx];
  const now = new Date().toISOString();
  const copy: EventPost = {
    ...src,
    id: `${Date.now()}`,
    title: `${src.title} (Copy)`,
    slug: `${src.slug}-copy-${Date.now().toString(36)}`,
    status: "draft",
    createdAt: now,
    updatedAt: now,
  };
  events.splice(idx + 1, 0, copy);
  await saveAllEvents(events);
  revalidatePath("/admin");
}

export async function reorderEventAction(id: string, direction: "up" | "down") {
  const events = await getEvents();
  const idx = events.findIndex((e) => e.id === id);
  if (idx < 0) return;
  if (direction === "up" && idx > 0) {
    [events[idx - 1], events[idx]] = [events[idx], events[idx - 1]];
  } else if (direction === "down" && idx < events.length - 1) {
    [events[idx], events[idx + 1]] = [events[idx + 1], events[idx]];
  }
  await saveAllEvents(events);
  revalidatePath("/admin");
}
