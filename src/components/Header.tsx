import React from 'react';
import { View, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { AppText } from './Text';
import { Icon } from './Icon';
import { GLYPH } from '../data/icons';
import { color, radius } from '../theme/tokens';

function CircleButton({ onPress, children }: { onPress: () => void; children: React.ReactNode }) {
  return (
    <Pressable onPress={onPress} style={{ width: 36, height: 36, borderRadius: radius.md, overflow: 'hidden', borderWidth: 1, borderColor: color.glassBorder }}>
      <BlurView intensity={30} tint="light" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
      <View style={{ flex: 1, backgroundColor: color.glass62, alignItems: 'center', justifyContent: 'center' }}>{children}</View>
    </Pressable>
  );
}

// Large screen title (Home / Stock / Receipts / More / Credit) — no back
// button, optional trailing action.
export function ScreenTitle({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <AppText style={{ fontSize: 25, fontWeight: '800', letterSpacing: -0.5, color: color.ink }}>{title}</AppText>
      {action}
    </View>
  );
}

// Back-chevron header used on every "drilled in" screen (Detail, Form,
// CreditDetail, Monitor, Reports, Settings, Subscription, Account, ...).
export function BackHeader({ title, subtitle, onBack, action, titleColor }: { title: string; subtitle?: string; onBack: () => void; action?: React.ReactNode; titleColor?: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <CircleButton onPress={onBack}>
        <Icon d={GLYPH.back} size={17} color={color.ink} strokeWidth={2.2} />
      </CircleButton>
      <View style={{ flex: 1 }}>
        <AppText numberOfLines={1} style={{ fontSize: 22, fontWeight: '800', letterSpacing: -0.4, color: titleColor || color.ink }}>{title}</AppText>
        {!!subtitle && <AppText style={{ fontSize: 12, fontWeight: '600', color: color.sub2, marginTop: 1 }}>{subtitle}</AppText>}
      </View>
      {action}
    </View>
  );
}

export default ScreenTitle;
