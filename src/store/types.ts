import type { Product } from '../data/catalog';
import type { Receipt } from '../data/receipts';
import type { CreditCustomer } from '../data/credit';
import type { ListKey, ListRow } from '../data/lists';

export type Screen =
  | 'home' | 'stock' | 'receipts' | 'more' | 'monitor' | 'sale' | 'scan'
  | 'credit' | 'creditDetail' | 'addCredit' | 'settings' | 'reports'
  | 'subscription' | 'account' | 'onb' | 'form' | 'detail'
  | ListKey;

export interface CartLine extends Product {
  qty: number;
}

export interface RestockTarget {
  name: string;
  short: string;
  img: string;
  cat: string;
}

export interface ToastAction {
  label: string;
  onPick: () => void;
}

export interface SoldNote {
  total: string;
  items: string;
  rec: Receipt;
}

export interface ApprovalRequest {
  id: string;
  total: number;
  lines: [string, number][];
}

export interface DetailTarget {
  key: ListKey;
  row: ListRow;
}

export interface StaffMember {
  name: string;
  role: string;
  initial: string;
}

export interface AppState {
  // navigation
  screen: Screen;
  prevScreen: Screen;
  formKey: string | null;
  formVals: Record<string, string>;
  detail: DetailTarget | null;
  listFilter: string;
  added: Partial<Record<ListKey, ListRow[]>>;

  // POS / cart
  cart: CartLine[];
  pay: string;
  paid: string;
  padOpen: boolean;
  picker: boolean;
  pickerQuery: string;
  pickerSort: string;
  sortOpen: boolean;
  saleCust: string | null;

  // stock
  query: string;
  stockAdj: Record<string, number>;
  newProducts: Product[];
  restock: RestockTarget | null;
  restockQty: number;
  addMode: boolean;

  // sales / receipts
  total: number;
  txns: number;
  receipts: Receipt[];
  receipt: Receipt | null;
  soldNote: SoldNote | null;
  tab: string;

  // credit
  creditList: CreditCustomer[];
  creditIssued: number;
  creditPaidMonth: number;
  creditSel: string | null;
  creditQuery: string;
  creditFilter: string;
  creditPerm: string;
  approval: ApprovalRequest | null;
  pin: string;

  // scan
  scanning: boolean;
  scanFound: boolean;

  // settings / account / subscription
  payMomo: boolean;
  payCard: boolean;
  payCredit: boolean;
  plan: string;
  payMethod: string;
  acctName: string;
  acctPhone: string;
  acctEmail: string;
  acctLang: string;
  period: 'Today' | 'Week' | 'Month';

  // chrome
  profile: boolean;
  alerts: boolean;
  dark: boolean;
  toast: string;
  toastAction: ToastAction | null;

  // onboarding
  onbStep: number;
  onbAdded: boolean;
  onbCount: number;
  shopName: string;
  shopType: string;
  stockSkipped: boolean;
  starterCount: number;
  buyPrice: string;
  sellPrice: string;
  onbQty: number | null;
  staffMode: 'me' | 'staff' | null;
  staffName: string;
  staffRole: string;
  staffList: StaffMember[];
}
