# ✦ Lux — Attribute-First CSS & JS Library

> Style anything with one attribute. Zero dependencies. Zero build step.

Lux is a drop-in CSS + JS styling library that lets you build beautiful, interactive UIs purely through HTML attributes — no class names, no JavaScript frameworks, no config files.

---

## ⚡ Quick Start

```html
<!-- Drop in your <head> -->
<link rel="stylesheet" href="https://unpkg.com/luxcss/dist/lux.css" />
<script src="https://unpkg.com/luxcss/dist/lux.js"></script>
```

Or via npm:
```bash
npm install luxcss
```

That's it. Start using attributes immediately.

---

## ✦ What's Included

| Category | Attributes |
|---|---|
| **Surfaces** | `surface=` — solid, glass, frosted, ghost, matte, neon, aurora, ink, raised, mesh, outline |
| **Color** | `tone=` — primary, danger, success, warning, info, accent, neutral |
| **Typography** | `text=` — hero, display, heading, subheading, lead, body, caption, label, code, overline |
| **Text FX** | `text-gradient=`, `text-stroke=`, `text-glow`, `text-shadow=`, `truncate=`, `balance`, `fluid=` |
| **Layout** | `layout=` — stack, row, cluster, grid, center, cover, sidebar, masonry, prose, split, bento, holy-grail |
| **Grid** | `cols=`, `span=`, `sm-cols=`, `md-cols=`, `lg-cols=`, `xl-cols=`, `gap=`, `align=`, `justify=` |
| **Motion** | `motion=` — subtle, expressive, dramatic, press |
| **Animations** | `animate=` — spin, pulse, bounce, wiggle, shake, ping, heartbeat, rubber, flip, swing, tada |
| **Reveal** | `reveal=` — bottom, top, left, right, scale, blur, rotate, flip |
| **Spring** | `spring=` — default, bouncy, gentle |
| **Float** | `float=` — slow, med, fast |
| **Gradients** | 18 named gradients — sunset, ocean, aurora, fire, neon, candy, gold, cosmos, electric… |
| **Glow & Ring** | `glow=`, `text-glow`, `ring=`, `shadow=colored` |
| **Patterns** | `pattern=` — grid, dots, stripes, crosshatch, checker, diamonds, hexagon, noise |
| **Masks** | `mask=` — fade-bottom, fade-top, fade-x, vignette, circle, spotlight |
| **Clip Paths** | `clip=` — circle, ellipse, diamond, hex, star, arrow, notch, chevron, slant-r/l, wave |
| **Filters** | `filter=`, `backdrop=` — blur, grayscale, sepia, vintage, dreamy… |
| **Forms** | `input=`, `field=`, `hint=` |
| **Components** | Accordion, Tabs, Modal, Drawer, Popover, Toast, Progress, Badges, Tooltips |
| **JS Magic** | Confetti, Cursor trail, Magnetic, Tilt 3D, Typewriter, Ripple, Counter, Spotlight, Custom cursor |
| **Utils** | `elevation=`, `layer=`, `aspect=`, `blend=`, `opacity=`, `pos=`, `z=`, stagger, reveal-delay |

---

## 🔥 Examples

### Surfaces
```html
<div surface="glass">Glass card</div>
<div surface="neon" tone="primary">Neon card</div>
<div surface="aurora">Animated aurora</div>
<div surface="solid" tone="success">Success button</div>
```

### Layout
```html
<div layout="grid" cols="3" gap="md">
  <div surface="matte">Card 1</div>
  <div surface="matte">Card 2</div>
  <div surface="matte">Card 3</div>
</div>

<div layout="row" gap="md" align="center" justify="between">
  <h2 text="heading">Title</h2>
  <button surface="solid" tone="primary">Action</button>
</div>
```

### Typography
```html
<h1 text="hero" text-gradient="electric">Hero Heading</h1>
<h2 text="heading" balance>Section Heading</h2>
<p text="lead">A lead paragraph with comfortable line-height.</p>
<p text="body">Regular body text for reading.</p>
<span text="label">LABEL</span>
<code text="code">const x = 42;</code>
```

### Motion
```html
<!-- Hover effects -->
<div motion="subtle">Subtle lift on hover</div>
<div motion="expressive">Expressive spring on hover</div>
<div motion="dramatic">Dramatic scale + rotate</div>

<!-- 3D tilt on hover -->
<div tilt tilt-glare>Tilt me!</div>

<!-- Magnetic button -->
<button magnetic surface="solid" tone="primary">Magnetic</button>

<!-- Scroll-triggered reveal -->
<div reveal="bottom">Fades in from below on scroll</div>
<div reveal="scale" reveal-delay="200">Scales in with delay</div>

<!-- Stagger children automatically -->
<div layout="grid" cols="3" stagger="100">
  <div surface="matte">1</div>
  <div surface="matte">2</div>
  <div surface="matte">3</div>
</div>
```

