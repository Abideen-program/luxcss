# Lux Framework Guide

How to use Lux in React, Next.js, Vue, and Svelte projects.

---

## React (Create React App / Vite)

```jsx
// src/index.js or src/main.jsx
import 'luxcss/dist/lux.css';
import 'luxcss/dist/lux.js';
```

Then use attributes on any JSX element:

```jsx
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

## Next.js (App Router)

**Important:** Import `lux.js` only on the client — never on the server.

```jsx
// app/layout.tsx
import 'luxcss/dist/lux.css';
```

```jsx
// components/LuxProvider.tsx
'use client';

import { useEffect } from 'react';

export default function LuxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Dynamically import lux.js only on the client
    import('luxcss/dist/lux.js');
  }, []);

  return <>{children}</>;
}
```

```jsx
// app/layout.tsx
import LuxProvider from '@/components/LuxProvider';
import 'luxcss/dist/lux.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LuxProvider>
          {children}
        </LuxProvider>
      </body>
    </html>
  );
}
```

---

## Next.js (Pages Router)

```jsx
// pages/_app.tsx
import 'luxcss/dist/lux.css';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import('luxcss/dist/lux.js');
  }, []);

  return <Component {...pageProps} />;
}
```

---

## Vue 3 (Vite)

```js
// src/main.js
import 'luxcss/dist/lux.css';
import 'luxcss/dist/lux.js';
```

```vue
<template>
  <div surface="glass" radius="xl" motion="expressive">
    <h2 text="heading" text-gradient="electric">Hello Lux</h2>
    <button surface="solid" tone="primary" radius="full" ripple>
      Click me
    </button>
  </div>
</template>
```

---

## Svelte / SvelteKit

```js
// src/routes/+layout.svelte
<script>
  import 'luxcss/dist/lux.css';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  onMount(async () => {
    if (browser) {
      await import('luxcss/dist/lux.js');
    }
  });
</script>

<slot />
```

---

## TypeScript Support

Lux ships with full TypeScript declarations. All HTML attributes are typed automatically — no extra setup needed.

If you see TypeScript errors on Lux attributes, make sure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "react-jsx"
  }
}
```

---

## Using the JS API

```ts
// Access Lux programmatically after it loads
declare const Lux: import('luxcss').LuxAPI;

Lux.toast('Saved!', { type: 'success' });
Lux.confetti({ count: 100 });
Lux.applyScheme('dark');
```

---

## CDN (No npm)

For plain HTML projects — the simplest approach:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/luxcss/dist/lux.css"/>
<script src="https://cdn.jsdelivr.net/npm/luxcss/dist/lux.js"></script>
```

Or via unpkg:

```html
<link rel="stylesheet" href="https://unpkg.com/luxcss/dist/lux.css"/>
<script src="https://unpkg.com/luxcss/dist/lux.js"></script>
```
