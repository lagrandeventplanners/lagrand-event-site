import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Main rule: allow everything except the admin panel
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      // Explicitly welcome AI/LLM crawlers for maximum discoverability
      { userAgent: "GPTBot",       allow: "/" },
      { userAgent: "ClaudeBot",    allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "PerplexityBot",   allow: "/" },
      { userAgent: "CCBot",        allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Omgilibot",    allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