### Animations
```html
<div animate="spin">⟳</div>
<div animate="bounce">⬆</div>
<div animate="pulse">●</div>
<div animate="heartbeat">❤</div>
<div animate="wiggle">↔</div>
<div float="slow">Floating element</div>
```

### Accordion
```html
<div accordion>
  <div accordion-item>
    <button accordion-trigger>Question?</button>
    <div accordion-content>Answer here.</div>
  </div>
</div>
```

### Tabs
```html
<div tabs>
  <div tab-list>
    <button tab>Tab 1</button>
    <button tab>Tab 2</button>
  </div>
  <div tab-panel>Content 1</div>
  <div tab-panel>Content 2</div>
</div>
```

### Modal
```html
<button modal-open="my-modal">Open</button>

<div modal-backdrop id="my-modal">
  <div modal>
    <button modal-close>✕</button>
    <h2 text="heading">Modal Title</h2>
    <p>Modal content here.</p>
  </div>
</div>
```

### Drawer
```html
<button drawer-open="my-drawer">Open Drawer</button>

<div drawer-backdrop id="my-drawer">
  <div drawer drawer-side="right">
    <button drawer-close>✕</button>
    Drawer content
  </div>
</div>
```

### Toast
```html
<!-- HTML attribute trigger -->
<button
  toast-trigger
  toast-title="Done!"
  toast-msg="Your file was saved."
  toast-type="success"
>Save</button>

<!-- Or via JS -->
<script>
  Lux.toast("File saved!", { title: "Done!", type: "success" });
</script>
```

### Confetti
```html
<button confetti-trigger confetti-count="100">🎉 Celebrate!</button>

<!-- Or via JS -->
<script>
  Lux.confetti({ count: 80 });
</script>
```

### Typewriter
```html
<p typewriter typewriter-speed="60" typewriter-cursor>
  This text types itself on scroll.
</p>
```

### Counter Animation
```html
<!-- Animates from 0 to 1,250 on scroll -->
<span counter="1250" counter-sep counter-prefix="$" counter-suffix="k">0</span>
```

### Ripple & Spotlight
```html
<button ripple surface="solid" tone="primary">Ripple Effect</button>
<div spotlight surface="matte">Spotlight follows your cursor</div>
```

### Forms
```html
<div field>
  <label>Email</label>
  <input input type="email" placeholder="you@example.com" />
  <span hint>We'll never share your email.</span>
</div>

<div field state="error">
  <label>Password</label>
  <input input type="password" />
  <span hint>Must be at least 8 characters.</span>
</div>
```

### Gradients & Text Gradients
```html
<div gradient="sunset" radius="xl" style="height:120px"></div>
<h1 text="hero" text-gradient="ocean">Gradient Text</h1>
```

### Badges & Tooltips
```html
<span badge tone="primary">Primary</span>
<span badge="dot" tone="success">Live</span>
<span badge="counter" tone="danger">99+</span>

<button tooltip="This is a tooltip">Hover me</button>
<button tooltip="Tooltip below" tooltip-pos="bottom">Below</button>
```

### Theme Toggle
```html
<!-- Auto persists to localStorage -->
<button theme-toggle>Toggle Theme</button>
```

### Cursor Trail
```html
<!-- Add to any parent element -->
<body cursor-trail cursor-color="#6366f1">
```

### Custom Cursor
```html
<div custom-cursor></div>
```

---

## 🎨 Theming

Override any CSS variable to match your brand:

```css
:root {
  --lux-primary:       #your-color;
  --lux-font-sans:     'Your Font', sans-serif;
  --lux-font-display:  'Your Display Font', sans-serif;
  --lux-r-lg:          0.5rem;     /* border radius */
  --lux-gap-md:        1.25rem;    /* spacing */
}
```

Or use seed color per element:
```html
<div seed="#e11d48" surface="neon">Seed colored surface</div>
```

---

## 🧠 JS API

```javascript
// Toast
Lux.toast("Message", { title: "Title", type: "success|danger|warning|info", duration: 3000 });

// Confetti
Lux.confetti({ count: 80, duration: 3000, origin: { x: 0.5, y: 0.4 } });

// Theme
Lux.applyScheme("dark" | "light");

// Modal
Lux.openModal(backdropElement);
Lux.closeModal(backdropElement);

// Drawer
Lux.openDrawer(backdropElement);
Lux.closeDrawer(backdropElement);

// Counter (manually trigger)
Lux.animateCounter(element);
```

---

## 📦 File Sizes

| File | Size |
|---|---|
| `lux.css` | ~38 KB |
| `lux.js` | ~14 KB |
| **Total** | **~52 KB** |

No dependencies. No build step. No runtime overhead.

---

## License

MIT © Lux Contributors
