# ✦ Lux — Attribute-First CSS & JS Library

> Style anything with one HTML attribute. Zero dependencies. Zero build step.

🌐 **Live Demo:** https://abideen-program.github.io/luxcss/
📖 **Docs:** https://abideen-program.github.io/luxcss/docs.html
📦 **npm:** https://www.npmjs.com/package/luxcss

---

## ⚡ Quick Start

### CDN (Plain HTML — simplest)
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/luxcss/dist/lux.css"/>
<script src="https://cdn.jsdelivr.net/npm/luxcss/dist/lux.js"></script>
```

### npm
```bash
npm install luxcss
```

---

## 🚀 Framework Setup

### React / Vite
```jsx
// src/main.jsx
import 'luxcss/dist/lux.css';
import 'luxcss/dist/lux.js';
```

### Next.js (App Router)
```tsx
// app/layout.tsx
import 'luxcss/dist/lux.css';
```
```tsx
// components/LuxProvider.tsx
'use client';
import { useEffect } from 'react';

export default function LuxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    import('luxcss/dist/lux.js');
  }, []);
  return <>{children}</>;
}
```
```tsx
// app/layout.tsx — wrap your app
import LuxProvider from '@/components/LuxProvider';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body><LuxProvider>{children}</LuxProvider></body>
    </html>
  );
}
```

### Next.js (Pages Router)
```tsx
// pages/_app.tsx
import 'luxcss/dist/lux.css';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  useEffect(() => { import('luxcss/dist/lux.js'); }, []);
  return <Component {...pageProps} />;
}
```

### Vue 3
```js
// src/main.js
import 'luxcss/dist/lux.css';
import 'luxcss/dist/lux.js';
```

### SvelteKit
```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import 'luxcss/dist/lux.css';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  onMount(async () => { if (browser) await import('luxcss/dist/lux.js'); });
</script>
<slot />
```

---

## ✦ Usage

After setup, add attributes to any HTML element:

```html
<!-- Glass card with animated title and a confetti button -->
<div surface="glass" radius="xl" density="spacious" motion="expressive">
  <span badge="dot" tone="success">Live</span>
  <h2 text="heading" text-gradient="electric">Hello Lux</h2>
  <p text="body">One attribute per feature.</p>
  <button surface="solid" tone="primary" radius="full" ripple magnetic confetti-trigger>
    Celebrate 🎉
  </button>
</div>
```

---

## 🎨 What's Included

| Category | Attributes |
|---|---|
| **Surfaces** | `surface=` — solid, glass, frosted, ghost, matte, neon, aurora, ink, raised, mesh, outline |
| **Color** | `tone=` — primary, danger, success, warning, info, accent, neutral |
| **Typography** | `text=` — hero, display, heading, subheading, lead, body, caption, label, code, overline |
| **Text FX** | `text-gradient=`, `text-stroke=`, `text-glow`, `text-shadow=`, `truncate=`, `balance`, `fluid=` |
| **Layout** | `layout=` — stack, row, grid, center, cover, sidebar, masonry, prose, split, bento |
| **Grid** | `cols=`, `span=`, `sm-cols=`, `md-cols=`, `lg-cols=`, `gap=`, `align=`, `justify=` |
| **Motion** | `motion=` — subtle, expressive, dramatic, press |
| **Animations** | `animate=` — spin, pulse, bounce, wiggle, shake, ping, heartbeat, rubber, flip, swing, tada |
| **Reveal** | `reveal=` — bottom, top, left, right, scale, blur, rotate, flip |
| **Gradients** | 18 named gradients — sunset, ocean, aurora, fire, neon, candy, gold, cosmos, electric… |
| **Glow & Ring** | `glow=`, `text-glow`, `ring=`, `shadow=colored` |
| **Patterns** | `pattern=` — grid, dots, stripes, crosshatch, checker, diamonds, hexagon |
| **Masks** | `mask=` — fade-bottom, fade-top, fade-x, vignette, circle, spotlight |
| **Filters** | `filter=`, `backdrop=` — blur, grayscale, sepia, vintage, dreamy… |
| **Forms** | `input=`, `field=`, `hint=` |
| **Components** | Accordion, Tabs, Modal, Drawer, Popover, Toast, Progress, Badges, Tooltips |
| **JS Magic** | Confetti, Cursor trail, Magnetic, Tilt 3D, Typewriter, Ripple, Counter, Spotlight |

---

## 🔥 Examples

### Surfaces
```html
<div surface="glass">Glass card</div>
<div surface="neon" tone="primary">Neon card</div>
<div surface="aurora">Animated aurora</div>
<div surface="solid" tone="success">Solid button</div>
```

### Layout
```html
<div layout="grid" cols="3" gap="md">
  <div surface="matte">Card 1</div>
  <div surface="matte">Card 2</div>
  <div surface="matte">Card 3</div>
