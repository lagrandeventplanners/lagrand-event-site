import type { Metadata } from "next";
import { COMPANY_NAME, SITE_URL, COMPANY_EMAIL } from "./constants";

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  authors: [{ name: COMPANY_NAME, url: SITE_URL }],
  creator: COMPANY_NAME,
  publisher: COMPANY_NAME,
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
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: `${COMPANY_NAME} — Premium Event Management Hyderabad`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@lagrandeevents",
    creator: "@lagrandeevents",
    images: ["/images/og-home.jpg"],
  },
  other: {
    "geo.region": "IN-TG",
    "geo.placename": "Hyderabad, Telangana, India",
    "geo.position": "17.412609;78.257500",
    ICBM: "17.412609, 78.257500",
    "contact:email": COMPANY_EMAIL,
    "llms-txt": `${SITE_URL}/llms.txt`,
  },
};
