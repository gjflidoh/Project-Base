import React from 'react';
import { View, Pressable, Image } from 'react-native';
import { AppText } from '../components/Text';
import { ScreenScroll } from '../components/ScreenScroll';
import { ScreenTitle } from '../components/Header';
import { SegmentedTabs } from '../components/SegmentedTabs';
import { GlassCard } from '../components/GlassCard';
import { Icon, IconSearch } from '../components/Icon';
import { productImage } from '../data/images';
import { useStore } from '../store/useStore';
import { receiptsForTab } from '../store/selectors';
import { color, radius } from '../theme/tokens';

export function ReceiptsScreen() {
  const store = useStore();
  const catalog = store.currentCatalog();
  const receipts = receiptsForTab(store, catalog);

  return (
    <ScreenScroll>
      <ScreenTitle title="Receipts" />
      <View style={{ height: 46, borderRadius: radius.lg, backgroundColor: color.glass6, borderWidth: 1, borderColor: color.glassBorder, flexDirection: 'row', alignItems: 'center', gap: 9, paddingHorizontal: 14 }}>
        <IconSearch />
        <AppText style={{ fontSize: 14, fontWeight: '600', color: color.faint2 }}>Search receipts...</AppText>
      </View>
      <SegmentedTabs options={['All', 'Today', 'Week', 'Month']} value={store.tab} onChange={(v) => store.patch({ tab: v })} />
      <View style={{ gap: 10 }}>
        {receipts.map((r) => (
          <Pressable key={r.no} onPress={() => store.patch({ receipt: r })}>
            <GlassCard style={{ padding: 14, paddingHorizontal: 15 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <View style={{ width: 40, height: 40, borderRadius: 13, backgroundColor: 'rgba(149,119,80,.12)', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={18} color={color.accent} strokeWidth={1.9} paths={['M5 3h14v18l-3-2-2 2-2-2-2 2-3-2z', 'M9 8h5', 'M9 12h5']} />
                </View>
                <View style={{ flex: 1 }}>
                  <AppText style={{ fontSize: 14, fontWeight: '800', color: color.ink }}>{r.no}</AppText>
                  <AppText style={{ fontSize: 11.5, fontWeight: '600', color: color.faint, marginTop: 2 }}>{r.when} · {r.customer}</AppText>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 7 }}>
                    {r.thumbs.map((t, i) => (
                      <View key={i} style={{ width: 26, height: 26, borderRadius: 9, backgroundColor: color.productMat, borderWidth: 1, borderColor: color.hairline, overflow: 'hidden' }}>
                        <Image source={productImage(t.img)} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
                      </View>
                    ))}
                    {r.extra > 0 && (
                      <View style={{ height: 26, paddingHorizontal: 7, borderRadius: 9, backgroundColor: color.hairline, alignItems: 'center', justifyContent: 'center' }}>
                        <AppText style={{ fontSize: 11, fontWeight: '700', color: color.sub2 }}>+{r.extra}</AppText>
                      </View>
                    )}
                  </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <AppText style={{ fontSize: 15, fontWeight: '800', color: color.ink }}>{r.amountLabel}</AppText>
                  <AppText style={{ fontSize: 11, fontWeight: '700', color: color.accent, marginTop: 2 }}>{r.method}</AppText>
                </View>
              </View>
            </GlassCard>
          </Pressable>
        ))}
      </View>
    </ScreenScroll>
  );
}

export default ReceiptsScreen;
