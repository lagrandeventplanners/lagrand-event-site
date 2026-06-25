import type { MetadataRoute } from "next";
import { COMPANY_NAME } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: COMPANY_NAME,
    short_name: "La Grandè",
    description:
      "Premium event management company in Hyderabad — corporate events, weddings, product launches & more.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#050510",
    theme_color: "#C9A96E",
    categories: ["business", "lifestyle", "events"],
    lang: "en-IN",
    dir: "ltr",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
