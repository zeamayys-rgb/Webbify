# Webbify — Brand Guidelines v1.0

**Source:** `Logo.pdf` (Adobe Illustrator, 13 pages) — all color values below are **exact hex values extracted from the vector artwork**, not approximations. Typography identified from the fonts embedded in the file.

**Companion docs (planned):** `design.md` (web design system spec) · `design-system.html` (living style reference)

---

## 1. Brand Essence

*(Source: Phase 1 strategy work — not the logo PDF. The PDF supplies the visual identity; this section supplies the meaning behind it.)*

- **Name:** Webbify
- **Tagline (logo lockup):** *AI-Powered Web Agency* — set in Montserrat Italic, width-matched to the wordmark. (Replaces the original *Kelas Cepat Bikin Website*, retired 2026-07; original PDF remains the archive.)
- **What Webbify is:** A modern, AI-augmented web agency — fast and fully custom, accelerated by AI, piloted by professional designers and developers. Built for any business; currently deepest in the school vertical, which serves as proof of craft rather than a limit.
- **Core promise (the wedge):** *Prototype before you pay.* Webbify absorbs the risk the client normally carries — you see a working prototype of your actual site before any commitment. Speed is not a feature; it's the trust mechanism.
- **How it works:** Diagnose → Prototype → Refine → Launch. Diagnostic-first, never template-first.
- **Who stands behind it:** Two founders, hands-on. Abdan (product, strategy, design — 5+ yrs building digital products alongside top-tier brands) and Bedur (development & tech ops — 100+ sites in 4 years). Every project is founder-piloted; no handoffs.
- **Voice & personality:** Fast, modern, confident — but warm. Short declarative sentences, plain English, zero hype. Credibility comes from real work and real credentials, never inflated metrics. The visual language mirrors this: playful intersecting geometry in a light pastel triad — approachable tech, not corporate coldness. Design should always feel light, airy, and quick.
- **The mark's meaning:** Two triangles — design and engineering — intersecting to create something new (the indigo center). The brand in one shape.

---

## 2. Logo System

### 2.1 The mark
A "W" formed by **two overlapping inverted triangles** — turquoise (left) and sand (right) — whose intersection creates a smaller **indigo** triangle at the center. The overlap is the story: two disciplines (design + engineering) intersecting to create the product.

Two renderings exist:
| Version | Description | Use |
|---|---|---|
| **Flat** | 2D translucent triangles with lighter facet panels | Small sizes, favicons, UI, print |
| **Dimensional (3D prism)** | Extruded prisms with facet shading + soft ground shadow | Hero moments, large-format, brand storytelling |

### 2.2 Lockups
1. **Vertical** — mark above wordmark + tagline (primary lockup)
2. **Horizontal** — mark left, wordmark + tagline right (headers, nav, wide formats)
3. **Mark only** — favicon, avatar, watermark, small UI

### 2.3 Colorways
- **Primary** — turquoise / indigo / sand (default, always preferred)
- **Monochrome white** — all-white mark for dark/photographic backgrounds (approved in source file)
- **Alternate red/green/blue** — appears in the source file; **usage intent unconfirmed** — treat as *do not use* until Abdan confirms its purpose ⚠️

### 2.4 Clear space & minimum size (proposed — not specified in source)
- Clear space: height of the indigo center triangle on all sides
- Minimum: mark-only ≥ 24 px; horizontal lockup ≥ 120 px wide

### 2.5 Assets (updated with English tagline)
Vector SVGs — mark geometry from the source PDF, tagline re-set in Montserrat Italic:
`webbify-mark-3d.svg` · `webbify-mark-3d-simple.svg` · `webbify-lockup-horizontal.svg` · `webbify-lockup-vertical.svg`

---

## 3. Color Palette

### 3.1 Core triad (exact values from artwork)

| Token | Hex | Role |
|---|---|---|
| **Indigo** (primary) | `#5863E7` | Brand color. Links, CTAs, interactive states, tagline text |
| Indigo Light | `#7982EC` | Wordmark gradient end, hover states |
| **Turquoise** | `#8CE7E5` | Secondary accent, surfaces, illustration |
| Turquoise Highlight | `#D5F7F6` | Tinted backgrounds, cards |
| **Sand** | `#F2D8A5` | Warm accent, highlights, illustration |
| Sand Highlight | `#F7E8C9` | Tinted backgrounds, cards |

