import React from 'react';
import { View, Pressable } from 'react-native';
import { AppText } from './Text';
import { color, radius } from '../theme/tokens';

// Shared 3-column key grid used by both the cash numpad and the manager
// approval PIN pad.
export function Keypad({ keys, onPress, keyHeight = 52, fontSize = 20 }: { keys: string[]; onPress: (k: string) => void; keyHeight?: number; fontSize?: number }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      {keys.map((k, i) => (
        <Pressable
          key={i}
          onPress={() => k && onPress(k)}
          disabled={!k}
          style={{
            width: '31.4%', height: keyHeight, borderRadius: radius.xl - 1,
            backgroundColor: k ? color.glass85 : 'transparent', borderWidth: k ? 1 : 0, borderColor: color.hairline2,
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <AppText style={{ fontSize, fontWeight: '800', color: color.ink }}>{k}</AppText>
        </Pressable>
      ))}
    </View>
  );
}

export default Keypad;
