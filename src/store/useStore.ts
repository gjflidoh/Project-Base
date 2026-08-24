import { create } from 'zustand';
import type { AppState, CartLine, Screen, StaffMember, ToastAction } from './types';
import { CATALOG, SCAN, STARTER, K, NUM, type Product } from '../data/catalog';
import { SEED_RECEIPTS, type Receipt } from '../data/receipts';
import { CREDIT, type CreditCustomer } from '../data/credit';
import { FORMS, FORM_MAKE, SPECIAL_FORM_KEYS } from '../data/forms';
import type { ListKey, ListRow } from '../data/lists';
import { setDarkMode } from '../theme/tokens';

let toastTimer: ReturnType<typeof setTimeout> | null = null;
let scanTimer: ReturnType<typeof setTimeout> | null = null;

function receiptNo(existing: Receipt[]): string {
  return '#000' + (129 + existing.length - 5);
}

export interface Actions {
  patch: (partial: Partial<AppState>) => void;
  go: (screen: Screen) => void;
  showToast: (msg: string, action?: ToastAction | null) => void;

  // catalog / stock
  currentCatalog: () => Product[];
  add: (p: Product) => void;
  bump: (name: string, delta: number) => void;
  sellNow: (p: Product) => void;
  askRestock: (p: Product) => void;
  openRestock: (p: { name: string; short: string; img: string; cat: string }) => void;
  restockUp: () => void;
  restockDown: () => void;
  restockCancel: () => void;
  restockConfirm: () => void;

  // add product
  openAdd: () => void;
  closeAdd: () => void;
  addManual: () => void;
  addScan: () => void;

  // scan
  openScan: () => void;
  closeScan: () => void;
  scanSell: () => void;
  scanAdd: () => void;

  // basket / picker (home quick-sell sheet)
  openPicker: () => void;
  closePicker: () => void;
  basketClear: () => void;
  basketCheckout: () => void;
  soldNoteClose: () => void;
  soldNoteOpen: () => void;
  toggleSort: () => void;
  setPickerSort: (s: string) => void;

  // numpad
  openPad: () => void;
  closePad: () => void;
  padKey: (k: string) => void;
  padQuick: (v: number) => void;
  padBack: () => void;

  // checkout
  checkout: () => void;
  payPrimary: () => void;

  // credit
  creditOf: (id: string) => CreditCustomer;
  applyCredit: (id: string, total: number, lines: [string, number][]) => void;
  recordPayment: (id: string, amount: number, method: string) => void;
  openAddCredit: () => void;
  confirmCredit: (subtotal: number) => void;
  cycleCreditFilter: () => void;
  approvalApprove: () => void;
  approvalDeny: () => void;
  pinKey: (k: string) => void;

  // forms / lists / detail
  openForm: (key: string, back?: Screen) => void;
  formCancel: () => void;
  setFormValue: (k: string, v: string) => void;
  submitForm: () => void;
  openDetail: (key: ListKey, row: ListRow) => void;
  detailBack: () => void;
  detailAction: (label: string) => void;

  // onboarding
  startOnb: () => void;
  onbNext: () => void;
  onbBack: () => void;
  onbSecondary: () => void;
  pickJustMe: () => void;
  pickStaff: () => void;
  addStaff: () => void;
  importStandard: () => void;

  // chrome
  toggleDark: () => void;
  openProfile: () => void;
  closeProfile: () => void;
  openAlerts: () => void;
  closeAlerts: () => void;
  logout: () => void;
  togglePaySetting: (key: 'payMomo' | 'payCard' | 'payCredit') => void;
  setCreditPerm: (label: string) => void;
}

export type Store = AppState & Actions;

