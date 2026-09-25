# Prathmesh Girase — Portfolio

A modern personal developer portfolio built with Next.js, React, TypeScript, Tailwind CSS, Motion, and Lenis.

## Features

- **Responsive Layout:** Designed for desktop, tablet, and mobile viewports with clean typography and spacing.
- **Animated Hero Section:** Dynamic word-stagger typography, pointer-reactive floating metric cards, and smooth scroll cues.
- **Project Showcase:** Highlights full-stack applications with metrics, architecture breakdowns, technology badges, and live links.
- **Experience Section:** Detailed timeline of industry engineering internship experience, responsibilities, and technical stack.
- **Proof & Recognition:** Evidence cards, academic milestones, and comprehensive technical foundation summaries.
- **Contact Section:** Direct contact points via email, GitHub, LinkedIn, and downloadable résumé.
- **Smooth Scrolling & Motion:** Physics-based inertial scrolling with Lenis and micro-interactions powered by Motion.
- **Accessibility & Reduced Motion:** Full support for `prefers-reduced-motion` across animations and scrolling; semantic HTML and keyboard accessible controls.
- **Responsive Navigation:** Accessible mobile menu with focus management and desktop navbar.
- **Single Source of Truth:** Clean, centralized portfolio data structure in `src/data/portfolio.ts`.

## Tech Stack

- **Framework:** Next.js (App Router, Turbopack, Static Export)
- **UI Library:** React
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS & Custom CSS
- **Animations:** Motion (`motion/react`)
- **Smooth Scroll:** Lenis
- **Code Quality:** ESLint (`@next/eslint-plugin-next`, TypeScript ESLint)

## Project Structure

```text
prathmesh-portfolio/
├── public/                     # Static assets, fonts, and downloadable résumé
│   ├── fonts/                  # Self-hosted web fonts and font licenses
│   ├── favicon.svg             # Portfolio favicon
│   └── Prathmesh_Girase_Resume.pdf
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with font preloading and metadata
│   │   ├── page.tsx            # Main portfolio page entry
│   │   ├── portfolio.css       # Core typography, utilities, and animations
│   │   └── theme.css           # Theme and card styling
│   ├── components/
│   │   ├── portfolio.tsx       # Root portfolio composition
│   │   └── sections/           # Modular section components
│   │       ├── choreography.tsx# Motion variants and timing configurations
│   │       ├── contact.tsx     # Contact section and footer
│   │       ├── experience.tsx  # Work experience timeline
│   │       ├── header.tsx      # Navigation header with mobile menu
│   │       ├── hero.tsx        # Hero section with interactive cards
│   │       ├── motion-root.tsx # Lenis smooth scroll and Motion configuration
│   │       ├── ornament.tsx    # Decorative SVG geometries
│   │       ├── recognition.tsx # Achievements and education
│   │       └── work.tsx        # Featured projects showcase
│   └── data/
│       └── portfolio.ts        # Single source of truth for all content & types
├── eslint.config.mjs           # ESLint flat configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Project dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

## Development

Use Node.js 22 LTS:

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Code Quality

Run type checking:

```sh
npm run typecheck
```

Run ESLint:

```sh
npm run lint
```

## Production Build

To build the static site:

```sh
npm run build
```

This compiles an optimized static export into the `out/` directory.

To preview the production build locally:

```sh
npx serve@latest out
```

`npm run build` generates the static site in the `out/` directory, and this command can be used to preview that output locally.

## Deployment

- The site is a static-export Next.js application.
- Vercel is the primary deployment target.
- Deployment should be performed through the GitHub repository connected to Vercel.
- No environment variables, backend, or database are currently required.

## Licenses & Third-Party Notices

- Self-hosted web fonts (Space Grotesk, Instrument Serif, JetBrains Mono, Inter) are used in accordance with their respective open-source licenses located in [`public/fonts/licenses/`](./public/fonts/licenses/).
- All third-party open-source libraries are used under their respective MIT/Apache licenses.
