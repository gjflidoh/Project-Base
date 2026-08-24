import React from 'react';
import { View, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Sheet } from '../components/Sheet';
import { AppText } from '../components/Text';
import { Icon } from '../components/Icon';
import { GLYPH } from '../data/icons';
import { useStore } from '../store/useStore';
import { color, gradient, radius } from '../theme/tokens';

export function ProfileSheet() {
  const store = useStore();
  const items: { label: string; value: string; onPick: () => void }[] = [
    { label: 'Account', value: store.acctPhone, onPick: () => store.patch({ profile: false, screen: 'account' }) },
    { label: 'Shop Settings', value: 'Chilenje', onPick: () => store.patch({ profile: false, screen: 'settings' }) },
    { label: 'Subscription', value: 'Pro · renews 12 Sep', onPick: () => store.patch({ profile: false, screen: 'subscription' }) },
    { label: 'End shift', value: 'K3,170 today', onPick: () => { store.patch({ profile: false }); store.showToast('Shift ended · K3,170 banked'); } },
  ];

  return (
    <Sheet visible={store.profile} edge="top" onClose={() => store.closeProfile()}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        <View style={{ width: 58, height: 58, borderRadius: 20, overflow: 'hidden' }}>
          <LinearGradient colors={gradient.avatarLarge.colors as unknown as [string, string]} start={gradient.avatarLarge.start} end={gradient.avatarLarge.end} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <AppText style={{ color: color.white, fontSize: 21, fontWeight: '800' }}>K</AppText>
          </LinearGradient>
        </View>
        <View style={{ flex: 1 }}>
          <AppText style={{ fontSize: 19, fontWeight: '800', color: color.ink, letterSpacing: -0.3 }}>{store.acctName}</AppText>
          <AppText style={{ fontSize: 12.5, fontWeight: '600', color: color.sub2, marginTop: 2 }}>{store.acctEmail}</AppText>
        </View>
        <View style={{ backgroundColor: 'rgba(149,119,80,.12)', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 6 }}>
          <AppText style={{ fontSize: 11, fontWeight: '700', color: color.accent }}>Owner</AppText>
        </View>
      </View>
      <View style={{ flexDirection: 'row', gap: 9, marginVertical: 17 }}>
        <View style={{ flex: 1, borderRadius: radius.lg, padding: 12, backgroundColor: color.glass74, borderWidth: 1, borderColor: color.hairline }}>
          <AppText style={{ fontSize: 11, fontWeight: '700', color: color.faint, letterSpacing: 1 }}>SHOP</AppText>
          <AppText style={{ fontSize: 13.5, fontWeight: '700', color: color.ink, marginTop: 4 }}>Chilenje Branch</AppText>
        </View>
        <View style={{ flex: 1, borderRadius: radius.lg, padding: 12, backgroundColor: color.glass74, borderWidth: 1, borderColor: color.hairline }}>
          <AppText style={{ fontSize: 11, fontWeight: '700', color: color.faint, letterSpacing: 1 }}>SHIFT</AppText>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: color.accentDot }} />
            <AppText style={{ fontSize: 13.5, fontWeight: '700', color: color.ink }}>Open · 07:12</AppText>
          </View>
        </View>
      </View>
      <View style={{ borderRadius: radius.xxl, backgroundColor: color.glass7, borderWidth: 1, borderColor: color.hairline, overflow: 'hidden' }}>
        {items.map((it, i) => (
          <Pressable key={it.label} onPress={it.onPick} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1, borderBottomColor: color.hairline }}>
            <AppText style={{ fontSize: 14, fontWeight: '700', color: color.ink }}>{it.label}</AppText>
            <AppText style={{ fontSize: 12, fontWeight: '600', color: color.faint }}>{it.value}</AppText>
          </Pressable>
        ))}
        <Pressable onPress={() => store.toggleDark()} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 9 }}>
            <Icon d={GLYPH.moon} size={17} color={color.accent} strokeWidth={2} />
            <AppText style={{ fontSize: 14, fontWeight: '700', color: color.ink }}>Dark mode</AppText>
          </View>
          <View style={{ width: 44, height: 26, borderRadius: 13, backgroundColor: store.dark ? '#957750' : color.hairlineStrong, padding: 3, flexDirection: 'row', justifyContent: store.dark ? 'flex-end' : 'flex-start' }}>
            <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: color.white }} />
          </View>
        </Pressable>
      </View>
      <Pressable onPress={() => store.logout()} style={{ height: 50, marginTop: 14, borderRadius: radius.xl, backgroundColor: color.dangerBg, borderWidth: 1, borderColor: color.dangerBorder, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9 }}>
        <Icon d={GLYPH.logout} size={17} color={color.dangerInkStrong} strokeWidth={2.1} />
        <AppText style={{ fontSize: 15, fontWeight: '800', color: color.dangerInkStrong }}>Log out</AppText>
      </Pressable>
    </Sheet>
  );
}

export default ProfileSheet;
