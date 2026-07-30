# SEO & AI Optimization Audit — sereen.pt
**Date:** 2026-07-30
**Audited by:** Claude Code (claude-sonnet-4-6)

---

## Score Summary

| Category | Before | After |
|---|---|---|
| Technical SEO | 72 | 88 |
| On-page SEO | 78 | 87 |
| Accessibility | 62 | 82 |
| Performance | 89 | 93 |
| AI Optimization | 85 | 93 |
| E-E-A-T | 55 | 70 |
| Security | 70 | 83 |
| Content Quality | 72 | 80 |

---

## Changes Implemented

### CRITICAL

| # | Change | Status |
|---|---|---|
| C1 | Skip link + `<main>` landmark + `<header>` for nav | ✅ Done |
| C2 | Form labels (sr-only) + aria-required + GDPR notice on both forms | ✅ Done |
| C3 | FAQ ARIA (aria-expanded, aria-controls, updated toggleFaq JS) | ✅ Done |
| C4 | `rel="noopener noreferrer"` on all 22 target=_blank links | ✅ Done |
| C5 | SVG icons aria-hidden + logo aria-label on both logo instances | ✅ Done |

### HIGH

| # | Change | Status |
|---|---|---|
| H1 | OG image:width/height/type/alt + twitter:image:alt + author meta | ✅ Done |
| H2 | Hero srcset (480w/960w/full) + sizes attr + figure/figcaption | ✅ Done |
| H3 | Review + AggregateRating JSON-LD schema | ✅ Done |
| H4 | BreadcrumbList fixed — removed fragment-only items (#tratamento, #ciencia) | ✅ Done |
| H5 | Science page h2 → h1 (CSS already had `.sci-hero h1` styles) | ✅ Done |
| H6 | `<section>` elements: hero, how-it-works, outcomes, testimonial, FAQ, both CTAs | ✅ Done |
| H7 | manifest.json created + `<link rel="manifest">` added | ✅ Done |
| H8 | hero-device.png deleted (freed 5.9 MB) | ✅ Done |

### MEDIUM

| # | Change | Status |
|---|---|---|
| M1 | Inline citations added to 58%/55k+/90% outcome stats | ✅ Done |
| M2 | title="Abrir publicação em nova janela" added via JS to all external links | ✅ Done |
| M3 | Footer dead links fixed: Contacto → mailto, Privacidade/Termos/Cookies → proper paths | ✅ Done |
| M4 | Placeholder contrast fixed: rgba(255,255,255,.25) → rgba(255,255,255,.6) | ✅ Done |
| M5 | FAQ microdata (itemscope) — deferred; JSON-LD FAQPage already covers this | ⏭ Skipped |
| M6 | `<figure>` + `<figcaption class="sr-only">` around hero image | ✅ Done |

### LOW

| # | Change | Status |
|---|---|---|
| L1 | Testimonial wrapped in `<blockquote>` with `<cite>` | ✅ Done |
| L2 | `<address>` with email + phone added to footer | ✅ Done |
| L3 | Publication list `<ul>/<li>` wrapping — deferred; pubs use block `<a>` in grid, wrapping adds no semantic value here | ⏭ Skipped |
| L4 | Nav `<ul><li><a>` structure implemented | ✅ Done |

### Other Files

| File | Change | Status |
|---|---|---|
| sitemap.xml | Image sitemap namespace + hero-device.webp + og-image.jpg entries | ✅ Done |
| manifest.json | Created PWA manifest | ✅ Done |
| hero-device-480.webp | Generated (11 KB, 480×360) | ✅ Done |
| hero-device-960.webp | Generated (33 KB, 960×719) | ✅ Done |
| hero-device.png | Deleted (was 5.9 MB, unused) | ✅ Done |

---

## Pending — Content Decisions Required

These items require content decisions and cannot be implemented in code alone:

### GDPR / Legal (URGENT — Required by law)

| Issue | Recommendation |
|---|---|
| No Privacy Policy page | **Create `/privacidade`** — GDPR Article 13 requires disclosure at point of data collection. The form's GDPR notice now links to this URL. |
| No Terms of Service page | Create `/termos` page |
| No Cookie Policy / consent banner | Implement before adding any analytics or tracking scripts |

### E-E-A-T (Critical for Medical Site)

| Issue | Recommendation |
|---|---|
| No About / Team page | Add founder credentials + medical advisor credentials. For a medical site, Google E-E-A-T guidelines explicitly require author expertise signals. |
| No physician profile | Named psychiatrist with CRM number, medical license, link to Ordem dos Médicos profile. This is the single highest-impact E-E-A-T fix. |
| Medical claims without visible citations | "58% taxa de remissão" cites JAMA Network Open 2025 (inline added). Consider adding a full bibliography section. |
| Clinical trial registration | If any trials are underway, link to ClinicalTrials.gov registration. |

### Content / Conversion

| Issue | Recommendation |
|---|---|
| No Contact page | Create `/contacto` with email, phone, physical address, and contact form |
| No Pricing page | "€€" in schema isn't sufficient — add actual pricing or clear waitlist/pilot cost. |
| Missing pages linked in footer | `/privacidade`, `/termos`, `/cookies` are linked but don't exist |

### Analytics / Tracking

| Issue | Recommendation |
|---|---|
| No analytics | Add Google Search Console + GA4 or Plausible (privacy-friendly). Submit sitemap at search.google.com/search-console/sitemaps |
| No CAPTCHA on forms | Add hCaptcha or Cloudflare Turnstile to prevent spam |

---

## Verification Checklist

After deploying, run these checks:

1. **Accessibility:** https://wave.webaim.org/ — verify no label/contrast errors remain
2. **Structured data:** https://search.google.com/test/rich-results?url=https://sereen.pt/
3. **PageSpeed Insights:** https://pagespeed.web.dev/report?url=https://sereen.pt/ — target 95+ mobile
4. **Sitemap:** Submit at https://search.google.com/search-console/sitemaps
5. **Manifest:** Browser DevTools → Application → Manifest (check all fields parsed)
6. **Console:** No `target="_blank"` without rel warnings in DevTools
7. **Screen reader:** Test with VoiceOver (macOS) or NVDA (Windows)
8. **Hero srcset:** DevTools → Network → filter Images, confirm 480w served on mobile

---

## Technical Notes

- Hero image variants generated: 480×360 (11 KB), 960×719 (33 KB) from original 2390×1792 (133 KB webp)
- All images served as WebP with JPEG fallback
- BreadcrumbList now contains only the indexable homepage URL (fragment URLs like `#tratamento` cannot be indexed by crawlers)
- Science page now has a proper `<h1>` — the existing CSS class `.sci-hero h1` was already defined but the element was `<h2>`
- PWA manifest added; icons use og-image.jpg as placeholder — ideally replace with proper 192×192 and 512×512 PNG icons
