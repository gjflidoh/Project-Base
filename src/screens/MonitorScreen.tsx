import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AppText } from '../components/Text';
import { ScreenScroll } from '../components/ScreenScroll';
import { BackHeader } from '../components/Header';
import { GlassCard } from '../components/GlassCard';
import { useStore } from '../store/useStore';
import { color, gradient, radius, shadow } from '../theme/tokens';

export function MonitorScreen() {
  const store = useStore();

  return (
    <ScreenScroll>
      <BackHeader title="Shop Monitor" onBack={() => store.go('more')} />

      <GlassCard style={{ padding: 16, flexDirection: 'row', alignItems: 'center', gap: 11 }}>
        <View style={{ width: 9, height: 9, borderRadius: 4.5, backgroundColor: color.accentDot }} />
        <View style={{ flex: 1 }}>
          <AppText style={{ fontSize: 14.5, fontWeight: '800', color: color.ink }}>Shop Open</AppText>
          <AppText style={{ fontSize: 11.5, fontWeight: '600', color: color.faint, marginTop: 1 }}>Chilenje Branch · since 07:12</AppText>
        </View>
        <AppText style={{ fontSize: 11.5, fontWeight: '700', color: color.accent }}>Live</AppText>
      </GlassCard>

      <View style={{ borderRadius: radius.massive, overflow: 'hidden', ...shadow.hero }}>
        <LinearGradient colors={gradient.hero.colors as unknown as [string, string]} start={gradient.hero.start} end={gradient.hero.end} style={{ padding: 22 }}>
          <AppText style={{ fontSize: 13, fontWeight: '700', color: 'rgba(255,255,255,.85)' }}>Today's Sales</AppText>
          <AppText style={{ fontSize: 42, fontWeight: '800', color: color.white, letterSpacing: -1.2, marginVertical: 6 }}>K4,820</AppText>
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 8 }}>
            {[{ v: '63', l: 'Transactions' }, { v: 'K2,340', l: 'Cash' }, { v: 'K2,480', l: 'Mobile' }].map((s) => (
              <View key={s.l} style={{ flex: 1, borderRadius: 14, padding: 10, backgroundColor: 'rgba(255,255,255,.14)' }}>
                <AppText style={{ fontSize: 16, fontWeight: '800', color: color.white }}>{s.v}</AppText>
                <AppText style={{ fontSize: 10.5, fontWeight: '600', color: 'rgba(255,255,255,.75)', marginTop: 1 }}>{s.l}</AppText>
              </View>
            ))}
          </View>
        </LinearGradient>
      </View>

      <AppText style={{ fontSize: 13, fontWeight: '800', color: color.ink, letterSpacing: -0.2 }}>Staff on shift</AppText>

      <GlassCard style={{ padding: 15, flexDirection: 'row', alignItems: 'center', gap: 13 }}>
        <View style={{ width: 44, height: 44, borderRadius: 15, overflow: 'hidden' }}>
          <LinearGradient colors={gradient.avatar.colors as unknown as [string, string]} start={gradient.avatar.start} end={gradient.avatar.end} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <AppText style={{ color: color.white, fontSize: 15, fontWeight: '800' }}>K</AppText>
          </LinearGradient>
        </View>
        <View style={{ flex: 1 }}>
          <AppText style={{ fontSize: 15, fontWeight: '800', color: color.ink }}>Kelvin</AppText>
          <AppText style={{ fontSize: 11.5, fontWeight: '600', color: color.faint, marginTop: 2 }}>41 transactions · K3,170 sales</AppText>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(149,119,80,.12)', paddingHorizontal: 9, paddingVertical: 5, borderRadius: 20 }}>
          <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: color.accentDot }} />
          <AppText style={{ fontSize: 11, fontWeight: '700', color: color.accent }}>Working</AppText>
        </View>
      </GlassCard>

      <GlassCard style={{ padding: 15, flexDirection: 'row', alignItems: 'center', gap: 13 }} fill={color.glass50} border={color.glass8}>
        <View style={{ width: 44, height: 44, borderRadius: 15, backgroundColor: color.hairline2, alignItems: 'center', justifyContent: 'center' }}>
          <AppText style={{ fontSize: 15, fontWeight: '800', color: color.sub }}>M</AppText>
        </View>
        <View style={{ flex: 1 }}>
          <AppText style={{ fontSize: 15, fontWeight: '800', color: color.ink }}>Mutinta</AppText>
          <AppText style={{ fontSize: 11.5, fontWeight: '600', color: color.faint, marginTop: 2 }}>22 transactions · K1,650 sales</AppText>
        </View>
        <View style={{ backgroundColor: color.hairline, paddingHorizontal: 9, paddingVertical: 5, borderRadius: 20 }}>
          <AppText style={{ fontSize: 11, fontWeight: '700', color: color.faint }}>Shift ended</AppText>
        </View>
      </GlassCard>
    </ScreenScroll>
  );
}

export default MonitorScreen;
