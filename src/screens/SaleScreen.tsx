import React from 'react';
import { View, Pressable, Image, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { AppText } from '../components/Text';
import { GlassCard } from '../components/GlassCard';
import { ProductTile } from '../components/ProductTile';
import { PrimaryButton } from '../components/PrimaryButton';
import { Icon, IconSearch } from '../components/Icon';
import { GLYPH } from '../data/icons';
import { productImage } from '../data/images';
import { useStore } from '../store/useStore';
import { cartLines, cartSubtotal, pickerItems } from '../store/selectors';
import { K, NUM } from '../data/catalog';
import { color, radius, shadow } from '../theme/tokens';
import { Background } from '../components/Background';

const SORTS = ['Recent', 'A–Z', 'Price', 'Stock'];

export function SaleScreen() {
  const store = useStore();
  const insets = useSafeAreaInsets();
  const catalog = store.currentCatalog();
  const lines = cartLines(store);
  const items = pickerItems(store, catalog);
  const subtotal = cartSubtotal(store);
  const paid = NUM(store.paid);
  const changeOk = paid >= subtotal && subtotal > 0;

  return (
    <View style={{ flex: 1, backgroundColor: color.screen }}>
      <Background />
      <ScrollView contentContainerStyle={{ paddingTop: insets.top + 16, paddingHorizontal: 20, paddingBottom: 260, gap: 15 }} showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Pressable onPress={() => store.patch({ screen: 'home' })} style={{ width: 36, height: 36, borderRadius: 13, backgroundColor: color.glass66, borderWidth: 1, borderColor: color.glassBorder, alignItems: 'center', justifyContent: 'center' }}>
            <Icon d={GLYPH.close} size={16} color={color.ink} strokeWidth={2.4} />
          </Pressable>
          <AppText style={{ fontSize: 22, fontWeight: '800', color: color.ink, letterSpacing: -0.4 }}>New Sale</AppText>
        </View>

        <View>
          <View style={{ flexDirection: 'row', gap: 9 }}>
            <View style={{ flex: 1, height: 46, borderRadius: radius.lg, backgroundColor: color.glass6, borderWidth: 1, borderColor: color.glassBorder, flexDirection: 'row', alignItems: 'center', gap: 9, paddingHorizontal: 14 }}>
              <IconSearch />
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

        {lines.length > 0 && (
          <View style={{ gap: 10 }}>
            {lines.map((c) => (
              <GlassCard key={c.name} style={{ padding: 12, paddingHorizontal: 14 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <View style={{ width: 42, height: 42, borderRadius: 13, backgroundColor: color.productMat, borderWidth: 1, borderColor: color.glass8, overflow: 'hidden', padding: 3 }}>
                    <Image source={productImage(c.img)} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
                  </View>
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <AppText numberOfLines={1} style={{ fontSize: 13.5, fontWeight: '700', color: color.ink }}>{c.name}</AppText>
                    <AppText style={{ fontSize: 12.5, fontWeight: '700', color: color.accent, marginTop: 3 }}>{c.lineLabel}</AppText>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, padding: 3, borderRadius: 14, backgroundColor: color.hairline }}>
                    <Pressable onPress={() => store.bump(c.name, -1)} style={{ width: 28, height: 28, borderRadius: 11, backgroundColor: color.glass9, alignItems: 'center', justifyContent: 'center' }}>
                      <AppText style={{ fontSize: 15, fontWeight: '800', color: color.ink }}>−</AppText>
                    </Pressable>
                    <AppText style={{ minWidth: 22, textAlign: 'center', fontSize: 14, fontWeight: '800', color: color.ink }}>{c.qty}</AppText>
                    <Pressable onPress={() => store.add(c)} style={{ width: 28, height: 28, borderRadius: 11, backgroundColor: '#7A5F3C', alignItems: 'center', justifyContent: 'center' }}>
                      <AppText style={{ fontSize: 15, fontWeight: '800', color: color.white }}>+</AppText>
                    </Pressable>
                  </View>
                </View>
              </GlassCard>
            ))}
          </View>
        )}

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 11 }}>
          {items.map((p) => (
            <View key={p.name} style={{ width: '31%' }}>
              <ProductTile product={p} onPress={p.qtyInCart ? () => store.add(p) : () => (p.outOfStock ? store.askRestock(p) : store.add(p))} onRemove={() => store.bump(p.name, -1)} />
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={{ position: 'absolute', left: 12, right: 12, bottom: Math.max(12, insets.bottom), borderRadius: radius.card, overflow: 'hidden', ...shadow.sheet }}>
        <BlurView intensity={45} tint="light" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
        <View style={{ backgroundColor: color.glass78, padding: 16, gap: 9 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <AppText style={{ width: 96, fontSize: 13, fontWeight: '700', color: color.sub }}>Total cost</AppText>
            <View style={{ flex: 1, height: 52, borderRadius: radius.lg, backgroundColor: 'rgba(149,119,80,.1)', borderWidth: 1, borderColor: color.accentBorder, justifyContent: 'center', paddingHorizontal: 14 }}>
              <AppText style={{ fontSize: 26, fontWeight: '800', color: color.ink, letterSpacing: -0.5 }}>{K(subtotal)}</AppText>
            </View>
          </View>
          <Pressable onPress={() => store.openPad()} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <AppText style={{ width: 96, fontSize: 13, fontWeight: '700', color: color.sub }}>Amount paid</AppText>
            <View style={{ flex: 1, height: 44, borderRadius: radius.lg, backgroundColor: color.glass85, borderWidth: 1, borderColor: color.hairline2, justifyContent: 'center', paddingHorizontal: 14 }}>
              <AppText style={{ fontSize: 15, fontWeight: '700', color: paid ? color.ink : color.faint2 }}>{paid ? K(paid) : 'Tap to enter'}</AppText>
            </View>
          </Pressable>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <AppText style={{ width: 96, fontSize: 13, fontWeight: '700', color: color.sub }}>Change</AppText>
            <View style={{ flex: 1, height: 44, borderRadius: radius.lg, backgroundColor: changeOk ? 'rgba(149,119,80,.1)' : color.glass7, borderWidth: 1, borderColor: changeOk ? color.accentBorder : color.hairline2, justifyContent: 'center', paddingHorizontal: 14 }}>
              <AppText style={{ fontSize: 15, fontWeight: '800', color: changeOk ? color.accent : color.faint2 }}>{changeOk ? K(paid - subtotal) : '—'}</AppText>
            </View>
          </View>
          <View style={{ marginTop: 3 }}>
            <PrimaryButton label="Sell" height={54} radiusSize={radius.xl} fontSize={17} onPress={() => store.payPrimary()} />
          </View>
        </View>
      </View>
    </View>
  );
}

export default SaleScreen;
