import React from 'react';
import { View, Pressable } from 'react-native';
import { Sheet } from '../components/Sheet';
import { AppText } from '../components/Text';
import { Keypad } from '../components/Keypad';
import { PrimaryButton } from '../components/PrimaryButton';
import { Icon } from '../components/Icon';
import { useStore } from '../store/useStore';
import { cartSubtotal } from '../store/selectors';
import { K, NUM } from '../data/catalog';
import { color, radius } from '../theme/tokens';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0', 'C'];

export function NumpadSheet() {
  const store = useStore();
  const subtotal = cartSubtotal(store);
  const paid = NUM(store.paid);
  const changeOk = paid >= subtotal && subtotal > 0;
  const quick = [
    { label: 'Exact', v: subtotal },
    { label: 'K50', v: 50 },
    { label: 'K100', v: 100 },
    { label: 'K200', v: 200 },
  ];

  return (
    <Sheet visible={store.padOpen} onClose={() => store.closePad()}>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <AppText style={{ fontSize: 12.5, fontWeight: '800', color: color.faint, letterSpacing: 1.1 }}>TOTAL {K(subtotal)}</AppText>
        <AppText style={{ fontSize: 12.5, fontWeight: '700', color: changeOk ? color.accent : color.faint2 }}>CHANGE {changeOk ? K(paid - subtotal) : '—'}</AppText>
      </View>
      <View style={{ marginVertical: 14, borderRadius: radius.xxl, padding: 14, paddingHorizontal: 16, backgroundColor: color.glass8, borderWidth: 1, borderColor: color.hairline2, flexDirection: 'row', alignItems: 'baseline', gap: 6 }}>
        <AppText style={{ fontSize: 20, fontWeight: '800', color: color.sub2 }}>K</AppText>
        <AppText style={{ flex: 1, fontSize: 34, fontWeight: '800', color: color.ink, letterSpacing: -0.6 }}>{store.paid || '0'}</AppText>
        <Pressable onPress={() => store.padBack()} style={{ width: 38, height: 38, borderRadius: 13, backgroundColor: color.hairline, alignItems: 'center', justifyContent: 'center' }}>
          <Icon d="M20 5H9L3 12l6 7h11z" paths={['M20 5H9L3 12l6 7h11z', 'm14 9-5 6', 'M9 9l5 6']} size={18} color={color.ink} strokeWidth={2} />
        </Pressable>
      </View>
      <View style={{ flexDirection: 'row', gap: 7, marginBottom: 12 }}>
        {quick.map((q) => (
          <Pressable key={q.label} onPress={() => store.padQuick(q.v)} style={{ flex: 1, height: 34, borderRadius: 13, backgroundColor: 'rgba(149,119,80,.1)', borderWidth: 1, borderColor: color.accentBorder, alignItems: 'center', justifyContent: 'center' }}>
            <AppText style={{ fontSize: 12.5, fontWeight: '800', color: color.accent }}>{q.label}</AppText>
          </Pressable>
        ))}
      </View>
      <Keypad keys={KEYS} onPress={(k) => store.padKey(k)} />
      <View style={{ marginTop: 12 }}>
        <PrimaryButton label="Done" height={50} radiusSize={radius.xl} fontSize={16} onPress={() => store.closePad()} />
      </View>
    </Sheet>
  );
}

export default NumpadSheet;
