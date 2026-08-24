import React from 'react';
import { View, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AppText } from '../components/Text';
import { ScreenScroll } from '../components/ScreenScroll';
import { BackHeader } from '../components/Header';
import { GlassCard } from '../components/GlassCard';
import { Icon } from '../components/Icon';
import { GLYPH } from '../data/icons';
import { useStore } from '../store/useStore';
import { color, gradient, radius } from '../theme/tokens';

export function AccountScreen() {
  const store = useStore();
  const rows = [
    { label: 'Full name', value: store.acctName },
    { label: 'Phone', value: store.acctPhone },
    { label: 'Email', value: store.acctEmail },
    { label: 'Counter PIN', value: '•••• · change' },
    { label: 'Language', value: store.acctLang },
    { label: 'Currency', value: 'ZMW — Kwacha' },
  ];

  return (
    <ScreenScroll>
      <BackHeader title="Account" onBack={() => store.go('more')} />

      <GlassCard style={{ padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        <View style={{ width: 56, height: 56, borderRadius: 19, overflow: 'hidden' }}>
          <LinearGradient colors={gradient.avatarLarge.colors as unknown as [string, string]} start={gradient.avatarLarge.start} end={gradient.avatarLarge.end} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <AppText style={{ color: color.white, fontSize: 20, fontWeight: '800' }}>K</AppText>
          </LinearGradient>
        </View>
        <View style={{ flex: 1 }}>
          <AppText style={{ fontSize: 18, fontWeight: '800', color: color.ink, letterSpacing: -0.3 }}>{store.acctName}</AppText>
          <AppText style={{ fontSize: 12.5, fontWeight: '600', color: color.sub2, marginTop: 2 }}>Owner · Chilenje Branch</AppText>
        </View>
        <Pressable onPress={() => store.openForm('account', 'account')} style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 13, backgroundColor: 'rgba(149,119,80,.1)', borderWidth: 1, borderColor: color.accentBorder }}>
          <AppText style={{ fontSize: 11.5, fontWeight: '700', color: color.accent }}>Edit</AppText>
        </Pressable>
      </GlassCard>

      <GlassCard style={{ overflow: 'hidden' }}>
        {rows.map((r, i) => (
          <View key={r.label} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, borderBottomWidth: i < rows.length - 1 ? 1 : 0, borderBottomColor: color.hairline }}>
            <AppText style={{ fontSize: 14, fontWeight: '700', color: color.ink }}>{r.label}</AppText>
            <AppText style={{ fontSize: 12.5, fontWeight: '600', color: color.sub2 }}>{r.value}</AppText>
          </View>
        ))}
      </GlassCard>

      <Pressable onPress={() => store.logout()} style={{ height: 50, borderRadius: radius.xl, backgroundColor: color.dangerBg, borderWidth: 1, borderColor: color.dangerBorder, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9 }}>
        <Icon d={GLYPH.logout} size={17} color={color.dangerInkStrong} strokeWidth={2.1} />
        <AppText style={{ fontSize: 15, fontWeight: '800', color: color.dangerInkStrong }}>Log out</AppText>
      </Pressable>
    </ScreenScroll>
  );
}

export default AccountScreen;
