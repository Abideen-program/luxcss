/*!
 * LUX — JavaScript Runtime v1.0.0
 * Handles: reveal, accordion, tabs, modal, drawer, popover,
 *          toast, tilt, magnetic, confetti, cursor trail,
 *          counter animation, marquee, theme toggle,
 *          parallax, scroll progress, seed color, and more.
 */
(function (global) {
  "use strict";

  /* ── Utilities ─────────────────────────────────────────────── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const on = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);
  const off = (el, ev, fn) => el && el.removeEventListener(ev, fn);
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
  const lerp = (a, b, t) => a + (b - a) * t;
  const raf = requestAnimationFrame;

  /* ── 1. SCROLL REVEAL ───────────────────────────────────────── */
  function initReveal() {
    const els = $$("[reveal]");
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("lux-revealed");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
  }

  /* ── 2. ACCORDION ───────────────────────────────────────────── */
  function initAccordion() {
    on(document, "click", (e) => {
      const trigger = e.target.closest("[accordion-trigger]");
      if (!trigger) return;
      const item = trigger.closest("[accordion-item]");
      const accordion = trigger.closest("[accordion]");
      if (!item) return;

      const isOpen = item.classList.contains("lux-open");

      // Close others if not multi
      if (accordion && !accordion.hasAttribute("multi")) {
        $$("[accordion-item].lux-open", accordion).forEach((i) => {
          if (i !== item) i.classList.remove("lux-open");
        });
      }

      item.classList.toggle("lux-open", !isOpen);
    });
  }

  /* ── 3. TABS ────────────────────────────────────────────────── */
  function initTabs() {
    $$("[tabs]").forEach((tabs) => {
      const tabEls = $$("[tab]", tabs);
      const panels = $$("[tab-panel]", tabs);

      tabEls.forEach((tab, i) => {
        on(tab, "click", () => {
          tabEls.forEach((t) => t.classList.remove("lux-active"));
          panels.forEach((p) => p.classList.remove("lux-active"));
          tab.classList.add("lux-active");
          if (panels[i]) panels[i].classList.add("lux-active");
        });
      });

      // Activate first by default
      if (tabEls[0] && !$$("[tab].lux-active", tabs).length) {
        tabEls[0].classList.add("lux-active");
        if (panels[0]) panels[0].classList.add("lux-active");
      }
    });
  }

  /* ── 4. MODAL ───────────────────────────────────────────────── */
  function initModal() {
    on(document, "click", (e) => {
      // Open
      const opener = e.target.closest("[modal-open]");
      if (opener) {
        const id = opener.getAttribute("modal-open");
        const backdrop = id
          ? $(`[modal-backdrop][id="${id}"]`) || $(`#${id}`)
          : e.target.closest("[modal-backdrop]");
        if (backdrop) openModal(backdrop);
        return;
      }

      // Close via [modal-close] or backdrop click
      const closer = e.target.closest("[modal-close]");
      if (closer) {
        const backdrop = closer.closest("[modal-backdrop]");
        if (backdrop) closeModal(backdrop);
        return;
      }

      // Click outside modal
      if (e.target.matches("[modal-backdrop]")) {
        closeModal(e.target);
      }
    });

    // ESC key
    on(document, "keydown", (e) => {
      if (e.key === "Escape") {
        $$("[modal-backdrop].lux-open").forEach(closeModal);
      }
    });
  }

  function openModal(backdrop) {
    backdrop.classList.add("lux-open");
    document.body.style.overflow = "hidden";
    backdrop.dispatchEvent(new CustomEvent("lux:modal:open", { bubbles: true }));
  }

  function closeModal(backdrop) {
    backdrop.classList.remove("lux-open");
    if (!$$("[modal-backdrop].lux-open").length) {
      document.body.style.overflow = "";
    }
    backdrop.dispatchEvent(new CustomEvent("lux:modal:close", { bubbles: true }));
  }

  /* ── 5. DRAWER ──────────────────────────────────────────────── */
  function initDrawer() {
    on(document, "click", (e) => {
      const opener = e.target.closest("[drawer-open]");
      if (opener) {
        const id = opener.getAttribute("drawer-open");
        const backdrop = id ? $(`[drawer-backdrop][id="${id}"]`) || $(`#${id}`) : null;
        if (backdrop) openDrawer(backdrop);
        return;
      }
      const closer = e.target.closest("[drawer-close]");
      if (closer) {
        const backdrop = closer.closest("[drawer-backdrop]");
        if (backdrop) closeDrawer(backdrop);
        return;
      }
      if (e.target.matches("[drawer-backdrop]")) {
        closeDrawer(e.target);
      }
    });
    on(document, "keydown", (e) => {
      if (e.key === "Escape") $$("[drawer-backdrop].lux-open").forEach(closeDrawer);
    });
  }

  function openDrawer(backdrop) {
    backdrop.classList.add("lux-open");
    document.body.style.overflow = "hidden";
  }
  function closeDrawer(backdrop) {
    backdrop.classList.remove("lux-open");
    document.body.style.overflow = "";
  }

  /* ── 6. POPOVER ─────────────────────────────────────────────── */
  function initPopover() {
    on(document, "click", (e) => {
      const trigger = e.target.closest("[popover-trigger]");
      if (trigger) {
        const isOpen = trigger.classList.contains("lux-open");
        $$("[popover-trigger].lux-open").forEach((t) => t.classList.remove("lux-open"));
        if (!isOpen) trigger.classList.add("lux-open");
        return;
      }
      // Click outside
      if (!e.target.closest("[popover-panel]")) {
        $$("[popover-trigger].lux-open").forEach((t) => t.classList.remove("lux-open"));
      }
    });
  }

  /* ── 7. TOAST ───────────────────────────────────────────────── */
  let toastContainer = null;

  function getToastContainer() {
    if (!toastContainer) {
      toastContainer = document.getElementById("lux-toasts");
      if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.id = "lux-toasts";
        document.body.appendChild(toastContainer);
      }
    }
    return toastContainer;
  }

  const TOAST_ICONS = {
    success: "✓",
    danger:  "✕",
    warning: "⚠",
    info:    "ℹ",
    default: "◆",
  };

  function toast(msg, opts = {}) {
    const {
      title = "",
      type = "default",
      duration = 3500,
      position = "bottom-right",
    } = opts;

    const container = getToastContainer();
    const t = document.createElement("div");
    t.className = "lux-toast";

    const toneMap = {
      success: "var(--lux-success)",
      danger:  "var(--lux-danger)",
      warning: "var(--lux-warning)",
      info:    "var(--lux-info)",
      default: "var(--lux-primary)",
    };
    t.style.setProperty("--lux-tone-color", toneMap[type] || toneMap.default);

    t.innerHTML = `
      <span class="lux-toast-icon">${TOAST_ICONS[type] || TOAST_ICONS.default}</span>
      <div class="lux-toast-body">
        ${title ? `<div class="lux-toast-title">${title}</div>` : ""}
        <div class="lux-toast-msg">${msg}</div>
      </div>
    `;

    container.appendChild(t);

    const dismiss = () => {
      t.classList.add("lux-toast-out");
      t.addEventListener("animationend", () => t.remove(), { once: true });
    };

    on(t, "click", dismiss);
    setTimeout(dismiss, duration);
    return { dismiss };
  }

  // Wire [toast-trigger] buttons
  function initToastTriggers() {
    on(document, "click", (e) => {
      const btn = e.target.closest("[toast-trigger]");
      if (!btn) return;
      toast(
        btn.getAttribute("toast-msg") || "Hello from Lux!",
        {
          title:    btn.getAttribute("toast-title") || "",
          type:     btn.getAttribute("toast-type")  || "default",
          duration: parseInt(btn.getAttribute("toast-duration") || "3500"),
        }
      );
    });
  }

  /* ── 8. TILT (3D hover) ─────────────────────────────────────── */
  function initTilt() {
    $$("[tilt]").forEach((el) => {
      const intensity = parseFloat(el.getAttribute("tilt") || "12");
      const glare = el.hasAttribute("tilt-glare");

      let glareEl = null;
      if (glare) {
        glareEl = document.createElement("div");
        Object.assign(glareEl.style, {
          position: "absolute", inset: "0",
          background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)",
          borderRadius: "inherit", pointerEvents: "none", opacity: "0",
          transition: "opacity 0.3s",
        });
        el.style.position = el.style.position || "relative";
        el.style.overflow = "hidden";
        el.appendChild(glareEl);
      }

      on(el, "mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const dx = (e.clientX - rect.left - cx) / cx;
        const dy = (e.clientY - rect.top  - cy) / cy;
        el.style.transform = `perspective(800px) rotateY(${dx * intensity}deg) rotateX(${-dy * intensity}deg) scale(1.02)`;
        if (glareEl) {
          glareEl.style.opacity = "1";
          glareEl.style.background = `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(255,255,255,0.2), transparent 60%)`;
        }
      });

      on(el, "mouseleave", () => {
        el.style.transform = "";
        if (glareEl) glareEl.style.opacity = "0";
      });
    });
  }

  /* ── 9. MAGNETIC BUTTONS ────────────────────────────────────── */
  function initMagnetic() {
    $$("[magnetic]").forEach((el) => {
      const strength = parseFloat(el.getAttribute("magnetic") || "0.4");
      el.classList.add("lux-magnetic");

      on(el, "mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = (e.clientX - cx) * strength;
        const dy = (e.clientY - cy) * strength;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });

      on(el, "mouseleave", () => {
        el.style.transform = "";
      });
    });
  }

  /* ── 10. CURSOR TRAIL ───────────────────────────────────────── */
  function initCursorTrail() {
    const host = $("[cursor-trail]");
    if (!host) return;

    const mode   = host.getAttribute("cursor-trail") || "dots";
    const color  = host.getAttribute("cursor-color") || "var(--lux-primary)";
    const canvas = document.createElement("canvas");
    canvas.id    = "lux-cursor-canvas";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let W, H, points = [];

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    on(window, "resize", resize);

    // Resolve CSS variable color to actual hex
    const resolveColor = (c) => {
      if (c.startsWith("var(")) {
        const prop = c.slice(4, -1).trim();
        return getComputedStyle(document.documentElement).getPropertyValue(prop).trim() || "#6366f1";
      }
      return c;
    };

    const resolvedColor = resolveColor(color);

    on(document, "mousemove", (e) => {
      points.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (points.length > 60) points.shift();
    });

    function hexToRgb(hex) {
      const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : "99,102,241";
    }
    const rgb = hexToRgb(resolvedColor);

    function drawTrail() {
      ctx.clearRect(0, 0, W, H);
      points = points.filter((p) => p.life > 0.01);

      if (mode === "line" && points.length > 1) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        points.forEach((p, i) => {
          if (i > 0) ctx.lineTo(p.x, p.y);
          p.life *= 0.94;
        });
        ctx.strokeStyle = `rgba(${rgb}, 0.6)`;
        ctx.lineWidth = 2;
        ctx.lineJoin = "round";
        ctx.lineCap  = "round";
        ctx.stroke();
      } else {
        points.forEach((p, i) => {
          const size = (i / points.length) * 10 + 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgb}, ${p.life * 0.6})`;
          ctx.fill();
          p.life *= 0.92;
         });
      }
      raf(drawTrail);
    }
    raf(drawTrail);
  }

  /* ── 11. CONFETTI ───────────────────────────────────────────── */
  function confetti(opts = {}) {
    const { count = 80, duration = 3000, origin = { x: 0.5, y: 0.4 } } = opts;

    let canvas = document.getElementById("lux-confetti-canvas");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "lux-confetti-canvas";
      document.body.appendChild(canvas);
    }
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    const COLORS = ["#6366f1","#f472b6","#38bdf8","#34d399","#fbbf24","#f97316","#ef4444"];
    const particles = Array.from({ length: count }, () => ({
      x:   origin.x * canvas.width  + (Math.random() - 0.5) * 60,
      y:   origin.y * canvas.height + (Math.random() - 0.5) * 60,
      vx:  (Math.random() - 0.5) * 12,
      vy:  -(Math.random() * 14 + 6),
      r:   Math.random() * 6 + 3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rot:  Math.random() * 360,
      spin: (Math.random() - 0.5) * 8,
      shape: Math.random() > 0.5 ? "rect" : "circle",
      life: 1,
    }));

    const start = performance.now();

    function draw(now) {
      const elapsed = now - start;
      if (elapsed > duration) { ctx.clearRect(0, 0, canvas.width, canvas.height); return; }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x  += p.vx;
        p.y  += p.vy;
        p.vy += 0.4; // gravity
        p.vx *= 0.99;
        p.rot += p.spin;
        p.life = 1 - elapsed / duration;

        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);

        if (p.shape === "rect") {
          ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });
      raf(draw);
    }
    raf(draw);
  }

  // Wire [confetti-trigger]
  function initConfettiTriggers() {
    on(document, "click", (e) => {
      const btn = e.target.closest("[confetti-trigger]");
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      confetti({
        count:  parseInt(btn.getAttribute("confetti-count") || "80"),
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top  + rect.height / 2) / window.innerHeight,
        },
      });
    });
  }

  /* ── 12. COUNTER ANIMATION ──────────────────────────────────── */
  function animateCounter(el) {
    const end      = parseFloat(el.getAttribute("counter"));
    const start    = parseFloat(el.getAttribute("counter-from") || "0");
    const dur      = parseInt(el.getAttribute("counter-duration") || "1500");
    const decimals = (el.getAttribute("counter-decimals") || "0");
    const prefix   = el.getAttribute("counter-prefix") || "";
    const suffix   = el.getAttribute("counter-suffix") || "";
    const sep      = el.hasAttribute("counter-sep");

    const startTime = performance.now();

    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

    function tick(now) {
      const progress = clamp((now - startTime) / dur, 0, 1);
      const val = start + (end - start) * easeOut(progress);
      let display = val.toFixed(parseInt(decimals));
      if (sep) display = parseFloat(display).toLocaleString();
      el.textContent = `${prefix}${display}${suffix}`;
      if (progress < 1) raf(tick);
    }
    raf(tick);
  }

  function initCounters() {
    const els = $$("[counter]");
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCounter(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    els.forEach((el) => io.observe(el));
  }

  /* ── 13. MARQUEE (auto-clone for seamless loop) ─────────────── */
  function initMarquee() {
    $$("[marquee]").forEach((el) => {
      const track = $("[marquee-track]", el);
      if (!track) return;
      // Clone children for seamless loop
      const clone = track.cloneNode(true);
      el.appendChild(clone);
    });
  }

  /* ── 14. THEME TOGGLE ───────────────────────────────────────── */
  function initThemeToggle() {
    const stored = localStorage.getItem("lux-scheme") || "dark";
    applyScheme(stored);

    on(document, "click", (e) => {
      const btn = e.target.closest("[theme-toggle]");
      if (!btn) return;
      const current = document.documentElement.getAttribute("scheme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      applyScheme(next);
      localStorage.setItem("lux-scheme", next);
      btn.dispatchEvent(new CustomEvent("lux:theme:change", { detail: { scheme: next }, bubbles: true }));
    });
  }

  function applyScheme(scheme) {
    document.documentElement.setAttribute("scheme", scheme);
  }

  /* ── 15. PARALLAX ───────────────────────────────────────────── */
  function initParallax() {
    const els = $$("[scroll-anim='parallax']");
    if (!els.length) return;

    function update() {
      const sy = window.scrollY;
      els.forEach((el) => {
        const speed = parseFloat(el.getAttribute("parallax-speed") || "0.3");
        el.style.transform = `translateY(${sy * speed}px)`;
      });
    }
    on(window, "scroll", update, { passive: true });
    update();
  }

  /* ── 16. SCROLL PROGRESS ────────────────────────────────────── */
  function initScrollProgress() {
    const bars = $$("[scroll-anim='progress']");
    if (!bars.length) return;

    function update() {
      const scrollTop = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? scrollTop / docH : 0;
      bars.forEach((bar) => {
        bar.style.transform = `scaleX(${pct})`;
      });
    }
    on(window, "scroll", update, { passive: true });
    update();
  }

  /* ── 17. STICKY FADE ────────────────────────────────────────── */
  function initStickyFade() {
    const els = $$("[scroll-anim='sticky-fade']");
    if (!els.length) return;

    function update() {
      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const progress = clamp(-rect.top / (rect.height * 0.8), 0, 1);
        el.style.opacity = 1 - progress;
      });
    }
    on(window, "scroll", update, { passive: true });
    update();
  }

  /* ── 18. SEED COLOR ─────────────────────────────────────────── */
  function initSeedColor() {
    $$("[seed]").forEach((el) => {
      const color = el.getAttribute("seed");
      if (color) el.style.setProperty("--lux-seed", color);
    });
  }

  /* ── 19. LAZY IMAGES ────────────────────────────────────────── */
  function initLazyImages() {
    const imgs = $$("img[lazy]");
    if (!imgs.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const img = e.target;
            if (img.dataset.src) img.src = img.dataset.src;
            img.removeAttribute("lazy");
            io.unobserve(img);
          }
        });
      },
      { rootMargin: "200px" }
    );
    imgs.forEach((img) => io.observe(img));
  }

  /* ── 20. COPY TO CLIPBOARD ──────────────────────────────────── */
  function initCopyButtons() {
    on(document, "click", (e) => {
      const btn = e.target.closest("[copy]");
      if (!btn) return;
      const target = btn.getAttribute("copy");
      let text = target
        ? ($(target) || document.getElementById(target.slice(1)))?.textContent || target
        : btn.textContent;

      navigator.clipboard?.writeText(text.trim()).then(() => {
        const orig = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => (btn.textContent = orig), 1500);
      });
    });
  }

  /* ── 21. SMOOTH SCROLL ANCHORS ──────────────────────────────── */
  function initSmoothAnchors() {
    on(document, "click", (e) => {
      const a = e.target.closest("[smooth-scroll]");
      if (!a) return;
      const href = a.getAttribute("href") || a.getAttribute("smooth-scroll");
      if (!href || !href.startsWith("#")) return;
      const target = document.getElementById(href.slice(1));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  /* ── 22. TOGGLE VISIBILITY ──────────────────────────────────── */
  function initToggle() {
    on(document, "click", (e) => {
      const btn = e.target.closest("[toggle]");
      if (!btn) return;
      const target = btn.getAttribute("toggle");
      const el = $(target) || document.getElementById(target.slice(1));
      if (!el) return;
      const hidden = el.style.display === "none" || el.hasAttribute("hidden");
      el.style.display = hidden ? "" : "none";
      el.toggleAttribute("hidden", !hidden);
    });
  }

  /* ── 23. DISMISS ────────────────────────────────────────────── */
  function initDismiss() {
    on(document, "click", (e) => {
      const btn = e.target.closest("[dismiss]");
      if (!btn) return;
      const target = btn.getAttribute("dismiss");
      const el = target
        ? $(target) || document.getElementById(target.slice(1))
        : btn.closest("[surface], [surface='matte'], [surface='glass']");
      if (!el) return;
      el.style.transition = "opacity 0.2s, transform 0.2s";
      el.style.opacity = "0";
      el.style.transform = "scale(0.96)";
      setTimeout(() => el.remove(), 220);
    });
  }

  /* ── 24. AUTO STAGGER REVEAL ────────────────────────────────── */
  function initStagger() {
    $$("[stagger]").forEach((parent) => {
      const base = parseInt(parent.getAttribute("stagger") || "80");
      [...parent.children].forEach((child, i) => {
        if (!child.hasAttribute("reveal")) child.setAttribute("reveal", "bottom");
        child.setAttribute("reveal-delay", String(i * base));
      });
    });
    // Re-init reveal after stagger attribution
    initReveal();
  }

  /* ── 25. SPOTLIGHT HOVER EFFECT ─────────────────────────────── */
  function initSpotlight() {
    $$("[spotlight]").forEach((el) => {
      el.style.position = el.style.position || "relative";
      el.style.overflow = "hidden";

      const spot = document.createElement("div");
      Object.assign(spot.style, {
        position: "absolute", inset: "0",
        background: "radial-gradient(circle 200px at -100px -100px, rgba(255,255,255,0.06), transparent)",
        pointerEvents: "none",
        borderRadius: "inherit",
        transition: "background 0.1s",
      });
      el.appendChild(spot);

      on(el, "mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        spot.style.background = `radial-gradient(circle 180px at ${x}px ${y}px, rgba(255,255,255,0.09), transparent)`;
      });
      on(el, "mouseleave", () => {
        spot.style.background = "radial-gradient(circle 200px at -100px -100px, rgba(255,255,255,0.06), transparent)";
      });
    });
  }

  /* ── 26. RIPPLE EFFECT ──────────────────────────────────────── */
  function initRipple() {
    on(document, "click", (e) => {
      const el = e.target.closest("[ripple]");
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top  - size / 2;

      const ripple = document.createElement("span");
      Object.assign(ripple.style, {
        position: "absolute",
        width: size + "px", height: size + "px",
        left: x + "px", top: y + "px",
        background: "rgba(255,255,255,0.25)",
        borderRadius: "50%",
        transform: "scale(0)",
        animation: "lux-ripple 0.5s ease-out forwards",
        pointerEvents: "none",
      });

      if (!document.getElementById("lux-ripple-style")) {
        const s = document.createElement("style");
        s.id = "lux-ripple-style";
        s.textContent = "@keyframes lux-ripple{to{transform:scale(1);opacity:0}}";
        document.head.appendChild(s);
      }

      if (getComputedStyle(el).position === "static") el.style.position = "relative";
      el.style.overflow = "hidden";
      el.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  }

  /* ── 27. TYPEWRITER ─────────────────────────────────────────── */
  function initTypewriter() {
    $$("[typewriter]").forEach((el) => {
      const text    = el.textContent;
      const speed   = parseInt(el.getAttribute("typewriter-speed") || "50");
      const loop    = el.hasAttribute("typewriter-loop");
      const cursor  = el.hasAttribute("typewriter-cursor");
      el.textContent = "";
      if (cursor) el.style.borderRight = "2px solid currentColor";

      let i = 0;
      function type() {
        if (i <= text.length) {
          el.textContent = text.slice(0, i++);
          setTimeout(type, speed);
        } else if (loop) {
          setTimeout(() => {
            i = 0;
            type();
          }, 1500);
        } else {
          if (cursor) el.style.borderRight = "none";
        }
      }

      const io = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) { io.disconnect(); type(); }
        },
        { threshold: 0.5 }
      );
      io.observe(el);
    });
  }

  /* ── 28. CUSTOM CURSOR ──────────────────────────────────────── */
  function initCustomCursor() {
    const host = $("[custom-cursor]");
    if (!host) return;

    document.body.style.cursor = "none";
    const dot = document.createElement("div");
    const ring = document.createElement("div");

    Object.assign(dot.style, {
      position: "fixed", width: "8px", height: "8px",
      borderRadius: "50%", background: "var(--lux-primary)",
      pointerEvents: "none", zIndex: "99999",
      transform: "translate(-50%, -50%)",
      transition: "transform 0.1s, width 0.2s, height 0.2s",
    });
    Object.assign(ring.style, {
      position: "fixed", width: "32px", height: "32px",
      borderRadius: "50%", border: "1.5px solid var(--lux-primary)",
      pointerEvents: "none", zIndex: "99998",
      transform: "translate(-50%, -50%)",
      transition: "transform 0.12s ease-out, width 0.2s, height 0.2s, opacity 0.2s",
      opacity: "0.6",
    });

    document.body.append(dot, ring);

    let mx = 0, my = 0, rx = 0, ry = 0;
    on(document, "mousemove", (e) => { mx = e.clientX; my = e.clientY; });

    function moveCursor() {
      dot.style.left  = mx + "px";
      dot.style.top   = my + "px";
      rx = lerp(rx, mx, 0.15);
      ry = lerp(ry, my, 0.15);
      ring.style.left = rx + "px";
      ring.style.top  = ry + "px";
      raf(moveCursor);
    }
    raf(moveCursor);

    // Scale on hover over clickables
    on(document, "mouseover", (e) => {
      if (e.target.closest("a, button, [onclick], [ripple], [magnetic], input, textarea")) {
        dot.style.transform  = "translate(-50%, -50%) scale(2)";
        ring.style.width     = "50px";
        ring.style.height    = "50px";
        ring.style.opacity   = "0.3";
      }
    });
    on(document, "mouseout", () => {
      dot.style.transform  = "translate(-50%, -50%) scale(1)";
      ring.style.width     = "32px";
      ring.style.height    = "32px";
      ring.style.opacity   = "0.6";
    });
  }

  /* ── 29. EXPOSE PUBLIC API ──────────────────────────────────── */
  const Lux = {
    toast,
    confetti,
    applyScheme,
    openModal,
    closeModal,
    openDrawer,
    closeDrawer,
    animateCounter,

    init() {
      initReveal();
      initStagger();
      initAccordion();
      initTabs();
      initModal();
      initDrawer();
      initPopover();
      initToastTriggers();
      initConfettiTriggers();
      initTilt();
      initMagnetic();
      initCursorTrail();
      initCounters();
      initMarquee();
      initThemeToggle();
      initParallax();
      initScrollProgress();
      initStickyFade();
      initSeedColor();
      initLazyImages();
      initCopyButtons();
      initSmoothAnchors();
      initToggle();
      initDismiss();
      initSpotlight();
      initRipple();
      initTypewriter();
      initCustomCursor();
    },
  };

  // Auto-init on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => Lux.init());
  } else {
    Lux.init();
  }

  // Expose globally
  global.Lux = Lux;
})(window);
