// Design tokens ported from Stockaz.dc.html (Claude Design handoff).
// Palette: warm cream backgrounds, camel-brown accent, soft glass panels.
//
// `color` and `badgeTone` below are live Proxies, not plain objects: every
// property read re-resolves against whichever palette (light/dark) is
// currently active, so screens that just write `color.ink` need no changes
// to support dark mode — call `setDarkMode(true/false)` (done from the
// store's `toggleDark` action) and the next render picks up the new values.

function palette(p: {
  screen: string; ink: string; sub: string; sub2: string; faint: string; faint2: string; hairlineOnFaint: string;
  accent: string; accentDark: string; accentSoft: string; accentSoft2: string; accentBorder: string; accentDot: string;
  danger: string; dangerInk: string; dangerInkStrong: string; dangerInkText: string; dangerBg: string; dangerBorder: string;
  warn: string; warnInk: string; warnInkStrong: string; warnBg: string;
  ok: string; okInk: string; okBg: string; flatInk: string; flatBg: string;
  hairline: string; hairline2: string; hairlineStrong: string; scrim: string;
  glassBase: string; glassBorder: string; glassBorderStrong: string; sheetSurface: string;
  disabledFill: string; mutedButton: string;
}) {
  const g = (alpha: string) => `rgba(${p.glassBase},${alpha})`;
  return {
    screen: p.screen,
    screenDark: p.screen,
    ink: p.ink,
    inkOnDark: p.ink,
    sub: p.sub,
    sub2: p.sub2,
    faint: p.faint,
    faint2: p.faint2,
    hairlineOnFaint: p.hairlineOnFaint,

    accent: p.accent,
    accentDark: p.accentDark,
    accentSoft: p.accentSoft,
    accentSoft2: p.accentSoft2,
    accentBorder: p.accentBorder,
    accentDot: p.accentDot,

    danger: p.danger,
    dangerInk: p.dangerInk,
    dangerInkStrong: p.dangerInkStrong,
    dangerInkText: p.dangerInkText,
    dangerBg: p.dangerBg,
    dangerBorder: p.dangerBorder,
    warn: p.warn,
    warnInk: p.warnInk,
    warnInkStrong: p.warnInkStrong,
    warnBg: p.warnBg,
    ok: p.ok,
    okInk: p.okInk,
    okBg: p.okBg,
    flatInk: p.flatInk,
    flatBg: p.flatBg,

    hairline: p.hairline,
    hairline2: p.hairline2,
    hairlineStrong: p.hairlineStrong,
    scrim: p.scrim,

    // "Glass" fills — deliberately high-opacity even though they're meant to
    // sit under a blur: expo-blur doesn't reliably blur on Android, so these
    // have to read as clean cards on their own, with any real blur (where it
    // works) as a bonus rather than the thing carrying the effect.
    glass50: g('.80'), glass55: g('.82'), glass56: g('.83'), glass58: g('.84'),
    glass6: g('.86'), glass62: g('.87'), glass66: g('.89'), glass7: g('.90'),
    glass74: g('.91'), glass78: g('.92'), glass8: g('.93'), glass85: g('.95'),
    glass9: g('.96'), glass92: g('.97'), glass94: g('.98'),
    glassBorder: p.glassBorder,
    glassBorderStrong: p.glassBorderStrong,
    sheetSurface: p.sheetSurface,
    disabledFill: p.disabledFill,
    mutedButton: p.mutedButton,

    white: '#ffffff',
    // Product packshots are photographed on light/white backgrounds — keep
    // their mat fixed regardless of theme so images stay legible in dark
    // mode instead of sitting on a dark tile.
    productMat: '#F4F0E7',
  };
}

