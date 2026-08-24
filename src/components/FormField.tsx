import React from 'react';
import { View, TextInput } from 'react-native';
import { AppText } from './Text';
import { GlassCard } from './GlassCard';
import { Chip } from './Chip';
import { color } from '../theme/tokens';
import { fontFamily } from '../theme/fonts';
import type { FormField as FormFieldConfig } from '../data/forms';

interface FormFieldViewProps {
  field: FormFieldConfig;
  value: string;
  onChange: (v: string) => void;
}

// One field of the generic Form screen (and reused by onboarding-style
// inputs): either a labelled text/money input, or a wrap of option chips.
export function FormFieldView({ field, value, onChange }: FormFieldViewProps) {
  const current = value || field.def || '';
  return (
    <GlassCard style={{ padding: 15 }} elevated>
      <AppText style={{ fontSize: 11, fontWeight: '800', letterSpacing: 1.4, color: color.faint }}>{field.label}</AppText>
      {field.opts ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginTop: 10 }}>
          {field.opts.map((o) => (
            <Chip key={o} label={o} selected={current === o} onPress={() => onChange(o)} />
          ))}
        </View>
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 5, marginTop: 8 }}>
          {field.money && <AppText style={{ fontSize: 16, fontWeight: '800', color: color.sub2 }}>K</AppText>}
          <TextInput
            placeholder={field.ph}
            placeholderTextColor={color.faint2}
            value={value}
            onChangeText={onChange}
            keyboardType={field.money ? 'decimal-pad' : 'default'}
            style={{ flex: 1, fontFamily: fontFamily['700'], fontSize: 16, color: color.ink, padding: 0 }}
          />
        </View>
      )}
    </GlassCard>
  );
}

export default FormFieldView;
