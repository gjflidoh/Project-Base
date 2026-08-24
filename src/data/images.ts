// Static require map for product packshots — the RN bundler needs literal
// `require()` calls, so this is the one place that enumerates every asset.
// Keys match the `img` slug used in catalog.ts (filename without extension).

export const productImages: Record<string, number> = {
  'aloha-powder': require('../../assets/products/aloha-powder.png'),
  'baby-cream': require('../../assets/products/baby-cream.png'),
  'bbq-sauce': require('../../assets/products/bbq-sauce.png'),
  'bleach-powder': require('../../assets/products/bleach-powder.png'),
  bolts: require('../../assets/products/bolts.png'),
  'car-mp5': require('../../assets/products/car-mp5.png'),
  chainsaw: require('../../assets/products/chainsaw.png'),
  'cheeky-chilli': require('../../assets/products/cheeky-chilli.png'),
  'chicco-bobo': require('../../assets/products/chicco-bobo.png'),
  'cosmo-rollon-anti': require('../../assets/products/cosmo-rollon-anti.png'),
  'cosmo-rollon-kick': require('../../assets/products/cosmo-rollon-kick.png'),
  'daddies-chilli': require('../../assets/products/daddies-chilli.png'),
  diapers: require('../../assets/products/diapers.png'),
  'dlite-oil': require('../../assets/products/dlite-oil.png'),
  'galaxy-s20': require('../../assets/products/galaxy-s20.png'),
  glycerin: require('../../assets/products/glycerin.png'),
  grinder: require('../../assets/products/grinder.png'),
  'hair-clipper': require('../../assets/products/hair-clipper.png'),
  'heinz-beans': require('../../assets/products/heinz-beans.png'),
  'mamas-oil': require('../../assets/products/mamas-oil.png'),
  'movit-egg': require('../../assets/products/movit-egg.png'),
  'movit-jelly': require('../../assets/products/movit-jelly.png'),
  'mummys-chilli': require('../../assets/products/mummys-chilli.png'),
  'nandos-peri': require('../../assets/products/nandos-peri.png'),
  padlock: require('../../assets/products/padlock.png'),
  pilchards: require('../../assets/products/pilchards.png'),
  'sink-set': require('../../assets/products/sink-set.png'),
  'sink-tap': require('../../assets/products/sink-tap.png'),
  'socket-set': require('../../assets/products/socket-set.png'),
  'tomato-700': require('../../assets/products/tomato-700.png'),
  'tomato-hot': require('../../assets/products/tomato-hot.png'),
  'unbs-jelly': require('../../assets/products/unbs-jelly.png'),
  'usb-socket': require('../../assets/products/usb-socket.png'),
  wrench: require('../../assets/products/wrench.png'),
};

export function productImage(slug: string): number {
  return productImages[slug] ?? productImages['heinz-beans'];
}
