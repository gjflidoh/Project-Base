import React from 'react';
import { View, Pressable } from 'react-native';
import { Sheet } from '../components/Sheet';
import { AppText } from '../components/Text';
import { Icon } from '../components/Icon';
import { GLYPH } from '../data/icons';
import { useStore } from '../store/useStore';
import { color, radius } from '../theme/tokens';

export function AddProductSheet() {
  const store = useStore();

  return (
    <Sheet visible={store.addMode} onClose={() => store.closeAdd()}>
      <AppText style={{ fontSize: 18, fontWeight: '800', color: color.ink, letterSpacing: -0.3, marginBottom: 10 }}>Add a product</AppText>
      <Pressable
        onPress={() => store.addScan()}
        style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: radius.huge, backgroundColor: 'rgba(149,119,80,.1)', borderWidth: 1, borderColor: color.accentBorder, marginBottom: 10 }}
      >
        <Icon d={GLYPH.scan} size={20} color={color.accent} strokeWidth={2} />
        <View style={{ flex: 1 }}>
          <AppText style={{ fontSize: 14.5, fontWeight: '800', color: color.ink }}>Scan barcode</AppText>
          <AppText style={{ fontSize: 11.5, fontWeight: '600', color: color.sub, marginTop: 1 }}>Fastest — pulls name and packshot</AppText>
        </View>
      </Pressable>
      <Pressable
        onPress={() => store.addManual()}
        style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: radius.huge, backgroundColor: color.glass9, borderWidth: 1, borderColor: color.hairline2, marginBottom: 10 }}
      >
        <Icon d="M16.5 3.5l4 4L9 19l-4.5 1L5.5 15.5z" size={20} color={color.ink} strokeWidth={2} />
        <View style={{ flex: 1 }}>
          <AppText style={{ fontSize: 14.5, fontWeight: '800', color: color.ink }}>Enter manually</AppText>
          <AppText style={{ fontSize: 11.5, fontWeight: '600', color: color.sub, marginTop: 1 }}>Name, price, opening stock</AppText>
        </View>
      </Pressable>
      <Pressable onPress={() => store.closeAdd()} style={{ height: 46, borderRadius: radius.xl - 1, backgroundColor: color.hairline, alignItems: 'center', justifyContent: 'center' }}>
        <AppText style={{ fontSize: 14, fontWeight: '700', color: color.sub }}>Cancel</AppText>
      </Pressable>
    </Sheet>
  );
}

export default AddProductSheet;
