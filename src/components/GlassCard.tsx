import React from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { color, radius, shadow } from '../theme/tokens';

interface GlassCardProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  radiusSize?: number;
  fill?: string; // rgba overlay tint, defaults to color.glass6
  border?: string;
  blur?: boolean; // set false for opaque sheets that don't need the blur cost
  elevated?: boolean; // adds the soft warm card shadow
}

// The design's "frosted glass" panel: a translucent white fill over a blur,
// with a near-white hairline border. Used for basically every card, row
// group and pill in Stockaz.
export function GlassCard({ children, style, radiusSize = radius.xxxl, fill = color.glass6, border = color.glassBorder, blur = true, elevated = true }: GlassCardProps) {
  return (
    <View style={[{ borderRadius: radiusSize, overflow: 'hidden', borderWidth: 1, borderColor: border }, elevated && shadow.card, style]}>
      {blur && <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />}
      <View style={{ backgroundColor: fill }}>{children}</View>
    </View>
  );
}

export default GlassCard;
