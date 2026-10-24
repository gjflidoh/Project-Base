# Stockaz — Marketing Video Series

4 videos, each delivered in **Square 1:1** (1080×1080) and **Vertical 9:16** (1080×1920) — 8 files total.
Narrative shape: **problem → Stockaz solution**, every video ending on the same logo/CTA outro.
Audio treatment: **scripted voiceover** — record the VO lines below over the rendered (silent) picture lock; captions on-screen already mirror every VO line 1:1, so the videos work with or without the recorded audio.

Shared outro (all 4 videos, last ~2.5s): Stockaz wordmark on cream background, tagline **"Run your shop from your pocket."**, small "Free to start" badge.

---

## Video 1 — "The Notebook Problem" (Stock)
Runtime: 17s

| Time | Visual | VO | Caption |
|---|---|---|---|
| 0.0–3.5 | Dim, desaturated scene: a torn exercise-book page, handwritten tally marks and crossed-out numbers, pencil tapping impatiently | "Still counting stock in a notebook?" | STILL COUNTING STOCK IN A NOTEBOOK? |
| 3.5–6.5 | Page curls/dissolves away into light; color warms up | "One torn page, and you've lost a week of counts." | ONE TORN PAGE AND YOU'VE LOST A WEEK |
| 6.5–8.5 | Hard cut to full color — Stockaz phone mockup rises in, Stock screen fading in | "Stockaz keeps it on your phone instead." | STOCKAZ KEEPS IT ON YOUR PHONE |
| 8.5–13.0 | Stock screen live: search bar types "Peri Peri", list filters live, a low-stock badge pulses amber on "Peri Peri · 9 left" | "Search any product. See what's low, what's out, instantly." | SEE WHAT'S LOW — INSTANTLY |
| 13.0–14.5 | Quick zoom on stock value card: "34 products · K 48,210 in stock" counting up | "Your whole shop's value, at a glance." | YOUR WHOLE SHOP, AT A GLANCE |
| 14.5–17.0 | Outro | "Stockaz. Run your shop from your pocket." | STOCKAZ |

---

## Video 2 — "Who Owes What?" (Credit book)
Runtime: 16s

| Time | Visual | VO | Caption |
|---|---|---|---|
| 0.0–3.0 | Dim scene: a dog-eared exercise book full of names and amounts in different pens, a thumb flipping pages, frustrated | "Chasing credit in a notebook full of names?" | CHASING CREDIT IN A NOTEBOOK? |
| 3.0–6.0 | A name is circled messily, question mark drawn over an amount | "Whose turn to pay? Nobody's sure." | WHOSE TURN TO PAY? NOBODY'S SURE |
| 6.0–8.0 | Cut to color — Stockaz Credit Book screen fades in over phone mockup | "Stockaz keeps your credit book for you." | YOUR CREDIT BOOK, ON YOUR PHONE |
| 8.0–12.5 | Credit list live: rows for John Banda (OK, green), Kelvin Zulu (Overdue, red "K620"), filter chip "Overdue" tapped, list narrows to just the overdue row | "Every customer, every balance — sorted by who's overdue." | SORTED BY WHO'S OVERDUE |
| 12.5–14.0 | Tap into Kelvin Zulu's detail → "Add payment" button glows, amount K620 ticks down as a payment is logged | "Log a payment in two taps." | LOG A PAYMENT IN TWO TAPS |
| 14.0–16.0 | Outro | "Stockaz. Run your shop from your pocket." | STOCKAZ |

---

## Video 3 — "Is This Even In Stock?" (Barcode scan)
Runtime: 16s

| Time | Visual | VO | Caption |
|---|---|---|---|
| 0.0–3.0 | Dim scene: shopkeeper squinting at a shelf, scanning rows of packets by eye, shrugging | "Guessing if something's still in stock?" | GUESSING WHAT'S STILL IN STOCK? |
| 3.0–5.5 | Walks to the back, flips through the same torn notebook, finds nothing useful | "By the time you check the book, the customer's gone." | BY THE TIME YOU CHECK, THEY'RE GONE |
| 5.5–7.5 | Cut to color — phone mockup, camera viewfinder frame opens with a scan-line animation | "Stockaz scans the barcode instead." | STOCKAZ SCANS THE BARCODE |
| 7.5–12.0 | Scan-line sweeps across a Heinz Beans tin, corner brackets snap onto the barcode, green "match found" check — product card slides up: "Heinz Beans Original 415g · K25 · 42 left" | "Point. Scan. Know exactly what you've got — and the price." | POINT. SCAN. KNOW WHAT YOU'VE GOT |
| 12.0–14.0 | Two buttons appear under the card: "Sell" / "Restock" — Sell gets tapped, a receipt check-mark pops | "Sell it, or restock it — right from the scan." | SELL OR RESTOCK — RIGHT THERE |
| 14.0–16.0 | Outro | "Stockaz. Run your shop from your pocket." | STOCKAZ |

---

## Video 4 — "What Did I Even Sell Today?" (Reports / Monitor)
Runtime: 16s

| Time | Visual | VO | Caption |
|---|---|---|---|
| 0.0–3.0 | Dim scene: a shoebox of crumpled receipts being shaken out onto a table at night, exhausted sigh | "End of day, and you've no idea what actually sold?" | NO IDEA WHAT ACTUALLY SOLD TODAY? |
| 3.0–5.5 | Receipts scattered, none add up, a calculator with a long error-looking string of digits | "Adding it up by hand, every single night." | ADDING IT UP BY HAND, EVERY NIGHT |
| 5.5–7.5 | Cut to color — phone mockup, Reports screen fades in, big total counting up | "Stockaz adds it up the second you make the sale." | STOCKAZ ADDS IT UP AS YOU SELL |
| 7.5–12.0 | Reports screen live: "Today" tab, total "K 3,940" ticking up, a bar chart of top sellers growing in, "32 transactions" | "Today's total, your best sellers, who's on shift — all in one screen." | TOTAL, TOP SELLERS, ALL IN ONE SCREEN |
| 12.0–14.0 | Switch period chip "Today → Week → Month", chart reflows smoothly | "Zoom out any time — today, this week, this month." | ZOOM OUT ANY TIME |
| 14.0–16.0 | Outro | "Stockaz. Run your shop from your pocket." | STOCKAZ |

---

## Production notes
- All 4 scenes share one HTML/CSS template (`marketing/scenes/_shared.css` + `_shared.js`): Manrope font, Stockaz camel-brown/cream palette pulled from `src/theme/tokens.ts`, a reusable phone-mockup frame, a lower-third caption bar, and the shared outro component.
- Each scene file renders at whichever canvas size Playwright opens — same DOM/timeline, two crops (1080×1080 / 1080×1920) — so picture lock is identical between formats, only the composition safe-area differs.
- All animation is deterministic CSS `@keyframes`/Web Animations run off a fixed clock (no `Math.random`, no real network/image-load races), so the Playwright capture duration always matches the script's run length exactly.
- Captions are burned in (not relying on recorded VO timing), so each video is watchable muted; the VO track is a separate addition on top.