const lightPalette = palette({
  screen: '#F7F4EF', ink: '#1B1610', sub: '#6B6055', sub2: '#7A6F62', faint: '#9A8D7D', faint2: '#A69A8A', hairlineOnFaint: '#C2B6A6',
  accent: '#7C6340', accentDark: '#5E4A2E', accentSoft: 'rgba(149,119,80,.12)', accentSoft2: 'rgba(149,119,80,.1)', accentBorder: 'rgba(149,119,80,.3)', accentDot: '#957750',
  danger: '#E5484D', dangerInk: '#C0332F', dangerInkStrong: '#B92E28', dangerInkText: '#A32824', dangerBg: 'rgba(197,44,40,.08)', dangerBorder: 'rgba(197,44,40,.2)',
  warn: '#E08A00', warnInk: '#B96B0A', warnInkStrong: '#8A5A06', warnBg: 'rgba(224,138,0,.14)',
  ok: '#957750', okInk: '#58452B', okBg: 'rgba(149,119,80,.13)', flatInk: '#6B6055', flatBg: 'rgba(27,22,16,.06)',
  hairline: 'rgba(27,22,16,.06)', hairline2: 'rgba(27,22,16,.08)', hairlineStrong: 'rgba(27,22,16,.1)', scrim: 'rgba(22,17,11,.36)',
  glassBase: '255,255,255', glassBorder: 'rgba(255,255,255,.95)', glassBorderStrong: 'rgba(255,255,255,.98)', sheetSurface: 'rgba(255,255,255,.95)',
  disabledFill: 'rgba(27,22,16,.05)', mutedButton: 'rgba(27,22,16,.25)',
});

const darkPalette = palette({
  screen: '#15120D', ink: '#F5EFE3', sub: '#B9AD9C', sub2: '#A79A88', faint: '#8C8070', faint2: '#79705F', hairlineOnFaint: '#6E6353',
  accent: '#C9A36E', accentDark: '#8F7047', accentSoft: 'rgba(201,163,110,.16)', accentSoft2: 'rgba(201,163,110,.13)', accentBorder: 'rgba(201,163,110,.35)', accentDot: '#C9A36E',
  danger: '#FF6B66', dangerInk: '#FF7A73', dangerInkStrong: '#FF9089', dangerInkText: '#FF847D', dangerBg: 'rgba(255,107,102,.14)', dangerBorder: 'rgba(255,107,102,.3)',
  warn: '#FFB347', warnInk: '#FFB347', warnInkStrong: '#FFC670', warnBg: 'rgba(255,179,71,.16)',
  ok: '#C9A36E', okInk: '#E6C99A', okBg: 'rgba(201,163,110,.16)', flatInk: '#B9AD9C', flatBg: 'rgba(245,239,227,.08)',
  hairline: 'rgba(245,239,227,.08)', hairline2: 'rgba(245,239,227,.11)', hairlineStrong: 'rgba(245,239,227,.15)', scrim: 'rgba(0,0,0,.5)',
  glassBase: '38,32,25', glassBorder: 'rgba(245,239,227,.1)', glassBorderStrong: 'rgba(245,239,227,.16)', sheetSurface: 'rgba(30,25,19,.96)',
  disabledFill: 'rgba(245,239,227,.06)', mutedButton: 'rgba(245,239,227,.16)',
});

export type Palette = typeof lightPalette;

let isDarkMode = false;
export function setDarkMode(v: boolean) {
  isDarkMode = v;
}
export function isDark() {
  return isDarkMode;
}
function activePalette(): Palette {
  return isDarkMode ? darkPalette : lightPalette;
}

export const color: Palette = new Proxy({} as Palette, {
  get(_target, prop: string) {
    return activePalette()[prop as keyof Palette];
  },
}) as Palette;

