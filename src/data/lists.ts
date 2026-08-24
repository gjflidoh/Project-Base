// Ported from the LISTS / STATS / META / DETAIL_ACTIONS constants in
// Stockaz.dc.html — the generic List/Detail/Form screens for the 8
// "management" record types are all driven off this config.

export type Tone = 'ok' | 'warn' | 'bad' | 'flat';

export interface ListRow {
  title: string;
  sub: string;
  value: string;
  badge?: string;
  tone?: Tone;
  tag?: string;
  avatar?: boolean;
}

export interface ListConfig {
  title: string;
  action?: string;
  foot: string;
  chips?: string[];
  rows: ListRow[];
}

export type ListKey =
  | 'customers' | 'suppliers' | 'orders' | 'invoices' | 'quotations'
  | 'expenses' | 'payments' | 'employees';

export const LISTS: Record<ListKey, ListConfig> = {
  customers: {
    title: 'Customers', action: 'New', foot: 'Balances update automatically when a credit sale is settled.',
    chips: ['All', 'On credit', 'Walk-in'],
    rows: [
      { title: 'Chanda Hardware', sub: '+260 97 771 2043 · 14 sales', value: 'K1,000', badge: 'On credit', tone: 'warn', tag: 'On credit', avatar: true },
      { title: 'Mrs Banda', sub: '+260 96 220 8871 · 22 sales', value: 'K3,240', badge: 'Paid up', tone: 'ok', tag: 'All', avatar: true },
      { title: 'Lusaka Lodge', sub: '+260 95 118 4460 · 9 sales', value: 'K410', badge: 'On credit', tone: 'warn', tag: 'On credit', avatar: true },
      { title: 'Joseph Phiri', sub: '+260 97 664 1129 · 6 sales', value: 'K705', badge: 'Paid up', tone: 'ok', tag: 'All', avatar: true },
      { title: 'Walk-in Customer', sub: 'Untracked counter sales', value: 'K12,880', badge: '', tone: 'flat', tag: 'Walk-in', avatar: true },
    ],
  },
  suppliers: {
    title: 'Suppliers', action: 'New', foot: 'Tap a supplier to raise an order from their price list.',
    rows: [
      { title: 'Zambeef Wholesale', sub: 'Groceries · last order 19 Aug', value: 'K3,420', badge: 'Payable', tone: 'warn', avatar: true },
      { title: 'Trade Kings Depot', sub: 'Sauces & cleaning · 16 Aug', value: 'K1,860', badge: 'Payable', tone: 'warn', avatar: true },
      { title: 'Cosmo Distributors', sub: 'Personal care · 11 Aug', value: 'K0', badge: 'Settled', tone: 'ok', avatar: true },
      { title: 'Chilenje Hardware Supply', sub: 'Tools & fittings · 04 Aug', value: 'K1,700', badge: 'Payable', tone: 'warn', avatar: true },
      { title: 'Softcare Zambia', sub: 'Baby care · 28 Jul', value: 'K0', badge: 'Settled', tone: 'ok', avatar: true },
    ],
  },
  orders: {
    title: 'Orders', action: 'New', foot: 'Receiving an order adds its quantities straight into Stock.',
    chips: ['All', 'Open', 'Received'],
    rows: [
      { title: 'PO-0043 · Zambeef Wholesale', sub: '12 lines · raised 21 Aug', value: 'K3,420', badge: 'Awaiting', tone: 'warn', tag: 'Open' },
      { title: 'PO-0042 · Trade Kings Depot', sub: '8 lines · raised 19 Aug', value: 'K1,860', badge: 'In transit', tone: 'warn', tag: 'Open' },
      { title: 'PO-0041 · Chilenje Hardware', sub: '5 lines · raised 16 Aug', value: 'K1,700', badge: 'Awaiting', tone: 'warn', tag: 'Open' },
      { title: 'PO-0040 · Cosmo Distributors', sub: '14 lines · received 11 Aug', value: 'K2,240', badge: 'Received', tone: 'ok', tag: 'Received' },
      { title: 'PO-0039 · Softcare Zambia', sub: '6 lines · received 28 Jul', value: 'K1,030', badge: 'Received', tone: 'ok', tag: 'Received' },
    ],
  },
  invoices: {
    title: 'Invoices', action: 'New', foot: 'Unpaid invoices appear in Notifications once they pass their due date.',
    chips: ['All', 'Unpaid', 'Paid'],
    rows: [
      { title: 'INV-0121 · Chanda Hardware', sub: 'Due 26 Aug · 2 lines', value: 'K1,000', badge: 'Unpaid', tone: 'warn', tag: 'Unpaid' },
      { title: 'INV-0120 · Lusaka Lodge', sub: 'Due 18 Aug · 6 lines', value: 'K410', badge: 'Overdue', tone: 'bad', tag: 'Unpaid' },
      { title: 'INV-0119 · Mrs Banda', sub: 'Paid 17 Aug · Mobile Money', value: 'K254', badge: 'Paid', tone: 'ok', tag: 'Paid' },
      { title: 'INV-0118 · Joseph Phiri', sub: 'Paid 12 Aug · Cash', value: 'K705', badge: 'Paid', tone: 'ok', tag: 'Paid' },
      { title: 'INV-0117 · Chanda Hardware', sub: 'Paid 04 Aug · Mobile Money', value: 'K1,880', badge: 'Paid', tone: 'ok', tag: 'Paid' },
    ],
  },
  quotations: {
    title: 'Quotations', action: 'New', foot: 'Accepting a quotation turns it into an invoice and reserves the stock.',
    chips: ['All', 'Sent', 'Closed'],
    rows: [
      { title: 'QT-0034 · Lusaka Lodge', sub: 'Valid to 30 Aug · 9 lines', value: 'K4,120', badge: 'Sent', tone: 'warn', tag: 'Sent' },
      { title: 'QT-0033 · Chanda Hardware', sub: 'Valid to 27 Aug · 4 lines', value: 'K3,100', badge: 'Sent', tone: 'warn', tag: 'Sent' },
      { title: 'QT-0032 · Kabwata School', sub: 'Accepted 20 Aug · 12 lines', value: 'K2,420', badge: 'Accepted', tone: 'ok', tag: 'Closed' },
      { title: 'QT-0031 · Joseph Phiri', sub: 'Expired 15 Aug · 3 lines', value: 'K640', badge: 'Expired', tone: 'flat', tag: 'Closed' },
    ],
  },
  expenses: {
    title: 'Expenses', action: 'Add', foot: 'Expenses are deducted from profit in Reports, never from sales totals.',
    chips: ['All', 'Today', 'Month'],
    rows: [
      { title: 'Transport — stock run', sub: 'Today 09:40 · Cash', value: 'K180', tone: 'flat', badge: '', tag: 'Today' },
      { title: 'Airtime & data', sub: 'Today 08:15 · Mobile Money', value: 'K90', tone: 'flat', badge: '', tag: 'Today' },
      { title: 'Counter wages — Kelvin', sub: 'Today 07:00 · Cash', value: 'K150', tone: 'flat', badge: '', tag: 'Today' },
      { title: 'Shop rent — August', sub: '01 Aug · Mobile Money', value: 'K3,200', tone: 'flat', badge: '', tag: 'Month' },
      { title: 'ZESCO units', sub: '14 Aug · Mobile Money', value: 'K560', tone: 'flat', badge: '', tag: 'Month' },
    ],
  },
  payments: {
    title: 'Payment history', foot: 'Stockaz Pro is collected on the 12th by Mobile Money.',
    rows: [
      { title: 'SUB-0007 · August 2026', sub: 'Paid 12 Aug · MTN MoMo', value: 'K350', badge: 'Paid', tone: 'ok' },
      { title: 'SUB-0006 · July 2026', sub: 'Paid 12 Jul · MTN MoMo', value: 'K350', badge: 'Paid', tone: 'ok' },
      { title: 'SUB-0005 · June 2026', sub: 'Paid 12 Jun · MTN MoMo', value: 'K350', badge: 'Paid', tone: 'ok' },
      { title: 'SUB-0004 · May 2026', sub: 'Paid 14 May · Airtel Money', value: 'K350', badge: 'Late', tone: 'warn' },
      { title: 'SUB-0003 · April 2026', sub: 'Paid 12 Apr · MTN MoMo', value: 'K150', badge: 'Paid', tone: 'ok' },
    ],
  },
  employees: {
    title: 'Employees', action: 'Add', foot: 'Counter staff can sell, scan and print receipts — never see settings or reports.',
    rows: [
      { title: 'Kelvin Mwansa', sub: 'Owner · full access', value: 'K3,170', badge: 'On shift', tone: 'ok', avatar: true },
      { title: 'Mutinta Zulu', sub: 'Counter · sales & receipts', value: 'K1,650', badge: 'Shift ended', tone: 'flat', avatar: true },
      { title: 'Brian Sakala', sub: 'Counter · sales & receipts', value: 'K0', badge: 'Off today', tone: 'flat', avatar: true },
    ],
  },
};

