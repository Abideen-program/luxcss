/**
 * Lux CSS — TypeScript Declarations
 * Attribute-first CSS & JS library
 * https://abideen-program.github.io/luxcss/
 */

// ── Lux JS API ───────────────────────────────────────────────

export interface ToastOptions {
  title?: string;
  type?: 'default' | 'success' | 'danger' | 'warning' | 'info';
  duration?: number;
  position?: string;
}

export interface ToastInstance {
  dismiss: () => void;
}

export interface ConfettiOptions {
  count?: number;
  duration?: number;
  origin?: { x: number; y: number };
}

export interface LuxAPI {
  toast: (msg: string, opts?: ToastOptions) => ToastInstance;
  confetti: (opts?: ConfettiOptions) => void;
  applyScheme: (scheme: 'dark' | 'light') => void;
  openModal: (backdropEl: HTMLElement) => void;
  closeModal: (backdropEl: HTMLElement) => void;
  openDrawer: (backdropEl: HTMLElement) => void;
  closeDrawer: (backdropEl: HTMLElement) => void;
  animateCounter: (el: HTMLElement) => void;
  init: () => void;
}

declare global {
  interface Window {
    Lux: LuxAPI;
  }
}

// ── Lux HTML Attributes ──────────────────────────────────────

type LuxTone =
  | 'primary' | 'danger' | 'success'
  | 'warning' | 'info' | 'accent' | 'neutral';

type LuxSurface =
  | 'solid' | 'matte' | 'glass' | 'frosted'
  | 'ghost' | 'neon' | 'outline' | 'raised'
  | 'ink' | 'aurora' | 'mesh' | 'noise-surface';

type LuxDensity = 'compact' | 'default' | 'spacious' | 'loose';

type LuxRadius = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

type LuxLayout =
  | 'stack' | 'row' | 'cluster' | 'grid'
  | 'center' | 'cover' | 'sidebar' | 'masonry'
  | 'prose' | 'holy-grail' | 'split' | 'bento';

type LuxText =
  | 'hero' | 'display' | 'heading' | 'subheading'
  | 'lead' | 'body' | 'caption' | 'label'
  | 'overline' | 'code';

type LuxMotion = 'subtle' | 'expressive' | 'dramatic' | 'press' | 'none';

type LuxAnimate =
  | 'spin' | 'pulse' | 'bounce' | 'wiggle'
  | 'shake' | 'ping' | 'blink' | 'heartbeat'
  | 'rubber' | 'flip' | 'swing' | 'tada';

type LuxReveal =
  | 'bottom' | 'top' | 'left' | 'right'
  | 'scale' | 'blur' | 'rotate' | 'flip' | '';

type LuxGradient =
  | 'sunset' | 'ocean' | 'forest' | 'aurora'
  | 'fire' | 'rose' | 'midnight' | 'cosmos'
  | 'candy' | 'neon' | 'gold' | 'silver'
  | 'peach' | 'emerald' | 'electric' | 'thermal'
  | 'matrix' | 'infrared';

type LuxTextGradient =
  | 'sunset' | 'ocean' | 'fire' | 'aurora'
  | 'neon' | 'gold' | 'candy' | 'electric';

type LuxFilter =
  | 'blur-sm' | 'blur-md' | 'blur-lg'
  | 'grayscale' | 'sepia' | 'invert'
  | 'saturate' | 'desaturate' | 'bright'
  | 'dim' | 'hue-90' | 'hue-180'
  | 'contrast' | 'vintage' | 'dreamy';

type LuxBackdrop =
  | 'blur-sm' | 'blur-md' | 'blur-lg'
  | 'darken' | 'lighten';

type LuxPattern =
  | 'grid' | 'dots' | 'stripes' | 'crosshatch'
  | 'checker' | 'diamonds' | 'hexagon' | 'noise';

type LuxMask =
  | 'fade-bottom' | 'fade-top' | 'fade-x'
  | 'vignette' | 'circle' | 'spotlight';

type LuxClip =
  | 'circle' | 'ellipse' | 'diamond' | 'hex'
  | 'star' | 'arrow' | 'notch' | 'chevron'
  | 'slant-r' | 'slant-l' | 'wave';

type LuxElevation = 'none' | 'xs' | 'low' | 'mid' | 'high' | 'float';

type LuxSpring = '' | 'bouncy' | 'gentle';

type LuxFloat = 'slow' | 'med' | 'fast';

type LuxGap = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

type LuxCols = '1' | '2' | '3' | '4' | '5' | '6' | '12' | 'auto';

type LuxSpan = '1' | '2' | '3' | '4' | 'full';

type LuxAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

type LuxJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

type LuxWeight =
  | 'thin' | 'light' | 'regular' | 'medium'
  | 'semibold' | 'bold' | 'black';

type LuxFluid = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

type LuxScrollAnim = 'parallax' | 'progress' | 'sticky-fade';

type LuxGlow = '' | 'sm' | 'md' | 'lg' | 'pulse';

type LuxRing = '' | 'sm' | 'lg' | 'inset';

type LuxBadge = '' | 'dot' | 'counter' | 'pill';

type LuxProgress = '' | 'striped';

type LuxScheme = 'dark' | 'light';

type LuxDrawerSide = 'top' | 'right' | 'bottom' | 'left';

type LuxCursorTrail = '' | 'dots' | 'line';

type LuxLayer = 'base' | 'raised' | 'floating' | 'overlay' | 'top';

type LuxAspect = 'square' | 'video' | 'portrait' | 'wide' | 'golden';

type LuxObject = 'cover' | 'contain' | 'fill';

type LuxOverflow = 'hidden' | 'auto' | 'scroll' | 'clip';

type LuxBlend =
  | 'multiply' | 'screen' | 'overlay'
  | 'difference' | 'color-dodge';

type LuxOpacity = '0' | '25' | '50' | '75' | '100';

type LuxCursor =
  | 'pointer' | 'default' | 'grab'
  | 'crosshair' | 'zoom' | 'none';

type LuxScrollbar = 'none' | 'thin';

type LuxPos = 'relative' | 'absolute' | 'fixed' | 'sticky';

type LuxW = 'full' | 'screen' | 'auto';

type LuxH = 'full' | 'screen' | 'auto';

type LuxZ = '0' | '10' | '20' | '50' | '100';

type LuxTextAlign = 'left' | 'center' | 'right' | 'justify';

type LuxTruncate = '' | '2' | '3' | '4' | '5';

type LuxTextShadow = 'sm' | 'md' | 'lg' | 'glow';

type LuxTextStroke = 'sm' | 'md';

type LuxTextGlow = '' | 'lg';

type LuxTracking = 'tight' | 'normal' | 'wide' | 'wider';

type LuxLeading = 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';

type LuxRevealDelay =
  | '100' | '200' | '300' | '400' | '500'
  | '600' | '800' | '1000';

type LuxAnimDuration = 'fast' | 'slow';

type LuxBreakpointCols = '1' | '2' | '3' | '4' | '5' | '6';

type LuxToastType = 'success' | 'danger' | 'warning' | 'info' | 'default';

// ── Augment React's HTML attributes ─────────────────────────

declare module 'react' {
  interface HTMLAttributes<T> {
    // Surfaces & Color
    surface?: LuxSurface;
    tone?: LuxTone;
    density?: LuxDensity;
    radius?: LuxRadius;
    seed?: string;
    scheme?: LuxScheme;

    // Layout
    layout?: LuxLayout;
    cols?: LuxCols;
    'sm-cols'?: LuxBreakpointCols;
    'md-cols'?: LuxBreakpointCols;
    'lg-cols'?: LuxBreakpointCols;
    'xl-cols'?: LuxBreakpointCols;
    span?: LuxSpan;
    gap?: LuxGap;
    align?: LuxAlign;
    justify?: LuxJustify;
    wrap?: boolean | string;
    grow?: boolean | string;
    shrink?: boolean | string;
    adaptive?: boolean | string;
    stagger?: string;
    cq?: boolean | string;
    'cq-sm-cols'?: LuxBreakpointCols;
    'cq-md-cols'?: LuxBreakpointCols;
    'cq-lg-cols'?: LuxBreakpointCols;

    // Typography
    text?: LuxText;
    weight?: LuxWeight;
    fluid?: LuxFluid;
    'text-align'?: LuxTextAlign;
    truncate?: LuxTruncate;
    balance?: boolean | string;
    pretty?: boolean | string;
    'text-gradient'?: LuxTextGradient;
    'text-shadow'?: LuxTextShadow;
    'text-stroke'?: LuxTextStroke;
    'text-glow'?: LuxTextGlow;
    highlight?: boolean | string;
    tracking?: LuxTracking;
    leading?: LuxLeading;

    // Motion
    motion?: LuxMotion;
    animate?: LuxAnimate;
    'anim-duration'?: LuxAnimDuration;
    'anim-once'?: boolean | string;
    spring?: LuxSpring;
    float?: LuxFloat;
    axis?: 'xy';
    reveal?: LuxReveal;
    'reveal-delay'?: LuxRevealDelay;
    'scroll-anim'?: LuxScrollAnim;
    'parallax-speed'?: string;

