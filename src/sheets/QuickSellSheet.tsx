import React from 'react';
import { View, Pressable, ScrollView, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { AppText } from '../components/Text';
import { ProductTile } from '../components/ProductTile';
import { Icon } from '../components/Icon';
import { GLYPH } from '../data/icons';
import { Background } from '../components/Background';
import { useStore } from '../store/useStore';
import { cartSubtotal, pickerItems } from '../store/selectors';
import { K } from '../data/catalog';
import { color, radius, shadow } from '../theme/tokens';

const SORTS = ['Recent', 'A–Z', 'Price', 'Stock'];

// The "Quick Sell" picker that opens from Home (tapping a quick-sell tile,
// or "View all") — full-screen over Home, closes back to it.
export function QuickSellSheet() {
  const store = useStore();
  const insets = useSafeAreaInsets();
  const visible = store.screen === 'home' && store.picker;
  const catalog = store.currentCatalog();
  const items = pickerItems(store, catalog);
  const basketCount = store.cart.reduce((a, c) => a + c.qty, 0);
  const total = cartSubtotal(store);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={() => store.closePicker()} statusBarTranslucent>
      <View style={{ flex: 1, backgroundColor: color.screen }}>
        <Background />
        <ScrollView contentContainerStyle={{ paddingTop: insets.top + 16, paddingHorizontal: 20, paddingBottom: 190, gap: 15 }} showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Pressable onPress={() => store.closePicker()} style={{ width: 36, height: 36, borderRadius: 13, backgroundColor: color.glass66, borderWidth: 1, borderColor: color.glassBorder, alignItems: 'center', justifyContent: 'center' }}>
              <Icon d={GLYPH.chevronDown} size={17} color={color.ink} strokeWidth={2.2} />
            </Pressable>
            <View style={{ flex: 1 }}>
              <AppText style={{ fontSize: 21, fontWeight: '800', color: color.ink, letterSpacing: -0.4 }}>Quick Sell</AppText>
              <AppText style={{ fontSize: 12, fontWeight: '600', color: color.sub2, marginTop: 1 }}>Tap to add · basket stays at the bottom</AppText>
            </View>
          </View>

          <View>
            <View style={{ flexDirection: 'row', gap: 9 }}>
              <View style={{ flex: 1, height: 46, borderRadius: radius.lg, backgroundColor: color.glass6, borderWidth: 1, borderColor: color.glassBorder, flexDirection: 'row', alignItems: 'center', gap: 9, paddingHorizontal: 14 }}>
                <AppText style={{ fontSize: 14, fontWeight: '600', color: store.pickerQuery ? color.ink : color.faint2 }}>{store.pickerQuery || 'Search products...'}</AppText>
              </View>
              <Pressable onPress={() => store.openScan()} style={{ width: 46, height: 46, borderRadius: radius.lg, backgroundColor: color.glass6, borderWidth: 1, borderColor: color.glassBorder, alignItems: 'center', justifyContent: 'center' }}>
                <Icon d={GLYPH.scan} size={19} color={color.accent} strokeWidth={2} />
              </Pressable>
              <Pressable onPress={() => store.toggleSort()} style={{ width: 46, height: 46, borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center', backgroundColor: store.sortOpen ? '#7A5F3C' : color.glass6, borderWidth: 1, borderColor: store.sortOpen ? 'transparent' : color.glassBorder }}>
                <Icon d={GLYPH.filter} size={18} color={store.sortOpen ? color.white : color.ink} strokeWidth={2} />
              </Pressable>
            </View>
            {store.sortOpen && (
              <View style={{ position: 'absolute', top: 52, right: 0, zIndex: 20, width: 150, borderRadius: radius.lg, padding: 6, backgroundColor: color.glass94, borderWidth: 1, borderColor: color.glassBorderStrong, ...shadow.card, gap: 2 }}>
                {SORTS.map((s) => {
                  const on = (store.pickerSort || 'Recent') === s;
                  return (
                    <Pressable key={s} onPress={() => store.setPickerSort(s)} style={{ height: 36, borderRadius: 12, paddingHorizontal: 11, backgroundColor: on ? 'rgba(149,119,80,.14)' : 'transparent', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <AppText style={{ fontSize: 13, fontWeight: '700', color: on ? '#6B5334' : '#4A4038' }}>{s}</AppText>
                      {on && <AppText style={{ fontSize: 13, fontWeight: '800' }}>✓</AppText>}
                    </Pressable>
                  );
                })}
              </View>
            )}
          </View>

          {store.soldNote && (
            <Pressable onPress={() => store.soldNoteOpen()} style={{ borderRadius: radius.lg, padding: 11, paddingHorizontal: 13, backgroundColor: 'rgba(149,119,80,.14)', borderWidth: 1, borderColor: 'rgba(149,119,80,.3)', flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
              <Icon d={GLYPH.check} size={17} color={color.accent} strokeWidth={2.2} />
              <View style={{ flex: 1 }}>
                <AppText style={{ fontSize: 12.5, fontWeight: '800', color: '#6B5334' }}>Sold · {store.soldNote.total}</AppText>
                <AppText style={{ fontSize: 11.5, fontWeight: '600', color: '#57493A', marginTop: 2 }}>{store.soldNote.items}</AppText>
              </View>
              <Pressable onPress={() => store.soldNoteClose()} style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: color.glass7, alignItems: 'center', justifyContent: 'center' }}>
                <Icon d={GLYPH.close} size={11} color="#6B5334" strokeWidth={3} />
              </Pressable>
            </Pressable>
          )}

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 11 }}>
            {items.map((p) => (
              <View key={p.name} style={{ width: '31%' }}>
                <ProductTile product={p} onPress={() => (p.outOfStock ? store.askRestock(p) : store.add(p))} onRemove={() => store.bump(p.name, -1)} />
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={{ position: 'absolute', left: 12, right: 12, bottom: Math.max(14, insets.bottom), borderRadius: radius.card, overflow: 'hidden', ...shadow.sheet }}>
          <BlurView intensity={45} tint="light" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
          <View style={{ backgroundColor: color.glass78, padding: 12, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={{ width: 44, height: 44, borderRadius: 16, backgroundColor: 'rgba(149,119,80,.1)', alignItems: 'center', justifyContent: 'center' }}>
              <Icon paths={['M5 9h14l-1.4 9.2a2 2 0 0 1-2 1.8H8.4a2 2 0 0 1-2-1.8Z', 'M9 9V6.5a3 3 0 0 1 6 0V9']} size={20} color={color.accent} strokeWidth={1.9} />
              {basketCount > 0 && (
                <View style={{ position: 'absolute', top: -5, right: -5, minWidth: 20, height: 20, paddingHorizontal: 5, borderRadius: 10, backgroundColor: '#7A5F3C', alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: color.white }}>
                  <AppText style={{ color: color.white, fontSize: 11.5, fontWeight: '800' }}>{basketCount}</AppText>
                </View>
              )}
            </View>
            <View style={{ flex: 1 }}>
              <AppText style={{ fontSize: 11, fontWeight: '800', color: color.faint, letterSpacing: 1 }}>BASKET</AppText>
              <AppText style={{ fontSize: 17, fontWeight: '800', color: color.ink, letterSpacing: -0.3, marginTop: 1 }}>{K(total)}</AppText>
            </View>
            {store.cart.length > 0 && (
              <Pressable onPress={() => store.basketClear()} style={{ width: 40, height: 40, borderRadius: 14, backgroundColor: color.hairline, alignItems: 'center', justifyContent: 'center' }}>
                <Icon paths={['M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13']} size={16} color={color.sub2} strokeWidth={2} />
              </Pressable>
            )}
            <Pressable onPress={() => store.basketCheckout()} style={{ height: 46, paddingHorizontal: 20, borderRadius: 17, backgroundColor: store.cart.length ? '#7A5F3C' : color.mutedButton, alignItems: 'center', justifyContent: 'center' }}>
              <AppText style={{ color: color.white, fontSize: 15, fontWeight: '800' }}>Checkout</AppText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default QuickSellSheet;
