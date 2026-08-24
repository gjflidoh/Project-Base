// Ported from the FORMS constant in Stockaz.dc.html. Field/config data is
// pure here; the side-effecting `apply` logic for the "special" forms
// (products, plan, paymethod, creditpay, account) lives in the store, since
// it needs store actions (setState/toast/recordPayment) to run.

import type { ListRow, ListKey } from './lists';

export interface FormField {
  k: string;
  label: string;
  ph?: string;
  opts?: string[];
  def?: string;
  money?: boolean;
}

export interface FormConfig {
  title: string;
  submit: string;
  back?: string;
  fields: FormField[];
}

export const FORMS: Record<string, FormConfig> = {
  customers: {
    title: 'New Customer', submit: 'Save Customer',
    fields: [
      { k: 'name', label: 'CUSTOMER NAME', ph: 'Chanda Hardware' },
      { k: 'phone', label: 'PHONE', ph: '+260 97 000 0000' },
      { k: 'kind', label: 'CUSTOMER TYPE', opts: ['Walk-in', 'Credit allowed'], def: 'Walk-in' },
      { k: 'limit', label: 'CREDIT LIMIT', ph: '1,000', money: true },
    ],
  },
  suppliers: {
    title: 'New Supplier', submit: 'Save Supplier',
    fields: [
      { k: 'name', label: 'SUPPLIER NAME', ph: 'Trade Kings Depot' },
      { k: 'phone', label: 'PHONE', ph: '+260 97 000 0000' },
      { k: 'cat', label: 'SUPPLIES', opts: ['Groceries', 'Sauces', 'Personal care', 'Hardware', 'Baby care'], def: 'Groceries' },
    ],
  },
  orders: {
    title: 'New Order', submit: 'Raise Order',
    fields: [
      { k: 'supplier', label: 'SUPPLIER', opts: ['Zambeef Wholesale', 'Trade Kings Depot', 'Cosmo Distributors', 'Chilenje Hardware Supply'], def: 'Zambeef Wholesale' },
      { k: 'lines', label: 'NUMBER OF LINES', ph: '8' },
      { k: 'value', label: 'ORDER VALUE', ph: '1,860', money: true },
    ],
  },
  invoices: {
    title: 'New Invoice', submit: 'Create Invoice',
    fields: [
      { k: 'customer', label: 'CUSTOMER', opts: ['Chanda Hardware', 'Mrs Banda', 'Lusaka Lodge', 'Joseph Phiri'], def: 'Chanda Hardware' },
      { k: 'amount', label: 'AMOUNT', ph: '1,000', money: true },
      { k: 'due', label: 'DUE', opts: ['On receipt', '7 days', '14 days', '30 days'], def: '14 days' },
    ],
  },
  quotations: {
    title: 'New Quotation', submit: 'Send Quotation',
    fields: [
      { k: 'customer', label: 'CUSTOMER', opts: ['Lusaka Lodge', 'Chanda Hardware', 'Kabwata School'], def: 'Lusaka Lodge' },
      { k: 'amount', label: 'AMOUNT', ph: '4,120', money: true },
      { k: 'valid', label: 'VALID FOR', opts: ['7 days', '14 days', '30 days'], def: '14 days' },
    ],
  },
  expenses: {
    title: 'Add Expense', submit: 'Save Expense',
    fields: [
      { k: 'cat', label: 'CATEGORY', opts: ['Transport', 'Rent', 'Wages', 'Airtime & data', 'ZESCO units', 'Other'], def: 'Transport' },
      { k: 'note', label: 'NOTE', ph: 'Stock run to Soweto Market' },
      { k: 'amount', label: 'AMOUNT', ph: '180', money: true },
      { k: 'paid', label: 'PAID WITH', opts: ['Cash', 'Mobile Money'], def: 'Cash' },
    ],
  },
  employees: {
    title: 'Add Employee', submit: 'Add Employee',
    fields: [
      { k: 'name', label: 'EMPLOYEE NAME', ph: 'Brian Sakala' },
      { k: 'phone', label: 'PHONE', ph: '+260 97 000 0000' },
      { k: 'role', label: 'ROLE', opts: ['Counter', 'Manager'], def: 'Counter' },
      { k: 'pin', label: 'COUNTER PIN', ph: '4 digits' },
    ],
  },
  products: {
    title: 'New Product', submit: 'Save Product', back: 'stock',
    fields: [
      { k: 'name', label: 'PRODUCT NAME', ph: 'Heinz Beans 415g' },
      { k: 'price', label: 'SELLING PRICE', ph: '25', money: true },
      { k: 'qty', label: 'OPENING STOCK', ph: '12' },
      { k: 'cat', label: 'CATEGORY', opts: ['Groceries', 'Sauces', 'Confectionery', 'Toiletries', 'Hardware'], def: 'Groceries' },
    ],
  },
  plan: {
    title: 'Change plan', submit: 'Switch plan', back: 'subscription',
    fields: [
      { k: 'plan', label: 'PLAN', opts: ['Lite — K150', 'Pro — K350', 'Multi-shop — K600'], def: 'Pro — K350' },
      { k: 'cycle', label: 'BILLING', opts: ['Monthly', 'Yearly — 2 months free'], def: 'Monthly' },
    ],
  },
  paymethod: {
    title: 'Payment method', submit: 'Save method', back: 'subscription',
    fields: [
      { k: 'net', label: 'MOBILE MONEY', opts: ['MTN MoMo', 'Airtel Money', 'Zamtel Kwacha'], def: 'MTN MoMo' },
      { k: 'num', label: 'NUMBER', ph: '097 412 8890' },
    ],
  },
  creditpay: {
    title: 'Record Payment', submit: 'Record Payment', back: 'creditDetail',
    fields: [
      { k: 'amount', label: 'AMOUNT RECEIVED', ph: '200', money: true },
      { k: 'method', label: 'RECEIVED AS', opts: ['Cash', 'Mobile Money'], def: 'Cash' },
    ],
  },
  account: {
    title: 'Edit account', submit: 'Save changes', back: 'account',
    fields: [
      { k: 'name', label: 'FULL NAME', ph: 'Kelvin Mwansa' },
      { k: 'phone', label: 'PHONE', ph: '+260 97 412 8890' },
      { k: 'email', label: 'EMAIL', ph: 'kelvin@stockaz.app' },
      { k: 'lang', label: 'LANGUAGE', opts: ['English', 'Nyanja', 'Bemba'], def: 'English' },
    ],
  },
};

