import React from 'react';
import { Text as RNText, type TextProps, type TextStyle, StyleSheet } from 'react-native';
import { familyForWeight } from '../theme/fonts';
import { color } from '../theme/tokens';

// Manrope ships as separate font families per weight (Expo Google Fonts),
// so `fontWeight` in style has to be translated into `fontFamily` — this
// wrapper does that translation everywhere so screens can just write
// normal-looking text styles (fontSize/fontWeight/color/letterSpacing).
export function AppText({ style, ...rest }: TextProps) {
  const flat = StyleSheet.flatten(style) as TextStyle | undefined;
  const family = familyForWeight(flat?.fontWeight as any);
  const { fontWeight, ...restStyle } = flat || {};
  return (
    <RNText
      {...rest}
      style={[{ fontFamily: family, color: color.ink }, restStyle]}
    />
  );
}

export default AppText;