    // Gradients & Effects
    gradient?: LuxGradient;
    glow?: LuxGlow;
    'text-glow'?: LuxTextGlow;
    ring?: LuxRing;
    filter?: LuxFilter;
    backdrop?: LuxBackdrop;
    pattern?: LuxPattern;
    mask?: LuxMask;
    clip?: LuxClip;
    shimmer?: boolean | string;
    skeleton?: boolean | string;
    blend?: LuxBlend;

    // Elevation & Layer
    elevation?: LuxElevation;
    layer?: LuxLayer;
    'shadow'?: string;

    // Components
    accordion?: boolean | string;
    'accordion-item'?: boolean | string;
    'accordion-trigger'?: boolean | string;
    'accordion-content'?: boolean | string;
    multi?: boolean | string;
    tabs?: boolean | string;
    'tab-list'?: boolean | string;
    tab?: boolean | string;
    'tab-panel'?: boolean | string;
    'modal-backdrop'?: boolean | string;
    modal?: boolean | string;
    'modal-wrapper'?: boolean | string;
    'modal-close'?: boolean | string;
    'modal-open'?: string;
    'drawer-backdrop'?: boolean | string;
    drawer?: boolean | string;
    'drawer-side'?: LuxDrawerSide;
    'drawer-close'?: boolean | string;
    'drawer-open'?: string;
    'popover-trigger'?: boolean | string;
    'popover-panel'?: boolean | string;
    progress?: LuxProgress;
    'progress-bar'?: boolean | string;
    badge?: LuxBadge;
    tooltip?: string;
    'tooltip-pos'?: 'top' | 'bottom' | 'left' | 'right';
    field?: boolean | string;
    hint?: boolean | string;
    input?: '' | 'text' | 'textarea' | 'select' | 'range' | 'checkbox' | 'radio';
    state?: 'disabled' | 'loading' | 'error' | 'success' | 'warning';
    disabled?: boolean;

    // Toast
    'toast-trigger'?: boolean | string;
    'toast-title'?: string;
    'toast-msg'?: string;
    'toast-type'?: LuxToastType;
    'toast-duration'?: string;

    // JS Features
    tilt?: string;
    'tilt-glare'?: boolean | string;
    magnetic?: string;
    ripple?: boolean | string;
    spotlight?: boolean | string;
    'confetti-trigger'?: boolean | string;
    'confetti-count'?: string;
    typewriter?: boolean | string;
    'typewriter-speed'?: string;
    'typewriter-cursor'?: boolean | string;
    'typewriter-loop'?: boolean | string;
    counter?: string;
    'counter-from'?: string;
    'counter-duration'?: string;
    'counter-decimals'?: string;
    'counter-prefix'?: string;
    'counter-suffix'?: string;
    'counter-sep'?: boolean | string;
    marquee?: boolean | string;
    'marquee-track'?: boolean | string;
    speed?: 'fast' | 'slow';
    direction?: 'right';
    'theme-toggle'?: boolean | string;
    'cursor-trail'?: LuxCursorTrail;
    'cursor-color'?: string;
    'custom-cursor'?: boolean | string;

    // Scroll
    'scroll'?: 'snap-x' | 'snap-y';
    snap?: '' | 'center' | 'end';
    scrollbar?: LuxScrollbar;
    overscroll?: 'contain' | 'none';

    // Utilities
    aspect?: LuxAspect;
    object?: LuxObject;
    overflow?: LuxOverflow;
    opacity?: LuxOpacity;
    cursor?: LuxCursor;
    pos?: LuxPos;
    w?: LuxW;
    h?: LuxH;
    z?: LuxZ;
    inset?: boolean | string;
    'center-abs'?: boolean | string;
    'no-select'?: boolean | string;
    'pointer-none'?: boolean | string;
    'pointer-auto'?: boolean | string;
    'hide'?: 'mobile' | 'tablet' | 'desktop';
    'show'?: 'mobile' | 'tablet' | 'desktop';
    dismiss?: boolean | string;
    copy?: string;
    toggle?: string;
    'smooth-scroll'?: boolean | string;
    lazy?: boolean | string;
    'divide'?: 'y' | 'x' | 'dashed-y' | 'dashed-x';
    'elevation'?: LuxElevation;
    'marker'?: boolean | string;
    'data-original'?: string;
    'data-text'?: string;
  }
}

// ── Augment standard HTML for non-React use ──────────────────

interface HTMLElement {
  // allows setting lux attributes via setAttribute without TS errors
  [key: string]: any;
}

export {};
