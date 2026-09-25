import type { Metadata } from "next";
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="portfolio-fonts antialiased">
      <head>
        {[
          "0c89a48fa5027cee-s.p.2cyn07wtgehh0.woff2",
          "70bc3e132a0a741e-s.p.3t6q91iet4nsy.woff2",
          "7ebf22b5a21034f8-s.p.3j3877k49yy0l.woff2",
          "83afe278b6a6bb3c-s.p.2bn3s6zvc0dyp.woff2",
          "e41d5df559864f9e-s.p.1g73gv09-xcb6.woff2",
        ].map((font) => (
          <link
            key={font}
            rel="preload"
            href={`/fonts/${font}`}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        ))}
      </head>
      <body>
        <div aria-hidden="true" className="grain" />
        {children}
      </body>
    </html>
  );
}
