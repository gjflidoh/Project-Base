import React from 'react';
import { View, Pressable, Image } from 'react-native';
import { Sheet } from '../components/Sheet';
import { AppText } from '../components/Text';
import { PrimaryButton } from '../components/PrimaryButton';
import { productImage } from '../data/images';
import { useStore } from '../store/useStore';
import { color, radius } from '../theme/tokens';

export function RestockSheet() {
  const store = useStore();
  const r = store.restock;

  return (
    <Sheet visible={!!r} edge="center" onClose={() => store.restockCancel()}>
      {r && (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            <View style={{ width: 54, height: 54, borderRadius: 18, backgroundColor: color.productMat, borderWidth: 1, borderColor: color.hairline2, overflow: 'hidden', padding: 5 }}>
              <Image source={productImage(r.img)} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
            </View>
            <View style={{ flex: 1 }}>
              <AppText style={{ fontSize: 11, fontWeight: '800', color: color.dangerInk, letterSpacing: 1.4 }}>OUT OF STOCK</AppText>
              <AppText style={{ fontSize: 18, fontWeight: '800', color: color.ink, marginTop: 3 }}>{r.short}</AppText>
              <AppText style={{ fontSize: 12, fontWeight: '600', color: color.sub2, marginTop: 1 }}>{r.cat}</AppText>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, marginBottom: 6, borderRadius: radius.xl - 1, padding: 12, paddingHorizontal: 14, backgroundColor: color.glass8, borderWidth: 1, borderColor: color.hairline }}>
            <AppText style={{ fontSize: 13.5, fontWeight: '700', color: color.ink }}>Restock quantity</AppText>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, padding: 3, borderRadius: 14, backgroundColor: color.hairline }}>
              <Pressable onPress={() => store.restockDown()} style={{ width: 30, height: 30, borderRadius: 11, backgroundColor: color.glass94, alignItems: 'center', justifyContent: 'center' }}>
                <AppText style={{ fontSize: 16, fontWeight: '800', color: color.ink }}>−</AppText>
              </Pressable>
              <AppText style={{ minWidth: 32, textAlign: 'center', fontSize: 15, fontWeight: '800', color: color.ink }}>{store.restockQty || 12}</AppText>
              <Pressable onPress={() => store.restockUp()} style={{ width: 30, height: 30, borderRadius: 11, backgroundColor: '#7A5F3C', alignItems: 'center', justifyContent: 'center' }}>
                <AppText style={{ fontSize: 16, fontWeight: '800', color: color.white }}>+</AppText>
              </Pressable>
            </View>
          </View>
          <View style={{ flexDirection: 'row', gap: 9, marginTop: 14 }}>
            <Pressable onPress={() => store.restockCancel()} style={{ flex: 1, height: 48, borderRadius: radius.xl - 1, backgroundColor: color.hairlineStrong, borderWidth: 1, borderColor: color.hairline2, alignItems: 'center', justifyContent: 'center' }}>
              <AppText style={{ fontSize: 14.5, fontWeight: '800', color: color.ink }}>Not now</AppText>
            </Pressable>
            <View style={{ flex: 1 }}>
              <PrimaryButton label="Restock" height={48} radiusSize={radius.xl - 1} fontSize={14.5} onPress={() => store.restockConfirm()} />
            </View>
          </View>
        </>
      )}
    </Sheet>
  );
}

export default RestockSheet;
