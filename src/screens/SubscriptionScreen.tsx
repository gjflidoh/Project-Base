import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AppText } from '../components/Text';
import { ScreenScroll } from '../components/ScreenScroll';
import { BackHeader } from '../components/Header';
import { GlassCard } from '../components/GlassCard';
import { Row } from '../components/Row';
import { useStore } from '../store/useStore';
import { color, gradient, radius, shadow } from '../theme/tokens';

export function SubscriptionScreen() {
  const store = useStore();

  const rows = [
    { label: 'Change plan', sub: 'Current: ' + (store.plan || 'Pro — K350'), danger: false, onPick: () => store.openForm('plan', 'subscription') },
    { label: 'Payment history', sub: '5 payments · last 12 Aug, K350', danger: false, onPick: () => store.go('payments') },
    { label: 'Payment method', sub: store.payMethod, danger: false, onPick: () => store.openForm('paymethod', 'subscription') },
    { label: 'Cancel subscription', sub: 'Keeps your data for 90 days', danger: true, onPick: () => store.showToast('Cancellation needs owner PIN') },
  ];

  return (
    <ScreenScroll>
      <BackHeader title="Subscription" onBack={() => store.go('more')} />

      <View style={{ borderRadius: radius.massive, overflow: 'hidden', ...shadow.hero }}>
        <LinearGradient colors={gradient.hero.colors as unknown as [string, string]} start={gradient.hero.start} end={gradient.hero.end} style={{ padding: 22 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <AppText style={{ fontSize: 11.5, fontWeight: '800', color: 'rgba(255,255,255,.8)', letterSpacing: 1.6 }}>CURRENT PLAN</AppText>
            <View style={{ backgroundColor: 'rgba(255,255,255,.85)', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5 }}>
              <AppText style={{ fontSize: 11, fontWeight: '700', color: '#58452B' }}>Active</AppText>
            </View>
          </View>
          <AppText style={{ fontSize: 30, fontWeight: '800', color: color.white, letterSpacing: -0.6, marginVertical: 8 }}>Stockaz Pro</AppText>
          <AppText style={{ fontSize: 13, fontWeight: '600', color: 'rgba(255,255,255,.8)' }}>K350 / month · renews 12 Sep 2026</AppText>
          <View style={{ flexDirection: 'row', gap: 9, marginTop: 16 }}>
            {[{ v: '2 shops', l: 'included' }, { v: '5 staff', l: 'counter logins' }, { v: 'Smart', l: 'Scan included' }].map((s) => (
              <View key={s.l} style={{ flex: 1, borderRadius: 14, padding: 11, backgroundColor: 'rgba(255,255,255,.14)' }}>
                <AppText style={{ fontSize: 15, fontWeight: '800', color: color.white }}>{s.v}</AppText>
                <AppText style={{ fontSize: 10.5, fontWeight: '600', color: 'rgba(255,255,255,.75)', marginTop: 1 }}>{s.l}</AppText>
              </View>
            ))}
          </View>
        </LinearGradient>
      </View>

      <GlassCard style={{ overflow: 'hidden' }}>
        {rows.map((r, i) => (
          <Row key={r.label} title={r.label} sub={r.sub} chevron divider={i < rows.length - 1} onPress={r.onPick} titleColor={r.danger ? color.dangerInkStrong : undefined} />
        ))}
      </GlassCard>

      <AppText style={{ fontSize: 11.5, lineHeight: 17, fontWeight: '600', color: color.faint, paddingHorizontal: 4 }}>
        Payments are collected by Mobile Money on the 12th. Stockaz keeps working offline if a payment is late — sync resumes once it clears.
      </AppText>
    </ScreenScroll>
  );
}

export default SubscriptionScreen;
