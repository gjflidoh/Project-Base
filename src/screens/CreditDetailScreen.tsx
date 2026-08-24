import React from 'react';
import { View, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AppText } from '../components/Text';
import { ScreenScroll } from '../components/ScreenScroll';
import { BackHeader } from '../components/Header';
import { GlassCard } from '../components/GlassCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { useStore } from '../store/useStore';
import { K0 } from '../data/catalog';
import { badgeTone, color, gradient, radius, shadow } from '../theme/tokens';

export function CreditDetailScreen() {
  const store = useStore();
  const cc = store.creditList.find((c) => c.id === store.creditSel) || store.creditList[0];
  const badgeLabel = cc.tone === 'bad' ? 'Overdue' : cc.tone === 'warn' ? 'Due soon' : 'Healthy';
  const tone = badgeTone[cc.tone === 'bad' ? 'bad' : cc.tone === 'warn' ? 'warn' : 'ok'];

  return (
    <ScreenScroll>
      <BackHeader title={cc.name} subtitle={cc.phone} onBack={() => store.go('credit')} action={
        <View style={{ backgroundColor: tone.bg, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 6 }}>
          <AppText style={{ fontSize: 11, fontWeight: '700', color: tone.ink }}>{badgeLabel}</AppText>
        </View>
      } />

      <View style={{ borderRadius: radius.massive, overflow: 'hidden', ...shadow.hero }}>
        <LinearGradient colors={gradient.hero.colors as unknown as [string, string]} start={gradient.hero.start} end={gradient.hero.end} style={{ padding: 22 }}>
          <AppText style={{ fontSize: 12.5, fontWeight: '700', color: 'rgba(255,255,255,.85)' }}>Outstanding Balance</AppText>
          <AppText style={{ fontSize: 42, fontWeight: '800', color: color.white, letterSpacing: -1.2, marginVertical: 6 }}>{K0(cc.balance)}</AppText>
          <AppText style={{ fontSize: 12, fontWeight: '600', color: 'rgba(255,255,255,.75)' }}>{cc.last} · issued by Kelvin</AppText>
        </LinearGradient>
      </View>

      {cc.txns.map(([date, items], gi) => (
        <GlassCard key={gi} style={{ overflow: 'hidden' }}>
          <View style={{ paddingHorizontal: 15, paddingTop: 12, paddingBottom: 8 }}>
            <AppText style={{ fontSize: 11.5, fontWeight: '800', color: color.faint, letterSpacing: 1.6 }}>{date}</AppText>
          </View>
          {items.map(([label, amount, isPayment], i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingHorizontal: 15, paddingVertical: 11, borderTopWidth: 1, borderTopColor: color.hairline }}>
              <AppText style={{ fontSize: 13.5, fontWeight: isPayment ? '700' : '600', color: isPayment ? color.accent : color.ink }}>{label}</AppText>
              <AppText style={{ fontSize: 14, fontWeight: '800', color: isPayment ? color.accent : color.ink }}>{(isPayment ? '− ' : '') + K0(Math.abs(amount))}</AppText>
            </View>
          ))}
        </GlassCard>
      ))}

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <View style={{ flex: 1 }}>
          <PrimaryButton label="Add Credit" height={52} radiusSize={radius.xl} fontSize={15} onPress={() => store.patch({ screen: 'addCredit', cart: [] })} />
        </View>
        <Pressable
          onPress={() => store.openForm('creditpay', 'creditDetail')}
          style={{ flex: 1, height: 52, borderRadius: radius.xl, backgroundColor: 'rgba(149,119,80,.12)', borderWidth: 1, borderColor: color.accentBorder, alignItems: 'center', justifyContent: 'center' }}
        >
          <AppText style={{ fontSize: 15, fontWeight: '800', color: color.accent }}>Record Payment</AppText>
        </Pressable>
      </View>
      <Pressable
        onPress={() => store.showToast('Reminder sent to ' + cc.name + ' · WhatsApp')}
        style={{ height: 48, borderRadius: radius.xl, backgroundColor: color.glass6, borderWidth: 1, borderColor: color.glassBorder, alignItems: 'center', justifyContent: 'center' }}
      >
        <AppText style={{ fontSize: 14, fontWeight: '700', color: color.ink }}>Send Reminder</AppText>
      </Pressable>
    </ScreenScroll>
  );
}

export default CreditDetailScreen;