</div>
```

### Typography
```html
<h1 text="hero" text-gradient="electric">Hero Heading</h1>
<h2 text="heading" balance>Section Title</h2>
<p text="lead">Intro paragraph.</p>
<code text="code">const x = 42;</code>
```

### Motion
```html
<div motion="expressive">Spring hover effect</div>
<div tilt tilt-glare>3D tilt on hover</div>
<button magnetic ripple surface="solid" tone="primary">Magnetic</button>
<div reveal="bottom">Fades in on scroll</div>
<div layout="grid" cols="3" stagger="100">
  <div surface="matte">1</div>
  <div surface="matte">2</div>
  <div surface="matte">3</div>
</div>
```

### Modal
```html
<button modal-open="my-modal">Open</button>
<div modal-backdrop id="my-modal">
  <div modal-wrapper>
    <button modal-close>✕</button>
    <div modal>
      <h2 text="heading">Modal Title</h2>
      <p>Content here.</p>
    </div>
  </div>
</div>
```

### Toast
```html
<!-- Via HTML -->
<button toast-trigger toast-title="Done!" toast-msg="Saved." toast-type="success">
  Save
</button>

<!-- Via JS -->
<script>
  Lux.toast('Saved!', { title: 'Done!', type: 'success' });
</script>
```

### Confetti
```html
<button confetti-trigger confetti-count="100">🎉 Celebrate!</button>
```

### Counter Animation
```html
<span counter="1250" counter-sep counter-prefix="$" counter-suffix="k">0</span>
```

### Typewriter
```html
<p typewriter typewriter-speed="60" typewriter-cursor>
  This text types itself on scroll.
</p>
```

### Forms
```html
<div field>
  <label>Email</label>
  <input input type="email" placeholder="you@example.com"/>
  <span hint>We'll never share your email.</span>
</div>

<div field state="error">
  <label>Password</label>
  <input input type="password"/>
  <span hint>Must be 8+ characters.</span>
</div>
```

---

## 🎨 Theming

Override any CSS variable to match your brand:

```css
:root {
  --lux-primary:       #your-color;
  --lux-font-sans:     'Your Font', sans-serif;
  --lux-font-display:  'Your Display Font', sans-serif;
  --lux-r-lg:          0.5rem;
  --lux-gap-md:        1.25rem;
}
```

Seed color per element:
```html
<div seed="#e11d48" surface="neon">Custom color surface</div>
```

Dark / Light mode:
```html
<html scheme="dark">   <!-- force dark -->
<html scheme="light">  <!-- force light -->
<button theme-toggle>Toggle</button>  <!-- auto persists to localStorage -->
```

---

## 🧠 JS API

```javascript
// Toast
Lux.toast('Message', { title: 'Title', type: 'success', duration: 3000 });

// Confetti
Lux.confetti({ count: 80, origin: { x: 0.5, y: 0.4 } });

// Theme
Lux.applyScheme('dark');
Lux.applyScheme('light');

// Modal
Lux.openModal(backdropElement);
Lux.closeModal(backdropElement);

// Drawer
Lux.openDrawer(backdropElement);
Lux.closeDrawer(backdropElement);

// Re-init after dynamic content
Lux.init();
```

---

## 📦 File Sizes

| File | Size |
|---|---|
| `lux.css` | ~55 KB |
| `lux.js` | ~32 KB |
| `lux.d.ts` | ~8 KB |
| **Total** | **~95 KB unpacked** |

Zero dependencies. No build step required.

---

## 🗂 Full Docs

See [FRAMEWORKS.md](./FRAMEWORKS.md) for detailed framework integration guides.

See the [full documentation site](https://abideen-program.github.io/luxcss/docs.html) for live demos of every feature.

---

## License

MIT © Abideen