### 3.2 Extended ramps (from the dimensional artwork facets)

| Family | Ramp (light → main) |
|---|---|
| Indigo | `#BBBEF3` → `#ACAFF1` → `#8A91EE` → `#7982EC` → `#5863E7` |
| Turquoise | `#E9F9F8` → `#D5F7F6` → `#C4F1F0` → `#A3ECEA` → `#9AE9E8` → `#8CE7E5` |
| Sand | `#FAF1E2` → `#F7E9D0` → `#F7E8C9` → `#F3DCB0` → `#F2D8A5` |

### 3.3 Neutrals (from artwork)

| Token | Hex | Role |
|---|---|---|
| Off-white | `#F7F7F7` | Default page background (used throughout the brand deck) |
| White | `#FFFFFF` | Cards, surfaces |
| Body gray | `#666666` | Body text (used in the deck's specimen text) |
| Warm brown | `#754C24` | Sand-harmonized text accent (rare) |
| Black | `#000000` | Dark backgrounds (mono-white logo context) |

### 3.4 Wordmark gradient
`#5863E7` → `#7982EC` (left → right), italic. Applied to the WEBBIFY wordmark only.

### 3.5 Accessibility rules (binding for web)
- **Turquoise and Sand are surface/accent colors only — never text.** Both fail WCAG contrast on white at any size.
- `#5863E7` on white ≈ 4.6:1 — safe for **large text and UI components**; for body-size text on white, use it sparingly or on tinted surfaces.
- Body text: `#666666` on white ≈ 5.7:1 ✓. For headings, a deeper ink is recommended — **proposed** token `--ink: #1E2130` (deep indigo-black, derived; not in source file — confirm or adjust in design.md).
- White text on `#5863E7` ≈ 4.6:1 — OK for buttons/large labels.

### 3.6 Usage proportions (recommended)
Roughly **60% neutral** (off-white/white) · **20% indigo** (action + emphasis) · **15% turquoise/sand tints** (surfaces, illustration) · **5% full-saturation accents**. The pastel triad works because it breathes — never flood a layout with all three at full strength.

---

## 4. Typography

### 4.1 As embedded in the brand file

| Role | Font in artwork | Notes |
|---|---|---|
| Wordmark | **Uni Sans CAPS** (italic, gradient) | Treat as a **logo asset (SVG)** — never re-typed live |
| Wordmark alternate | Poppins ExtraBold | Sanctioned alternate (appears in source, p.4) |
| Tagline | **Montserrat Italic** (wght 400) `#5863E7` | "AI-Powered Web Agency" — rendered as paths in the lockup SVGs |
| Body specimen | Open Sans Regular / Poppins Regular `#666666` | |

### 4.2 Web font stack (practical mapping for webbify.id)
Uni Sans is not on Google Fonts (only Heavy/Thin are free from Fontfabric). To keep the stack fast and free:

```css
--font-display: 'Poppins', sans-serif;   /* headings — 600/700/800 */
--font-body:    'Open Sans', sans-serif; /* body — 400/600 */
/* Montserrat italic: reserved for the tagline lockup only */
```

The wordmark itself always ships as SVG, so Uni Sans never needs to load on the web.

### 4.3 Type rules
- Headings: Poppins, tight leading (1.1–1.2), weight 700–800
- Body: Open Sans 400, 1.6–1.7 leading, `#666666` (or deeper ink on key paragraphs)
- The italic gradient treatment belongs to the **wordmark only** — do not italicize headings to imitate it

---

## 5. Brand-in-Motion Notes (for web)

- The mark's geometry (triangles, prisms, facets) is the sanctioned decorative language — background shapes, section dividers, and loading states should derive from it rather than generic blobs/waves.
- The 3D prism version suits a hero animation (slow float/rotate); the flat version suits everything functional.
- Motion should read *fast and light*: short durations (200–300 ms), ease-out, subtle translate — never bouncy or heavy.

---

## 6. Open Brand Questions

1. **Alternate RGB colorway (p.2)** — intended use? (Currently: do not use.)
2. **Proposed ink token `#1E2130`** — approve, or supply preferred heading color.
3. ~~Tagline on an English site~~ ✅ **Resolved** — lockups updated to *"AI-Powered Web Agency"* (both SVGs regenerated with Montserrat Italic paths).
4. Clear-space and minimum-size rules above are proposed defaults — confirm.