// Keys handled with custom side-effecting logic in the store (products
// mutate stock, plan/paymethod/account patch settings, creditpay records a
// payment). Everything else is a generic list form using `make()` below.
export const SPECIAL_FORM_KEYS = new Set(['products', 'plan', 'paymethod', 'creditpay', 'account']);

type FormValues = Record<string, string>;

// Ported from FORMS[key].make(v) for the 7 generic record-list forms.
export const FORM_MAKE: Partial<Record<ListKey, (v: FormValues) => ListRow>> = {
  customers: (v) => ({
    title: v.name || 'New customer', sub: (v.phone || 'No phone') + ' · 0 sales', value: 'K0',
    badge: v.kind === 'Credit allowed' ? 'On credit' : 'Paid up', tone: v.kind === 'Credit allowed' ? 'warn' : 'ok',
    tag: v.kind === 'Credit allowed' ? 'On credit' : 'All', avatar: true,
  }),
  suppliers: (v) => ({
    title: v.name || 'New supplier', sub: (v.cat || 'Groceries') + ' · no orders yet', value: 'K0',
    badge: 'Settled', tone: 'ok', avatar: true,
  }),
  orders: (v) => ({
    title: 'PO-0044 · ' + (v.supplier || 'Zambeef Wholesale'), sub: (v.lines || '1') + ' lines · raised today',
    value: 'K' + (v.value || '0'), badge: 'Awaiting', tone: 'warn', tag: 'Open',
  }),
  invoices: (v) => ({
    title: 'INV-0122 · ' + (v.customer || 'Chanda Hardware'), sub: 'Due ' + (v.due || '14 days') + ' · created today',
    value: 'K' + (v.amount || '0'), badge: 'Unpaid', tone: 'warn', tag: 'Unpaid',
  }),
  quotations: (v) => ({
    title: 'QT-0035 · ' + (v.customer || 'Lusaka Lodge'), sub: 'Valid ' + (v.valid || '14 days') + ' · sent today',
    value: 'K' + (v.amount || '0'), badge: 'Sent', tone: 'warn', tag: 'Sent',
  }),
  expenses: (v) => ({
    title: (v.cat || 'Transport') + (v.note ? ' — ' + v.note : ''), sub: 'Today · ' + (v.paid || 'Cash'),
    value: 'K' + (v.amount || '0'), badge: '', tone: 'flat', tag: 'Today',
  }),
  employees: (v) => ({
    title: v.name || 'New employee', sub: (v.role || 'Counter') + ' · sales & receipts', value: 'K0',
    badge: 'Off today', tone: 'flat', avatar: true,
  }),
};
