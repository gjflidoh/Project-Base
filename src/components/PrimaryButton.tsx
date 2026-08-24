import React from 'react';
import { Pressable, type StyleProp, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AppText } from './Text';
import { gradient, radius, shadow, color } from '../theme/tokens';

interface PrimaryButtonProps {
  label: string;
  onPress?: () => void;
  height?: number;
  radiusSize?: number;
  fontSize?: number;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  icon?: React.ReactNode;
}

// The camel-brown gradient CTA used for Checkout / Confirm Credit / Continue
// / Save etc. throughout the app.
export function PrimaryButton({ label, onPress, height = 54, radiusSize = radius.xl, fontSize = 16.5, style, disabled, icon }: PrimaryButtonProps) {
  return (
    <Pressable onPress={disabled ? undefined : onPress} style={({ pressed }) => [{ opacity: disabled ? 0.5 : pressed ? 0.9 : 1 }, shadow.button, style]}>
      <LinearGradient
        colors={gradient.primary.colors as unknown as [string, string]}
        start={gradient.primary.start}
        end={gradient.primary.end}
        style={{ height, borderRadius: radiusSize, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, paddingHorizontal: 20 }}
      >
        {icon}
        <AppText style={{ color: color.white, fontSize, fontWeight: '800', letterSpacing: -0.2 }}>{label}</AppText>
      </LinearGradient>
    </Pressable>
  );
}

export default PrimaryButton;
