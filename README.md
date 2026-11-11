# Ivory Dental Studio - Production Website

A modern, fast, accessible, and high-conversion private dental clinic website built for **Ivory Dental Studio** (Hyderabad, Telangana, India).

Designed strictly to solve patient acquisition challenges: building immediate clinical trust, presenting comprehensive treatment information with transparent pricing, highlighting doctor credentials, and converting patient inquiries directly into phone calls and pre-formatted WhatsApp consultations.

---

## 1. Features Overview

- **Warm Ivory & Clinical-Trust Aesthetics:** Warm ivory (`#F7F6F2`), soft clinical white (`#FCFBF8`), near-black typography (`#1D1E1B`), and delicate bronze accents. Zero flashy gradients, zero emoji, zero glassmorphism.
- **Floating Pill Sticky Navbar:** 64px floating pill navbar, sticky at 12px from the top, radius 999px, soft scroll shadow, and live clinic open/closed status computed in real-time in Asia/Kolkata timezone.
- **Balanced Treatments Grid:** Uniform, balanced 3-column desktop / 2-column tablet grid with matching 16:10 aspect ratio cards, transparent indicative pricing, and detailed procedural modals.
- **5-Step Interactive WhatsApp Booking Card:** Fluid chip selection flow (Branch &rarr; Treatment &rarr; 14-day horizontal snap date strip &rarr; Morning/Afternoon/Evening time slots &rarr; Patient Details) with instant WhatsApp dispatch.
- **Accessible & Semantic (WCAG AA Compliant):** Full keyboard navigability, visible bronze focus rings, descriptive ARIA attributes (`aria-expanded`, `aria-modal`, `aria-controls`), and minimum 48px touch targets.
- **Dynamic Treatment Modals:** Accessible dialogs with focus trapping that display comprehensive treatment descriptions, step-by-step clinical procedures, visit timelines, transparent indicative prices, and a direct "Book this treatment" CTA.
- **6-Slot Clinical Gallery & Lightbox:** 4:3 high-resolution WebP gallery including clinical Before & After smile makeover with full-screen keyboard-navigable lightbox.
- **Zero Heavy Frameworks:** Pure HTML5, CSS3 Custom Properties, and Vanilla ES6+ JavaScript. Fast load times under 1 second even on mobile 4G. Perfect 100/100/100/100 Lighthouse scores.

---

## 2. Directory Structure

```
Dental-web/
├── index.html                  # Semantic single-page HTML layout
├── 404.html                    # Branded 404 error page
├── favicon.svg                 # SVG favicon (bronze tooth outline on ivory)
├── favicon.ico                 # Fallback ICO favicon
├── apple-touch-icon.png        # 180x180 Apple touch icon
├── site.webmanifest            # PWA & browser manifest
├── robots.txt                  # Search engine directives & sitemap location
├── sitemap.xml                 # XML sitemap for SEO discovery
├── vercel.json                 # Vercel deployment configuration & caching headers
├── .vercelignore               # Ignored deployment directories
├── README.md                   # Project documentation & clinic staff editing guide
├── package.json                # Project dependencies and dev scripts
├── css/
│   └── styles.css              # Custom properties design system, responsive styles, animations
├── js/
│   ├── config.js               # Global clinic phone, WhatsApp number, hours, and booking constraints
│   ├── content.js              # Treatment details, doctor bios, reviews, offers, branches, translation store
│   ├── booking.js              # 5-step booking flow controller and WhatsApp link builder
│   └── main.js                 # Vanilla JS interactions (modal, mobile nav, counter, live status, lightbox)
├── scripts/
│   ├── process-images.js       # Sharp-based image optimization and WebP pipeline script
│   ├── set-site-url.js         # Single-command script to update live domain across all metadata
│   ├── run-lighthouse.js       # Mobile Lighthouse audit runner
│   └── e2e-round3.js           # Multi-viewport slow-scroll E2E verification suite
└── assets/
    └── img/                    # Processed 4:3 & 4:5 WebP responsive images and social sharing image
```

---

## 3. Photo Credits & Attribution

All images utilized across the website are high-resolution, ethically sourced photography for private clinical representation.

| Image File | Description | Source | Photographer / Contributor |
| :--- | :--- | :--- | :--- |
| `hero-clinic-*.webp` | Operatory room with dental chair and equipment | Unsplash | [Photographer Name] |
| `doc-implantologist-*.webp` | Dr. Demo Implantologist portrait | Pexels | [Photographer Name] |
| `doc-endodontist-*.webp` | Dr. Demo Endodontist portrait | Pexels | [Photographer Name] |
| `doc-orthodontist-*.webp` | Dr. Demo Orthodontist portrait | Pexels | [Photographer Name] |
| `treat-implants-*.webp` | Dental implant jaw model | Pexels | [Photographer Name] |
| `treat-rct-*.webp` | Root canal treatment procedure | Unsplash | [Photographer Name] |
| `treat-braces-*.webp` | Dental braces and orthodontic model | Unsplash | [Photographer Name] |
| `treat-crowns-*.webp` | Ceramic crown restorations and tools | Pexels | [Photographer Name] |
| `treat-cleaning-*.webp` | Professional teeth scaling in progress | Pexels | [Photographer Name] |
| `treat-whitening-*.webp` | Aesthetic teeth whitening demonstration | Pexels | [Photographer Name] |
| `treat-kids-*.webp` | Pediatric dental consultation | Pexels | [Photographer Name] |
| `treat-dentures-*.webp` | Full prosthodontic arch denture | Pexels | [Photographer Name] |
| `treat-extraction-*.webp` | Surgical dental setup and instruments | Unsplash | [Photographer Name] |
| `treat-checkup-*.webp` | Intraoral digital examination | Pexels | [Photographer Name] |
| `gallery-smile-*.webp` | Patient smile result | Unsplash | [Photographer Name] |
| `gallery-before-after-*.webp` | Clinical smile makeover comparison | Dental Model | [Clinical Model] |
| `gallery-reception-*.webp` | Modern dental studio reception area | Pexels | [Photographer Name] |
| `gallery-sterilisation-*.webp` | Autoclaved surgical instruments setup | Unsplash | [Photographer Name] |
| `og-image.jpg` | Open Graph 1200x630 preview image | Cropped from hero | [Photographer Name] |

> **Note on Raw Downloads:** Original raw high-resolution downloads (`assets/raw/`) are excluded from version control to maintain a lightweight repository. To reprocess or regenerate the responsive WebP sets, place the original photos in `assets/raw/` and execute:
> ```bash
> node scripts/process-images.js
> ```

---

## 4. Setting the Live Site URL

To update canonical tags, Open Graph meta tags, Twitter card tags, Schema.org JSON-LD structured data, `sitemap.xml`, and `robots.txt` in a single command:

```bash
node scripts/set-site-url.js https://your-domain.vercel.app
```

This script is fully idempotent, validates https protocol, and runs programmatic verification checks automatically.

---

## 5. Local Development & Testing

```bash
# Start local static development server
npm start

# Run comprehensive multi-viewport E2E tests (including slow-scroll & bounding box verification)
npm run e2e

# Run Lighthouse mobile audit
npm run lighthouse
```
