# Lux Framework Guide

Two imports. Any framework. That's it.

---

## React / Vite

```js
// src/main.jsx or src/index.js
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

Lux ships with full TypeScript declarations (`lux.d.ts`).
All attributes like `surface=`, `tone=`, `ripple` are typed automatically.

If you still see errors, make sure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"]
  }
}
```

---

## JS API

```ts
// In any component or script
window.Lux.toast('Saved!', { title: 'Done', type: 'success' });
window.Lux.confetti({ count: 80 });
window.Lux.applyScheme('dark');
```

---

## CDN (No npm)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/luxcss/dist/lux.css"/>
<script src="https://cdn.jsdelivr.net/npm/luxcss/dist/lux.js"></script>
```
