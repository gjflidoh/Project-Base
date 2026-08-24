// Ported verbatim (values) from the CATALOG constant in Stockaz.dc.html.

export interface Product {
  img: string; // slug into productImages
  name: string;
  short: string;
  price: number;
  qty: number;
  cat: string;
}

function P(img: string, name: string, short: string, price: number, qty: number, cat: string): Product {
  return { img, name, short, price, qty, cat };
}

export const CATALOG: Product[] = [
  P('heinz-beans', 'Heinz Beans Original 415g', 'Heinz Beans', 25, 42, 'Groceries'),
  P('cheeky-chilli', 'Cheeky Chilli Sauce 200ml', 'Cheeky Chilli', 22, 31, 'Sauces'),
  P('tomato-hot', 'All Gold Hot & Spicy Tomato Sauce 500ml', 'Tomato Sauce', 55, 18, 'Sauces'),
  P('pilchards', 'Lucky Star Pilchards Hot Chilli 155g', 'Pilchards', 20, 56, 'Groceries'),
  P('chicco-bobo', 'Chicco Bobo Milk Flavour 36pkts', 'Chicco Bobo', 1, 240, 'Confectionery'),
  P('movit-jelly', 'Movit Herbal Petroleum Jelly 200g', 'Movit Jelly', 45, 24, 'Personal Care'),
  P('daddies-chilli', 'Daddies Sweet Chilli Sauce 375ml', 'Daddies Chilli', 18, 27, 'Sauces'),
  P('nandos-peri', "Nando's Peri Peri Sauce Mild 250g", 'Peri Peri', 65, 9, 'Sauces'),
  P('mummys-chilli', 'Mummys Chilli Sauce 2L', 'Mummys 2L', 42, 14, 'Sauces'),
  P('tomato-700', 'All Gold Tomato Sauce 700ml', 'Tomato 700', 71, 11, 'Sauces'),
  P('bbq-sauce', 'All Gold BBQ Sauce 500ml', 'BBQ Sauce', 55, 16, 'Sauces'),
  P('aloha-powder', 'Aloha Washing Powder 2kg', 'Aloha 2kg', 38, 22, 'Cleaning'),
  P('glycerin', 'Cosmo Glycerin Cream 400ml', 'Glycerin', 84, 12, 'Personal Care'),
  P('cosmo-rollon-kick', "Cosmo Men's Roll On Energy Kick 50ml", 'Roll On Kick', 59, 8, 'Personal Care'),
  P('cosmo-rollon-anti', 'Cosmo Roll On Anti-perspirant 50ml', 'Roll On Anti', 31.5, 19, 'Personal Care'),
  P('baby-cream', 'Baby & Me Baby Cream Vitamin A,E&F 250g', 'Baby Cream', 11.5, 34, 'Baby'),
  P('diapers', 'Softcare Premium Baby Diapers Small', 'Diapers S', 103, 7, 'Baby'),
  P('unbs-jelly', 'Unbs Petroleum Jelly 425g', 'Unbs Jelly', 92, 0, 'Personal Care'),
  P('bleach-powder', 'Crazy Color Bleach Powder Orange 500g', 'Bleach Powder', 72, 6, 'Personal Care'),
  P('movit-egg', 'Movit Hair Treatment Egg Protein 250g', 'Egg Protein', 65, 13, 'Personal Care'),
  P('mamas-oil', "Mama's Cooking Oil 5L", "Mama's Oil", 212, 15, 'Groceries'),
  P('dlite-oil', "D'lite Cooking Oil 5L", "D'lite Oil", 226, 9, 'Groceries'),
  P('padlock', 'Richdoor Padlock 40mm', 'Padlock', 42, 26, 'Hardware'),
  P('bolts', 'Galvanized Mild Steel Roofing Bolts & Nuts', 'Roof Bolts', 44, 48, 'Hardware'),
  P('wrench', 'Chrome Vanadium Offset Wrench 21/23', 'Wrench 21/23', 50, 12, 'Tools'),
  P('socket-set', 'Tatal Chrome Vanadium 25pcs 1/2" Socket Set', 'Socket Set', 950, 4, 'Tools'),
  P('grinder', 'Xcort Angle Grinder 20V', 'Angle Grinder', 2100, 3, 'Tools'),
  P('chainsaw', 'Zomax Gasoline Chain Saw', 'Chain Saw', 2750, 2, 'Tools'),
  P('usb-socket', 'USB Universal 2Ways 13/16A 2M', 'USB Socket', 95, 21, 'Electrical'),
  P('sink-tap', 'Single Sink Tap #85', 'Sink Tap', 85, 10, 'Plumbing'),
  P('sink-set', 'Kitchen Sanitaryware Appliance Z-29079', 'Sink Set', 135, 5, 'Plumbing'),
  P('hair-clipper', 'Waer Electric Hair Clipper', 'Hair Clipper', 400, 6, 'Electronics'),
  P('car-mp5', '7" Touch Screen Car MP5 Player', 'Car MP5', 780, 4, 'Electronics'),
  P('galaxy-s20', 'Samsung Galaxy S20+ Pre-owned', 'Galaxy S20+', 4100, 2, 'Electronics'),
];

export const SCAN: Product = CATALOG[0];

const STARTER_CATS = ['Groceries', 'Sauces', 'Confectionery', 'Cleaning', 'Personal Care', 'Baby'];
export const STARTER: Product[] = CATALOG.filter((p) => STARTER_CATS.includes(p.cat));

export const K = (n: number) =>
  'K' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const K0 = (n: number) => 'K' + Math.round(n).toLocaleString('en-US');
export const NUM = (v: unknown) => parseFloat(String(v ?? '').replace(/[^0-9.]/g, '')) || 0;
