import React from 'react';
import { View } from 'react-native';
import { ScreenScroll } from '../components/ScreenScroll';
import { BackHeader } from '../components/Header';
import { FormFieldView } from '../components/FormField';
import { PrimaryButton } from '../components/PrimaryButton';
import { useStore } from '../store/useStore';
import { FORMS } from '../data/forms';
import { radius } from '../theme/tokens';

export function FormScreen() {
  const store = useStore();
  const key = store.formKey;
  const cfg = key ? FORMS[key] : undefined;
  if (!cfg) return <ScreenScroll><View /></ScreenScroll>;

  return (
    <ScreenScroll gap={15}>
      <BackHeader title={cfg.title} onBack={() => store.formCancel()} />
      <View style={{ gap: 11 }}>
        {cfg.fields.map((f) => (
          <FormFieldView key={f.k} field={f} value={store.formVals[f.k] ?? ''} onChange={(v) => store.setFormValue(f.k, v)} />
        ))}
      </View>
      <View style={{ flex: 1, minHeight: 20 }} />
      <PrimaryButton label={cfg.submit} height={54} radiusSize={radius.xl} fontSize={16.5} onPress={() => store.submitForm()} />
    </ScreenScroll>
  );
}

export default FormScreen;
