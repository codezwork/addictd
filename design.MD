# Addictd.ai Design System Report

## 1. Color Palette (The Complete Spectrum)

The platform relies on a deep, dark-mode-first technical aesthetic, utilizing stark dark backgrounds accented by high-saturation neon gradients.

| Color | CSS Variable | Hex/RGBA | Context / Usage |
| :--- | :--- | :--- | :--- |
| **Background Primary** | `--color-bg` | `#08080E` | Core page background, scrollbar track, top navbar gradient start. |
| **Background Sec.** | `--color-bg-2` | `#0D0D18` | Slightly elevated backgrounds. |
| **Surface Primary** | `--color-surface` | `#13131F` | Base layer for floating cards, info cards, and video player borders. |
| **Surface Sec.** | `--color-surface-2` | `#1A1A2E` | Inner nested UI elements (icon wrappers, nested graph containers). |
| **Border Accent** | `--color-border-accent` | `rgba(123, 47, 255, 0.18)` | Primary card borders, active button borders, floating tooltips. |
| **Border Subtle** | `--color-border-subtle` | `rgba(255, 255, 255, 0.06)` | Secondary/inactive card borders, internal divider lines. |
| **Brand Purple** | `--color-purple` | `#7B2FFF` | Primary brand accent, gradient start, scrollbar thumb, hover glow. |
| **Brand Pink** | `--color-pink` | `#C84BFF` | Secondary brand accent, gradient end, micro-interaction pips, pulse indicators. |
| **Semantic Error** | `--color-red` | `#FF3B3B` | Danger states, "Dead Zone" timeline regions, flagged quality indicators. |
| **Semantic Success**| `--color-green` | `#00E87A` | Positive ROI, high retention hooks, "Hook Zone" timeline regions. |
| **Semantic Warn** | `--color-amber` | `#FFB83B` | "Declining" / "Recovering" timeline states, warning alerts. |
| **Text Primary** | `--color-text-1` | `#FFFFFF` | Core headings, active state typography. |
| **Text Secondary**| `--color-text-2` | `#9999BB` | Body paragraphs, inactive tab labels, timestamps. |
| **Text Tertiary** | `--color-text-3` | `#55556A` | Muted micro-copy, sub-labels, minor metadata. |

### Gradients & Opacities
- **Primary Gradient:** `linear-gradient(to right, var(--color-purple), var(--color-pink))` used for active states, CTA text fills (with `bg-clip-text`), and progress bars.
- **Navbar Fade:** `linear-gradient(to bottom, rgba(8,8,14,0.9), transparent)` for smooth top docking.
- **Card Glare:** `linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.1) 25%, transparent 30%)` animated via GSAP for 3D interactions.
- **Friction Glow:** Radial gradient `ellipse, rgba(255,59,59,0.2) 0%, transparent 70%` behind Hero floating cards.

---

## 2. Typography System

The typography creates a tension between brutalist technicality and editorial luxury.

### Font Families
- **Primary / Display:** `Syne` (`--font-syne`) – Used for all main headings and body text.
- **Secondary / Mono:** `DM Mono` (`--font-dm-mono`) – Used for technical data, labels, tags, and micro-copy. Weights: 300, 400, 500.
- **Accent / Serif:** `Instrument Serif` (`--font-instrument-serif`) – Used exclusively in an italic style to highlight key words in major H1/H2 headings. Weight: 400.

### Typographic Scale
- **Hero H1:** `text-5xl md:text-7xl` (`3rem` to `4.5rem`), `font-extrabold`, `leading-[1.05]`, `tracking-tight`.
- **Section H2:** `text-4xl md:text-5xl lg:text-6xl` (`2.5rem` to `3.75rem`), `font-extrabold`, `leading-[1.05]`, `tracking-tight`.
- **Card H3:** `text-2xl` (`1.5rem`), `font-bold`, `tracking-tight`.
- **Body Large:** `text-lg` (`1.125rem`), `leading-relaxed` (implied by layout), `text-[var(--color-text-2)]`.
- **Body Standard:** `text-sm` (`0.875rem`), `leading-relaxed`.
- **Navbar Links:** `text-sm`, `font-medium`.
- **Buttons:** `text-[13px]`, `font-semibold`.
- **Micro-copy / Tags:** `text-[10px]` or `text-[11px]`, `font-mono`, `uppercase`, `tracking-widest` (`tracking-[0.12em]`).

### Component Mapping & Responsive Behavior
- **Headings** scale dynamically: e.g., Hero shifts from `text-5xl` on mobile to `text-7xl` on desktop.
- **Serif Accents** are strictly mapped inline within display headers: `<span className="font-serif italic bg-gradient-to-r... text-transparent bg-clip-text">`.
- **Mono Caps** are heavily used for structural wayfinding (e.g., "Platform Infrastructure", "Predictive Scoring").

---

## 3. Component Architecture & Patterns

