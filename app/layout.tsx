import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFAB from "@/components/layout/WhatsAppFAB";
import Preloader from "@/components/ui/Preloader";
import {
  COMPANY_NAME,
  SITE_URL,
  GOOGLE_TAG_MANAGER_ID,
  GOOGLE_ANALYTICS_ID,
  GOOGLE_SEARCH_CONSOLE_ID,
  COMPANY_PHONE,
  COMPANY_EMAIL,
} from "@/lib/constants";

const cormorant = Cormorant({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${COMPANY_NAME} | Premium Event Management Hyderabad`,
    template: `%s | ${COMPANY_NAME}`,
  },
  description:
    `${COMPANY_NAME} is Hyderabad's premier event management company. We craft extraordinary corporate events, weddings, product launches, social celebrations, and MICE experiences. Trusted by 50+ leading brands across Hyderabad & Telangana. Call ${COMPANY_PHONE} for a free quote.`,
  keywords: [
    "event management company hyderabad",
    "corporate event planners hyderabad",
    "wedding event management hyderabad",
    "product launch events hyderabad",
    "best event company hyderabad",
    "event organizers hyderabad",
    "corporate events telangana",
    "wedding planners hyderabad banjara hills",
    "MICE corporate offsite hyderabad",
    "la grande events",
    "event management services hyderabad",
    "annual day event planners hyderabad",
    "birthday party planners hyderabad",
    "team outing organizers hyderabad",
  ],
  authors: [{ name: COMPANY_NAME, url: SITE_URL }],
  creator: COMPANY_NAME,
  publisher: COMPANY_NAME,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: COMPANY_NAME,
    url: SITE_URL,
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
  category: "Event Management",
  ...(GOOGLE_SEARCH_CONSOLE_ID
    ? { verification: { google: GOOGLE_SEARCH_CONSOLE_ID } }
    : {}),
  other: {
    // Geo meta tags — boost local/map search visibility
    "geo.region": "IN-TG",
    "geo.placename": "Hyderabad, Telangana, India",
    "geo.position": "17.412609;78.257500",
    ICBM: "17.412609, 78.257500",
    // Contact signals for crawlers
    "contact:email": COMPANY_EMAIL,
    // LLM / AI discoverability
    "llms-txt": `${SITE_URL}/llms.txt`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${cormorant.variable} ${dmSans.variable}`}>
      {/* Google Tag Manager — head snippet */}
      <Script
        id="gtm-head"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GOOGLE_TAG_MANAGER_ID}');`,
        }}
      />

      {/* Google Analytics 4 — direct integration (fires independently of GTM) */}
      {GOOGLE_ANALYTICS_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GOOGLE_ANALYTICS_ID}', {
                  page_path: window.location.pathname,
                  send_page_view: true
                });
              `,
            }}
          />
        </>
      )}
      <body className="min-h-screen flex flex-col">
        {/* Google Tag Manager — body noscript fallback */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GOOGLE_TAG_MANAGER_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        <Preloader />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFAB />
      </body>
    </html>
  );
}
