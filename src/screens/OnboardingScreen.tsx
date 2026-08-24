import React from 'react';
import { View, Pressable, TextInput, Image, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { AppText } from '../components/Text';
import { GlassCard } from '../components/GlassCard';
import { Chip } from '../components/Chip';
import { PrimaryButton } from '../components/PrimaryButton';
import { Icon } from '../components/Icon';
import { GLYPH } from '../data/icons';
import { productImage } from '../data/images';
import { Background } from '../components/Background';
import { useStore } from '../store/useStore';
import { SCAN, STARTER } from '../data/catalog';
import { color, gradient, radius, shadow } from '../theme/tokens';
import { fontFamily } from '../theme/fonts';

const SHOP_TYPES = ['Grocery', 'Pharmacy', 'Hardware', 'Clothing', 'Electronics', 'General Retail', 'Other'];

export function OnboardingScreen() {
  const store = useStore();
  const insets = useSafeAreaInsets();
  const st = store.onbStep || 1;

  const secondaryLabel =
    st === 2 ? 'Skip for now' : st === 3 ? (store.onbAdded ? 'Add Another' : '') : st === 4 ? 'Skip for now' : st === 5 ? 'Go to Home' : '';
  const primaryLabel = st === 3 ? (store.onbAdded ? 'Continue' : 'Add to Stock') : st === 5 ? 'Make First Sale' : 'Continue';

  return (
    <View style={{ flex: 1, backgroundColor: color.screen }}>
      <Background />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: insets.top + 16, paddingHorizontal: 20, paddingBottom: insets.bottom + 24, gap: 18 }} showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Pressable onPress={() => store.onbBack()} style={{ width: 36, height: 36, borderRadius: 13, backgroundColor: color.glass62, borderWidth: 1, borderColor: color.glassBorder, alignItems: 'center', justifyContent: 'center' }}>
            <Icon d={GLYPH.back} size={17} color={color.ink} strokeWidth={2.2} />
          </Pressable>
          <View style={{ flex: 1, flexDirection: 'row', gap: 5 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <View key={i} style={{ flex: 1, height: 4, borderRadius: 4, backgroundColor: i <= st ? color.accent : color.hairlineStrong }} />
            ))}
          </View>
          <AppText style={{ fontSize: 12, fontWeight: '700', color: color.sub2 }}>{st} of 5</AppText>
        </View>

        {st === 1 && (
          <View style={{ gap: 16 }}>
            <View>
              <AppText style={{ fontSize: 26, fontWeight: '800', color: color.ink, letterSpacing: -0.5 }}>Set up your shop</AppText>
              <AppText style={{ fontSize: 13, fontWeight: '600', color: color.sub2, marginTop: 4 }}>Three details and you're trading.</AppText>
            </View>
            <GlassCard style={{ padding: 16 }}>
              <AppText style={{ fontSize: 11.5, fontWeight: '800', color: color.faint, letterSpacing: 1.4 }}>SHOP NAME</AppText>
              <TextInput
                placeholder="James General Dealers"
                placeholderTextColor={color.faint2}
                value={store.shopName}
                onChangeText={(v) => store.patch({ shopName: v })}
                style={{ marginTop: 8, fontFamily: fontFamily['700'], fontSize: 17, color: color.ink, padding: 0 }}
              />
            </GlassCard>
            <View style={{ gap: 10 }}>
              <AppText style={{ fontSize: 11.5, fontWeight: '800', color: color.faint, letterSpacing: 1.4 }}>SHOP TYPE</AppText>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {SHOP_TYPES.map((t) => (
                  <Chip key={t} label={t} selected={store.shopType === t} onPress={() => store.patch({ shopType: t })} />
                ))}
              </View>
            </View>
            <GlassCard style={{ padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={{ flex: 1 }}>
                <AppText style={{ fontSize: 11.5, fontWeight: '800', color: color.faint, letterSpacing: 1.4 }}>CURRENCY</AppText>
                <AppText style={{ fontSize: 16, fontWeight: '700', color: color.ink, marginTop: 6 }}>ZMW — Zambian Kwacha</AppText>
              </View>
              <Icon d={GLYPH.chevronDown} size={17} color={color.hairlineOnFaint} strokeWidth={2.2} />
            </GlassCard>
          </View>
        )}

        {st === 2 && (
          <View style={{ gap: 16 }}>
            <View>
              <AppText style={{ fontSize: 26, fontWeight: '800', color: color.ink, letterSpacing: -0.5 }}>Add your stock</AppText>
              <AppText style={{ fontSize: 13, fontWeight: '600', color: color.sub2, marginTop: 4 }}>Pick how you want to get products in.</AppText>
            </View>
            <Pressable onPress={() => store.openScan()} style={{ borderRadius: radius.huge, overflow: 'hidden', ...shadow.hero }}>
              <LinearGradient colors={gradient.hero.colors as unknown as [string, string]} start={gradient.hero.start} end={gradient.hero.end} style={{ padding: 18, flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                <View style={{ width: 48, height: 48, borderRadius: 17, backgroundColor: 'rgba(255,255,255,.2)', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon d={GLYPH.scan} size={21} color={color.white} strokeWidth={2} />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <AppText style={{ fontSize: 17, fontWeight: '800', color: color.white }}>Scan Product</AppText>
                    <View style={{ backgroundColor: 'rgba(255,255,255,.85)', borderRadius: 20, paddingHorizontal: 7, paddingVertical: 3 }}>
                      <AppText style={{ fontSize: 10, fontWeight: '800', color: '#58452B' }}>FASTEST</AppText>
                    </View>
                  </View>
                  <AppText style={{ fontSize: 12.5, fontWeight: '600', color: 'rgba(255,255,255,.78)', marginTop: 3 }}>Recognise it from the packaging</AppText>
                </View>
              </LinearGradient>
            </Pressable>
            <Pressable onPress={() => store.importStandard()}>
              <GlassCard style={{ padding: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <View style={{ width: 42, height: 42, borderRadius: 15, backgroundColor: 'rgba(149,119,80,.1)', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon d="M3 6h18l-1.5 12h-15zM8 6a4 4 0 0 1 8 0" size={19} color={color.accent} strokeWidth={2} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                      <AppText style={{ fontSize: 15, fontWeight: '800', color: color.ink }}>Standard Grocery Products</AppText>
                      <View style={{ backgroundColor: 'rgba(149,119,80,.13)', borderRadius: 20, paddingHorizontal: 7, paddingVertical: 3 }}>
                        <AppText style={{ fontSize: 9.5, fontWeight: '800', color: color.accent }}>{STARTER.length} ITEMS</AppText>
                      </View>
                    </View>
                    <AppText style={{ fontSize: 11.5, fontWeight: '600', color: color.sub2, marginTop: 3 }}>Sauces, tinned goods, oil, soap & sweets — priced, ready to edit</AppText>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', gap: 7, marginTop: 13 }}>
                  {STARTER.slice(0, 6).map((p) => (
                    <View key={p.name} style={{ flex: 1, aspectRatio: 1, borderRadius: 13, backgroundColor: color.productMat, borderWidth: 1, borderColor: color.hairline, padding: 4 }}>
                      <Image source={productImage(p.img)} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
                    </View>
                  ))}
                </View>
              </GlassCard>
            </Pressable>
            <GlassCard style={{ overflow: 'hidden' }}>
              {[
                { initial: 'B', label: 'Scan Barcode', note: 'Read an existing barcode', onPick: () => store.openScan() },
                { initial: 'M', label: 'Add Manually', note: 'Type the product details', onPick: () => store.patch({ onbStep: 3 }) },
                { initial: 'I', label: 'Import', note: 'Bring in an existing product list', onPick: () => store.showToast('Import — CSV or Stockaz backup') },
              ].map((m, i, arr) => (
                <Pressable key={m.label} onPress={m.onPick} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 15, borderBottomWidth: i < arr.length - 1 ? 1 : 0, borderBottomColor: color.hairline }}>
                  <View style={{ width: 34, height: 34, borderRadius: 12, backgroundColor: 'rgba(149,119,80,.1)', alignItems: 'center', justifyContent: 'center' }}>
                    <AppText style={{ fontSize: 13, fontWeight: '800', color: color.accent }}>{m.initial}</AppText>
                  </View>
                  <View style={{ flex: 1 }}>
                    <AppText style={{ fontSize: 14.5, fontWeight: '700', color: color.ink }}>{m.label}</AppText>
                    <AppText style={{ fontSize: 11.5, fontWeight: '600', color: color.faint, marginTop: 2 }}>{m.note}</AppText>
                  </View>
                  <Icon d={GLYPH.chevronRight} size={16} color={color.hairlineOnFaint} strokeWidth={2.2} />
                </Pressable>
              ))}
            </GlassCard>
          </View>
        )}

        {st === 3 && (
          <View style={{ gap: 16 }}>
            <View>
              <AppText style={{ fontSize: 26, fontWeight: '800', color: color.ink, letterSpacing: -0.5 }}>First product</AppText>
              <AppText style={{ fontSize: 13, fontWeight: '600', color: color.sub2, marginTop: 4 }}>Confirm the details Stockaz picked up.</AppText>
            </View>
            <GlassCard style={{ padding: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 13 }}>
                <View style={{ width: 52, height: 52, borderRadius: 17, backgroundColor: color.productMat, borderWidth: 1, borderColor: color.hairline2, overflow: 'hidden', padding: 4 }}>
                  <Image source={productImage(SCAN.img)} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
                </View>
                <View style={{ flex: 1 }}>
                  <AppText style={{ fontSize: 17, fontWeight: '800', color: color.ink, letterSpacing: -0.3 }}>{SCAN.short}</AppText>
                  <AppText style={{ fontSize: 12.5, fontWeight: '600', color: color.sub2, marginTop: 2 }}>415g · {SCAN.cat}</AppText>
                </View>
                <View style={{ backgroundColor: 'rgba(149,119,80,.12)', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 6 }}>
                  <AppText style={{ fontSize: 11, fontWeight: '700', color: color.accent }}>Scanned</AppText>
                </View>
              </View>
              <View style={{ height: 1, backgroundColor: color.hairline, marginVertical: 15 }} />
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <View style={{ flex: 1, borderRadius: radius.lg, padding: 12, backgroundColor: color.glass7, borderWidth: 1, borderColor: color.hairline }}>
                  <AppText style={{ fontSize: 10.5, fontWeight: '800', color: color.faint, letterSpacing: 1.2 }}>BUYING PRICE</AppText>
                  <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4, marginTop: 6 }}>
                    <AppText style={{ fontSize: 15, fontWeight: '800', color: color.sub2 }}>K</AppText>
                    <TextInput placeholder="18" placeholderTextColor={color.faint2} value={store.buyPrice} onChangeText={(v) => store.patch({ buyPrice: v })} keyboardType="decimal-pad"
                      style={{ flex: 1, fontFamily: fontFamily['800'], fontSize: 16, color: color.ink, padding: 0 }} />
                  </View>
                </View>
                <View style={{ flex: 1, borderRadius: radius.lg, padding: 12, backgroundColor: color.glass7, borderWidth: 1, borderColor: color.hairline }}>
                  <AppText style={{ fontSize: 10.5, fontWeight: '800', color: color.faint, letterSpacing: 1.2 }}>SELLING PRICE</AppText>
                  <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4, marginTop: 6 }}>
                    <AppText style={{ fontSize: 15, fontWeight: '800', color: color.sub2 }}>K</AppText>
                    <TextInput placeholder="25" placeholderTextColor={color.faint2} value={store.sellPrice} onChangeText={(v) => store.patch({ sellPrice: v })} keyboardType="decimal-pad"
                      style={{ flex: 1, fontFamily: fontFamily['800'], fontSize: 16, color: color.ink, padding: 0 }} />
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, borderRadius: radius.lg, padding: 12, paddingHorizontal: 14, backgroundColor: color.glass7, borderWidth: 1, borderColor: color.hairline }}>
                <AppText style={{ fontSize: 13.5, fontWeight: '700', color: color.ink }}>Quantity</AppText>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, padding: 3, borderRadius: 14, backgroundColor: color.hairline }}>
                  <Pressable onPress={() => store.patch({ onbQty: Math.max(1, (store.onbQty == null ? 12 : store.onbQty) - 1) })} style={{ width: 30, height: 30, borderRadius: 11, backgroundColor: color.glass9, alignItems: 'center', justifyContent: 'center' }}>
                    <AppText style={{ fontSize: 16, fontWeight: '800', color: color.ink }}>−</AppText>
                  </Pressable>
                  <AppText style={{ minWidth: 30, textAlign: 'center', fontSize: 15, fontWeight: '800', color: color.ink }}>{store.onbQty == null ? 12 : store.onbQty}</AppText>
                  <Pressable onPress={() => store.patch({ onbQty: (store.onbQty == null ? 12 : store.onbQty) + 1 })} style={{ width: 30, height: 30, borderRadius: 11, backgroundColor: '#7A5F3C', alignItems: 'center', justifyContent: 'center' }}>
                    <AppText style={{ fontSize: 16, fontWeight: '800', color: color.white }}>+</AppText>
                  </Pressable>
                </View>
              </View>
            </GlassCard>
            {store.onbAdded && (
              <View style={{ borderRadius: radius.xl, padding: 13, paddingHorizontal: 15, backgroundColor: 'rgba(149,119,80,.1)', borderWidth: 1, borderColor: color.accentBorder, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: '#957750', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon d={GLYPH.check} size={11} color={color.white} strokeWidth={3.4} />
                </View>
                <AppText style={{ fontSize: 13, fontWeight: '700', color: '#58452B' }}>{SCAN.short} added · {store.onbCount || 0} in stock</AppText>
              </View>
            )}
          </View>
        )}

        {st === 4 && (
          <View style={{ gap: 16 }}>
            <View>
              <AppText style={{ fontSize: 26, fontWeight: '800', color: color.ink, letterSpacing: -0.5 }}>Who works in your shop?</AppText>
              <AppText style={{ fontSize: 13, fontWeight: '600', color: color.sub2, marginTop: 4 }}>You can change roles later in Shop Settings.</AppText>
            </View>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Pressable onPress={() => store.pickJustMe()} style={{ flex: 1, borderRadius: radius.xxl, padding: 16, backgroundColor: store.staffMode === 'me' ? 'rgba(149,119,80,.14)' : color.glass6, borderWidth: 1, borderColor: store.staffMode === 'me' ? color.accentBorder : color.glassBorder }}>
                <AppText style={{ fontSize: 15, fontWeight: '800', color: color.ink }}>Just Me</AppText>
                <AppText style={{ fontSize: 11.5, fontWeight: '600', color: color.sub2, marginTop: 3 }}>I run the shop myself</AppText>
              </Pressable>
              <Pressable onPress={() => store.pickStaff()} style={{ flex: 1, borderRadius: radius.xxl, padding: 16, backgroundColor: store.staffMode === 'staff' ? 'rgba(149,119,80,.14)' : color.glass6, borderWidth: 1, borderColor: store.staffMode === 'staff' ? color.accentBorder : color.glassBorder }}>
                <AppText style={{ fontSize: 15, fontWeight: '800', color: color.ink }}>I Have Staff</AppText>
                <AppText style={{ fontSize: 11.5, fontWeight: '600', color: color.sub2, marginTop: 3 }}>Add counter people</AppText>
              </Pressable>
            </View>
            {store.staffMode === 'staff' && (
              <View style={{ gap: 12 }}>
                <GlassCard style={{ padding: 16 }}>
                  <AppText style={{ fontSize: 11.5, fontWeight: '800', color: color.faint, letterSpacing: 1.4 }}>EMPLOYEE NAME</AppText>
                  <TextInput
                    placeholder="Kelvin Mwansa"
                    placeholderTextColor={color.faint2}
                    value={store.staffName}
                    onChangeText={(v) => store.patch({ staffName: v })}
                    style={{ marginTop: 8, fontFamily: fontFamily['700'], fontSize: 16, color: color.ink, padding: 0 }}
                  />
                  <View style={{ height: 1, backgroundColor: color.hairline, marginVertical: 14 }} />
                  <View style={{ gap: 8 }}>
                    {[
                      { label: 'Counter', note: 'Can make sales and issue receipts' },
                      { label: 'Manager', note: 'Full shop access' },
                    ].map((r) => {
                      const on = (store.staffRole || 'Counter') === r.label;
                      return (
                        <Pressable key={r.label} onPress={() => store.patch({ staffRole: r.label })} style={{ flexDirection: 'row', alignItems: 'center', gap: 11, padding: 11, paddingHorizontal: 12, borderRadius: radius.lg, backgroundColor: on ? 'rgba(149,119,80,.1)' : color.glass62, borderWidth: 1, borderColor: on ? color.accentBorder : color.hairline }}>
                          <View style={{ width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: on ? '#957750' : color.hairlineStrong, alignItems: 'center', justifyContent: 'center' }}>
                            {on && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#957750' }} />}
                          </View>
                          <View style={{ flex: 1 }}>
                            <AppText style={{ fontSize: 13.5, fontWeight: '700', color: color.ink }}>{r.label}</AppText>
                            <AppText style={{ fontSize: 11.5, fontWeight: '600', color: color.faint, marginTop: 1 }}>{r.note}</AppText>
                          </View>
                        </Pressable>
                      );
                    })}
                  </View>
                  <Pressable onPress={() => store.addStaff()} style={{ height: 44, marginTop: 14, borderRadius: radius.lg, backgroundColor: 'rgba(149,119,80,.1)', borderWidth: 1, borderColor: color.accentBorder, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <Icon d={GLYPH.plus} size={15} color={color.accent} strokeWidth={2.4} />
                    <AppText style={{ fontSize: 14, fontWeight: '800', color: color.accent }}>Add Staff Member</AppText>
                  </Pressable>
                </GlassCard>
                {store.staffList.map((p) => (
                  <GlassCard key={p.name + p.role} style={{ padding: 13, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <View style={{ width: 36, height: 36, borderRadius: 13, overflow: 'hidden' }}>
                      <LinearGradient colors={gradient.avatar.colors as unknown as [string, string]} start={gradient.avatar.start} end={gradient.avatar.end} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <AppText style={{ color: color.white, fontSize: 13, fontWeight: '800' }}>{p.initial}</AppText>
                      </LinearGradient>
                    </View>
                    <AppText style={{ flex: 1, fontSize: 14, fontWeight: '700', color: color.ink }}>{p.name}</AppText>
                    <View style={{ backgroundColor: 'rgba(149,119,80,.12)', borderRadius: 20, paddingHorizontal: 9, paddingVertical: 5 }}>
                      <AppText style={{ fontSize: 11, fontWeight: '700', color: color.accent }}>{p.role}</AppText>
                    </View>
                  </GlassCard>
                ))}
              </View>
            )}
          </View>
        )}

        {st === 5 && (
          <View style={{ gap: 16 }}>
            <View>
              <AppText style={{ fontSize: 26, fontWeight: '800', color: color.ink, letterSpacing: -0.5 }}>Your shop is ready</AppText>
              <AppText style={{ fontSize: 13, fontWeight: '600', color: color.sub2, marginTop: 4 }}>Everything below is live in Stockaz now.</AppText>
            </View>
            <View style={{ borderRadius: radius.massive, overflow: 'hidden', ...shadow.hero }}>
              <LinearGradient colors={gradient.hero.colors as unknown as [string, string]} start={gradient.hero.start} end={gradient.hero.end} style={{ padding: 22 }}>
                <AppText style={{ fontSize: 11.5, fontWeight: '800', color: 'rgba(255,255,255,.75)', letterSpacing: 1.4 }}>SHOP</AppText>
                <AppText style={{ fontSize: 24, fontWeight: '800', color: color.white, letterSpacing: -0.4, marginTop: 6 }}>{store.shopName || 'James General Dealers'}</AppText>
                <View style={{ flexDirection: 'row', gap: 9, marginTop: 16 }}>
                  {[
                    { v: String((store.starterCount || 0) + (store.onbAdded ? 1 : 0)), l: 'Products' },
                    { v: String(store.staffMode === 'staff' ? store.staffList.length || 1 : 1), l: store.staffMode === 'staff' ? 'Counter' : 'Owner' },
                    { v: 'ZMW', l: 'Currency' },
                  ].map((s) => (
                    <View key={s.l} style={{ flex: 1, borderRadius: 14, padding: 11, backgroundColor: 'rgba(255,255,255,.14)' }}>
                      <AppText style={{ fontSize: 17, fontWeight: '800', color: color.white }}>{s.v}</AppText>
                      <AppText style={{ fontSize: 10.5, fontWeight: '600', color: 'rgba(255,255,255,.75)', marginTop: 1 }}>{s.l}</AppText>
                    </View>
                  ))}
                </View>
              </LinearGradient>
            </View>
            <GlassCard style={{ padding: 15, flexDirection: 'row', alignItems: 'center' }}>
              <AppText numberOfLines={1} style={{ fontSize: 11.5, fontWeight: '700', color: color.sub2 }}>{store.shopType || 'General Retail'} · Chilenje Branch</AppText>
            </GlassCard>
          </View>
        )}

        <View style={{ flex: 1, minHeight: 12 }} />

        <View style={{ gap: 10 }}>
          <PrimaryButton label={primaryLabel} height={54} radiusSize={radius.xl} fontSize={17} onPress={() => store.onbNext()} />
          {!!secondaryLabel && (
            <Pressable onPress={() => store.onbSecondary()} style={{ height: 48, borderRadius: radius.xl, backgroundColor: color.glass55, borderWidth: 1, borderColor: color.glassBorder, alignItems: 'center', justifyContent: 'center' }}>
              <AppText style={{ fontSize: 14.5, fontWeight: '700', color: color.ink }}>{secondaryLabel}</AppText>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export default OnboardingScreen;
