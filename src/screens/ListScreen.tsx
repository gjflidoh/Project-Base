import React from 'react';
import { View, Pressable } from 'react-native';
import { AppText } from '../components/Text';
import { ScreenScroll } from '../components/ScreenScroll';
import { ScreenTitle } from '../components/Header';
import { StatGrid } from '../components/StatGrid';
import { SegmentedTabs } from '../components/SegmentedTabs';
import { GlassCard } from '../components/GlassCard';
import { Row } from '../components/Row';
import { Badge } from '../components/Badge';
import { Icon } from '../components/Icon';
import { GLYPH } from '../data/icons';
import { useStore } from '../store/useStore';
import { filteredListRows, listStats } from '../store/selectors';
import { LISTS, type ListKey } from '../data/lists';
import { color } from '../theme/tokens';

function initialOf(title: string) {
  return title.replace(/^[A-Z]+-\d+ · /, '')[0] || '?';
}

export function ListScreen({ listKey }: { listKey: ListKey }) {
  const store = useStore();
  const cfg = LISTS[listKey];
  const rows = filteredListRows(store, listKey);
  const stats = listStats(listKey, rows);
  const chip = store.listFilter && cfg.chips?.includes(store.listFilter) ? store.listFilter : 'All';

  return (
    <ScreenScroll>
      <ScreenTitle
        title={cfg.title}
        action={
          cfg.action && (
            <Pressable onPress={() => store.openForm(listKey, listKey)} style={{ height: 34, paddingHorizontal: 13, borderRadius: 13, backgroundColor: 'rgba(149,119,80,.12)', borderWidth: 1, borderColor: color.accentBorder, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Icon d={GLYPH.plus} size={14} color={color.accent} strokeWidth={2.6} />
              <AppText style={{ fontSize: 12.5, fontWeight: '800', color: color.accent }}>{cfg.action}</AppText>
            </Pressable>
          )
        }
      />

      {stats.length > 0 && <StatGrid columns={3} stats={stats} />}

      {cfg.chips && <SegmentedTabs options={cfg.chips} value={chip} onChange={(v) => store.patch({ listFilter: v })} />}

      <GlassCard style={{ overflow: 'hidden' }}>
        {rows.map((r, i) => (
          <Row
            key={r.title + i}
            leading={
              r.avatar ? (
                <View style={{ width: 38, height: 38, borderRadius: 13, backgroundColor: 'rgba(149,119,80,.1)', alignItems: 'center', justifyContent: 'center' }}>
                  <AppText style={{ fontSize: 13.5, fontWeight: '800', color: color.accent }}>{initialOf(r.title)}</AppText>
                </View>
              ) : undefined
            }
            title={r.title}
            sub={r.sub}
            trailingTop={r.value}
            trailingTopColor={r.tone === 'bad' ? color.dangerInk : color.ink}
            badge={r.badge ? <Badge label={r.badge} tone={r.tone} /> : undefined}
            divider={i < rows.length - 1}
            onPress={() => store.openDetail(listKey, r)}
          />
        ))}
        {rows.length === 0 && (
          <View style={{ padding: 20 }}>
            <AppText style={{ fontSize: 13, fontWeight: '600', color: color.faint }}>Nothing here yet.</AppText>
          </View>
        )}
      </GlassCard>

      <AppText style={{ fontSize: 11.5, lineHeight: 17, fontWeight: '600', color: color.faint, paddingHorizontal: 4 }}>{cfg.foot}</AppText>
    </ScreenScroll>
  );
}

export default ListScreen;
