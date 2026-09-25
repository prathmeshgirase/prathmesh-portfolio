import type { Metadata } from "next";
import { preload } from "react-dom";
import { profile } from "@/data/portfolio";
import "./portfolio.css";
import "./theme.css";

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.summary,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.summary,
    type: "website",
  },
};

const PRELOAD_FONTS = [
  "0c89a48fa5027cee-s.p.2cyn07wtgehh0.woff2",
  "70bc3e132a0a741e-s.p.3t6q91iet4nsy.woff2",
  "7ebf22b5a21034f8-s.p.3j3877k49yy0l.woff2",
  "83afe278b6a6bb3c-s.p.2bn3s6zvc0dyp.woff2",
] as const;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  PRELOAD_FONTS.forEach((font) => {
    preload(`/fonts/${font}`, {
      as: "font",
      type: "font/woff2",
      crossOrigin: "anonymous",
    });
  });

  return (
    <html lang="en" className="portfolio-fonts antialiased">
      <body>
        <div aria-hidden="true" className="grain" />
        {children}
      </body>
    </html>
  );
}
