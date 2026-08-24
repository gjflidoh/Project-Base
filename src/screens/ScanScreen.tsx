import React, { useEffect, useRef } from 'react';
import { View, Pressable, Image, Animated, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../components/Text';
import { PrimaryButton } from '../components/PrimaryButton';
import { Icon } from '../components/Icon';
import { GLYPH } from '../data/icons';
import { productImage } from '../data/images';
import { useStore } from '../store/useStore';
import { SCAN } from '../data/catalog';
import { color, radius, shadow } from '../theme/tokens';

export function ScanScreen() {
  const store = useStore();
  const insets = useSafeAreaInsets();
  const scanline = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!store.scanning) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scanline, { toValue: 1, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(scanline, { toValue: 0, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [store.scanning]);

  return (
    <View style={{ flex: 1, backgroundColor: '#14100C' }}>
      <View style={{ position: 'absolute', top: insets.top + 16, left: 20, right: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', zIndex: 5 }}>
        <Pressable onPress={() => store.closeScan()} style={{ width: 38, height: 38, borderRadius: 14, backgroundColor: 'rgba(255,255,255,.14)', borderWidth: 1, borderColor: 'rgba(255,255,255,.22)', alignItems: 'center', justifyContent: 'center' }}>
          <Icon d={GLYPH.close} size={16} color="#fff" strokeWidth={2.4} />
        </Pressable>
        <View style={{ height: 38, paddingHorizontal: 15, borderRadius: 14, backgroundColor: 'rgba(255,255,255,.14)', borderWidth: 1, borderColor: 'rgba(255,255,255,.22)', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#F0DCBE' }} />
          <AppText style={{ color: '#fff', fontSize: 12.5, fontWeight: '700' }}>Smart Scan</AppText>
        </View>
        <View style={{ width: 38, height: 38, borderRadius: 14, backgroundColor: 'rgba(255,255,255,.14)', borderWidth: 1, borderColor: 'rgba(255,255,255,.22)', alignItems: 'center', justifyContent: 'center' }}>
          <Icon d="M9 18h6M12 3a6 6 0 0 1 3 11v2H9v-2A6 6 0 0 1 12 3Z" size={17} color="#fff" strokeWidth={2} />
        </View>
      </View>

      <View style={{ position: 'absolute', left: '50%', top: '44%', width: 250, height: 250, marginLeft: -125, marginTop: -125, overflow: 'hidden' }}>
        <View style={{ position: 'absolute', top: 0, left: 0, width: 34, height: 34, borderColor: '#F0DCBE', borderTopWidth: 3, borderLeftWidth: 3, borderTopLeftRadius: 14 }} />
        <View style={{ position: 'absolute', top: 0, right: 0, width: 34, height: 34, borderColor: '#F0DCBE', borderTopWidth: 3, borderRightWidth: 3, borderTopRightRadius: 14 }} />
        <View style={{ position: 'absolute', bottom: 0, left: 0, width: 34, height: 34, borderColor: '#F0DCBE', borderBottomWidth: 3, borderLeftWidth: 3, borderBottomLeftRadius: 14 }} />
        <View style={{ position: 'absolute', bottom: 0, right: 0, width: 34, height: 34, borderColor: '#F0DCBE', borderBottomWidth: 3, borderRightWidth: 3, borderBottomRightRadius: 14 }} />
        {store.scanning && (
          <Animated.View
            style={{
              position: 'absolute', left: 8, right: 8, height: 2, backgroundColor: '#F0DCBE',
              transform: [{ translateY: scanline.interpolate({ inputRange: [0, 1], outputRange: [20, 220] }) }],
            }}
          />
        )}
      </View>

      {store.scanning && (
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 40, alignItems: 'center', gap: 14 }}>
          <View style={{ paddingHorizontal: 18, paddingVertical: 11, borderRadius: 18, backgroundColor: 'rgba(255,255,255,.12)', borderWidth: 1, borderColor: 'rgba(255,255,255,.22)' }}>
            <AppText style={{ color: '#fff', fontSize: 13, fontWeight: '700' }}>Reading barcode, label & size…</AppText>
          </View>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {['Barcode', 'Packaging', 'Brand'].map((t) => (
              <View key={t} style={{ paddingHorizontal: 14, paddingVertical: 8, borderRadius: 14, backgroundColor: 'rgba(255,255,255,.1)', borderWidth: 1, borderColor: 'rgba(255,255,255,.18)' }}>
                <AppText style={{ color: 'rgba(255,255,255,.8)', fontSize: 11.5, fontWeight: '700' }}>{t}</AppText>
              </View>
            ))}
          </View>
        </View>
      )}

      {store.scanFound && (
        <View style={{ position: 'absolute', left: 12, right: 12, bottom: Math.max(12, insets.bottom), borderRadius: radius.card, padding: 20, backgroundColor: 'rgba(255,255,255,.94)', ...shadow.sheet }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: '#957750', alignItems: 'center', justifyContent: 'center' }}>
              <Icon d={GLYPH.check} size={10} color="#fff" strokeWidth={3.4} />
            </View>
            <AppText style={{ fontSize: 11.5, fontWeight: '800', color: color.accent, letterSpacing: 1.4 }}>PRODUCT FOUND</AppText>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 14 }}>
            <View style={{ width: 58, height: 58, borderRadius: 19, backgroundColor: '#fff', borderWidth: 1, borderColor: color.hairline2, overflow: 'hidden', padding: 5 }}>
              <Image source={productImage(SCAN.img)} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
            </View>
            <View style={{ flex: 1 }}>
              <AppText style={{ fontSize: 20, fontWeight: '800', color: color.ink, letterSpacing: -0.3 }}>{SCAN.short}</AppText>
              <AppText style={{ fontSize: 13, fontWeight: '600', color: color.sub2, marginTop: 2 }}>Original in Tomato Sauce · 415g</AppText>
            </View>
          </View>
          <View style={{ flexDirection: 'row', gap: 8, marginVertical: 14 }}>
            <View style={{ backgroundColor: 'rgba(149,119,80,.12)', borderRadius: 12, paddingHorizontal: 11, paddingVertical: 7 }}>
              <AppText style={{ fontSize: 11.5, fontWeight: '700', color: color.accent }}>Existing product ✓</AppText>
            </View>
            <View style={{ backgroundColor: color.hairline, borderRadius: 12, paddingHorizontal: 11, paddingVertical: 7 }}>
              <AppText style={{ fontSize: 11.5, fontWeight: '700', color: color.ink }}>{SCAN.qty} in stock</AppText>
            </View>
          </View>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <View style={{ flex: 1 }}>
              <PrimaryButton label="Sell" height={50} radiusSize={radius.xl} fontSize={15.5} onPress={() => store.scanSell()} />
            </View>
            <Pressable onPress={() => store.scanAdd()} style={{ flex: 1, height: 50, borderRadius: radius.xl, backgroundColor: color.hairline, borderWidth: 1, borderColor: color.hairline2, alignItems: 'center', justifyContent: 'center' }}>
              <AppText style={{ fontSize: 15.5, fontWeight: '800', color: color.ink }}>Add Stock</AppText>
            </Pressable>
          </View>
          <AppText style={{ textAlign: 'center', marginTop: 12, fontSize: 11.5, fontWeight: '600', color: color.faint }}>Not right? See 3 possible matches</AppText>
        </View>
      )}
    </View>
  );
}

export default ScanScreen;
