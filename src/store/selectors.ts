// Pure "derived data" helpers — the RN equivalent of the big `renderVals()`
// switch in Stockaz.dc.html, just split into focused functions per screen.
// Each takes the full store snapshot (state + actions) so it can build
// callbacks that call back into store actions, same as the source.

import type { Store } from './useStore';
import type { Product } from '../data/catalog';
import { K, K0 } from '../data/catalog';
import type { CartLine } from './types';
import type { Receipt } from '../data/receipts';
import { LISTS, STATS, type ListKey, type ListRow } from '../data/lists';
import { color, badgeTone } from '../theme/tokens';

export interface Decorated extends Product {
  priceLabel: string;
  leftLabel: string;
  leftColor: string;
  dot: string;
  halo: string;
  disabled: boolean;
  outOfStock: boolean;
}

export function decorate(store: Store, p: Product): Decorated {
  const inCart = store.cart.find((c) => c.name === p.name)?.qty || 0;
  const left = p.qty - inCart;
  return {
    ...p,
    priceLabel: K(p.price),
    leftLabel: p.qty === 0 ? 'out of stock' : left <= 0 ? 'all in basket' : left + ' left',
    leftColor: left <= 0 ? color.dangerInk : left <= 10 ? color.warnInk : color.faint,
    disabled: left <= 0,
    outOfStock: p.qty === 0,
    dot: p.qty === 0 ? color.danger : p.qty <= 10 ? color.warn : color.accentDot,
    halo: p.qty === 0 ? 'rgba(229,72,77,.14)' : p.qty <= 10 ? 'rgba(224,138,0,.14)' : 'rgba(149,119,80,.14)',
  };
}

export function stockStats(catalog: Product[]) {
  return {
    count: catalog.length,
    low: catalog.filter((p) => p.qty > 0 && p.qty <= 10).length,
    out: catalog.filter((p) => p.qty === 0).length,
    value: 'K' + Math.round(catalog.reduce((a, p) => a + p.price * p.qty, 0)).toLocaleString('en-US'),
  };
}

// Products that appear in past receipts come first (most-recently-relevant),
// then the rest of the catalog — mirrors the `recentFirst` list in the source.
export function recentFirst(store: Store, catalog: Product[]): Product[] {
  const sold: Product[] = [];
  store.receipts.forEach((r) =>
    r.lines.forEach(([label]) => {
      const nm = String(label).replace(/ × [\d.]+$/, '');
      const p = catalog.find((x) => x.name === nm) || catalog.find((x) => nm.startsWith(x.name) || x.name.startsWith(nm));
      if (p && !sold.includes(p)) sold.push(p);
    }),
  );
  return sold.concat(catalog.filter((p) => !sold.includes(p)));
}

export function quickSell(store: Store, catalog: Product[]): Decorated[] {
  return recentFirst(store, catalog).slice(0, 6).map((p) => decorate(store, p));
}

export interface PickerItem extends Decorated {
  qtyInCart: number;
}

export function pickerItems(store: Store, catalog: Product[]): PickerItem[] {
  const mode = store.pickerSort || 'Recent';
  let list = recentFirst(store, catalog).slice();
  if (mode === 'A–Z') list.sort((a, b) => a.short.localeCompare(b.short));
  if (mode === 'Price') list.sort((a, b) => b.price - a.price);
  if (mode === 'Stock') list.sort((a, b) => a.qty - b.qty);
  const q = (store.pickerQuery || '').toLowerCase();
  return list
    .filter((p) => !q || p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q))
    .map((p) => ({ ...decorate(store, p), qtyInCart: store.cart.find((c) => c.name === p.name)?.qty || 0 }));
}

export function stockList(store: Store, catalog: Product[]): Decorated[] {
  const q = (store.query || '').toLowerCase();
  return catalog
    .filter((p) => !q || p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q))
    .map((p) => decorate(store, p));
}

export function cartLines(store: Store) {
  return store.cart.map((c: CartLine) => ({ ...c, lineLabel: K(c.price * c.qty) }));
}

export function cartSubtotal(store: Store): number {
  return store.cart.reduce((a, c) => a + c.price * c.qty, 0);
}

export interface DecoratedReceipt extends Receipt {
  amountLabel: string;
  thumbs: { img: string; short: string }[];
  extra: number;
}

export function receiptsForTab(store: Store, catalog: Product[]): DecoratedReceipt[] {
  const rows = store.tab === 'Today' ? store.receipts.filter((r) => r.when.startsWith('23')) : store.receipts;
  return rows.map((r) => {
    const names = r.lines.map(([label]) => String(label).replace(/ × [\d.]+$/, ''));
    const thumbs = names
      .map((nm) => catalog.find((p) => p.name === nm) || catalog.find((p) => nm.startsWith(p.name) || p.name.startsWith(nm)))
      .filter((p): p is Product => !!p)
      .slice(0, 3)
      .map((p) => ({ img: p.img, short: p.short }));
    return { ...r, amountLabel: K(r.amount), thumbs, extra: Math.max(0, names.length - thumbs.length) };
  });
}

