# Changelog

All notable changes to Lux will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.3] — 2026-06-11

### Fixed — TypeScript declarations (`lux.d.ts`)
- Removed duplicate property declarations: `'text-glow'` and `'elevation'` were each declared twice, silently breaking the entire React augmentation block
- Fixed `cols`, `span`, `align`, `pattern` — these collided with native HTML attributes on `<textarea>`, `<col>`, and `<input>`. Now properly unioned with their native types (e.g. `cols?: LuxCols | number`)
- Fixed `badge?: LuxBadge` to also accept `'true' | boolean` for shorthand usage like `badge="true"`
- Fixed `magnetic?: string` to also accept `boolean` for shorthand usage like `magnetic`
- Added `"types"` condition to `package.json` `exports["."]` — required for TypeScript's `moduleResolution: "bundler"` to find the declaration file at all

### Added — Next.js App Router guidance
- Documented the `LuxLoader` Client Component pattern, the correct way to load `lux.js` in `app/layout.tsx` (a Server Component)
- Documented the triple-slash reference pattern for `src/types/lux.d.ts` — `import 'luxcss'` alone does not reliably trigger the type augmentation under TS 5.x + bundler resolution

---



### Changed — BREAKING (internal only, not for end users)
- `lux.js` rewritten as a proper ES module with no top-level browser code
- Removed `if (typeof window === 'undefined')` early-return wrapper that confused bundlers
- `initLux()` is now the single entry point, called automatically in browsers

### Fixed
- **Major DX fix:** `lux.js` can now be imported directly in Next.js (App Router and Pages Router) — no CDN script tag, no `LuxProvider`, no `useEffect` workaround needed
- CDN usage now requires `<script type="module">` since `lux.js` is an ES module

### Added
- `"module"` field in `package.json` for proper ESM resolution by bundlers

---



### Changed
- Simplified framework setup — now just two imports in any framework (React, Next.js, Vue, Svelte)
- Removed requirement for `LuxProvider`, `useEffect`, or any extra config in Next.js
- Updated `package.json` exports for better bundler compatibility
- Updated `README.md`, `FRAMEWORKS.md`, docs, and demo site to reflect simplified setup

### Added
- `dist/lux.d.ts` — full TypeScript declarations for all 200+ attributes
- Framework Guides page in docs site
- Framework switcher tabs in demo site install section

### Fixed
- SSR crash in Next.js — `lux.js` now safely no-ops on the server
- `dist/` folder now correctly included in npm package

---

## [1.0.2] — 2026-06-04

### Fixed
- Republish to fix dist/ folder missing from npm package

---

## [1.0.1] — 2026-06-03

### Fixed
- SSR safety guard added to `lux.js`
- TypeScript declarations file added (`lux.d.ts`)

---



### 🎉 Initial Release

#### Styling
- 11 surface types — `solid`, `glass`, `frosted`, `ghost`, `matte`, `neon`, `outline`, `raised`, `ink`, `aurora`, `mesh`
- 7 tone values — `primary`, `danger`, `success`, `warning`, `info`, `accent`, `neutral`
- 4 density presets — `compact`, `default`, `spacious`, `loose`
- 8 radius values — `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `full`
- 10 typography presets — `hero`, `display`, `heading`, `subheading`, `lead`, `body`, `caption`, `label`, `overline`, `code`
- Text effects — gradients, stroke, glow, shadow, truncation, fluid scaling
- 18 named background gradients — `sunset`, `ocean`, `aurora`, `fire`, `midnight`, `neon`, `candy`, `gold`, `cosmos`, `electric`, `forest`, `peach`, `rose`, `emerald`, `thermal`, `silver`, `matrix`, `infrared`
- 8 text gradient presets
- 6 elevation levels + layer system
- 7 CSS background patterns — `grid`, `dots`, `stripes`, `crosshatch`, `checker`, `diamonds`, `hexagon`
- 6 mask types — `fade-bottom`, `fade-top`, `fade-x`, `vignette`, `circle`, `spotlight`
- 10 clip path shapes — `circle`, `ellipse`, `diamond`, `hex`, `star`, `arrow`, `notch`, `chevron`, `slant-r`, `slant-l`, `wave`
- CSS filters and backdrop filters
- Blend modes
- Shimmer and skeleton loading states

#### Layout
- 12 layout modes — `stack`, `row`, `cluster`, `grid`, `center`, `cover`, `sidebar`, `masonry`, `prose`, `split`, `bento`, `holy-grail`
- Responsive column system — `cols`, `sm-cols`, `md-cols`, `lg-cols`, `xl-cols`
- Grid span helpers — `span="1"` through `span="full"`
- Gap, align, justify, wrap helpers
- Container queries support
- Scroll snap — horizontal and vertical
- Adaptive responsive layout

#### Motion
- 4 hover motion modes — `subtle`, `expressive`, `dramatic`, `press`
- 3 spring hover modes — `default`, `bouncy`, `gentle`
- 12 looping animations — `spin`, `pulse`, `bounce`, `wiggle`, `shake`, `ping`, `blink`, `heartbeat`, `rubber`, `flip`, `swing`, `tada`
- 8 scroll reveal directions — `bottom`, `top`, `left`, `right`, `scale`, `blur`, `rotate`, `flip`
- Stagger children with `stagger=`
- Reveal delay helpers — 100ms through 1000ms
- Float animation — `slow`, `med`, `fast`, `xy` axis
- Scroll animations — parallax, progress bar, sticky fade

#### Components (CSS)
- Accordion with smooth collapse and multi-open support
- Tabs with animated panel switching
- Modal with spring animation and backdrop blur
- Drawer — slides from `top`, `right`, `bottom`, `left`
- Popover — click-to-open floating panel
- Toast notification system — `success`, `danger`, `warning`, `info`, `default`
- Progress bars — solid and striped variants
- Badges — `default`, `dot`, `counter`, `pill`
- Tooltips — CSS-only, 4 directions
- Form controls — input, textarea, select, range, checkbox, radio
- Field wrapper with label, hint, and state support

#### JS Features
- Scroll reveal (IntersectionObserver)
- Accordion, tabs, modal, drawer, popover interactivity
- Toast system with JS API
- Tilt 3D with optional glare effect
- Magnetic element attraction
- Canvas cursor trail — `dots` and `line` modes
- Confetti particle burst from click origin
- Animated counter on scroll
- Seamless marquee with auto-clone
- Dark/light theme toggle with localStorage persistence
- Parallax scroll effect
- Scroll progress bar
- Sticky fade effect
- Seed color per element
- Lazy image loading
- Copy to clipboard
- Smooth scroll anchors
- Toggle element visibility
- Dismiss element
- Spotlight hover effect
- Ripple click effect
- Typewriter effect with loop and cursor options
- Custom cursor with dot + ring

#### Developer Experience
- Zero dependencies
- Zero build step
- Works via CDN (`unpkg`, `jsdelivr`)
- npm package with proper `exports` config
- Full JS API via global `Lux` object
- Custom events — `lux:modal:open`, `lux:modal:close`, `lux:theme:change`
- Auto-init on DOM ready
- Re-init support for dynamic content via `Lux.init()`
- Full documentation site with live demos
- Interactive showcase/demo page

---

## [Unreleased]

### Planned for v1.1.0
- ARIA accessibility improvements
- `[lux-tooltip]` with JS positioning (smart flip)
- Date picker component
- Notification badge on elements
- More clip paths
- CSS-only carousel

---

*For questions or suggestions, open an issue on [GitHub](https://github.com/Abideen-program/luxcss).*
