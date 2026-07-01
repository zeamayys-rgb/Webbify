# TASK: Add award-winning motion & interactions to my website
# (Inspired by landonorris.com — Webflow/GSAP/Rive-style build by OFF+BRAND)

## CONFIG — adapt everything below to my site
- Primary accent color: #2E7D32 (SCeNe green) — replace lime accents with this
- Background: light/off-white base, dark sections for contrast moments
- Fonts: Sora (display/headings), Poppins (subheads), Inter (body)
- Tech constraints: plain HTML/CSS/JS only. Use GSAP + ScrollTrigger and
  Lenis via CDN. No React, no build step. Respect prefers-reduced-motion.

## GLOBAL MOTION SYSTEM
1. Add Lenis smooth scrolling (lerp ~0.1), synced to GSAP ScrollTrigger.
2. Default easing: power4.out for entrances, power2.inOut for transitions.
3. Every section gets a scroll-triggered entrance: headings split into
   words/chars and stagger up (y: 100%, stagger 0.03s); images reveal with
   a clip-path wipe from bottom (0.8s).

## COMPONENT 1 — Preloader
Dark full-screen loader with the site name in bold Sora and a 0→100%
counter. On complete: split the characters, stagger them upward out of
view (power4.inOut), then reveal the page with a full-width curtain wipe.

## COMPONENT 2 — Infinite Marquee
Seamless looping ticker strip of repeating uppercase text + a small
separator icon. CSS transform loop (~30s linear) with duplicated content.
GSAP reads scroll velocity and briefly speeds up / skews the marquee as
the user scrolls, easing back to normal speed at rest.

## COMPONENT 3 — Horizontal Scroll Gallery (pinned)
A full-viewport section pinned by ScrollTrigger: vertical scroll drives a
horizontal track of ~8–10 photo cards. Cards styled like polaroids with
slight random rotation (-3° to 3°), a caption label above each, and
parallax drift at different speeds per card. Interleave 1–2 large
pull-quote text blocks between the photos.

## COMPONENT 4 — Hover-Reveal Card Grid
Grid of content cards, each stacking two image states: a muted/greyscale
"base" and a full-color "hover" version. On hover: crossfade base→hover
with a clip-path wipe from bottom, scale image to 1.05 (0.6s ease-out),
slide the title up with an accent-color underline, and fade in a
grey-to-accent gradient mask at the card's bottom edge.

## COMPONENT 5 — 360° Scroll Turntable
A pinned section where scroll progress maps to a 36-frame image sequence
drawn on a <canvas> (product/object spin). Preload all frames first.
Add drag-to-rotate as a pointer fallback, with momentum/inertia.

## COMPONENT 6 — Full-Screen Nav Menu
Hamburger opens a full-viewport overlay menu (staggered link reveal,
oversized Sora type). Hovering each nav link crossfades a corresponding
preview image in the background. Close with a reverse curtain wipe.

## PERFORMANCE RULES
- Lazy-load all images (loading="lazy"), use .webp.
- Animate only transform and opacity; use will-change sparingly.
- Kill/refresh ScrollTriggers on resize; disable pinning + heavy motion
  below 768px, falling back to simple fade/slide entrances.
- If prefers-reduced-motion: reduce all animation to opacity fades.

## DELIVERABLE
A single self-contained demo page (index.html with embedded CSS/JS)
implementing all six components in order, with placeholder images from
picsum.photos, clean commented code, and each component clearly labeled
so I can lift individual sections into my existing site.