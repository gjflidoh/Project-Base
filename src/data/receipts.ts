// Ported from the initial `receipts` seed in Component.state (Stockaz.dc.html).
// Each line tuple is [label, amount].

export type ReceiptLine = [string, number];

export interface Receipt {
  no: string;
  when: string;
  customer: string;
  amount: number;
  method: 'Cash' | 'Mobile Money' | 'Card' | 'Credit';
  lines: ReceiptLine[];
}

export const SEED_RECEIPTS: Receipt[] = [
  {
    no: '#000128', when: '23 Aug • 12:42 PM', customer: 'Walk-in Customer', amount: 120, method: 'Cash',
    lines: [
      ['Heinz Beans Original 415g × 2', 50],
      ['Cheeky Chilli Sauce 200ml × 1', 22],
      ['Movit Herbal Petroleum Jelly 200g × 1', 45],
      ['Chicco Bobo Milk Flavour 36pkts × 3', 3],
    ],
  },
  {
    no: '#000127', when: '23 Aug • 11:58 AM', customer: 'Mrs Banda', amount: 254, method: 'Mobile Money',
    lines: [["Mama's Cooking Oil 5L × 1", 212], ['Aloha Washing Powder 2kg × 1', 38]],
  },
  {
    no: '#000126', when: '23 Aug • 10:20 AM', customer: 'Walk-in Customer', amount: 94, method: 'Cash',
    lines: [
      ['Richdoor Padlock 40mm × 1', 42],
      ['Galvanized Mild Steel Roofing Bolts & Nuts × 1', 44],
      ['Chicco Bobo Milk Flavour 36pkts × 8', 8],
    ],
  },
  {
    no: '#000125', when: '22 Aug • 05:07 PM', customer: 'Chanda Hardware', amount: 1000, method: 'Credit',
    lines: [
      ['Tatal Chrome Vanadium 25pcs 1/2" Socket Set × 1', 950],
      ['Chrome Vanadium Offset Wrench 21/23 × 1', 50],
    ],
  },
  {
    no: '#000124', when: '22 Aug • 03:31 PM', customer: 'Walk-in Customer', amount: 130.5, method: 'Card',
    lines: [
      ['Cosmo Glycerin Cream 400ml × 1', 84],
      ['Cosmo Roll On Anti-perspirant 50ml × 1', 31.5],
      ['Softcare Premium Baby Diapers Small × 1', 15],
    ],
  },
];
