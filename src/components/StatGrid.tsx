import React from 'react';
import { View } from 'react-native';
import { AppText } from './Text';
import { GlassCard } from './GlassCard';
import { color } from '../theme/tokens';

export interface StatItem {
  value: string | number;
  label: string;
  color?: string;
}

// The 2- or 3-column stat tile grid (Stock's Products/Low/Out/Value, the
// generic Lists' header stats, Reports' payment split header, etc.)
export function StatGrid({ stats, columns = 2 }: { stats: StatItem[]; columns?: number }) {
  return (
    <GlassCard style={{ padding: 16 }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {stats.map((s, i) => (
          <View key={i} style={{ width: `${100 / columns}%`, paddingVertical: 7, paddingRight: 8 }}>
            <AppText style={{ fontSize: 22, fontWeight: '800', letterSpacing: -0.4, color: s.color || color.ink }}>{s.value}</AppText>
            <AppText style={{ fontSize: 11.5, fontWeight: '600', color: color.sub2, marginTop: 1 }}>{s.label}</AppText>
          </View>
        ))}
      </View>
    </GlassCard>
  );
}

export default StatGrid;
