import React, { useEffect, useRef, useState } from 'react';
import { View, Pressable, Image, Animated, Easing, Linking } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../components/Text';
import { PrimaryButton } from '../components/PrimaryButton';
import { Icon } from '../components/Icon';
import { GLYPH } from '../data/icons';
import { productImage } from '../data/images';
import { useStore } from '../store/useStore';
import { K } from '../data/catalog';
import { color, radius, shadow } from '../theme/tokens';

const BARCODE_TYPES = ['ean13', 'ean8', 'upc_a', 'upc_e', 'qr', 'code128', 'code39'] as const;

export function ScanScreen() {
  const store = useStore();
  const insets = useSafeAreaInsets();
  const scanline = useRef(new Animated.Value(0)).current;
  const [permission, requestPermission] = useCameraPermissions();
  const [torch, setTorch] = useState(false);

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

  // Ask for camera access as soon as the scanner opens, if we haven't yet.
  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission?.granted]);

  const found = store.scannedProduct;
  const notFound = store.scanFound && !found;

  return (
    <View style={{ flex: 1, backgroundColor: '#14100C' }}>
      {permission?.granted && store.scanning && (
        <CameraView
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          facing="back"
          enableTorch={torch}
          barcodeScannerSettings={{ barcodeTypes: [...BARCODE_TYPES] }}
          onBarcodeScanned={(result) => store.handleBarcodeScanned(result.data)}
        />
      )}
      <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(10,8,6,.25)' }} />

      <View style={{ position: 'absolute', top: insets.top + 16, left: 20, right: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', zIndex: 5 }}>
        <Pressable onPress={() => store.closeScan()} style={{ width: 38, height: 38, borderRadius: 14, backgroundColor: 'rgba(255,255,255,.14)', borderWidth: 1, borderColor: 'rgba(255,255,255,.22)', alignItems: 'center', justifyContent: 'center' }}>
          <Icon d={GLYPH.close} size={16} color="#fff" strokeWidth={2.4} />
        </Pressable>
        <View style={{ height: 38, paddingHorizontal: 15, borderRadius: 14, backgroundColor: 'rgba(255,255,255,.14)', borderWidth: 1, borderColor: 'rgba(255,255,255,.22)', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#F0DCBE' }} />
          <AppText style={{ color: '#fff', fontSize: 12.5, fontWeight: '700' }}>Smart Scan</AppText>
        </View>
        <Pressable
          onPress={() => setTorch((t) => !t)}
          disabled={!permission?.granted}
          style={{ width: 38, height: 38, borderRadius: 14, backgroundColor: torch ? '#F0DCBE' : 'rgba(255,255,255,.14)', borderWidth: 1, borderColor: 'rgba(255,255,255,.22)', alignItems: 'center', justifyContent: 'center' }}
        >
          <Icon d="M9 18h6M12 3a6 6 0 0 1 3 11v2H9v-2A6 6 0 0 1 12 3Z" size={17} color={torch ? '#3A2C1C' : '#fff'} strokeWidth={2} />
        </Pressable>
      </View>

      {!permission && null}

      {permission && !permission.granted && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, gap: 16 }}>
          <View style={{ width: 64, height: 64, borderRadius: 22, backgroundColor: 'rgba(255,255,255,.1)', alignItems: 'center', justifyContent: 'center' }}>
            <Icon d={GLYPH.scan} size={28} color="#F0DCBE" strokeWidth={1.8} />
          </View>
          <AppText style={{ color: '#fff', fontSize: 18, fontWeight: '800', textAlign: 'center' }}>Camera access needed</AppText>
          <AppText style={{ color: 'rgba(255,255,255,.65)', fontSize: 13.5, fontWeight: '600', textAlign: 'center', lineHeight: 19 }}>
            Stockaz needs your camera to scan product barcodes.
          </AppText>
          {permission.canAskAgain ? (
            <PrimaryButton label="Enable Camera" height={50} radiusSize={radius.xl} fontSize={15.5} onPress={() => requestPermission()} />
          ) : (
            <Pressable onPress={() => Linking.openSettings()} style={{ height: 50, paddingHorizontal: 24, borderRadius: radius.xl, backgroundColor: 'rgba(255,255,255,.14)', borderWidth: 1, borderColor: 'rgba(255,255,255,.22)', alignItems: 'center', justifyContent: 'center' }}>
              <AppText style={{ color: '#fff', fontSize: 15, fontWeight: '800' }}>Open Settings</AppText>
            </Pressable>
          )}
        </View>
      )}

      {permission?.granted && (
        <>
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
                <AppText style={{ color: '#fff', fontSize: 13, fontWeight: '700' }}>Point the camera at a barcode…</AppText>
              </View>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                {['Barcode', 'QR', 'Code128'].map((t) => (
                  <View key={t} style={{ paddingHorizontal: 14, paddingVertical: 8, borderRadius: 14, backgroundColor: 'rgba(255,255,255,.1)', borderWidth: 1, borderColor: 'rgba(255,255,255,.18)' }}>
                    <AppText style={{ color: 'rgba(255,255,255,.8)', fontSize: 11.5, fontWeight: '700' }}>{t}</AppText>
                  </View>
                ))}
              </View>
            </View>
          )}
        </>
      )}

      {found && (
        <View style={{ position: 'absolute', left: 12, right: 12, bottom: Math.max(12, insets.bottom), borderRadius: radius.card, padding: 20, backgroundColor: color.sheetSurface, ...shadow.sheet }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: '#957750', alignItems: 'center', justifyContent: 'center' }}>
              <Icon d={GLYPH.check} size={10} color="#fff" strokeWidth={3.4} />
            </View>
            <AppText style={{ fontSize: 11.5, fontWeight: '800', color: color.accent, letterSpacing: 1.4 }}>PRODUCT FOUND</AppText>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 14 }}>
            <View style={{ width: 58, height: 58, borderRadius: 19, backgroundColor: color.productMat, borderWidth: 1, borderColor: color.hairline2, overflow: 'hidden', padding: 5 }}>
              <Image source={productImage(found.img)} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
            </View>
            <View style={{ flex: 1 }}>
              <AppText style={{ fontSize: 20, fontWeight: '800', color: color.ink, letterSpacing: -0.3 }}>{found.short}</AppText>
              <AppText style={{ fontSize: 13, fontWeight: '600', color: color.sub2, marginTop: 2 }}>{found.name}</AppText>
            </View>
          </View>
          <View style={{ flexDirection: 'row', gap: 8, marginVertical: 14 }}>
            <View style={{ backgroundColor: 'rgba(149,119,80,.12)', borderRadius: 12, paddingHorizontal: 11, paddingVertical: 7 }}>
              <AppText style={{ fontSize: 11.5, fontWeight: '700', color: color.accent }}>Existing product ✓</AppText>
            </View>
            <View style={{ backgroundColor: color.hairline, borderRadius: 12, paddingHorizontal: 11, paddingVertical: 7 }}>
              <AppText style={{ fontSize: 11.5, fontWeight: '700', color: color.ink }}>{found.qty} in stock · {K(found.price)}</AppText>
            </View>
          </View>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <View style={{ flex: 1 }}>
              <PrimaryButton label="Sell" height={50} radiusSize={radius.xl} fontSize={15.5} onPress={() => store.scanSell()} />
            </View>
            <Pressable onPress={() => store.scanAdd()} style={{ flex: 1, height: 50, borderRadius: radius.xl, backgroundColor: color.hairline, borderWidth: 1, borderColor: color.hairline2, alignItems: 'center', justifyContent: 'center' }}>
              <AppText style={{ fontSize: 15.5, fontWeight: '800', color: color.ink }}>Restock</AppText>
            </Pressable>
          </View>
          <Pressable onPress={() => store.openScan()} style={{ marginTop: 12 }}>
            <AppText style={{ textAlign: 'center', fontSize: 11.5, fontWeight: '600', color: color.faint }}>Not right? Scan again</AppText>
          </Pressable>
        </View>
      )}

      {notFound && (
        <View style={{ position: 'absolute', left: 12, right: 12, bottom: Math.max(12, insets.bottom), borderRadius: radius.card, padding: 20, backgroundColor: color.sheetSurface, ...shadow.sheet }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: color.warn, alignItems: 'center', justifyContent: 'center' }}>
              <Icon d="M12 7v6M12 17h.01" size={10} color="#fff" strokeWidth={3.4} />
            </View>
            <AppText style={{ fontSize: 11.5, fontWeight: '800', color: color.warnInk, letterSpacing: 1.4 }}>NEW BARCODE</AppText>
          </View>
          <AppText style={{ fontSize: 17, fontWeight: '800', color: color.ink, letterSpacing: -0.2, marginTop: 12 }}>Not in your catalogue yet</AppText>
          <AppText style={{ fontSize: 12.5, fontWeight: '600', color: color.sub2, marginTop: 4 }} numberOfLines={1}>
            Scanned code: {store.scannedCode}
          </AppText>
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
            <View style={{ flex: 1 }}>
              <PrimaryButton label="Add product" height={50} radiusSize={radius.xl} fontSize={15.5} onPress={() => store.scanAdd()} />
            </View>
            <Pressable onPress={() => store.openScan()} style={{ flex: 1, height: 50, borderRadius: radius.xl, backgroundColor: color.hairline, borderWidth: 1, borderColor: color.hairline2, alignItems: 'center', justifyContent: 'center' }}>
              <AppText style={{ fontSize: 15.5, fontWeight: '800', color: color.ink }}>Scan again</AppText>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

export default ScanScreen;
