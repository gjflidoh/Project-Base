import React from 'react';
import { View, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AppText } from '../components/Text';
import { ScreenScroll } from '../components/ScreenScroll';
import { ScreenTitle } from '../components/Header';
import { GlassCard } from '../components/GlassCard';
import { Row } from '../components/Row';
import { Icon } from '../components/Icon';
import { GLYPH, MORE_ICONS } from '../data/icons';
import { useStore } from '../store/useStore';
import { MORE_MENU } from '../store/selectors';
import type { Screen } from '../store/types';
import { color, gradient, radius, shadow } from '../theme/tokens';

function menuTarget(label: string): Screen {
  if (label === 'Shop Settings') return 'settings';
  return label.toLowerCase() as Screen;
}

export function MoreScreen() {
  const store = useStore();

  return (
    <ScreenScroll>
      <ScreenTitle title="More" />

      <Pressable onPress={() => store.go('monitor')} style={{ borderRadius: radius.xxxl, overflow: 'hidden', ...shadow.hero }}>
        <LinearGradient colors={gradient.hero.colors as unknown as [string, string]} start={gradient.hero.start} end={gradient.hero.end} style={{ padding: 17, flexDirection: 'row', alignItems: 'center', gap: 13 }}>
          <View style={{ width: 42, height: 42, borderRadius: 14, backgroundColor: 'rgba(255,255,255,.2)', alignItems: 'center', justifyContent: 'center' }}>
            <Icon d={GLYPH.monitor} size={19} color={color.white} strokeWidth={2} />
          </View>
          <View style={{ flex: 1 }}>
            <AppText style={{ fontSize: 15.5, fontWeight: '800', color: color.white }}>Shop Monitor</AppText>
            <AppText style={{ fontSize: 12, fontWeight: '600', color: 'rgba(255,255,255,.75)', marginTop: 2 }}>Live view of today's trading</AppText>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,.18)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 }}>
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#F0DCBE' }} />
            <AppText style={{ fontSize: 11.5, fontWeight: '700', color: color.white }}>Open</AppText>
          </View>
        </LinearGradient>
      </Pressable>

      <GlassCard style={{ overflow: 'hidden' }}>
        {MORE_MENU.map((label, i) => (
          <Row
            key={label}
            leading={
              <View style={{ width: 30, height: 30, borderRadius: 10, backgroundColor: 'rgba(149,119,80,.1)', alignItems: 'center', justifyContent: 'center' }}>
                <Icon d={MORE_ICONS[label]} size={17} color={color.accent} strokeWidth={1.9} />
              </View>
            }
            title={label}
            chevron
            divider={i < MORE_MENU.length - 1}
            onPress={() => store.go(menuTarget(label))}
          />
        ))}
      </GlassCard>
    </ScreenScroll>
  );
}

export default MoreScreen;
