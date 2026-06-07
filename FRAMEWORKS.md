# Lux Framework Guide

---

## Next.js — App Router

```tsx
// app/layout.tsx
import 'luxcss/dist/lux.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/luxcss/dist/lux.js" async />
      </head>
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

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

```tsx
// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script src="https://cdn.jsdelivr.net/npm/luxcss/dist/lux.js" async />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

---

## React / Vite

```js
// src/main.jsx
import 'luxcss/dist/lux.css';
import 'luxcss/dist/lux.js'; // safe — Vite only runs in browser
```

---

## Vue 3

```js
// src/main.js
import 'luxcss/dist/lux.css';
import 'luxcss/dist/lux.js'; // safe — Vite only runs in browser
```

---

## SvelteKit

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import 'luxcss/dist/lux.css';
  import 'luxcss/dist/lux.js'; // safe — Vite only runs in browser
</script>
<slot />
```

---

## Why Next.js is different

Next.js runs your code on the **server first**. The server has no `window` or `document`, so importing `lux.js` directly crashes. The fix is simple:

- `lux.css` → import normally (CSS is safe on server)
- `lux.js` → load via CDN `<script>` tag (runs in browser only)

React, Vue, and Svelte projects use Vite which only runs in the browser — so `import 'luxcss/dist/lux.js'` works fine there.

---

## Using Lux attributes in JSX/TSX

```tsx
export default function Card() {
  return (
    <div {...{ surface: 'glass', radius: 'xl', motion: 'expressive' } as any}>
      <h2 {...{ text: 'heading', 'text-gradient': 'electric' } as any}>Hello Lux</h2>
      <button {...{ surface: 'solid', tone: 'primary', radius: 'full', ripple: 'true' } as any}>
        Click me
      </button>
    </div>
  );
}
```

---

## TypeScript

Lux ships with full TypeScript declarations (`lux.d.ts`). If you see errors on Lux attributes, make sure your `tsconfig.json` includes:

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
// In any client component
window.Lux.toast('Saved!', { title: 'Done', type: 'success' });
window.Lux.confetti({ count: 80 });
window.Lux.applyScheme('dark');
```

---

## CDN (No npm — plain HTML)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/luxcss/dist/lux.css"/>
<script src="https://cdn.jsdelivr.net/npm/luxcss/dist/lux.js"></script>
```
