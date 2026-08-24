import React from 'react';
import { View, Pressable } from 'react-native';
import { AppText } from '../components/Text';
import { ScreenScroll } from '../components/ScreenScroll';
import { BackHeader } from '../components/Header';
import { GlassCard } from '../components/GlassCard';
import { Badge } from '../components/Badge';
import { useStore } from '../store/useStore';
import { LISTS, META, DETAIL_ACTIONS } from '../data/lists';
import { color, radius, shadow } from '../theme/tokens';

export function DetailScreen() {
  const store = useStore();
  const d = store.detail;
  if (!d) return <ScreenScroll><View /></ScreenScroll>;

  const { key, row } = d;
  const kind = LISTS[key].title.replace(/s$/, '');
  const meta = [...(META[key]?.(row) ?? []), ['Shop', 'Chilenje Branch'] as [string, string]];
  const actions = DETAIL_ACTIONS[key] ?? [];

  return (
    <ScreenScroll>
      <BackHeader title={kind} onBack={() => store.detailBack()} titleColor={color.sub2} />

      <GlassCard style={{ padding: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <View style={{ flex: 1 }}>
            <AppText style={{ fontSize: 22, fontWeight: '800', color: color.ink, letterSpacing: -0.4 }}>{row.title}</AppText>
            <AppText style={{ fontSize: 12.5, fontWeight: '600', color: color.sub2, marginTop: 4 }}>{row.sub}</AppText>
          </View>
          {!!row.badge && <Badge label={row.badge} tone={row.tone} />}
        </View>
        <AppText style={{ fontSize: 34, fontWeight: '800', color: color.ink, letterSpacing: -0.7, marginTop: 14 }}>{row.value}</AppText>
      </GlassCard>

      <GlassCard style={{ overflow: 'hidden' }}>
        {meta.map(([label, value], i) => (
          <View key={label} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingHorizontal: 15, paddingVertical: 13, borderBottomWidth: i < meta.length - 1 ? 1 : 0, borderBottomColor: color.hairline }}>
            <AppText style={{ fontSize: 13, fontWeight: '600', color: color.faint }}>{label}</AppText>
            <AppText style={{ fontSize: 13.5, fontWeight: '700', color: color.ink, textAlign: 'right' }}>{value}</AppText>
          </View>
        ))}
      </GlassCard>

      <View style={{ gap: 10 }}>
        {actions.map(([label, kind2]) => (
          <Pressable
            key={label}
            onPress={() => store.detailAction(label)}
            style={{
              height: 50, borderRadius: radius.xl, alignItems: 'center', justifyContent: 'center',
              backgroundColor: kind2 === 1 ? '#7A5F3C' : kind2 === -1 ? color.dangerBg : color.glass6,
              borderWidth: kind2 === 1 ? 0 : 1, borderColor: kind2 === -1 ? color.dangerBorder : color.glassBorder,
              ...(kind2 === 1 ? shadow.button : null),
            }}
          >
            <AppText style={{ fontSize: 15, fontWeight: '800', color: kind2 === 1 ? color.white : kind2 === -1 ? color.dangerInkStrong : color.ink }}>{label}</AppText>
          </Pressable>
        ))}
      </View>
    </ScreenScroll>
  );
}

export default DetailScreen;
