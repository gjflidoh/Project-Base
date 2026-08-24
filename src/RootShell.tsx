import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ScreenRoot } from './components/Background';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { useStore } from './store/useStore';
import type { Screen } from './store/types';
import { LISTS, type ListKey } from './data/lists';

import { HomeScreen } from './screens/HomeScreen';
import { StockScreen } from './screens/StockScreen';
import { ReceiptsScreen } from './screens/ReceiptsScreen';
import { MoreScreen } from './screens/MoreScreen';
import { MonitorScreen } from './screens/MonitorScreen';
import { SaleScreen } from './screens/SaleScreen';
import { ScanScreen } from './screens/ScanScreen';
import { CreditScreen } from './screens/CreditScreen';
import { CreditDetailScreen } from './screens/CreditDetailScreen';
import { AddCreditScreen } from './screens/AddCreditScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { ReportsScreen } from './screens/ReportsScreen';
import { SubscriptionScreen } from './screens/SubscriptionScreen';
import { AccountScreen } from './screens/AccountScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { ListScreen } from './screens/ListScreen';
import { DetailScreen } from './screens/DetailScreen';
import { FormScreen } from './screens/FormScreen';

import { QuickSellSheet } from './sheets/QuickSellSheet';
import { NumpadSheet } from './sheets/NumpadSheet';
import { AddProductSheet } from './sheets/AddProductSheet';
import { RestockSheet } from './sheets/RestockSheet';
import { ApprovalSheet } from './sheets/ApprovalSheet';
import { ReceiptSheet } from './sheets/ReceiptSheet';
import { ProfileSheet } from './sheets/ProfileSheet';
import { AlertsSheet } from './sheets/AlertsSheet';

// Full-screen flows that draw their own chrome (no floating bottom nav).
const NO_NAV: Screen[] = ['scan', 'sale', 'onb', 'form', 'addCredit'];

function ActiveScreen({ screen }: { screen: Screen }) {
  if (screen in LISTS) return <ListScreen listKey={screen as ListKey} />;
  switch (screen) {
    case 'home': return <HomeScreen />;
    case 'stock': return <StockScreen />;
    case 'receipts': return <ReceiptsScreen />;
    case 'more': return <MoreScreen />;
    case 'monitor': return <MonitorScreen />;
    case 'sale': return <SaleScreen />;
    case 'scan': return <ScanScreen />;
    case 'credit': return <CreditScreen />;
    case 'creditDetail': return <CreditDetailScreen />;
    case 'addCredit': return <AddCreditScreen />;
    case 'settings': return <SettingsScreen />;
    case 'reports': return <ReportsScreen />;
    case 'subscription': return <SubscriptionScreen />;
    case 'account': return <AccountScreen />;
    case 'onb': return <OnboardingScreen />;
    case 'form': return <FormScreen />;
    case 'detail': return <DetailScreen />;
    default: return <HomeScreen />;
  }
}

// The app's single top-level shell: swaps the active screen off
// `store.screen`, layers the floating bottom nav + FAB on screens that want
// it, and mounts every sheet/modal once so they can show themselves off
// their own store flags (mirrors the `sc-if` overlay stack in the source
// design — each screen/sheet decides its own visibility from state).
export function RootShell() {
  const store = useStore();
  const showNav = !NO_NAV.includes(store.screen);
  const isDark = store.screen === 'scan' || store.dark;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScreenRoot>
        <ActiveScreen screen={store.screen} />
        {showNav && <BottomNav />}
        <Toast message={store.toast} action={store.toastAction} />
      </ScreenRoot>

      <QuickSellSheet />
      <NumpadSheet />
      <AddProductSheet />
      <RestockSheet />
      <ApprovalSheet />
      <ReceiptSheet />
      <ProfileSheet />
      <AlertsSheet />
    </View>
  );
}

export default RootShell;
