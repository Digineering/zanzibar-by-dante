# Zanzibar by Dante — Design Brainstorm

## Three Stylistic Approaches

### Approach A: "Coastal Editorial"
A National Geographic meets boutique hotel aesthetic. Deep navy and warm sand tones, large cinematic photography, serif display headlines, generous white space. Feels like a premium travel magazine spread.
**Probability:** 0.07

### Approach B: "Sun-Bleached Artisan"
Warm, tactile, and earthy. Linen textures, terracotta and ocean teal, hand-drawn accents, organic shapes. Feels like a handmade brochure from a trusted local craftsman.
**Probability:** 0.04

### Approach C: "Minimal Luxury"
Stark white and deep navy, ultra-thin serif typography, vast negative space, photography as the only decoration. Inspired by high-end safari lodges and Apple-level restraint.
**Probability:** 0.03

---

## Chosen Approach: A — "Coastal Editorial"

This approach best honours the brief: premium without being corporate, authentic without being cheap, editorial without being cold.

### Design Movement
Coastal Modernism — the intersection of National Geographic editorial photography, boutique East African lodge design, and modern travel journalism.

### Core Principles
1. Photography carries all emotional weight — design steps back and lets images speak.
2. Generous negative space signals premium quality and builds trust.
3. Every typographic choice reinforces the "local expert, global standard" positioning.
4. The Clean Beach Initiative is woven in naturally, never as a marketing insert.

### Color Philosophy
- **Deep Navy** `oklch(0.22 0.06 250)` — anchor colour; trust, depth, the ocean at night.
- **Warm Sand** `oklch(0.92 0.04 80)` — background warmth; beach, light, welcome.
- **Ocean Teal** `oklch(0.55 0.12 195)` — accent; the water Dante works in every day.
- **Sunset Gold** `oklch(0.78 0.14 70)` — highlight; warmth, energy, the golden hour.
- **Off-White** `oklch(0.98 0.01 80)` — breathing space between elements.

The palette is warm-leaning to avoid the coldness of pure blue/white, and avoids purple entirely.

### Layout Paradigm
Asymmetric editorial columns. Hero is full-bleed. Content sections alternate between left-heavy and right-heavy layouts. Tour cards break into a masonry-style grid. No centred-everything monotony.

### Signature Elements
1. A thin horizontal rule in Sunset Gold used as a section divider — minimal but ownable.
2. The "by Dante" wordmark in a flowing script font, contrasting with the strong serif "ZANZIBAR".
3. Subtle grain/noise texture overlay on the hero to give warmth and depth.

### Interaction Philosophy
Calm and deliberate. Hover states reveal rather than shout. The WhatsApp button is always visible but never aggressive. Scroll-triggered fade-ins are gentle, not theatrical.

### Animation
- Hero text fades in from below, staggered 80ms per element.
- Section entrances: `opacity 0→1`, `translateY 20px→0`, 400ms ease-out.
- Tour cards: subtle lift on hover (`translateY -4px`, `box-shadow` deepens), 200ms.
- WhatsApp button: gentle pulse animation to draw the eye without being annoying.
- All animations respect `prefers-reduced-motion`.

### Typography System
- **Display / Headlines:** `Cormorant Garamond` — elegant, editorial, distinctly non-generic. Used for H1 and H2.
- **Body / UI:** `DM Sans` — modern, clean, highly readable on mobile. Used for body copy, labels, and buttons.
- **Accent:** `Dancing Script` — used exclusively for the "by Dante" signature element.
- Scale: Display 56–72px, H2 36–42px, H3 24px, Body 16–18px.

### Brand Essence
*The only local guide in Nungwi who gives something back to the beach he works on.* — Authentic, Purposeful, Warm.

### Brand Voice
Headlines are direct and confident: "Experience the real Zanzibar." "Your local friend in Nungwi."
CTAs are personal, never corporate: "Chat with Dante" not "Book Now."
Body copy sounds like Dante speaking: simple, warm, honest. Never oversells.

### Wordmark & Logo
"ZANZIBAR" in spaced uppercase Cormorant Garamond. Below it, "by Dante" in Dancing Script in Sunset Gold. A small dhow boat icon or wave mark sits to the left of the wordmark.

### Signature Brand Color
**Ocean Teal** — the colour of the water Dante works in, used for all primary CTAs and the Clean Beach Initiative badge.
