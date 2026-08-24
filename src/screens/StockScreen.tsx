import React from 'react';
import { View } from 'react-native';
import { AppText } from '../components/Text';
import { ScreenScroll } from '../components/ScreenScroll';
import { ScreenTitle } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { StatGrid } from '../components/StatGrid';
import { PrimaryButton } from '../components/PrimaryButton';
import { GlassCard } from '../components/GlassCard';
import { Row } from '../components/Row';
import { Icon } from '../components/Icon';
import { GLYPH } from '../data/icons';
import { useStore } from '../store/useStore';
import { stockList, stockStats } from '../store/selectors';
import { productImage } from '../data/images';
import { color } from '../theme/tokens';

export function StockScreen() {
  const store = useStore();
  const catalog = store.currentCatalog();
  const stats = stockStats(catalog);
  const rows = stockList(store, catalog);

  return (
    <ScreenScroll>
      <ScreenTitle title="Stock" />
      <SearchBar placeholder="Search products..." value={store.query} onChangeText={(v) => store.patch({ query: v })} onScanPress={() => store.openScan()} />
      <StatGrid
        columns={2}
        stats={[
          { value: stats.count, label: 'Products' },
          { value: stats.low, label: 'Low Stock', color: '#B96B0A' },
          { value: stats.out, label: 'Out of Stock', color: '#C0332F' },
          { value: stats.value, label: 'Stock Value', color: color.accent },
        ]}
      />
      <PrimaryButton
        label="Add product"
        height={48}
        radiusSize={18}
        fontSize={14.5}
        onPress={() => store.openAdd()}
        icon={<Icon d={GLYPH.plus} size={17} color={color.white} strokeWidth={2.4} />}
      />
      <GlassCard style={{ overflow: 'hidden' }}>
        {rows.map((p, i) => (
          <Row
            key={p.name}
            image={productImage(p.img)}
            title={p.name}
            sub={p.cat}
            trailingTop={String(p.qty)}
            trailingBottom={p.priceLabel}
            dot={p.dot}
            divider={i < rows.length - 1}
            onPress={() => (p.outOfStock ? store.askRestock(p) : store.sellNow(p))}
            onLongPress={p.outOfStock ? () => store.openRestock({ name: p.name, short: p.short, img: p.img, cat: p.cat }) : undefined}
          />
        ))}
        {rows.length === 0 && (
          <View style={{ padding: 20 }}>
            <AppText style={{ fontSize: 13, fontWeight: '600', color: color.faint }}>No products match “{store.query}”.</AppText>
          </View>
        )}
      </GlassCard>
    </ScreenScroll>
  );
}

export default StockScreen;
