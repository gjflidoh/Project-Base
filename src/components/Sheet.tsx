import React from 'react';
import { Modal, View, Pressable, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { color, radius, shadow } from '../theme/tokens';

interface SheetProps {
  visible: boolean;
  onClose: () => void;
  edge?: 'bottom' | 'top' | 'center';
  children: React.ReactNode;
  dismissOnBackdrop?: boolean;
  scroll?: boolean;
}

// Modal sheet used for the smaller overlays that sit above whatever screen
// is currently showing: Add product, Restock, Manager approval, Receipt
// detail, Profile, Alerts. (Full-screen flows like Scan/Sale/Onboarding are
// handled as regular screens in RootShell, not sheets.)
export function Sheet({ visible, onClose, edge = 'bottom', children, dismissOnBackdrop = true, scroll = false }: SheetProps) {
  const insets = useSafeAreaInsets();
  const isBottom = edge === 'bottom';
  const isCenter = edge === 'center';
  const Wrapper: React.ComponentType<any> = scroll ? ScrollView : View;

  const justify = isBottom ? 'flex-end' : isCenter ? 'center' : 'flex-start';
  const radii = isCenter
    ? { borderRadius: radius.card }
    : {
        borderTopLeftRadius: isBottom ? radius.sheet : radius.card,
        borderTopRightRadius: isBottom ? radius.sheet : radius.card,
        borderBottomLeftRadius: isBottom ? 44 : radius.huge,
        borderBottomRightRadius: isBottom ? 44 : radius.huge,
      };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <View style={{ flex: 1, justifyContent: justify, padding: isCenter ? 24 : 0 }}>
        <Pressable style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: color.scrim }} onPress={dismissOnBackdrop ? onClose : undefined} />
        <View style={{ overflow: 'hidden', ...radii, ...shadow.sheet }}>
          <BlurView intensity={50} tint="light" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
          <Wrapper
            style={{ backgroundColor: color.sheetSurface }}
            contentContainerStyle={scroll ? { paddingTop: isBottom || isCenter ? 20 : insets.top + 20, paddingBottom: isBottom ? insets.bottom + 20 : 20, paddingHorizontal: 18 } : undefined}
          >
            <View style={!scroll ? { padding: 18, paddingTop: isBottom || isCenter ? 18 : insets.top + 18, paddingBottom: isBottom ? insets.bottom + 18 : 18 } : undefined}>
              {children}
            </View>
          </Wrapper>
        </View>
      </View>
    </Modal>
  );
}

export default Sheet;