// Gradient stops, for expo-linear-gradient. Angle is approximated by `start`/`end`.
// Kept identical across themes — the camel-brown brand gradient reads fine
// against both a light and a dark surface, same as most apps keep their
// brand-color CTAs unchanged in dark mode.
export const gradient = {
  // linear-gradient(150deg,#A08256,#7A5F3C) — primary buttons / FAB / +
  primary: { colors: ['#A08256', '#7A5F3C'], start: { x: 0.15, y: 0 }, end: { x: 0.85, y: 1 } },
  primaryHover: { colors: ['#A88961', '#806540'], start: { x: 0.15, y: 0 }, end: { x: 0.85, y: 1 } },
  // linear-gradient(150deg,#7C6340,#5E4A2E) — home header avatar
  avatar: { colors: ['#7C6340', '#5E4A2E'], start: { x: 0.15, y: 0 }, end: { x: 0.85, y: 1 } },
  // linear-gradient(150deg,#A08256,#5E4A2E) — profile / account avatar
  avatarLarge: { colors: ['#A08256', '#5E4A2E'], start: { x: 0.15, y: 0 }, end: { x: 0.85, y: 1 } },
  // linear-gradient(155deg,rgba(138,110,72,.92),rgba(84,66,43,.94)) — hero cards
  hero: { colors: ['rgba(138,110,72,.92)', 'rgba(84,66,43,.94)'], start: { x: 0.12, y: 0 }, end: { x: 0.88, y: 1 } },
} as const;

export const radius = {
  xs: 9,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  xxxl: 22,
  huge: 24,
  massive: 26,
  card: 28,
  sheet: 30,
  pill: 999,
} as const;

export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

export const type = {
  screenTitle: { fontSize: 25, fontWeight: '800' as const, letterSpacing: -0.5 },
  h1: { fontSize: 26, fontWeight: '800' as const, letterSpacing: -0.5 },
  h2: { fontSize: 22, fontWeight: '800' as const, letterSpacing: -0.4 },
  h3: { fontSize: 21, fontWeight: '800' as const, letterSpacing: -0.4 },
  h4: { fontSize: 18, fontWeight: '800' as const, letterSpacing: -0.3 },
  amountHero: { fontSize: 52, fontWeight: '800' as const, letterSpacing: -1.5 },
  amountLg: { fontSize: 42, fontWeight: '800' as const, letterSpacing: -1.3 },
  amountMd: { fontSize: 34, fontWeight: '800' as const, letterSpacing: -1 },
  title: { fontSize: 16.5, fontWeight: '800' as const, letterSpacing: -0.3 },
  bodyBold: { fontSize: 14.5, fontWeight: '700' as const },
  body: { fontSize: 14, fontWeight: '600' as const },
  label: { fontSize: 13, fontWeight: '700' as const },
  small: { fontSize: 12.5, fontWeight: '600' as const },
  tiny: { fontSize: 11.5, fontWeight: '600' as const },
  eyebrow: { fontSize: 11.5, fontWeight: '800' as const, letterSpacing: 1.6, textTransform: 'uppercase' as const },
  micro: { fontSize: 10.5, fontWeight: '600' as const },
};

export const shadow = {
  card: {
    shadowColor: '#3A2C1C',
    shadowOpacity: 0.16,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 4,
  },
  hero: {
    shadowColor: '#543F2A',
    shadowOpacity: 0.32,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 16 },
    elevation: 8,
  },
  button: {
    shadowColor: '#7A5F3C',
    shadowOpacity: 0.4,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  sheet: {
    shadowColor: '#3A2C1C',
    shadowOpacity: 0.28,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: -8 },
    elevation: 12,
  },
  phone: {
    shadowColor: '#281F14',
    shadowOpacity: 0.45,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 30 },
    elevation: 20,
  },
} as const;

export type ToneKey = 'ok' | 'warn' | 'bad' | 'flat';

function toneFor(key: ToneKey, p: Palette): { ink: string; bg: string } {
  switch (key) {
    case 'ok': return { ink: p.okInk, bg: p.okBg };
    case 'warn': return { ink: p.warnInkStrong, bg: p.warnBg };
    case 'bad': return { ink: p.dangerInkText, bg: p.dangerBg };
    default: return { ink: p.flatInk, bg: p.flatBg };
  }
}

export const badgeTone: Record<ToneKey, { ink: string; bg: string }> = new Proxy(
  {} as Record<ToneKey, { ink: string; bg: string }>,
  { get(_target, prop: string) { return toneFor(prop as ToneKey, activePalette()); } },
) as Record<ToneKey, { ink: string; bg: string }>;
