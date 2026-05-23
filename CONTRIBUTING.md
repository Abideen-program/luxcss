# Contributing to Lux

First off — thank you for considering contributing! Lux is a small project and every improvement matters.

---

## Ways to Contribute

- 🐛 **Report a bug** — open an issue with a clear description and steps to reproduce
- 💡 **Suggest a feature** — open an issue with your idea and use case
- 🔧 **Fix a bug** — fork, fix, and open a pull request
- ✨ **Add a feature** — discuss it in an issue first so we're aligned
- 📝 **Improve docs** — typos, unclear explanations, missing examples

---

## Getting Started

```bash
# 1. Fork the repo on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/luxcss.git
cd luxcss

# 3. Open in your editor
# All source files are in /dist — no build step needed
code .

# 4. Use Live Server (VS Code extension) to preview changes
# Right-click index.html → Open with Live Server
```

---

## Project Structure

```
luxcss/
├── dist/
│   ├── lux.css      ← All CSS — edit this
│   ├── lux.js       ← All JS — edit this
│   ├── index.html   ← Demo/showcase page
│   └── docs.html    ← Documentation site
├── LICENSE
├── README.md
├── CHANGELOG.md
└── package.json
```

---

## Making Changes

### CSS (`lux.css`)
- Each section is clearly commented with `/* ── SECTION NAME ── */`
- Follow the existing token system — use `var(--lux-*)` variables, don't hardcode values
- New attributes should follow the existing naming pattern — short, semantic, lowercase
- Test in both dark and light mode (`scheme="light"` on `<html>`)

### JS (`lux.js`)
- All features are self-contained functions inside the IIFE
- New features should follow the `init*()` pattern and be called inside `Lux.init()`
- If a feature needs a public API method, add it to the `Lux` object at the bottom
- No external dependencies — ever

---

## Pull Request Guidelines

1. **One feature or fix per PR** — keep it focused
2. **Update the demo** — add a live demo of your feature to `index.html`
3. **Update the docs** — add a page or section to `docs.html`
4. **Update CHANGELOG.md** — add your change under `[Unreleased]`
5. **Test on mobile** — check at 375px width minimum

---

## Code Style

- 2-space indentation
- Single quotes for strings in JS
- CSS properties in alphabetical order within a rule block
- Comment every new CSS section with the `/* ── NAME ── */` format
- Keep attribute names lowercase and hyphenated

---

## Reporting Bugs

Open an issue and include:
- What you expected to happen
- What actually happened
- A minimal code example that reproduces it
- Browser and OS

---

## Questions?

Open a [GitHub Discussion](https://github.com/Abideen-program/luxcss/discussions) or an issue — happy to help.
