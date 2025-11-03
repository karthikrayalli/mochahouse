import React, { useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors, radius, spacing, fontSizes } from '../../assets/globalStyles/globalStyles';

type Props = {
  length?: number;
  value: string;
  onChange: (value: string) => void;
};

export default function OtpInput({ length = 6, value, onChange }: Props) {
  const inputs = useRef<(TextInput | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleChange = (text: string, index: number) => {
    // Only allow digits
    const digit = text.replace(/\D/g, '');
    if (digit.length > 1) return;

    // Update value
    const newValue = value.split('');
    newValue[index] = digit;
    const updatedValue = newValue.join('').slice(0, length);
    onChange(updatedValue);

    // Auto-focus next input
    if (digit && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputs.current[index] = ref;
          }}
          style={[
            styles.input,
            focusedIndex === index && styles.inputFocused,
            value[index] && styles.inputFilled,
          ]}
          value={value[index] || ''}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          onFocus={() => setFocusedIndex(index)}
          onBlur={() => setFocusedIndex(null)}
          keyboardType="number-pad"
          maxLength={1}
          selectTextOnFocus
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    // borderWidth: 0,
    backgroundColor: colors.backgroundSecondary,
    textAlign: 'center',
    fontSize: fontSizes.xl,
    fontWeight: '700',
    color: colors.text,
  },
  inputFocused: {
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 0,
  },
  inputFilled: {
    backgroundColor: colors.backgroundSecondary,
  },
});
