import React from 'react';
import { View, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AppText } from '../components/Text';
import { ScreenScroll } from '../components/ScreenScroll';
import { BackHeader } from '../components/Header';
import { SegmentedTabs } from '../components/SegmentedTabs';
import { GlassCard } from '../components/GlassCard';
import { productImage } from '../data/images';
import { useStore } from '../store/useStore';
import { REPORTS } from '../data/reports';
import { K0 } from '../data/catalog';
import { color, gradient, radius, shadow } from '../theme/tokens';

export function ReportsScreen() {
  const store = useStore();
  const rep = REPORTS[store.period];

  return (
    <ScreenScroll>
      <BackHeader title="Reports" onBack={() => store.go('more')} />
      <SegmentedTabs options={['Today', 'Week', 'Month']} value={store.period} onChange={(v) => store.patch({ period: v as typeof store.period })} />

      <View style={{ borderRadius: radius.massive, overflow: 'hidden', ...shadow.hero }}>
        <LinearGradient colors={gradient.hero.colors as unknown as [string, string]} start={gradient.hero.start} end={gradient.hero.end} style={{ padding: 22 }}>
          <AppText style={{ fontSize: 12.5, fontWeight: '700', color: 'rgba(255,255,255,.85)' }}>Sales · {store.period}</AppText>
          <AppText style={{ fontSize: 42, fontWeight: '800', color: color.white, letterSpacing: -1.2, marginVertical: 6 }}>{K0(rep.total)}</AppText>
          <AppText style={{ fontSize: 12, fontWeight: '600', color: 'rgba(255,255,255,.78)' }}>{rep.sub}</AppText>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 6, height: 74, marginTop: 16 }}>
            {rep.bars.map((b, i) => (
              <View key={i} style={{ flex: 1, alignItems: 'center', gap: 5 }}>
                <View style={{ width: '100%', height: Math.round(14 + 46 * b.frac), borderRadius: 6, backgroundColor: b.highlight ? 'rgba(255,255,255,.92)' : 'rgba(255,255,255,.34)' }} />
                <AppText style={{ fontSize: 9.5, fontWeight: '700', color: 'rgba(255,255,255,.6)' }}>{b.label}</AppText>
              </View>
            ))}
          </View>
        </LinearGradient>
      </View>

      <GlassCard style={{ padding: 16 }}>
        <AppText style={{ fontSize: 13, fontWeight: '800', color: color.ink, letterSpacing: -0.2 }}>Payment split</AppText>
        <View style={{ gap: 11, marginTop: 13 }}>
          {rep.split.map((p) => (
            <View key={p.label}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <AppText style={{ fontSize: 12.5, fontWeight: '700', color: color.ink }}>{p.label}</AppText>
                <AppText style={{ fontSize: 12.5, fontWeight: '700', color: color.ink }}>{K0(p.amount)}</AppText>
              </View>
              <View style={{ height: 7, borderRadius: 6, backgroundColor: color.hairline2, marginTop: 6, overflow: 'hidden' }}>
                <View style={{ width: `${Math.round((100 * p.amount) / rep.total)}%`, height: '100%', borderRadius: 6, backgroundColor: p.color }} />
              </View>
            </View>
          ))}
        </View>
      </GlassCard>

      <GlassCard style={{ overflow: 'hidden' }}>
        <View style={{ paddingHorizontal: 15, paddingTop: 15, paddingBottom: 9 }}>
          <AppText style={{ fontSize: 13, fontWeight: '800', color: color.ink, letterSpacing: -0.2 }}>Best sellers</AppText>
        </View>
        {rep.top.map((t, i) => (
          <Pressable
            key={t.name}
            onPress={() => store.patch({ screen: 'stock', query: t.short })}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 15, paddingVertical: 11, borderTopWidth: 1, borderTopColor: color.hairline }}
          >
            <View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: color.glass9, borderWidth: 1, borderColor: color.hairline, overflow: 'hidden', padding: 3 }}>
              <Image source={productImage(t.img)} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
            </View>
            <View style={{ flex: 1, minWidth: 0 }}>
              <AppText numberOfLines={1} style={{ fontSize: 13.5, fontWeight: '700', color: color.ink }}>{t.short}</AppText>
              <AppText style={{ fontSize: 11.5, fontWeight: '600', color: color.faint, marginTop: 2 }}>{t.units} sold</AppText>
            </View>
            <AppText style={{ fontSize: 13.5, fontWeight: '800', color: color.accent }}>{t.revenue}</AppText>
          </Pressable>
        ))}
      </GlassCard>

      <Pressable onPress={() => store.go('monitor')} style={{ height: 48, borderRadius: radius.xl, backgroundColor: color.glass6, borderWidth: 1, borderColor: color.glassBorder, alignItems: 'center', justifyContent: 'center' }}>
        <AppText style={{ fontSize: 14, fontWeight: '700', color: color.ink }}>Open live Shop Monitor</AppText>
      </Pressable>
    </ScreenScroll>
  );
}

export default ReportsScreen;
