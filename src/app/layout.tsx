import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import {
  SEO_KEYWORDS,
  SITE_AUTHOR,
  SITE_LANGUAGE,
  SITE_LOCALE,
  SITE_NAME,
  SITE_PUBLISHER,
  SITE_TAGLINE,
  SITE_URL,
  TWITTER_HANDLE,
} from "@/lib/constants";
import "./globals.css";

const TITLE =
  "Free Word Counter Online — Count Words, Characters, Reading Time & Keyword Density";
const DESCRIPTION =
  "Free online word counter. Instantly count words, characters, sentences, paragraphs, syllables, reading time, speaking time, keyword density and readability (Flesch, Flesch-Kincaid, Gunning Fog). 100% private — runs in your browser, no signup, no upload.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_AUTHOR, url: SITE_URL }],
  creator: SITE_AUTHOR,
  publisher: SITE_PUBLISHER,
  generator: "Next.js",
  keywords: SEO_KEYWORDS,
  category: "productivity",
  classification: "Writing & Productivity Tool",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-US": SITE_URL,
      "x-default": SITE_URL,
    },
    types: {
      "application/rss+xml": `${SITE_URL}/rss.xml`,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    locale: SITE_LOCALE,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon", type: "image/png", sizes: "32x32" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "default",
  },
  other: {
    "google-adsense-account": "",
    "msapplication-TileColor": "#0b1220",
    "theme-color": "#ffffff",
  },
  verification: {
    // Replace these with real verification tokens when available.
    google: "",
    yandex: "",
    other: {
      "msvalidate.01": "",
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={SITE_LANGUAGE} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://va.vercel-scripts.com" />
        <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('wc_theme');if(t){t=JSON.parse(t);if(t==='dark')document.documentElement.classList.add('dark')}else if(window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.classList.add('dark')}}catch(e){}`,
          }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
