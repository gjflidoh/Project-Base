import React from 'react';
import { View, Pressable } from 'react-native';
import { AppText } from '../components/Text';
import { ScreenScroll } from '../components/ScreenScroll';
import { BackHeader } from '../components/Header';
import { GlassCard } from '../components/GlassCard';
import { useStore } from '../store/useStore';
import { color, radius } from '../theme/tokens';

const PERMS = [
  { label: 'Allow', note: 'Counter can issue credit on their own' },
  { label: 'Manager Approval Required', note: 'PIN or remote approval per credit sale' },
  { label: "Don't Allow", note: 'Only the owner or a manager can issue credit' },
];

export function SettingsScreen() {
  const store = useStore();
  const on = store.payCredit !== false;

  return (
    <ScreenScroll>
      <BackHeader title="Shop Settings" onBack={() => store.go('more')} />

      <AppText style={{ fontSize: 11.5, fontWeight: '800', color: color.faint, letterSpacing: 1.6 }}>CHECKOUT</AppText>
      <GlassCard style={{ overflow: 'hidden', marginTop: -10 }}>
        <Pressable onPress={() => store.togglePaySetting('payCredit')} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 15 }}>
          <View style={{ flex: 1 }}>
            <AppText style={{ fontSize: 14.5, fontWeight: '700', color: color.ink }}>Credit sales</AppText>
            <AppText style={{ fontSize: 11.5, fontWeight: '600', color: color.faint, marginTop: 2 }}>Shows the On credit action at checkout</AppText>
          </View>
          <View style={{ width: 46, height: 28, borderRadius: 15, backgroundColor: on ? '#957750' : color.hairlineStrong, padding: 3, flexDirection: 'row', justifyContent: on ? 'flex-end' : 'flex-start' }}>
            <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: color.white }} />
          </View>
        </Pressable>
      </GlassCard>
      <AppText style={{ fontSize: 11.5, lineHeight: 17, fontWeight: '600', color: color.faint, paddingHorizontal: 4 }}>
        Cash is always collected at the counter. Switching credit off hides the On credit action at checkout.
      </AppText>

      <AppText style={{ fontSize: 11.5, fontWeight: '800', color: color.faint, letterSpacing: 1.6, marginTop: 6 }}>COUNTER CREDIT PERMISSION</AppText>
      <GlassCard style={{ padding: 6, marginTop: -10, gap: 4 }}>
        {PERMS.map((p) => {
          const active = (store.creditPerm || 'Allow') === p.label;
          return (
            <Pressable key={p.label} onPress={() => store.setCreditPerm(p.label)} style={{ flexDirection: 'row', alignItems: 'center', gap: 11, padding: 12, paddingHorizontal: 13, borderRadius: radius.lg, backgroundColor: active ? 'rgba(149,119,80,.1)' : 'transparent' }}>
              <View style={{ width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: active ? '#957750' : color.hairlineStrong, alignItems: 'center', justifyContent: 'center' }}>
                {active && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#957750' }} />}
              </View>
              <View style={{ flex: 1 }}>
                <AppText style={{ fontSize: 14, fontWeight: '700', color: color.ink }}>{p.label}</AppText>
                <AppText style={{ fontSize: 11.5, fontWeight: '600', color: color.faint, marginTop: 1 }}>{p.note}</AppText>
              </View>
            </Pressable>
          );
        })}
      </GlassCard>
      <AppText style={{ fontSize: 11.5, lineHeight: 17, fontWeight: '600', color: color.faint, paddingHorizontal: 4 }}>
        Every credit line records the customer, products, amount, time, the employee who created it and who approved it.
      </AppText>
    </ScreenScroll>
  );
}

export default SettingsScreen;
