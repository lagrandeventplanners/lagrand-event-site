import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getEvents } from "@/lib/events-store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { path: "",           priority: 1.0, changeFrequency: "weekly"  as const },
    { path: "/services",  priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/our-work",  priority: 0.9, changeFrequency: "weekly"  as const },
    { path: "/about",     priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact",   priority: 0.8, changeFrequency: "monthly" as const },
  ];

  const allEvents = await getEvents();
  const publishedEvents = allEvents.filter((e) => e.status === "published");

  const eventPages: MetadataRoute.Sitemap = publishedEvents.map((e) => ({
    url: `${SITE_URL}/our-work/${e.slug}`,
    lastModified: new Date(e.updatedAt ?? e.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages.map(({ path, priority, changeFrequency }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    })),
    ...eventPages,
  ];
}
