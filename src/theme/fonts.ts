import {
  useFonts,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';

export function useAppFonts() {
  return useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });
}

export const fontFamily: Record<'400' | '500' | '600' | '700' | '800', string> = {
  '400': 'Manrope_400Regular',
  '500': 'Manrope_500Medium',
  '600': 'Manrope_600SemiBold',
  '700': 'Manrope_700Bold',
  '800': 'Manrope_800ExtraBold',
};

export type FontWeightKey = keyof typeof fontFamily;

export function familyForWeight(weight?: number | string): string {
  const key = String(weight ?? '400') as FontWeightKey;
  return fontFamily[key] ?? fontFamily['400'];
}
