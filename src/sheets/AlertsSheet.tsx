import React from 'react';
import { View, Pressable } from 'react-native';
import { Sheet } from '../components/Sheet';
import { AppText } from '../components/Text';
import { useStore } from '../store/useStore';
import { alertsList } from '../store/selectors';
import { color, radius } from '../theme/tokens';

export function AlertsSheet() {
  const store = useStore();
  const catalog = store.currentCatalog();
  const alerts = alertsList(store, catalog);

  return (
    <Sheet visible={store.alerts} edge="top" onClose={() => store.closeAlerts()}>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
        <AppText style={{ fontSize: 21, fontWeight: '800', color: color.ink, letterSpacing: -0.4 }}>Notifications</AppText>
        <AppText style={{ fontSize: 12.5, fontWeight: '700', color: color.accent }}>Mark all read</AppText>
      </View>
      <View style={{ gap: 9 }}>
        {alerts.map((a, i) => (
          <Pressable key={i} onPress={a.onOpen} style={{ borderRadius: radius.xxl, padding: 13, paddingHorizontal: 14, backgroundColor: color.glass7, borderWidth: 1, borderColor: color.hairline, flexDirection: 'row', alignItems: 'flex-start', gap: 11 }}>
            <View style={{ width: 9, height: 9, borderRadius: 4.5, backgroundColor: a.dot, marginTop: 5 }} />
            <View style={{ flex: 1 }}>
              <AppText style={{ fontSize: 13.5, fontWeight: '700', color: color.ink }}>{a.title}</AppText>
              <AppText style={{ fontSize: 11.5, fontWeight: '600', color: color.faint, marginTop: 3 }}>{a.body}</AppText>
            </View>
            <AppText style={{ fontSize: 11, fontWeight: '600', color: color.hairlineOnFaint }}>{a.when}</AppText>
          </Pressable>
        ))}
      </View>
    </Sheet>
  );
}

export default AlertsSheet;
