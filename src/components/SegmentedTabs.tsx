import React from 'react';
import { View, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { AppText } from './Text';
import { color, radius } from '../theme/tokens';

interface SegmentedTabsProps {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}

// The pill row of chips used for Receipts time filters, Reports period,
// and the "All / On credit / Walk-in" style chips on the generic Lists.
export function SegmentedTabs({ options, value, onChange }: SegmentedTabsProps) {
  return (
    <View style={{ flexDirection: 'row', gap: 7, padding: 4, borderRadius: radius.lg, backgroundColor: color.glass50, borderWidth: 1, borderColor: color.glass85, overflow: 'hidden' }}>
      <BlurView intensity={30} tint="light" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
      {options.map((opt) => {
        const active = opt === value;
        return (
          <Pressable
            key={opt}
            onPress={() => onChange(opt)}
            style={{
              flex: 1, height: 34, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center',
              backgroundColor: active ? color.white : 'transparent',
            }}
          >
            <AppText style={{ fontSize: 12.5, fontWeight: '700', color: active ? color.accent : color.sub2 }}>{opt}</AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

export default SegmentedTabs;
