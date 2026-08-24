import React from 'react';
import { View, Pressable, Image, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { AppText } from '../components/Text';
import { GlassCard } from '../components/GlassCard';
import { ProductTile } from '../components/ProductTile';
import { PrimaryButton } from '../components/PrimaryButton';
import { Chip } from '../components/Chip';
import { Icon } from '../components/Icon';
import { GLYPH } from '../data/icons';
import { productImage } from '../data/images';
import { Background } from '../components/Background';
import { useStore } from '../store/useStore';
import { cartLines, cartSubtotal, quickSell } from '../store/selectors';
import { K0 } from '../data/catalog';
import { color, gradient, radius, shadow } from '../theme/tokens';

export function AddCreditScreen() {
  const store = useStore();
  const insets = useSafeAreaInsets();
  const catalog = store.currentCatalog();
  const cc = store.creditList.find((c) => c.id === store.creditSel) || store.creditList[0];
  const lines = cartLines(store);
  const subtotal = cartSubtotal(store);
  const suggestions = quickSell(store, catalog);

  return (
    <View style={{ flex: 1, backgroundColor: color.screen }}>
      <Background />
      <ScrollView contentContainerStyle={{ paddingTop: insets.top + 16, paddingHorizontal: 20, paddingBottom: 300, gap: 15 }} showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Pressable onPress={() => store.go('credit')} style={{ width: 36, height: 36, borderRadius: 13, backgroundColor: color.glass66, borderWidth: 1, borderColor: color.glassBorder, alignItems: 'center', justifyContent: 'center' }}>
            <Icon d={GLYPH.close} size={16} color={color.ink} strokeWidth={2.4} />
          </Pressable>
          <AppText style={{ fontSize: 22, fontWeight: '800', color: color.ink, letterSpacing: -0.4 }}>Add Credit</AppText>
        </View>

        <AppText style={{ fontSize: 11.5, fontWeight: '800', color: color.faint, letterSpacing: 1.6 }}>CUSTOMER</AppText>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: -8 }}>
          {store.creditList.map((c) => (
            <Chip key={c.id} label={c.name} selected={c.id === cc.id} onPress={() => store.patch({ creditSel: c.id })} />
          ))}
        </View>

        <View style={{ flexDirection: 'row', gap: 9 }}>
          <View style={{ flex: 1, height: 46, borderRadius: radius.lg, backgroundColor: color.glass62, borderWidth: 1, borderColor: color.glassBorder, flexDirection: 'row', alignItems: 'center', gap: 9, paddingHorizontal: 14 }}>
            <AppText style={{ fontSize: 14, fontWeight: '600', color: color.faint2 }}>Search or scan product</AppText>
          </View>
          <Pressable onPress={() => store.openScan()} style={{ width: 46, height: 46, borderRadius: radius.lg, overflow: 'hidden', ...shadow.button }}>
            <LinearGradient colors={gradient.primary.colors as unknown as [string, string]} start={gradient.primary.start} end={gradient.primary.end} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Icon d={GLYPH.scan} size={19} color={color.white} strokeWidth={2} />
            </LinearGradient>
          </Pressable>
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

        <AppText style={{ fontSize: 12.5, fontWeight: '800', color: color.faint, letterSpacing: 1.6 }}>QUICK ADD</AppText>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: -8 }}>
          {suggestions.map((p) => (
            <View key={p.name} style={{ width: '31%' }}>
              <ProductTile product={p} onPress={() => (p.outOfStock ? store.askRestock(p) : store.add(p))} compact />
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={{ position: 'absolute', left: 12, right: 12, bottom: Math.max(12, insets.bottom), borderRadius: radius.massive, overflow: 'hidden', ...shadow.sheet }}>
        <BlurView intensity={45} tint="light" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
        <View style={{ backgroundColor: color.glass74, padding: 18 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <AppText style={{ fontSize: 12.5, fontWeight: '600', color: color.sub2 }}>Current Balance</AppText>
            <AppText style={{ fontSize: 12.5, fontWeight: '600', color: color.sub2 }}>{K0(cc.balance)}</AppText>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
            <AppText style={{ fontSize: 12.5, fontWeight: '600', color: color.sub2 }}>New Credit</AppText>
            <AppText style={{ fontSize: 12.5, fontWeight: '600', color: color.sub2 }}>{K0(subtotal)}</AppText>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginVertical: 11 }}>
            <AppText style={{ fontSize: 13, fontWeight: '800', color: color.ink }}>New Balance</AppText>
            <AppText style={{ fontSize: 28, fontWeight: '800', color: color.ink, letterSpacing: -0.6 }}>{K0(cc.balance + subtotal)}</AppText>
          </View>
          <PrimaryButton label="Confirm Credit" height={52} radiusSize={19} fontSize={16.5} onPress={() => store.confirmCredit(subtotal)} />
        </View>
      </View>
    </View>
  );
}

export default AddCreditScreen;