const NUM = (v: unknown) => parseFloat(String(v ?? '').replace(/[^0-9.]/g, '')) || 0;
const SUM = (rows: ListRow[]) => rows.reduce((a, r) => a + NUM(r.value), 0);
const has = (rows: ListRow[], ...badges: string[]) => rows.filter((r) => badges.includes(r.badge ?? ''));
const K0 = (n: number) => 'K' + Math.round(n).toLocaleString('en-US');

export interface StatItem { value: string | number; label: string; color?: string }

export const STATS: Partial<Record<ListKey, (rows: ListRow[]) => StatItem[]>> = {
  customers: (rows) => [
    { value: rows.length, label: 'Customers' },
    { value: has(rows, 'On credit').length, label: 'On credit', color: '#B96B0A' },
    { value: K0(SUM(has(rows, 'On credit'))), label: 'Owed', color: '#7C6340' },
  ],
  suppliers: (rows) => [
    { value: rows.length, label: 'Suppliers' },
    { value: has(rows, 'Payable').length, label: 'Unpaid', color: '#B96B0A' },
    { value: K0(SUM(rows)), label: 'Payable', color: '#7C6340' },
  ],
  orders: (rows) => [
    { value: has(rows, 'Awaiting').length, label: 'Awaiting', color: '#B96B0A' },
    { value: has(rows, 'In transit').length, label: 'In transit' },
    { value: K0(SUM(has(rows, 'Awaiting', 'In transit'))), label: 'Open value', color: '#7C6340' },
  ],
  invoices: (rows) => [
    { value: has(rows, 'Unpaid').length, label: 'Unpaid', color: '#B96B0A' },
    { value: has(rows, 'Overdue').length, label: 'Overdue', color: '#C0332F' },
    { value: K0(SUM(has(rows, 'Unpaid', 'Overdue'))), label: 'Outstanding', color: '#7C6340' },
  ],
  quotations: (rows) => [
    { value: has(rows, 'Sent').length, label: 'Sent' },
    { value: has(rows, 'Accepted').length, label: 'Accepted', color: '#7C6340' },
    { value: K0(SUM(has(rows, 'Sent'))), label: 'Pipeline', color: '#7C6340' },
  ],
  expenses: (rows) => [
    { value: K0(SUM(rows.filter((r) => r.tag === 'Today'))), label: 'Today', color: '#C0332F' },
    { value: K0(SUM(rows)), label: 'This month', color: '#C0332F' },
    { value: new Set(rows.map((r) => r.title.split(' — ')[0])).size, label: 'Categories' },
  ],
  employees: (rows) => [
    { value: rows.length, label: 'Employees' },
    { value: has(rows, 'On shift').length, label: 'On shift', color: '#7C6340' },
    { value: K0(SUM(rows)), label: 'Sold today', color: '#7C6340' },
  ],
};

