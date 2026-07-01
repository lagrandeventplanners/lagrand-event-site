import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "events.json");

export type EventPost = {
  id: string;
  title: string;
  slug: string;
  eventType: string;
  status: "draft" | "published";
  featured: boolean;
  date: string;
  location: string;
  guestCount: string;
  clientName: string;
  coverImage: string;
  gallery: string[];
  excerpt: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export async function getEvents(): Promise<EventPost[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as EventPost[];
  } catch {
    return [];
  }
}

export async function getEventById(id: string): Promise<EventPost | null> {
  const events = await getEvents();
  return events.find((e) => e.id === id) ?? null;
}

export async function getEventBySlug(slug: string): Promise<EventPost | null> {
  const events = await getEvents();
  return events.find((e) => e.slug === slug) ?? null;
}

export async function saveEvent(event: EventPost): Promise<void> {
  const events = await getEvents();
  const idx = events.findIndex((e) => e.id === event.id);
  if (idx >= 0) {
    events[idx] = event;
  } else {
    events.unshift(event);
  }
  await fs.writeFile(DATA_FILE, JSON.stringify(events, null, 2));
}

export async function saveAllEvents(events: EventPost[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(events, null, 2));
}

export async function getAllTags(): Promise<string[]> {
  const events = await getEvents();
  const tagSet = new Set<string>(events.flatMap((e) => e.tags));
  return Array.from(tagSet).sort();
}

export async function deleteEvent(id: string): Promise<void> {
  const events = await getEvents();
  await fs.writeFile(
    DATA_FILE,
    JSON.stringify(
      events.filter((e) => e.id !== id),
      null,
      2
    )
  );
}
