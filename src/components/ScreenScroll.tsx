import React from 'react';
import { ScrollView, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenScrollProps {
  children: React.ReactNode;
  gap?: number;
  contentStyle?: StyleProp<ViewStyle>;
  extraBottom?: number; // extra clearance for a floating checkout bar etc.
}

// Standard scrollable screen body: safe-area-aware top/bottom padding, a
// consistent horizontal inset, and a vertical `gap` between sections —
// matches the `padding:58px 20px 130px; display:flex; flex-direction:column;
// gap:Npx` wrapper repeated at the top of every screen in Stockaz.dc.html
// (the 58px accounted for the design tool's fake status bar; here the real
// safe-area inset does that job instead).
export function ScreenScroll({ children, gap = 16, contentStyle, extraBottom = 0 }: ScreenScrollProps) {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={[{ paddingTop: insets.top + 16, paddingHorizontal: 20, paddingBottom: insets.bottom + 110 + extraBottom, gap }, contentStyle]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

export default ScreenScroll;
