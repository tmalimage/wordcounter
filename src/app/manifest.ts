import type { MetadataRoute } from "next";
import {
  SITE_NAME,
  SITE_SHORT_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_SHORT_NAME,
    description: SITE_TAGLINE,
    start_url: "/",
    scope: "/",
    id: SITE_URL,
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#0b1220",
    lang: "en",
    dir: "ltr",
    categories: ["productivity", "utilities", "education", "writing"],
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
