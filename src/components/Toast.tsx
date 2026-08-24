import React, { useEffect, useRef } from 'react';
import { View, Pressable, Animated } from 'react-native';
import { AppText } from './Text';
import { Icon } from './Icon';
import { GLYPH } from '../data/icons';
import { color, radius } from '../theme/tokens';
import type { ToastAction } from '../store/types';

interface ToastProps {
  message: string;
  action?: ToastAction | null;
  top?: number;
}

// The floating dark toast bar — success/info messages, plus the occasional
// action button ("Restock") for stock-out notices.
export function Toast({ message, action, top = 64 }: ToastProps) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (message) {
      anim.setValue(0);
      Animated.timing(anim, { toValue: 1, duration: 220, useNativeDriver: true }).start();
    }
  }, [message]);
  if (!message) return null;
  const iconBg = action ? '#FFD79B' : '#F0DCBE';
  const iconInk = action ? '#7A4A00' : '#44351F';
  return (
    <Animated.View
      pointerEvents="box-none"
      style={{
        position: 'absolute', left: 20, right: 20, top,
        opacity: anim, transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) }],
      }}
    >
      <View style={{ borderRadius: radius.xxxl, padding: 14, paddingHorizontal: 16, backgroundColor: 'rgba(60,46,30,.9)', borderWidth: 1, borderColor: 'rgba(255,255,255,.2)', flexDirection: 'row', alignItems: 'center', gap: 11 }}>
        <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: iconBg, alignItems: 'center', justifyContent: 'center' }}>
          <Icon d={action ? 'M12 7v6M12 17h.01' : GLYPH.check} size={12} color={iconInk} strokeWidth={3.4} />
        </View>
        <AppText style={{ flex: 1, fontSize: 13.5, fontWeight: '700', color: color.white }}>{message}</AppText>
        {action && (
          <Pressable onPress={action.onPick} style={{ height: 32, paddingHorizontal: 13, borderRadius: 12, backgroundColor: 'rgba(255,255,255,.92)', alignItems: 'center', justifyContent: 'center' }}>
            <AppText style={{ fontSize: 12.5, fontWeight: '800', color: color.okInk }}>{action.label}</AppText>
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
}

export default Toast;
