# Stockaz

A shop point-of-sale, inventory and credit-book app for small retailers,
built with **Expo + React Native + TypeScript**. This is a pixel-faithful
implementation of the `Stockaz.dc.html` Claude Design handoff — same screens,
same visual language (Manrope type, camel-brown accent, frosted glass cards),
same business logic — recreated as a real mobile app rather than the design
tool's HTML/CSS/JS prototype.

## Running it

```
npm install
npx expo start
```

Scan the QR code with Expo Go (iOS/Android), or press `i` / `a` for a
simulator/emulator.

## What's here

- **Home** — sales summary, quick-sell product grid
- **Stock** — search, stat tiles, add/restock products
- **New Sale (POS)** — cart, product grid, cash numpad checkout
- **Scan** — simulated barcode recognition flow
- **Receipts** — filterable history + receipt detail sheet
- **Credit** — the digital credit book: balances, dated history, manager
  approval PIN, record payments
- **More** — Shop Monitor, Reports, Settings, Subscription, Account, and the
  generic Customers/Suppliers/Orders/Invoices/Quotations/Expenses/Employees/
  Payments list+detail+form screens
- **Onboarding** — 5-step first-run setup

## Architecture

- `src/theme` — design tokens (colors, radii, type scale, gradients) and
  Manrope font loading
- `src/data` — the catalog, credit book, receipts, list/form configs, icon
  paths — ported from the design's JS data section
- `src/store` — a single Zustand store (`useStore`) holding all app state and
  actions, plus `selectors.ts` for derived/decorated data per screen
- `src/components` — shared UI (glass cards, product tiles, nav, sheets,
  keypad, etc.)
- `src/screens` / `src/sheets` — one file per screen/overlay
- `src/RootShell.tsx` — swaps the active screen and mounts every sheet

State is in-memory only (no backend, no persistence) — same as the source
design, which had none either.

## Known simplifications

- **Scan** is a timed simulation (matches the source design), not real
  camera/barcode recognition.
- **Dark mode** toggle (Profile sheet) flips a store flag but the app doesn't
  yet ship a second color theme — the source design achieved dark mode with a
  CSS `invert()` filter hack that has no RN equivalent; a real theme pass
  would thread theme tokens through every screen.
- A couple of controls that were visually present but unwired in the source
  (Receipts' search field, Stock's third icon button) were left as-is or
  dropped rather than inventing behavior that wasn't specified.
