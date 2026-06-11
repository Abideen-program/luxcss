# Lux Framework Guide

Two imports. Any framework. As of v2.0.3, `lux.js` is a proper ES module — no CDN workarounds needed anywhere.

---

## React / Vite

```js
// src/main.jsx
import 'luxcss/dist/lux.css';
import 'luxcss/dist/lux.js';
```

---

## Next.js — App Router

```tsx
// app/layout.tsx
import 'luxcss/dist/lux.css';
import 'luxcss/dist/lux.js';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

---

## Next.js — Pages Router

```tsx
// pages/_app.tsx
import 'luxcss/dist/lux.css';
import 'luxcss/dist/lux.js';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

---

## Vue 3

```js
// src/main.js
import 'luxcss/dist/lux.css';
import 'luxcss/dist/lux.js';
```

---

## SvelteKit

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import 'luxcss/dist/lux.css';
  import 'luxcss/dist/lux.js';
</script>
<slot />
```

---

## Using Lux attributes in JSX/TSX

```tsx
export default function Card() {
  return (
    <div surface="glass" radius="xl" motion="expressive">
      <h2 text="heading" text-gradient="electric">Hello Lux</h2>
      <button surface="solid" tone="primary" radius="full" ripple magnetic>
        Click me
      </button>
    </div>
  );
}
```

---

## TypeScript

Lux ships with full TypeScript declarations. To activate them, create one file:

```ts
// src/types/lux.d.ts
import 'luxcss';
```

Then make sure your `tsconfig.json` includes it:

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"]
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    "src/types/**/*.d.ts"
  ]
}
```

After that, every Lux attribute (`surface=`, `tone=`, `ripple`, `magnetic`, etc.) is fully typed with autocomplete — no `as any` needed anywhere.

---

## JS API

```ts
// In any client component
window.Lux.toast('Saved!', { title: 'Done', type: 'success' });
window.Lux.confetti({ count: 80 });
window.Lux.applyScheme('dark');
```

---

## CDN (No npm — plain HTML)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/luxcss/dist/lux.css"/>
<script type="module" src="https://cdn.jsdelivr.net/npm/luxcss/dist/lux.js"></script>
```

> **Note:** Since `lux.js` is now an ES module, the `<script>` tag needs `type="module"` when loaded via CDN.
