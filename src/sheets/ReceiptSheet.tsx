import React from 'react';
import { View, Image } from 'react-native';
import { Sheet } from '../components/Sheet';
import { AppText } from '../components/Text';
import { PrimaryButton } from '../components/PrimaryButton';
import { productImage } from '../data/images';
import { useStore } from '../store/useStore';
import { receiptLineImage } from '../store/selectors';
import { K } from '../data/catalog';
import { color, radius } from '../theme/tokens';

export function ReceiptSheet() {
  const store = useStore();
  const r = store.receipt;
  const catalog = store.currentCatalog();

  return (
    <Sheet visible={!!r} onClose={() => store.patch({ receipt: null })}>
      {r && (
        <>
          <View style={{ width: 40, height: 4, borderRadius: 4, backgroundColor: color.hairlineStrong, alignSelf: 'center', marginBottom: 18 }} />
          <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <AppText style={{ fontSize: 21, fontWeight: '800', color: color.ink, letterSpacing: -0.4 }}>{r.no}</AppText>
            <AppText style={{ fontSize: 12.5, fontWeight: '600', color: color.faint }}>{r.when}</AppText>
          </View>
          <AppText style={{ fontSize: 12.5, fontWeight: '600', color: color.sub2, marginTop: 4 }}>{r.customer} · {r.method}</AppText>
          <View style={{ height: 1, backgroundColor: color.hairline2, marginVertical: 16 }} />
          <View style={{ gap: 9 }}>
            {r.lines.map(([label, amount], i) => {
              const img = receiptLineImage(store, catalog, label);
              return (
                <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <View style={{ width: 28, height: 28, borderRadius: 9, backgroundColor: color.productMat, borderWidth: 1, borderColor: color.hairline, overflow: 'hidden', opacity: img ? 1 : 0 }}>
                    {img && <Image source={productImage(img)} style={{ width: '100%', height: '100%' }} resizeMode="contain" />}
                  </View>
                  <AppText style={{ flex: 1, fontSize: 13.5, fontWeight: '600', color: color.ink }}>{label}</AppText>
                  <AppText style={{ fontSize: 13.5, fontWeight: '600', color: color.ink }}>{K(amount)}</AppText>
                </View>
              );
            })}
          </View>
          <View style={{ height: 1, backgroundColor: color.hairline2, marginVertical: 16 }} />
          <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <AppText style={{ fontSize: 13, fontWeight: '800', color: color.ink }}>Total</AppText>
            <AppText style={{ fontSize: 28, fontWeight: '800', color: color.ink, letterSpacing: -0.6 }}>{K(r.amount)}</AppText>
          </View>
          <View style={{ flexDirection: 'row', gap: 9, marginTop: 20 }}>
            <View style={{ flex: 1, height: 46, borderRadius: radius.lg, backgroundColor: color.hairline, borderWidth: 1, borderColor: color.hairline2, alignItems: 'center', justifyContent: 'center' }}>
              <AppText style={{ fontSize: 13.5, fontWeight: '700', color: color.ink }}>View PDF</AppText>
            </View>
            <View style={{ flex: 1, height: 46, borderRadius: radius.lg, backgroundColor: color.hairline, borderWidth: 1, borderColor: color.hairline2, alignItems: 'center', justifyContent: 'center' }}>
              <AppText style={{ fontSize: 13.5, fontWeight: '700', color: color.ink }}>Share</AppText>
            </View>
            <View style={{ flex: 1 }}>
              <PrimaryButton label="Print" height={46} radiusSize={radius.lg} fontSize={13.5} onPress={() => {}} />
            </View>
          </View>
        </>
      )}
    </Sheet>
  );
}

export default ReceiptSheet;
