import React from 'react';
import { View, Pressable, Image } from 'react-native';
import { AppText } from './Text';
import { Icon } from './Icon';
import { GLYPH } from '../data/icons';
import { productImage } from '../data/images';
import { color, radius } from '../theme/tokens';
import type { Decorated, PickerItem } from '../store/selectors';

interface ProductTileProps {
  product: Decorated | PickerItem;
  onPress: () => void;
  onLongPress?: () => void;
  onRemove?: () => void;
  compact?: boolean; // Quick Add / onboarding scale-down variant
}

// The square product tile with packshot, name, price + stock-left caption —
// used in the Home quick-sell grid, Stock's Add sheet, the POS/Quick Sell
// picker grid (with cart-qty badge + remove button) and Quick Add rows.
export function ProductTile({ product, onPress, onLongPress, onRemove, compact }: ProductTileProps) {
  const inCart = 'qtyInCart' in product ? product.qtyInCart : 0;
  const highlighted = inCart > 0;
  return (
    <View
      style={{
        position: 'relative',
        borderRadius: compact ? radius.lg - 1 : radius.xxl,
        padding: compact ? 10 : 11,
        paddingBottom: 12,
        backgroundColor: product.outOfStock ? color.disabledFill : highlighted ? color.accentSoft : color.glass6,
        borderWidth: 1,
        borderColor: product.outOfStock ? color.hairline2 : highlighted ? color.accentBorder : color.glassBorder,
        alignItems: 'center',
        gap: 8,
      }}
    >
      {highlighted && (
        <View style={{ position: 'absolute', top: 7, right: 7, minWidth: 22, height: 22, paddingHorizontal: 6, borderRadius: 11, backgroundColor: '#7A5F3C', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
          <AppText style={{ color: color.white, fontSize: 12, fontWeight: '800' }}>{inCart}</AppText>
        </View>
      )}
      {highlighted && onRemove && (
        <Pressable
          onPress={onRemove}
          style={{ position: 'absolute', top: 7, left: 7, width: 24, height: 24, borderRadius: 12, backgroundColor: color.glass94, borderWidth: 1, borderColor: color.hairline2, alignItems: 'center', justifyContent: 'center', zIndex: 2 }}
        >
          <Icon d={GLYPH.minus} size={12} color={color.ink} strokeWidth={3} />
        </Pressable>
      )}
      <Pressable
        onPress={product.disabled ? undefined : onPress}
        onLongPress={onLongPress}
        disabled={product.disabled && !onLongPress}
        style={{ opacity: product.disabled ? 0.45 : 1, alignItems: 'center', gap: 8, width: '100%' }}
      >
        <View style={{ width: '100%', aspectRatio: 1, borderRadius: radius.md + 1, backgroundColor: color.productMat, borderWidth: 1, borderColor: color.glass8, overflow: 'hidden', padding: 5 }}>
          <Image source={productImage(product.img)} style={[{ width: '100%', height: '100%' }, product.outOfStock && { opacity: 0.4 }]} resizeMode="contain" />
        </View>
        <AppText numberOfLines={2} style={{ fontSize: 12.5, fontWeight: '700', color: color.ink, textAlign: 'center', lineHeight: 15 }}>{product.short}</AppText>
        {!compact && (
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 5, flexWrap: 'wrap', justifyContent: 'center' }}>
            <AppText style={{ fontSize: 11.5, fontWeight: '700', color: color.accent }}>{product.priceLabel}</AppText>
            <AppText style={{ fontSize: 10.5, fontWeight: '600', color: product.leftColor }}>{product.leftLabel}</AppText>
          </View>
        )}
      </Pressable>
    </View>
  );
}

export default ProductTile;
