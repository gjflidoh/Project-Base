import React from 'react';
import { View, StyleSheet } from 'react-native';
import { color } from '../theme/tokens';

// The soft warm ambient blobs behind every screen (ported from the
// `position:absolute;inset:0;overflow:hidden` decoration div that sits
// behind the phone-screen content in Stockaz.dc.html). React Native has no
// CSS blur filter, so these are rendered as large, very-low-opacity soft
// circles instead — same warm color wash, without the blur.
export function Background() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <View style={{ position: 'absolute', width: 320, height: 320, left: -90, top: -60, borderRadius: 160, backgroundColor: 'rgba(149,119,80,.18)' }} />
      <View style={{ position: 'absolute', width: 260, height: 260, right: -80, top: 180, borderRadius: 130, backgroundColor: 'rgba(95,75,49,.13)' }} />
      <View style={{ position: 'absolute', width: 300, height: 300, left: -40, bottom: -90, borderRadius: 150, backgroundColor: 'rgba(199,170,130,.15)' }} />
    </View>
  );
}

export function ScreenRoot({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ flex: 1, backgroundColor: color.screen }}>
      <Background />
      {children}
    </View>
  );
}

export default Background;