export function receiptLineImage(store: Store, catalog: Product[], label: string): string | null {
  const nm = String(label).replace(/ × [\d.]+$/, '');
  const p = catalog.find((x) => x.name === nm) || catalog.find((x) => nm.startsWith(x.name) || x.name.startsWith(nm));
  return p ? p.img : null;
}

export function creditRows(store: Store) {
  const cFilter = store.creditFilter || 'All';
  const q = (store.creditQuery || '').toLowerCase();
  return store.creditList
    .filter((c) => cFilter === 'All' || (cFilter === 'Overdue' ? c.tone === 'bad' : cFilter === 'Due soon' ? c.tone === 'warn' : c.tone === 'ok'))
    .filter((c) => !q || c.name.toLowerCase().includes(q) || c.phone.replace(/\s/g, '').includes(q.replace(/\s/g, '')))
    .map((c) => ({
      ...c,
      balanceLabel: K0(c.balance),
      dot: c.tone === 'bad' ? color.danger : c.tone === 'warn' ? color.warn : color.accentDot,
      halo: c.tone === 'bad' ? 'rgba(229,72,77,.14)' : c.tone === 'warn' ? 'rgba(224,138,0,.14)' : 'rgba(149,119,80,.14)',
      subInk: c.tone === 'bad' ? color.dangerInk : color.faint,
    }));
}

export function activeNav(screen: Store['screen']): 'home' | 'stock' | 'credit' | 'more' {
  if (screen === 'home' || screen === 'stock') return screen;
  if (screen === 'credit' || screen === 'creditDetail' || screen === 'addCredit') return 'credit';
  return 'more';
}

export function enabledPayMethods(store: Store): string[] {
  return ['Cash', ...(store.payMomo !== false ? ['Mobile Money'] : []), ...(store.payCard ? ['Card'] : []), ...(store.payCredit ? ['Credit'] : [])];
}

// --- generic List/Detail screens (Customers, Suppliers, Orders, ...) ---

export function mergedListRows(store: Store, key: ListKey): ListRow[] {
  const added = store.added[key] || [];
  return [...added, ...LISTS[key].rows];
}

export function filteredListRows(store: Store, key: ListKey): ListRow[] {
  const cfg = LISTS[key];
  const rows = mergedListRows(store, key);
  const chip = store.listFilter && cfg.chips?.includes(store.listFilter) ? store.listFilter : 'All';
  return rows.filter((r) => !cfg.chips || chip === 'All' || r.tag === chip);
}

export function listStats(key: ListKey, rows: ListRow[]) {
  const fn = STATS[key];
  return fn ? fn(rows).map((x) => ({ ...x, color: x.color || color.ink })) : [];
}

export function toneOf(tone?: ListRow['tone']) {
  return badgeTone[tone ?? 'flat'];
}

export const MORE_MENU = [
  'Receipts', 'Reports', 'Customers', 'Suppliers', 'Orders', 'Invoices',
  'Quotations', 'Expenses', 'Employees', 'Shop Settings', 'Subscription', 'Account',
] as const;

export function alertsList(store: Store, catalog: Product[]) {
  const stats = stockStats(catalog);
  const outProduct = catalog.find((p) => p.qty === 0);
  return [
    {
      title: stats.out + ' product out of stock',
      body: (outProduct?.name || 'A product') + ' — reorder from supplier',
      when: 'now', dot: color.danger,
      onOpen: () => store.patch({ alerts: false, screen: 'stock', query: outProduct?.short.split(' ')[0] || '' }),
    },
    {
      title: stats.low + ' products running low',
      body: 'Peri Peri, Softcare Diapers, Bleach Powder and more',
      when: '12m', dot: color.warn,
      onOpen: () => store.patch({ alerts: false, screen: 'stock' }),
    },
    {
      title: 'New credit sale',
      body: 'John Banda — K280 · processed by Kelvin, 4:32 PM',
      when: '2m', dot: color.accent,
      onOpen: () => store.patch({ alerts: false, screen: 'creditDetail', creditSel: 'jb' }),
    },
    {
      title: 'Kelvin started a shift',
      body: 'Counter · Chilenje Branch, 07:12',
      when: '5h', dot: color.accentDot,
      onOpen: () => store.patch({ alerts: false, screen: 'monitor' }),
    },
    {
      title: 'Credit overdue 28 days',
      body: 'Kelvin Zulu — K620 outstanding',
      when: '1d', dot: color.danger,
      onOpen: () => store.patch({ alerts: false, screen: 'creditDetail', creditSel: 'kz' }),
    },
  ];
}
