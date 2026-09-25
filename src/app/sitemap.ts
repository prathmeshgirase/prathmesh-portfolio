import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://prathmeshgirase.vercel.app/",
      lastModified: new Date("2026-09-25"),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
