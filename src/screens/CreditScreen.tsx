import React from 'react';
import { View, Pressable, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AppText } from '../components/Text';
import { fontFamily } from '../theme/fonts';
import { ScreenScroll } from '../components/ScreenScroll';
import { GlassCard } from '../components/GlassCard';
import { Row } from '../components/Row';
import { Icon } from '../components/Icon';
import { GLYPH } from '../data/icons';
import { useStore } from '../store/useStore';
import { creditRows } from '../store/selectors';
import { K0 } from '../data/catalog';
import { color, gradient, radius, shadow } from '../theme/tokens';

export function CreditScreen() {
  const store = useStore();
  const rows = creditRows(store);
  const total = store.creditList.reduce((a, c) => a + c.balance, 0);
  const owing = store.creditList.filter((c) => c.balance > 0).length;
  const overdue = store.creditList.filter((c) => c.tone === 'bad').reduce((a, c) => a + c.balance, 0);

  return (
    <ScreenScroll>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <AppText style={{ fontSize: 25, fontWeight: '800', letterSpacing: -0.5, color: color.ink }}>Credit</AppText>
        <Pressable onPress={() => store.openAddCredit()} style={{ height: 36, paddingHorizontal: 14, borderRadius: 14, overflow: 'hidden', ...shadow.button }}>
          <LinearGradient colors={gradient.primary.colors as unknown as [string, string]} start={gradient.primary.start} end={gradient.primary.end} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 7 }}>
            <Icon d={GLYPH.plus} size={14} color={color.white} strokeWidth={2.6} />
            <AppText style={{ fontSize: 12.5, fontWeight: '800', color: color.white }}>Add Credit</AppText>
          </LinearGradient>
        </Pressable>
      </View>

      <View style={{ flexDirection: 'row', gap: 9 }}>
        <View style={{ flex: 1, height: 46, borderRadius: radius.lg, backgroundColor: color.glass6, borderWidth: 1, borderColor: color.glassBorder, flexDirection: 'row', alignItems: 'center', gap: 9, paddingHorizontal: 14 }}>
          <TextInput
            placeholder="Name or phone number"
            placeholderTextColor={color.faint2}
            value={store.creditQuery}
            onChangeText={(v) => store.patch({ creditQuery: v })}
            style={{ flex: 1, fontFamily: fontFamily['600'], fontSize: 14, color: color.ink, padding: 0 }}
          />
        </View>
        <Pressable onPress={() => store.cycleCreditFilter()} style={{ height: 46, paddingHorizontal: 13, borderRadius: radius.lg, backgroundColor: color.glass6, borderWidth: 1, borderColor: color.glassBorder, flexDirection: 'row', alignItems: 'center', gap: 7 }}>
          <Icon d={GLYPH.filter} size={16} color={color.ink} strokeWidth={2} />
          <AppText style={{ fontSize: 12.5, fontWeight: '700', color: color.ink }}>{store.creditFilter}</AppText>
        </Pressable>
      </View>

      <View style={{ borderRadius: radius.card, overflow: 'hidden', ...shadow.hero }}>
        <LinearGradient colors={gradient.hero.colors as unknown as [string, string]} start={gradient.hero.start} end={gradient.hero.end} style={{ padding: 24 }}>
          <AppText style={{ fontSize: 13.5, fontWeight: '700', color: 'rgba(255,255,255,.9)' }}>Outstanding Credit</AppText>
          <AppText style={{ fontSize: 46, fontWeight: '800', color: color.white, letterSpacing: -1.3, marginVertical: 10 }}>{K0(total)}</AppText>
          <AppText style={{ fontSize: 13, fontWeight: '600', color: 'rgba(255,255,255,.78)' }}>{owing} customers owing</AppText>
        </LinearGradient>
      </View>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <GlassCard style={{ flex: 1, padding: 15 }}>
          <AppText style={{ fontSize: 20, fontWeight: '800', color: color.accent, letterSpacing: -0.3 }}>{K0(store.creditPaidMonth || 850)}</AppText>
          <AppText style={{ fontSize: 11.5, fontWeight: '600', color: color.sub2, marginTop: 2 }}>Paid This Month</AppText>
        </GlassCard>
        <GlassCard style={{ flex: 1, padding: 15 }}>
          <AppText style={{ fontSize: 20, fontWeight: '800', color: color.dangerInk, letterSpacing: -0.3 }}>{K0(overdue)}</AppText>
          <AppText style={{ fontSize: 11.5, fontWeight: '600', color: color.sub2, marginTop: 2 }}>Overdue</AppText>
        </GlassCard>
      </View>

      <GlassCard style={{ overflow: 'hidden' }}>
        {rows.map((c, i) => (
          <Row
            key={c.id}
            leading={<View style={{ width: 40, height: 40, borderRadius: 14, backgroundColor: 'rgba(149,119,80,.1)', alignItems: 'center', justifyContent: 'center' }}><AppText style={{ fontSize: 14, fontWeight: '800', color: color.accent }}>{c.name[0]}</AppText></View>}
            title={c.name}
            sub={c.last}
            trailingTop={c.balanceLabel}
            dot={c.dot}
            divider={i < rows.length - 1}
            onPress={() => store.patch({ screen: 'creditDetail', creditSel: c.id })}
          />
        ))}
      </GlassCard>

      <AppText style={{ fontSize: 11.5, lineHeight: 17, fontWeight: '600', color: color.faint, paddingHorizontal: 4 }}>
        Green healthy · orange due soon · red overdue. Every credit line records who issued it.
      </AppText>
    </ScreenScroll>
  );
}

export default CreditScreen;
