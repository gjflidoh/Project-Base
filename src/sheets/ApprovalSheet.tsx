import React from 'react';
import { View, Pressable } from 'react-native';
import { Sheet } from '../components/Sheet';
import { AppText } from '../components/Text';
import { Keypad } from '../components/Keypad';
import { useStore } from '../store/useStore';
import { K0 } from '../data/catalog';
import { color, radius } from '../theme/tokens';

const PIN_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'];

export function ApprovalSheet() {
  const store = useStore();
  const a = store.approval;
  const customer = a ? store.creditOf(a.id) : null;
  const pin = store.pin || '';

  return (
    <Sheet visible={!!a} edge="center" onClose={() => store.approvalDeny()}>
      {a && (
        <>
          <AppText style={{ fontSize: 11.5, fontWeight: '800', color: '#B96B0A', letterSpacing: 1.4 }}>MANAGER APPROVAL REQUIRED</AppText>
          <View style={{ flexDirection: 'row', gap: 10, marginVertical: 14 }}>
            <View style={{ flex: 1, borderRadius: radius.lg, padding: 12, backgroundColor: color.glass8, borderWidth: 1, borderColor: color.hairline }}>
              <AppText style={{ fontSize: 10.5, fontWeight: '800', color: color.faint, letterSpacing: 1.2 }}>CREDIT SALE</AppText>
              <AppText style={{ fontSize: 19, fontWeight: '800', color: color.ink, marginTop: 4 }}>{K0(a.total)}</AppText>
            </View>
            <View style={{ flex: 1, borderRadius: radius.lg, padding: 12, backgroundColor: color.glass8, borderWidth: 1, borderColor: color.hairline }}>
              <AppText style={{ fontSize: 10.5, fontWeight: '800', color: color.faint, letterSpacing: 1.2 }}>CUSTOMER</AppText>
              <AppText style={{ fontSize: 14, fontWeight: '800', color: color.ink, marginTop: 6 }}>{customer?.name}</AppText>
            </View>
          </View>
          <AppText style={{ fontSize: 12, fontWeight: '600', color: color.sub2 }}>Requested by Kelvin · Counter · 4:32 PM</AppText>
          <View style={{ flexDirection: 'row', gap: 9, marginVertical: 16, justifyContent: 'center' }}>
            {[0, 1, 2, 3].map((i) => (
              <View
                key={i}
                style={{
                  width: 44, height: 52, borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center',
                  backgroundColor: pin.length === i ? 'rgba(149,119,80,.1)' : color.glass8,
                  borderWidth: 1, borderColor: pin.length === i ? color.accentBorder : color.hairline,
                }}
              >
                <AppText style={{ fontSize: 22, fontWeight: '800', color: color.ink }}>{pin[i] ? '•' : ''}</AppText>
              </View>
            ))}
          </View>
          <Keypad keys={PIN_KEYS} onPress={(k) => store.pinKey(k)} keyHeight={46} fontSize={18} />
          <View style={{ flexDirection: 'row', gap: 9, marginTop: 14 }}>
            <Pressable onPress={() => store.approvalDeny()} style={{ flex: 1, height: 48, borderRadius: radius.xl - 1, backgroundColor: color.dangerBg, borderWidth: 1, borderColor: color.dangerBorder, alignItems: 'center', justifyContent: 'center' }}>
              <AppText style={{ fontSize: 14.5, fontWeight: '800', color: color.dangerInkStrong }}>Deny</AppText>
            </Pressable>
            <Pressable onPress={() => store.approvalApprove()} style={{ flex: 1, height: 48, borderRadius: radius.xl - 1, backgroundColor: '#7A5F3C', alignItems: 'center', justifyContent: 'center' }}>
              <AppText style={{ fontSize: 14.5, fontWeight: '800', color: color.white }}>Approve</AppText>
            </Pressable>
          </View>
        </>
      )}
    </Sheet>
  );
}

export default ApprovalSheet;