export const META: Record<ListKey, (r: ListRow) => [string, string][]> = {
  customers: (r) => [['Phone', r.sub.split(' · ')[0]], ['Sales', r.sub.split(' · ')[1] || '0 sales'], ['Balance', r.value], ['Standing', r.badge || '—']],
  suppliers: (r) => [['Supplies', r.sub.split(' · ')[0]], ['Last order', r.sub.split(' · ')[1] || '—'], ['Payable', r.value], ['Status', r.badge || '—']],
  orders: (r) => [['Order no.', r.title.split(' · ')[0]], ['Supplier', r.title.split(' · ')[1] || '—'], ['Lines', r.sub.split(' · ')[0]], ['Raised', r.sub.split(' · ')[1] || '—'], ['Order value', r.value], ['Status', r.badge || '—']],
  invoices: (r) => [['Invoice no.', r.title.split(' · ')[0]], ['Customer', r.title.split(' · ')[1] || '—'], ['Terms', r.sub.split(' · ')[0]], ['Lines', r.sub.split(' · ')[1] || '—'], ['Amount', r.value], ['Status', r.badge || '—']],
  quotations: (r) => [['Quote no.', r.title.split(' · ')[0]], ['Customer', r.title.split(' · ')[1] || '—'], ['Validity', r.sub.split(' · ')[0]], ['Lines', r.sub.split(' · ')[1] || '—'], ['Quoted', r.value], ['Status', r.badge || '—']],
  expenses: (r) => [['Category', r.title.split(' — ')[0]], ['Note', r.title.split(' — ')[1] || '—'], ['Date', r.sub.split(' · ')[0]], ['Paid with', r.sub.split(' · ')[1] || '—'], ['Amount', r.value]],
  employees: (r) => [['Role', r.sub.split(' · ')[0]], ['Permissions', r.sub.split(' · ')[1] || '—'], ['Sold today', r.value], ['Shift', r.badge || '—']],
  payments: (r) => [['Reference', r.title.split(' · ')[0]], ['Paid', r.sub.split(' · ')[0]], ['Method', r.sub.split(' · ')[1] || '—'], ['Amount', r.value], ['Status', r.badge || '—']],
};

// [label, kind]  kind: 1 = primary, 0 = secondary, -1 = danger
export const DETAIL_ACTIONS: Partial<Record<ListKey, [string, number][]>> = {
  payments: [['Download receipt', 1]],
  customers: [['Record payment', 1], ['New sale', 0], ['Call customer', 0]],
  suppliers: [['Raise an order', 1], ['Call supplier', 0]],
  orders: [['Receive into stock', 1], ['Share order', 0]],
  invoices: [['Record payment', 1], ['Share PDF', 0], ['Print', 0]],
  quotations: [['Accept → Invoice', 1], ['Share PDF', 0]],
  expenses: [['Edit expense', 1], ['Delete', -1]],
  employees: [['Edit role', 1], ['End shift', 0]],
};
