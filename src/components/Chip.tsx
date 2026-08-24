import React from 'react';
import { Pressable } from 'react-native';
import { AppText } from './Text';
import { color, radius } from '../theme/tokens';

// Selectable pill chip — shop type / customer picker / form option chips /
// staff role radio-like chip.
export function Chip({ label, selected, onPress }: { label: string; selected?: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingHorizontal: 14, paddingVertical: 11, borderRadius: radius.lg,
        backgroundColor: selected ? 'rgba(149,119,80,.14)' : color.glass6,
        borderWidth: 1, borderColor: selected ? color.accentBorder : color.glassBorder,
      }}
    >
      <AppText style={{ fontSize: 13.5, fontWeight: '700', color: selected ? color.accent : color.sub }}>{label}</AppText>
    </Pressable>
  );
}

export default Chip;
