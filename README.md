# Mujtaba Khalid — cinematic portfolio

A complete React, Vite and TypeScript portfolio for **Mujtaba Khalid Alnaje Mohammed**, positioned as a **Software Engineer & Full-Stack Developer**.

## Run locally

Use Node.js **22.12 or newer** (Node 24 was used for the build).

```bash
npm install
npm run dev
```

Open the local URL printed in your terminal. The default port is `4173`.

```bash
npm run build
npm run preview
```

The production site is generated in `dist/`. Deploy that folder to a static host. `base: './'` supports a domain root or a subfolder such as GitHub Pages `/portfolio/`.

For a reproducible install using the included lockfile, use `npm ci`. `npm run check` checks the strict TypeScript project.

## Editing content

| What | File |
| --- | --- |
| Name, email, social links, services, skills, project presentation | `src/data/portfolio.ts` |
| All 14 project records copied from the original portfolio | `src/data/source-projects.json` |
| Global colors, layout, type and responsive rules | `src/styles/global.css` |
| Hero portrait, pointer interaction and fallbacks | `src/sections/Hero.tsx` |
| Three.js scene and adaptive quality | `src/three/HeroScene.tsx` |
| Portrait eye tracking and atmospheric shaders | `src/shaders/` |
| Lenis / GSAP / ScrollTrigger synchronization | `src/hooks/useMotion.ts` |
| SEO, canonical URL, social metadata and Person structured data | `index.html` |
| Search engine discovery | `public/robots.txt`, `public/sitemap.xml` |

Update the canonical URL, Open Graph / X image URLs, structured data, robots and sitemap together if you deploy under a different address. The current values use your existing portfolio URL, rather than inventing a new domain.

## Local assets

- `public/assets/character/mujtaba-anime.webp`: optimized transparent anime portrait, generated using your actual original photo as the identity reference.
- `public/assets/character/mujtaba-anime-source.png`: full resolution source artwork.
- `public/assets/profile/`: your original photo and an optimized reference copy.
- `public/assets/projects/`: actual screenshots of all 16 linked projects; no fabricated project mockups.
- `public/assets/documents/Mujtaba_Khalid_CV.pdf`: your newly supplied `CV-Mujtaba_Mohammed.pdf`, bundled without any content changes under a consistent download filename.

Fonts are installed with `@fontsource` and bundled locally. The portfolio makes no requests to a font CDN or a temporary generated-image URL.

## What works

- Responsive desktop, laptop, tablet and phone compositions.
- A generated portrait with subtle head/camera parallax and localized GLSL eye tracking on capable desktop devices.
- A lightweight portrait fallback for touch devices, data-saving connections, low-end devices and missing WebGL, including damped eye / face tracking on desktop without WebGL.
- Lazy 3D loading, capped/adaptive DPR, visibility-based rendering and resource cleanup.
- One synchronized GSAP clock for Lenis and ScrollTrigger. Native touch scrolling is retained.
- Reduced-motion support, a skip link, visible focus, keyboard-operable technology tabs and a native project dialog with focus trapping / Escape dismissal.
- Featured work, all 16 project records, category filters, expanded project details and verified original links.
- A local working CV download and your original GitHub, LinkedIn, WhatsApp and email contacts.

## Contact form

The original portfolio used direct email rather than an authenticated mail API. This build preserves that method: the validated form first prepares a visible message draft, then offers an explicit `mailto:` link to open the visitor's email app. **The visitor sends the email there.** It never claims a message was sent automatically. A copy-draft fallback is provided if the visitor has no email app configured. Preparing a draft itself requires no external service and never navigates away from the portfolio. No API keys, secret environment files or paid services are required.

## Content provenance

The original portfolio is the primary source:
`https://mujtaba-k-mohammed.github.io/portfolio/`.

The rebuild retains its 14 projects and adds the Royal Solar and Fikra links supplied in the accompanying project context and verified as accessible. Royal Solar and Fikra are presented as **client previews**, without claiming final client approval.

Two original "Code" links pointed to your GitHub profile rather than to a specific repository. Those URLs are preserved and labeled **GitHub profile**. The original portfolio's `Task App` URL currently opens **ProductHub**; its name is retained and the current public interface is described accurately. Its original description is still preserved in `source-projects.json`.

The final CV is the new `CV-Mujtaba_Mohammed.pdf` supplied during this rebuild. Its bytes are preserved exactly in `public/assets/documents/Mujtaba_Khalid_CV.pdf`. All CV download buttons use this new file.

No years of experience, employers, testimonials, awards, client counts or skill percentages were added. The skills explicitly supplied in the brief are included; the 3D/motion tools are identified as the technologies powering this portfolio.

See `VALIDATION.md` for the completed build and browser checks.

## Artwork brief

Built-in image generation was used with the original photo as an identity reference. The final rendering brief: mature semi-realistic modern anime, recognizable facial structure / skin tone / hair / facial hair, frontal visible eyes, charcoal smart-casual engineer outfit, restrained blue and violet rim lighting, clear anime linework and cel shading, transparent background. The delivered WebP and source PNG are local project assets.

Eye centers are measured against the final 1024 × 1536 artwork. If you replace the character, update the two UV centers in `src/shaders/portrait.ts` and the CSS eye masks in `src/styles/global.css` to match the new eye positions.
