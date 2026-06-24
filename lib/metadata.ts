import type { Metadata } from "next";
import { COMPANY_NAME, SITE_URL } from "./constants";

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  authors: [{ name: COMPANY_NAME }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: COMPANY_NAME,
  },
  twitter: {
    card: "summary_large_image",
    site: "@lagrandeevents",
  },
};
