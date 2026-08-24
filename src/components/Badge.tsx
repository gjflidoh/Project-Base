import React from 'react';
import { View } from 'react-native';
import { AppText } from './Text';
import { badgeTone, radius, type ToneKey } from '../theme/tokens';

export function Badge({ label, tone = 'flat' }: { label: string; tone?: ToneKey }) {
  const t = badgeTone[tone];
  if (!label) return null;
  return (
    <View style={{ backgroundColor: t.bg, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 6, alignSelf: 'flex-start' }}>
      <AppText style={{ fontSize: 11, fontWeight: '700', color: t.ink }}>{label}</AppText>
    </View>
  );
}

export default Badge;
