// Ported from the CREDIT constant in Stockaz.dc.html.
// Each txn tuple is [label, amount, isPayment(0|1)].

export type CreditTone = 'ok' | 'warn' | 'bad';
export type CreditTxnLine = [string, number, 0 | 1];
export type CreditTxnGroup = [string, CreditTxnLine[]];

export interface CreditCustomer {
  id: string;
  name: string;
  phone: string;
  balance: number;
  last: string;
  tone: CreditTone;
  txns: CreditTxnGroup[];
}

export const CREDIT: CreditCustomer[] = [
  {
    id: 'jb', name: 'John Banda', phone: '+260 97 552 1180', balance: 650, last: 'Last credit: Today', tone: 'warn',
    txns: [
      ['21 Aug', [['Payment received', -200, 1], ['Cooking Oil 5L', 212, 0]]],
      ['20 Aug', [["Mama's Cooking Oil 5L", 212, 0], ['Sugar — Aloha 2kg', 38, 0], ['Heinz Beans × 8', 200, 0]]],
      ['18 Aug', [['Payment received', -300, 1], ['Cheeky Chilli × 6', 132, 0]]],
    ],
  },
  {
    id: 'mp', name: 'Mary Phiri', phone: '+260 96 331 7742', balance: 320, last: 'Last credit: 20 Aug', tone: 'ok',
    txns: [
      ['20 Aug', [['Movit Jelly × 2', 90, 0], ['Baby Cream × 4', 46, 0]]],
      ['14 Aug', [['Payment received', -240, 1], ['Aloha Washing Powder × 3', 114, 0]]],
    ],
  },
  {
    id: 'kz', name: 'Kelvin Zulu', phone: '+260 95 908 2214', balance: 620, last: 'Overdue · 28 days', tone: 'bad',
    txns: [
      ['26 Jul', [['Richdoor Padlock × 2', 84, 0], ['Roofing Bolts × 6', 264, 0], ['Wrench 21/23', 50, 0]]],
      ['22 Jul', [['Peri Peri × 2', 130, 0], ['Pilchards × 4', 80, 0]]],
    ],
  },
  {
    id: 'ch', name: 'Chanda Hardware', phone: '+260 97 771 2043', balance: 430, last: 'Last credit: 19 Aug', tone: 'warn',
    txns: [['19 Aug', [['Socket Set 25pcs', 950, 0], ['Payment received', -520, 1]]]],
  },
  {
    id: 'll', name: 'Lusaka Lodge', phone: '+260 95 118 4460', balance: 560, last: 'Last credit: 17 Aug', tone: 'warn',
    txns: [['17 Aug', [["D'lite Cooking Oil × 2", 452, 0], ['Chicco Bobo × 108', 108, 0]]]],
  },
  {
    id: 'jp', name: 'Joseph Phiri', phone: '+260 97 664 1129', balance: 390, last: 'Last credit: 15 Aug', tone: 'ok',
    txns: [['15 Aug', [['Glycerin Cream × 3', 252, 0], ['Roll On Kick × 2', 118, 0], ['Payment received', -180, 1]]]],
  },
  {
    id: 'gm', name: 'Grace Mumba', phone: '+260 96 774 3318', balance: 480, last: 'Last credit: 12 Aug', tone: 'ok',
    txns: [['12 Aug', [['Diapers Small × 4', 412, 0], ['Baby Cream × 6', 69, 0]]]],
  },
];
