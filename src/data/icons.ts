// SVG path data ported verbatim from the ICONS / MORE_ICONS constants in
// Stockaz.dc.html. Rendered via react-native-svg (see components/Icon.tsx).

export const NAV_ICONS: Record<string, string> = {
  home: 'M4 11.5 12 4.5l8 7V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z',
  stock: 'M12 3.2 20 7.6v8.8L12 20.8 4 16.4V7.6zM4 7.6l8 4.4 8-4.4M12 12v8.8',
  receipt: 'M6 3h12v18l-3-2-3 2-3-2-3 2zM9.5 8h5M9.5 12h5',
  credit: 'M3 8.5h18M4 5.5h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1ZM6.5 14.5h4',
  more: 'M12 12h.01M8 12h.01M16 12h.01',
};

// Small reusable glyphs seen across many screens (back chevron, close X,
// search, +/-, checkmark, chevron-right/down, etc.) — paths lifted verbatim
// from the inline <svg> markup in Stockaz.dc.html.
export const GLYPH = {
  back: 'm15 18-6-6 6-6',
  close: 'M18 6 6 18M6 6l12 12',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  check: 'm5 13 4 4 10-10',
  chevronRight: 'm9 18 6-6-6-6',
  chevronDown: 'm6 9 6 6 6-6',
  filter: 'M3 5h18l-7 8v6l-4-2v-4z',
  scan: 'M4 7V5a1 1 0 0 1 1-1h2M17 4h2a1 1 0 0 1 1 1v2M20 17v2a1 1 0 0 1-1 1h-2M7 20H5a1 1 0 0 1-1-1v-2M4 12h16',
  logout: 'M15 17l5-5-5-5M20 12H9M12 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6',
  monitor: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z',
  gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12 3v2.2M12 18.8V21M4.6 7.5l1.9 1.1M17.5 15.4l1.9 1.1M4.6 16.5l1.9-1.1M17.5 8.6l1.9-1.1',
  moon: 'M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z',
  receipt: 'M5 3h14v18l-3-2-2 2-2-2-2 2-3-2z',
  cart: 'M5 9h14l-1.4 9.2a2 2 0 0 1-2 1.8H8.4a2 2 0 0 1-2-1.8ZM9 9V6.5a3 3 0 0 1 6 0V9',
} as const;

export const MORE_ICONS: Record<string, string> = {
  Receipts: 'M6 3h12v18l-3-2-3 2-3-2-3 2zM9.5 8h5M9.5 12h5',
  Reports: 'M4 20V4M4 20h16M8 17v-5M13 17V8M18 17v-9',
  Customers: 'M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM17 5.2a3 3 0 0 1 0 5.6M21 19v-1a4 4 0 0 0-3-3.8',
  Suppliers: 'M3 7.5h10v8.5H3zM13 10.5h4l3 3v2.5h-7M6.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM17 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z',
  Orders: 'M9 3.5h6v3H9zM9 5H7a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2M9 11h6M9 15h6',
  Invoices: 'M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7zM14 3v4h4M9 13h6M9 17h4',
  Quotations: 'M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7zM14 3v4h4M9 14.5l2 2 4-4',
  Expenses: 'M3 8.5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zM3 8.5 6 4.5h11M17 14h.01',
  Employees: 'M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1ZM9 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM6 16.2c.6-1.6 1.7-2.4 3-2.4s2.4.8 3 2.4M15 10h3M15 13.5h3',
  'Shop Settings': 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12 3v2.2M12 18.8V21M4.6 7.5l1.9 1.1M17.5 15.4l1.9 1.1M4.6 16.5l1.9-1.1M17.5 8.6l1.9-1.1',
  Subscription: 'M12 4.5l2.3 4.7 5.2.8-3.8 3.6.9 5.1-4.6-2.4-4.6 2.4.9-5.1-3.8-3.6 5.2-.8z',
  Account: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 12.5a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2ZM6.8 18.6c1-2 3-3.1 5.2-3.1s4.2 1.1 5.2 3.1',
};
