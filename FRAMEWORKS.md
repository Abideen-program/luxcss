# Lux Framework Guide

---

## React / Vite

```js
// src/main.jsx
import 'luxcss/dist/lux.css';
import 'luxcss/dist/lux.js';
```

---

## Next.js — App Router

`app/layout.tsx` is a Server Component by default. Side-effect imports like `lux.js` only run on the server there — so use a tiny Client Component to load it in the browser.

**Step 1 — Create LuxLoader**

```tsx
// src/components/LuxLoader.tsx
'use client';

import 'luxcss/dist/lux.js';

export default function LuxLoader() {
  return null;
}
```

**Step 2 — Use it in your root layout**

```tsx
// app/layout.tsx
import 'luxcss/dist/lux.css';
import LuxLoader from '@/components/LuxLoader';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LuxLoader />
        {children}
      </body>
    </html>
  );
}
```

> `lux.css` is safe to import directly in `layout.tsx` — CSS has no executable code so it works fine on the server. Only `lux.js` needs the Client Component wrapper.

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

> Pages Router doesn't have Server Components — `_app.tsx` runs entirely on the client, so the simple two-import pattern works directly. No `LuxLoader` needed.

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
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  onMount(async () => {
    if (browser) await import('luxcss/dist/lux.js');
  });
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
/// <reference path="../../node_modules/luxcss/dist/lux.d.ts" />
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

> The triple-slash reference is required — a plain `import 'luxcss'` does not reliably apply the type augmentation with modern bundler-mode TypeScript (TS 5.x + `moduleResolution: "bundler"`).

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

> Since `lux.js` is an ES module, the `<script>` tag needs `type="module"` when loaded via CDN.