The platform leverages a "Premium Brutalist" spatial system, characterized by strict grid adherence, exposed borders, and asymmetrical weighting.

### Structural Patterns
- **Asymmetrical Editorial Grid:** Used heavily in Hero and Info sections (`grid-cols-1 md:grid-cols-2`). Text content is constrained (`max-w-xl`, `max-w-md`), leaving generous negative space.
- **Card Grids:** `grid-cols-1 lg:grid-cols-2` with `gap-8` for feature descriptions, enforcing a structured matrix.
- **Sticky Split Layouts:** Used in the Demo section where the Video Player is `lg:sticky lg:top-0` while the right column scrolls.

### Spatial System & Spacing Scale
- **Section Padding:** Consistent `py-32 px-6 md:px-12` (mobile: 24px, desktop: 48px).
- **Major Gaps:** `gap-12 lg:gap-24` (48px to 96px) between main grid columns.
- **Card Internal Padding:** `p-8 md:p-10` (32px to 40px) inside major feature cards. Smaller nested UI elements use `p-4` or `p-5`.
- **Max Width:** Root content is constrained by `max-w-7xl mx-auto`.

### UI Primitives Specifications
- **Floating Cards (Hero):**
  - Width: `w-[300px] md:w-[340px]`
  - Border Radius: `rounded-2xl` (1rem)
  - Border Width: `border` (1px)
  - Shadow (Hover): `hover:shadow-[0_0_30px_rgba(200,75,255,0.15)]`
- **Feature Cards (Info):**
  - Border Radius: `rounded-2xl`
  - Nested Elements: `rounded-xl` (0.75rem) or `rounded-lg` (0.5rem)
- **Video Player (Demo):**
  - Border Radius: `rounded-[2rem]` (2rem)
  - Border: `border-[8px] border-[var(--color-surface)]`
  - Shadow: `shadow-2xl`
- **Buttons / Pills:**
  - Standard padding: `px-5 py-2.5`
  - Border Radius: `rounded-full`

*Note on Inconsistencies:* Border radii vary intentionally by component scale. Outer major wrappers use `rounded-2xl` or `rounded-[2rem]`, medium components use `rounded-xl`, and micro-UI / buttons use `rounded-full`.

---

## 4. Interactions, Motion & States

The visual language is highly kinetic, relying heavily on GSAP for complex scroll-docking and framer-motion/CSS for micro-interactions.

### Micro-interactions & States
- **Nav Links:** Hover triggers an animated bottom border (`absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r... transition-all duration-300 group-hover:w-full`).
- **Buttons:** Hover triggers `hover:-translate-y-0.5` and border color shifts (`hover:border-[var(--color-purple)]`).
- **Floating Cards (Magnetic):** Custom GSAP `quickTo` logic maps mouse X/Y coordinates to subtle translation (`xTo(distanceX * 0.08)`, `yTo(distanceY * 0.08)`).
- **Feature Cards:** Hover upgrades border opacity/color: `hover:border-[var(--color-border-accent)] transition-colors duration-300`.
- **Custom Cursor:** The system hides the default cursor (`cursor: none` in global CSS) and relies on a custom implementation.

### Animation Parameters
- **Standard CSS Transitions:** Primarily `duration-300` (300ms) with default or `ease-out` easing.
- **Slide Animations (Info Tabs):** Use `0.6s cubic-bezier(0.16, 1, 0.3, 1)` for highly fluid, premium sliding entrances.
- **Pulse Indicators:** Built-in Tailwind `animate-pulse` used for live recording dots or text cursors.
- **Tab Pill Indicator:** Transform uses `duration-500` and `cubic-bezier(0.16, 1, 0.3, 1)`.

### Scroll Behaviors & Complex Motion
- **Hero Card Swap:** Auto-plays every 2000ms. Mobile utilizes vertical Y-axis shifting (`y: -10` to `y: 10`) with Z-index swaps. Desktop utilizes X/Y offset swaps with 3D rotation (`rotationZ: -4` to `rotationZ: 5`). Easing: `power3.inOut`.
- **GSAP Scroll-Docking:** As the user scrolls from Hero to CTA, the floating cards scale down and physically "dock" into target slots (`dock-slot-1`, `dock-slot-2`) using `scrub: 1`. During the tween, 3D rotations are applied (`rotationX: 15, rotationY: -10`) and settle to 0. Card glare opacity fades in simultaneously.

---

## 5. Aesthetic Summary

The Addictd platform embodies a **Premium Brutalist** and **Modern Technical** visual language. By fusing stark, unyielding layouts (exposed grid lines, dashed docking slots, high-contrast `#08080E` backgrounds) with hyper-fluid 3D WebGL elements (Ferrofluid sphere) and vibrant neon pink/purple gradients, the design creates a feeling of high-end algorithmic authority. The typography reinforces this by juxtaposing cold, monospaced data readouts with elegant, italicized serif flourishes—visually communicating that the platform is both mathematically precise ("Know before you post") and aesthetically elite.
