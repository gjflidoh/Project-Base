import React from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { IconSearch, Icon } from './Icon';
import { GLYPH } from '../data/icons';
import { color, radius } from '../theme/tokens';
import { fontFamily } from '../theme/fonts';

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChangeText: (v: string) => void;
  onScanPress?: () => void;
  onFilterPress?: () => void;
  filterActive?: boolean;
}

// The glass search row with an optional Scan and Sort/Filter button, reused
// on Stock, Receipts, Credit, Quick Sell and New Sale.
export function SearchBar({ placeholder, value, onChangeText, onScanPress, onFilterPress, filterActive }: SearchBarProps) {
  return (
    <View style={{ flexDirection: 'row', gap: 9 }}>
      <View style={{ flex: 1, height: 46, borderRadius: radius.lg, overflow: 'hidden', borderWidth: 1, borderColor: color.glassBorder }}>
        <BlurView intensity={35} tint="light" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
        <View style={{ flex: 1, backgroundColor: color.glass6, flexDirection: 'row', alignItems: 'center', gap: 9, paddingHorizontal: 14 }}>
          <IconSearch />
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={color.faint2}
            value={value}
            onChangeText={onChangeText}
            style={{ flex: 1, fontFamily: fontFamily['600'], fontSize: 14, color: color.ink, padding: 0 }}
          />
        </View>
      </View>
      {onScanPress && (
        <Pressable onPress={onScanPress} style={{ width: 46, height: 46, borderRadius: radius.lg, overflow: 'hidden', borderWidth: 1, borderColor: color.glassBorder }}>
          <BlurView intensity={35} tint="light" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
          <View style={{ flex: 1, backgroundColor: color.glass6, alignItems: 'center', justifyContent: 'center' }}>
            <Icon d={GLYPH.scan} size={19} color={color.accent} strokeWidth={2} />
          </View>
        </Pressable>
      )}
      {onFilterPress && (
        <Pressable onPress={onFilterPress} style={{ width: 46, height: 46, borderRadius: radius.lg, overflow: 'hidden', borderWidth: 1, borderColor: filterActive ? 'transparent' : color.glassBorder }}>
          {!filterActive && <BlurView intensity={35} tint="light" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />}
          <View style={{ flex: 1, backgroundColor: filterActive ? color.accent : color.glass6, alignItems: 'center', justifyContent: 'center' }}>
            <Icon d={GLYPH.filter} size={18} color={filterActive ? color.white : color.ink} strokeWidth={2} />
          </View>
        </Pressable>
      )}
    </View>
  );
}

export default SearchBar;