export const useStore = create<Store>((set, get) => ({
  screen: 'home',
  prevScreen: 'home',
  formKey: null,
  formVals: {},
  detail: null,
  listFilter: 'All',
  added: {},

  cart: [],
  pay: 'Cash',
  paid: '',
  padOpen: false,
  picker: false,
  pickerQuery: '',
  pickerSort: 'Recent',
  sortOpen: false,
  saleCust: null,

  query: '',
  stockAdj: {},
  newProducts: [],
  restock: null,
  restockQty: 12,
  addMode: false,

  total: 2000,
  txns: 27,
  receipts: SEED_RECEIPTS,
  receipt: null,
  soldNote: null,
  tab: 'All',

  creditList: CREDIT,
  creditIssued: 800,
  creditPaidMonth: 850,
  creditSel: null,
  creditQuery: '',
  creditFilter: 'All',
  creditPerm: 'Allow',
  approval: null,
  pin: '',

  scanning: false,
  scanFound: false,

  payMomo: true,
  payCard: false,
  payCredit: true,
  plan: 'Pro — K350',
  payMethod: 'MTN MoMo · 097 412 8890',
  acctName: 'Kelvin Mwansa',
  acctPhone: '+260 97 412 8890',
  acctEmail: 'kelvin@stockaz.app',
  acctLang: 'English',
  period: 'Today',

  profile: false,
  alerts: false,
  dark: false,
  toast: '',
  toastAction: null,

  onbStep: 1,
  onbAdded: false,
  onbCount: 0,
  shopName: '',
  shopType: '',
  stockSkipped: false,
  starterCount: 0,
  buyPrice: '',
  sellPrice: '',
  onbQty: null,
  staffMode: null,
  staffName: '',
  staffRole: 'Counter',
  staffList: [],

  patch: (partial) => set(partial),
  go: (screen) => set({ screen }),
  showToast: (msg, action) => {
    if (toastTimer) clearTimeout(toastTimer);
    set({ toast: msg, toastAction: action || null });
    toastTimer = setTimeout(() => set({ toast: '', toastAction: null }), action ? 4200 : 2400);
  },

  currentCatalog: () => {
    const s = get();
    const adj = s.stockAdj;
    return [...s.newProducts, ...CATALOG].map((p) => (adj[p.name] ? { ...p, qty: p.qty + adj[p.name] } : p));
  },

  add: (p) => {
    const s = get();
    const cat = get().currentCatalog();
    const live = cat.find((x) => x.name === p.name) || p;
    const stock = live.qty;
    const inCart = s.cart.find((c) => c.name === p.name)?.qty || 0;
    if (inCart >= stock) {
      if (!stock) {
        get().askRestock(p);
        return;
      }
      get().showToast('Only ' + stock + ' of ' + p.short + ' in stock');
      return;
    }
    set((s2) => {
      const cart = s2.cart.slice();
      const i = cart.findIndex((c) => c.name === p.name);
      if (i >= 0) cart[i] = { ...cart[i], qty: cart[i].qty + 1 };
      else cart.push({ ...p, qty: 1 });
      return { cart };
    });
  },

  bump: (name, d) => {
    set((s) => ({ cart: s.cart.map((c) => (c.name === name ? { ...c, qty: c.qty + d } : c)).filter((c) => c.qty > 0) }));
  },

  sellNow: (p) => {
    get().add(p);
    set({ picker: true });
  },

  askRestock: (p) => {
    get().showToast(p.short + ' is out of stock. Restock?', {
      label: 'Restock',
      onPick: () => {
        if (toastTimer) clearTimeout(toastTimer);
        set({ toast: '', toastAction: null, restock: { name: p.name, short: p.short, img: p.img, cat: p.cat }, restockQty: 12 });
      },
    });
  },
  openRestock: (p) => set({ restock: p, restockQty: 12 }),
  restockUp: () => set((s) => ({ restockQty: (s.restockQty || 12) + 1 })),
  restockDown: () => set((s) => ({ restockQty: Math.max(1, (s.restockQty || 12) - 1) })),
  restockCancel: () => set({ restock: null }),
  restockConfirm: () => {
    const s = get();
    const r = s.restock;
    if (!r) return;
    const n = s.restockQty || 12;
    set((s2) => ({ stockAdj: { ...s2.stockAdj, [r.name]: (s2.stockAdj[r.name] || 0) + n }, restock: null }));
    get().showToast(r.short + ' restocked · ' + n + ' units in');
  },

  openAdd: () => set({ addMode: true }),
  closeAdd: () => set({ addMode: false }),
  addManual: () => set({ addMode: false, screen: 'form', formKey: 'products', formVals: {} }),
  addScan: () => {
    set({ addMode: false });
    get().openScan();
  },

  openScan: () => {
    set({ prevScreen: get().screen, screen: 'scan', scanning: true, scanFound: false });
    if (scanTimer) clearTimeout(scanTimer);
    scanTimer = setTimeout(() => set({ scanning: false, scanFound: true }), 1900);
  },
  closeScan: () => {
    if (scanTimer) clearTimeout(scanTimer);
    set((s) => ({ screen: s.prevScreen, scanning: false, scanFound: false }));
  },
  scanSell: () => {
    if (scanTimer) clearTimeout(scanTimer);
    if (get().prevScreen === 'onb') {
      set({ screen: 'onb', onbStep: 3, scanning: false, scanFound: false });
      return;
    }
    get().add(SCAN);
    set({ screen: 'sale', scanning: false, scanFound: false });
  },
  scanAdd: () => {
    if (scanTimer) clearTimeout(scanTimer);
    if (get().prevScreen === 'onb') {
      set({ screen: 'onb', onbStep: 3, scanning: false, scanFound: false });
      return;
    }
    set((s) => ({ screen: s.prevScreen, scanning: false, scanFound: false }));
    get().showToast(SCAN.short + ' — add stock quantity');
  },

  openPicker: () => set({ picker: true }),
  closePicker: () => set({ picker: false }),
  basketClear: () => set({ cart: [] }),
  basketCheckout: () => {
    if (!get().cart.length) {
      get().showToast('Basket is empty');
      return;
    }
    set({ picker: false, screen: 'sale' });
  },
  soldNoteClose: () => set({ soldNote: null }),
  soldNoteOpen: () => {
    const rec = get().soldNote?.rec;
    if (rec) set({ picker: false, screen: 'receipts', receipt: rec });
  },
  toggleSort: () => set((s) => ({ sortOpen: !s.sortOpen })),
  setPickerSort: (sortKey) => set({ pickerSort: sortKey, sortOpen: false }),

  openPad: () => set({ padOpen: true }),
  closePad: () => set({ padOpen: false }),
  padKey: (k) =>
    set((s) => ({
      paid: k === 'C' ? '' : ((s.paid || '') + k).replace(/^0+(?=\d)/, '').slice(0, 7),
    })),
  padQuick: (v) => set({ paid: String(Math.round(v)) }),
  padBack: () => set((s) => ({ paid: (s.paid || '').slice(0, -1) })),

  checkout: () => {
    const s = get();
    const total = s.cart.reduce((a, c) => a + c.price * c.qty, 0);
    if (!total) {
      get().showToast('Add a product first');
      return;
    }
    const no = receiptNo(s.receipts);
    const enabled = ['Cash', ...(s.payMomo !== false ? ['Mobile Money'] : []), ...(s.payCard ? ['Card'] : []), ...(s.payCredit ? ['Credit'] : [])];
    const method = (enabled.includes(s.pay) ? s.pay : 'Cash') as Receipt['method'];
    const tendered = NUM(s.paid);
    if (method === 'Credit') {
      set({ screen: 'addCredit', creditSel: s.creditSel || CREDIT[0].id });
      get().showToast('Credit sale — choose the customer');
      return;
    }
    if (method === 'Cash' && tendered && tendered < total) {
      get().showToast('Short by ' + K(total - tendered));
      return;
    }
    const r: Receipt = {
      no, when: '23 Aug • 12:58 PM', customer: 'Walk-in Customer', amount: total, method,
      lines: s.cart.map((c) => [c.name + ' × ' + c.qty, c.price * c.qty] as [string, number]),
    };
    const soldItems = s.cart.map((c) => (c.short || c.name) + ' × ' + c.qty).join(', ');
    set((s2) => ({
      receipts: [r, ...s2.receipts], cart: [], screen: 'home', picker: true,
      total: s2.total + total, txns: s2.txns + 1, paid: '', padOpen: false,
      soldNote: { total: K(total) + ' · ' + no, items: soldItems, rec: r },
    }));
    get().showToast(method === 'Cash' && tendered > total ? 'Change ' + K(tendered - total) + ' · receipt ' + no : 'Paid ' + K(total) + ' · receipt ' + no);
  },
  payPrimary: () => {
    const s = get();
    if (s.saleCust && s.payCredit !== false) {
      if (!s.cart.length) {
        get().showToast('Add a product first');
        return;
      }
      set({ screen: 'addCredit', creditSel: s.saleCust });
      return;
    }
    get().checkout();
  },

  creditOf: (id) => get().creditList.find((c) => c.id === id) || get().creditList[0],
  applyCredit: (id, total, lines) => {
    const s = get();
    const list = s.creditList.map((c) =>
      c.id !== id
        ? c
        : {
            ...c,
            balance: c.balance + total,
            last: 'Last credit: Today',
            tone: c.tone === 'bad' ? ('bad' as const) : ('warn' as const),
            txns: [['Today', lines.map((l) => [l[0], l[1], 0] as [string, number, 0 | 1])] as [string, [string, number, 0 | 1][]], ...c.txns],
          },
    );
    const cust = list.find((c) => c.id === id)!;
    const no = receiptNo(s.receipts);
    const rec: Receipt = { no, when: '23 Aug • 4:32 PM', customer: cust.name, amount: total, method: 'Credit', lines };
    set((s2) => ({
      creditList: list, receipts: [rec, ...s2.receipts], cart: [],
      total: s2.total + total, txns: s2.txns + 1, creditIssued: (s2.creditIssued || 800) + total,
      screen: 'creditDetail', creditSel: id, approval: null, pin: '',
    }));
    get().showToast('Credit ' + K(total) + ' · ' + cust.name + ' · receipt ' + no);
  },
  recordPayment: (id, amount, method) => {
    const list = get().creditList.map((c) =>
      c.id !== id ? c : {
        ...c,
        balance: Math.max(0, c.balance - amount),
        tone: c.balance - amount <= 0 ? ('ok' as const) : c.tone,
        txns: [['Today', [['Payment received · ' + method, -amount, 1] as [string, number, 0 | 1]]] as [string, [string, number, 0 | 1][]], ...c.txns],
      },
    );
    set((s) => ({ creditList: list, creditPaidMonth: (s.creditPaidMonth || 850) + amount, screen: 'creditDetail' }));
    get().showToast('Payment ' + K(amount) + ' recorded');
  },
  openAddCredit: () => set((s) => ({ screen: 'addCredit', cart: [], creditSel: s.creditSel || s.creditList[0].id })),
  confirmCredit: (subtotal) => {
    const s = get();
    const cc = s.creditList.find((c) => c.id === s.creditSel) || s.creditList[0];
    if (!s.cart.length) {
      get().showToast('Add at least one product');
      return;
    }
    const lines: [string, number][] = s.cart.map((c) => [c.name + ' × ' + c.qty, c.price * c.qty]);
    if ((s.creditPerm || 'Allow') === 'Manager Approval Required') {
      set({ approval: { id: cc.id, total: subtotal, lines }, pin: '' });
      return;
    }
    if ((s.creditPerm || 'Allow') === "Don't Allow") {
      get().showToast('Counter credit is switched off in Shop Settings');
      return;
    }
    get().applyCredit(cc.id, subtotal, lines);
  },
  cycleCreditFilter: () => {
    const opts = ['All', 'Overdue', 'Due soon', 'Healthy'];
    set((s) => ({ creditFilter: opts[(opts.indexOf(s.creditFilter) + 1) % opts.length] }));
  },
  approvalApprove: () => {
    const s = get();
    if ((s.pin || '').length < 4) {
      get().showToast('Enter the 4-digit manager PIN');
      return;
    }
    if (s.approval) get().applyCredit(s.approval.id, s.approval.total, s.approval.lines);
  },
  approvalDeny: () => {
    set({ approval: null, pin: '' });
    get().showToast('Credit sale denied by manager');
  },
  pinKey: (k) => {
    if (!k) return;
    set((s) => ({ pin: k === '⌫' ? (s.pin || '').slice(0, -1) : ((s.pin || '') + k).slice(0, 4) }));
  },

  openForm: (key, back) => set({ screen: 'form', formKey: key, formVals: {}, prevScreen: back ?? get().screen }),
  formCancel: () => {
    const s = get();
    const f = FORMS[s.formKey || ''];
    set({ screen: (f && f.back as Screen) || (s.formKey as Screen) || 'more', formVals: {} });
  },
  setFormValue: (k, v) => set((s) => ({ formVals: { ...s.formVals, [k]: v } })),
  submitForm: () => {
    const s = get();
    const key = s.formKey;
    const f = key ? FORMS[key] : undefined;
    if (!key || !f) return;
    const vals = { ...s.formVals };
    f.fields.forEach((x) => {
      if (x.def && !vals[x.k]) vals[x.k] = x.def;
    });
    const first = f.fields[0];
    if (!SPECIAL_FORM_KEYS.has(key) && !first.opts && !vals[first.k]) {
      get().showToast('Fill in ' + first.label.toLowerCase());
      return;
    }

    if (key === 'products') {
      if (!vals.name) {
        get().showToast('Fill in product name');
        return;
      }
      const p: Product = {
        img: '', name: vals.name, short: vals.name.split(' ').slice(0, 2).join(' '),
        price: NUM(vals.price), qty: parseInt(String(vals.qty).replace(/[^0-9]/g, ''), 10) || 0,
        cat: vals.cat || 'Groceries',
      };
      set((s2) => ({ newProducts: [p, ...s2.newProducts], screen: 'stock', formVals: {} }));
      get().showToast(p.short + ' added to stock');
      return;
    }
    if (key === 'plan') {
      set({ plan: vals.plan, screen: 'subscription', formVals: {} });
      get().showToast(vals.plan + ' · ' + vals.cycle);
      return;
    }
    if (key === 'paymethod') {
      set({ payMethod: vals.net + ' · ' + (vals.num || '097 412 8890'), screen: 'subscription', formVals: {} });
      get().showToast('Billing set to ' + vals.net);
      return;
    }
    if (key === 'creditpay') {
      const amt = NUM(vals.amount);
      if (!amt) {
        get().showToast('Enter an amount');
        return;
      }
      get().recordPayment(s.creditSel || CREDIT[0].id, amt, vals.method || 'Cash');
      set({ formVals: {} });
      return;
    }
    if (key === 'account') {
      set({ acctName: vals.name, acctPhone: vals.phone, acctEmail: vals.email, acctLang: vals.lang, screen: 'account', formVals: {} });
      get().showToast('Account updated');
      return;
    }

    const make = FORM_MAKE[key as ListKey];
    if (make) {
      const row = make(vals);
      set((s2) => ({
        added: { ...s2.added, [key as ListKey]: [row, ...(s2.added[key as ListKey] || [])] },
        screen: key as Screen, formVals: {},
      }));
      get().showToast(row.title.split(' · ').pop()!.split(' — ')[0] + ' saved');
    }
  },
  openDetail: (key, row) => set({ screen: 'detail', detail: { key, row } }),
  detailBack: () => set((s) => ({ screen: (s.detail?.key as Screen) || 'more' })),
  detailAction: (label) => {
    const s = get();
    const d = s.detail;
    if (!d) return;
    if (label === 'New sale') {
      set({ screen: 'sale' });
      return;
    }
    if (label === 'Delete') {
      set({ screen: d.key });
      get().showToast('Expense deleted');
      return;
    }
    get().showToast(label + ' · ' + d.row.title.split(' · ')[0]);
  },

  startOnb: () =>
    set({ screen: 'onb', onbStep: 1, onbAdded: false, onbCount: 0, staffList: [], staffMode: null, stockSkipped: false, starterCount: 0 }),
  onbNext: () => {
    const s = get();
    const st = s.onbStep || 1;
    if (st === 1) {
      set({ onbStep: 2 });
      return;
    }
    if (st === 2) {
      set({ onbStep: s.stockSkipped ? 4 : 3 });
      return;
    }
    if (st === 3) {
      if (!s.onbAdded) {
        const qty = s.onbQty == null ? 12 : s.onbQty;
        set({ onbAdded: true, onbCount: (s.onbCount || 0) + qty });
        return;
      }
      set({ onbStep: 4 });
      return;
    }
    if (st === 4) {
      set({ onbStep: 5 });
      return;
    }
    set({ screen: 'sale' });
  },
  onbBack: () => {
    const s = get();
    const st = s.onbStep || 1;
    if (st === 1) {
      set({ screen: 'home' });
      return;
    }
    set({ onbStep: st === 4 && s.stockSkipped ? 2 : st - 1, onbAdded: false });
  },
  onbSecondary: () => {
    const s = get();
    const st = s.onbStep || 1;
    if (st === 2) {
      set({ stockSkipped: true, onbStep: 4 });
      return;
    }
    if (st === 3) {
      set({ onbAdded: false });
      get().openScan();
      return;
    }
    if (st === 4) {
      set({ staffMode: 'me', onbStep: 5 });
      return;
    }
    set({ screen: 'home' });
  },
  pickJustMe: () => set({ staffMode: 'me' }),
  pickStaff: () => set({ staffMode: 'staff' }),
  addStaff: () => {
    const s = get();
    const n = (s.staffName || '').trim();
    if (!n) {
      get().showToast('Enter an employee name');
      return;
    }
    const member: StaffMember = { name: n, role: s.staffRole || 'Counter', initial: n[0].toUpperCase() };
    set((s2) => ({ staffList: [...s2.staffList, member], staffName: '' }));
  },
  importStandard: () => {
    set({ starterCount: STARTER.length, onbStep: 4 });
    get().showToast(STARTER.length + ' grocery products imported');
  },

  toggleDark: () =>
    set((s) => {
      const next = !s.dark;
      setDarkMode(next);
      return { dark: next };
    }),
  openProfile: () => set({ profile: true }),
  closeProfile: () => set({ profile: false }),
  openAlerts: () => set({ alerts: true }),
  closeAlerts: () => set({ alerts: false }),
  logout: () => {
    set({ profile: false, screen: 'home', cart: [] });
    get().showToast('Logged out of Stockaz');
  },
  togglePaySetting: (key) => set((s) => ({ [key]: !s[key] } as Partial<AppState>)),
  setCreditPerm: (label) => set({ creditPerm: label }),
}));
