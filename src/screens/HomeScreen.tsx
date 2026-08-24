import React from 'react';
import { View, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AppText } from '../components/Text';
import { ScreenScroll } from '../components/ScreenScroll';
import { ProductTile } from '../components/ProductTile';
import { Icon, IconBell } from '../components/Icon';
import { useStore } from '../store/useStore';
import { quickSell } from '../store/selectors';
import { K0 } from '../data/catalog';
import { color, gradient, radius, shadow } from '../theme/tokens';

export function HomeScreen() {
  const store = useStore();
  const catalog = store.currentCatalog();
  const items = quickSell(store, catalog);
  const collected = store.total - (store.creditIssued || 800);

  return (
    <ScreenScroll gap={20}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 9 }}>
          <AppText style={{ fontSize: 25, fontWeight: '800', letterSpacing: -0.5, color: color.ink }}>Stockaz</AppText>
          <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: color.accentDot, marginBottom: 4 }} />
        </View>
        <View style={{ flexDirection: 'row', gap: 9 }}>
          <Pressable onPress={() => store.openAlerts()} style={{ width: 38, height: 38, borderRadius: 14, backgroundColor: color.glass62, borderWidth: 1, borderColor: color.glassBorder, alignItems: 'center', justifyContent: 'center' }}>
            <IconBell />
            <View style={{ position: 'absolute', top: 9, right: 10, width: 7, height: 7, borderRadius: 4, backgroundColor: color.danger, borderWidth: 1.5, borderColor: color.white }} />
          </Pressable>
          <Pressable onPress={() => store.openProfile()} style={{ width: 38, height: 38, borderRadius: 14, overflow: 'hidden', ...shadow.button }}>
            <LinearGradient colors={gradient.avatar.colors as unknown as [string, string]} start={gradient.avatar.start} end={gradient.avatar.end} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <AppText style={{ color: color.white, fontSize: 13, fontWeight: '800' }}>K</AppText>
            </LinearGradient>
          </Pressable>
        </View>
      </View>

      <View style={{ borderRadius: radius.card, overflow: 'hidden', ...shadow.hero }}>
        <LinearGradient colors={gradient.hero.colors as unknown as [string, string]} start={gradient.hero.start} end={gradient.hero.end} style={{ padding: 24 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 9 }}>
            <Icon d="M3 17l6-6 4 4 7-7M14 8h6v6" color="rgba(255,255,255,.9)" strokeWidth={2.2} size={16} />
            <AppText style={{ fontSize: 13.5, fontWeight: '700', color: 'rgba(255,255,255,.9)' }}>Total Sales</AppText>
          </View>
          <AppText style={{ fontSize: 52, fontWeight: '800', color: color.white, letterSpacing: -1.5, marginVertical: 10 }}>{K0(collected)}</AppText>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <AppText style={{ fontSize: 13, fontWeight: '600', color: 'rgba(255,255,255,.78)' }}>Today</AppText>
            <View style={{ backgroundColor: 'rgba(255,255,255,.85)', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5 }}>
              <AppText style={{ fontSize: 11.5, fontWeight: '700', color: '#58452B' }}>{store.txns} sales</AppText>
            </View>
          </View>
          <Pressable onPress={() => store.go('credit')} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, borderRadius: 14, padding: 13, backgroundColor: 'rgba(255,255,255,.16)' }}>
            <AppText style={{ fontSize: 12, fontWeight: '600', color: 'rgba(255,255,255,.78)' }}>On credit</AppText>
            <AppText style={{ fontSize: 16, fontWeight: '800', color: color.white }}>{K0(store.creditIssued || 800)}</AppText>
          </Pressable>
        </LinearGradient>
      </View>

      <View>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', paddingBottom: 12 }}>
          <AppText style={{ fontSize: 16.5, fontWeight: '800', color: color.ink, letterSpacing: -0.3 }}>Recent Sales</AppText>
          <Pressable onPress={() => store.openPicker()}>
            <AppText style={{ fontSize: 12.5, fontWeight: '700', color: color.accent }}>View all</AppText>
          </Pressable>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 11 }}>
          {items.map((p) => (
            <View key={p.name} style={{ width: '31%' }}>
              <ProductTile
                product={p}
                onPress={() => (p.outOfStock ? store.askRestock(p) : store.sellNow(p))}
                onLongPress={p.outOfStock ? () => store.openRestock({ name: p.name, short: p.short, img: p.img, cat: p.cat }) : undefined}
              />
            </View>
          ))}
        </View>
      </View>
    </ScreenScroll>
  );
}

export default HomeScreen;
