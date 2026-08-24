import React from 'react';
import { View, Pressable, Image, type ImageSourcePropType } from 'react-native';
import { AppText } from './Text';
import { Icon } from './Icon';
import { GLYPH } from '../data/icons';
import { color, radius } from '../theme/tokens';

interface RowProps {
  leading?: React.ReactNode;
  image?: ImageSourcePropType;
  title: string;
  sub?: string;
  trailingTop?: string;
  trailingTopColor?: string;
  trailingBottom?: string;
  badge?: React.ReactNode;
  dot?: string;
  chevron?: boolean;
  divider?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  titleColor?: string;
}

// Generic list row: image/icon thumb + title/sub + right-aligned value or
// badge + optional status dot / chevron. Covers Stock rows, Credit rows,
// Receipts rows, the generic List screens, and More-menu rows.
export function Row({ leading, image, title, sub, trailingTop, trailingTopColor, trailingBottom, badge, dot, chevron, divider = true, onPress, onLongPress, titleColor }: RowProps) {
  const content = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 15, paddingVertical: 13, borderBottomWidth: divider ? 1 : 0, borderBottomColor: color.hairline }}>
      {image ? (
        <View style={{ width: 42, height: 42, borderRadius: radius.sm + 1, backgroundColor: color.glass9, borderWidth: 1, borderColor: color.glass8, overflow: 'hidden', padding: 3 }}>
          <Image source={image} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
        </View>
      ) : (
        leading
      )}
      <View style={{ flex: 1, minWidth: 0 }}>
        <AppText numberOfLines={1} style={{ fontSize: 14, fontWeight: '700', color: titleColor || color.ink, letterSpacing: -0.1 }}>{title}</AppText>
        {!!sub && <AppText numberOfLines={1} style={{ fontSize: 11.5, fontWeight: '600', color: color.faint, marginTop: 2 }}>{sub}</AppText>}
      </View>
      {(trailingTop || badge) && (
        <View style={{ alignItems: 'flex-end' }}>
          {!!trailingTop && <AppText style={{ fontSize: 14.5, fontWeight: '800', color: trailingTopColor || color.ink }}>{trailingTop}</AppText>}
          {!!trailingBottom && <AppText style={{ fontSize: 11.5, fontWeight: '600', color: color.sub2, marginTop: 1 }}>{trailingBottom}</AppText>}
          {badge}
        </View>
      )}
      {!!dot && (
        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: dot }} />
      )}
      {chevron && <Icon d={GLYPH.chevronRight} size={16} color={color.hairlineOnFaint} strokeWidth={2.2} />}
    </View>
  );
  if (!onPress && !onLongPress) return content;
  return (
    <Pressable onPress={onPress} onLongPress={onLongPress}>
      {content}
    </Pressable>
  );
}

export default Row;
