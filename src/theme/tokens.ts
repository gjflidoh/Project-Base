// Design tokens ported from Stockaz.dc.html (Claude Design handoff).
// Palette: warm cream backgrounds, camel-brown accent, soft glass panels.

export const color = {
  // backgrounds
  canvas: '#e8ece9',
  screen: '#F7F4EF',
  screenDark: '#141210',

  // ink (text)
  ink: '#1B1610',
  inkOnDark: '#F4EFE7',
  sub: '#6B6055',
  sub2: '#7A6F62',
  faint: '#9A8D7D',
  faint2: '#A69A8A',
  hairlineOnFaint: '#C2B6A6',

  // accent (camel brown)
  accent: '#7C6340',
  accentDark: '#5E4A2E',
  accentSoft: 'rgba(149,119,80,.12)',
  accentSoft2: 'rgba(149,119,80,.1)',
  accentBorder: 'rgba(149,119,80,.3)',
  accentDot: '#957750',

  // status
  danger: '#E5484D',
  dangerInk: '#C0332F',
  dangerInkStrong: '#B92E28',
  dangerInkText: '#A32824',
  dangerBg: 'rgba(197,44,40,.08)',
  dangerBorder: 'rgba(197,44,40,.2)',
  warn: '#E08A00',
  warnInk: '#B96B0A',
  warnInkStrong: '#8A5A06',
  warnBg: 'rgba(224,138,0,.14)',
  ok: '#957750',
  okInk: '#58452B',
  okBg: 'rgba(149,119,80,.13)',
  flatInk: '#6B6055',
  flatBg: 'rgba(27,22,16,.06)',

  // hairlines / overlays over the cream screen
  hairline: 'rgba(27,22,16,.06)',
  hairline2: 'rgba(27,22,16,.08)',
  hairlineStrong: 'rgba(27,22,16,.1)',
  scrim: 'rgba(22,17,11,.36)',

  // glass panel fills (alpha over `screen`)
  glass50: 'rgba(255,255,255,.5)',
  glass55: 'rgba(255,255,255,.55)',
  glass56: 'rgba(255,255,255,.56)',
  glass58: 'rgba(255,255,255,.58)',
  glass6: 'rgba(255,255,255,.6)',
  glass62: 'rgba(255,255,255,.62)',
  glass66: 'rgba(255,255,255,.66)',
  glass7: 'rgba(255,255,255,.7)',
  glass74: 'rgba(255,255,255,.74)',
  glass78: 'rgba(255,255,255,.78)',
  glass8: 'rgba(255,255,255,.8)',
  glass85: 'rgba(255,255,255,.85)',
  glass9: 'rgba(255,255,255,.9)',
  glass92: 'rgba(255,255,255,.92)',
  glass94: 'rgba(255,255,255,.94)',
  glassBorder: 'rgba(255,255,255,.9)',
  glassBorderStrong: 'rgba(255,255,255,.95)',

  white: '#ffffff',
} as const;

// Gradient stops, for expo-linear-gradient. Angle is approximated by `start`/`end`.
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

export const badgeTone = {
  ok: { ink: color.okInk, bg: color.okBg },
  warn: { ink: color.warnInkStrong, bg: color.warnBg },
  bad: { ink: color.dangerInkText, bg: color.dangerBg },
  flat: { ink: color.flatInk, bg: color.flatBg },
} as const;

export type ToneKey = keyof typeof badgeTone;
