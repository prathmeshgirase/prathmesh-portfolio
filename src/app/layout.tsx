import type { Metadata } from "next";
import { preload } from "react-dom";
import { profile } from "@/data/portfolio";
import "./portfolio.css";
import "./theme.css";

const SITE_URL = "https://prathmeshgirase.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Prathmesh Girase | Software Developer",
  description:
    "Prathmesh Girase is a full-stack software developer specialising in React, React Native, Java, and Spring Boot. Building dependable web and mobile products — from backend APIs to production interfaces.",
  applicationName: "Prathmesh Girase Portfolio",
  authors: [{ name: "Prathmesh Girase", url: SITE_URL }],
  creator: "Prathmesh Girase",
  publisher: "Prathmesh Girase",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: "Prathmesh Girase",
    title: "Prathmesh Girase | Software Developer",
    description:
      "Prathmesh Girase is a full-stack software developer specialising in React, React Native, Java, and Spring Boot. Building dependable web and mobile products — from backend APIs to production interfaces.",
    firstName: "Prathmesh",
    lastName: "Girase",
    username: "prathmeshgirase",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prathmesh Girase | Software Developer",
    description:
      "Prathmesh Girase is a full-stack software developer specialising in React, React Native, Java, and Spring Boot.",
  },
  icons: { icon: "/favicon.svg" },
};

// JSON-LD structured data — ProfilePage → Person
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: SITE_URL,
  name: `${profile.name} — Developer Portfolio`,
  mainEntity: {
    "@type": "Person",
    name: profile.name,
    url: SITE_URL,
    jobTitle: profile.role,
    description: profile.summary,
    sameAs: [profile.github, profile.linkedin],
    knowsAbout: [
      "React",
      "React Native",
      "Java",
      "Spring Boot",
      "Full-Stack Development",
      "REST APIs",
    ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <div aria-hidden="true" className="grain" />
        {children}
      </body>
    </html>
  );
}
