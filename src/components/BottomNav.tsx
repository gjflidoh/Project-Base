import React from 'react';
import { View, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from './Text';
import { Icon } from './Icon';
import { NAV_ICONS, GLYPH } from '../data/icons';
import { color, gradient, radius, shadow } from '../theme/tokens';
import { useStore } from '../store/useStore';
import { activeNav } from '../store/selectors';
import type { Screen } from '../store/types';

const LEFT: [Screen, string, keyof typeof NAV_ICONS][] = [
  ['home', 'Home', 'home'],
  ['stock', 'Stock', 'stock'],
];
const RIGHT: [Screen, string, keyof typeof NAV_ICONS][] = [
  ['credit', 'Credit', 'credit'],
  ['more', 'More', 'more'],
];

// The floating 5-slot bottom nav with a raised gradient FAB in the centre
// slot that opens the New Sale (POS) screen.
export function BottomNav() {
  const store = useStore();
  const insets = useSafeAreaInsets();
  const active = activeNav(store.screen);

  const Item = ({ screen, label, iconKey }: { screen: Screen; label: string; iconKey: keyof typeof NAV_ICONS }) => {
    const on = active === screen || (screen === 'credit' && active === 'credit') || (screen === 'more' && active === 'more');
    const tint = on ? color.accent : color.sub2;
    return (
      <Pressable onPress={() => store.go(screen)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Icon d={NAV_ICONS[iconKey]} size={22} color={tint} strokeWidth={iconKey === 'more' ? 2.4 : 1.9} />
        <AppText style={{ fontSize: 10.5, fontWeight: '700', color: tint }}>{label}</AppText>
      </Pressable>
    );
  };

  return (
    <View style={{ position: 'absolute', left: 16, right: 16, bottom: Math.max(14, insets.bottom), height: 66, borderRadius: radius.massive, overflow: 'visible', ...shadow.card }}>
      <View style={{ flex: 1, borderRadius: radius.massive, overflow: 'hidden', borderWidth: 1, borderColor: color.glassBorderStrong }}>
        <BlurView intensity={40} tint="light" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
        <View style={{ flex: 1, backgroundColor: color.glass6, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6 }}>
          <Item screen={LEFT[0][0]} label={LEFT[0][1]} iconKey={LEFT[0][2]} />
          <Item screen={LEFT[1][0]} label={LEFT[1][1]} iconKey={LEFT[1][2]} />
          <View style={{ width: 74, alignItems: 'center', justifyContent: 'center' }} />
          <Item screen={RIGHT[0][0]} label={RIGHT[0][1]} iconKey={RIGHT[0][2]} />
          <Item screen={RIGHT[1][0]} label={RIGHT[1][1]} iconKey={RIGHT[1][2]} />
        </View>
      </View>
      <Pressable
        onPress={() => store.patch({ screen: 'sale' })}
        style={{ position: 'absolute', left: '50%', marginLeft: -30, top: -24, width: 60, height: 60, borderRadius: 30, ...shadow.button }}
      >
        <LinearGradient colors={gradient.primary.colors as unknown as [string, string]} start={gradient.primary.start} end={gradient.primary.end}
          style={{ width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center', borderWidth: 6, borderColor: 'rgba(247,244,239,.9)' }}>
          <Icon d={GLYPH.plus} size={27} color={color.white} strokeWidth={2.6} />
        </LinearGradient>
      </Pressable>
    </View>
  );
}

export default BottomNav;
