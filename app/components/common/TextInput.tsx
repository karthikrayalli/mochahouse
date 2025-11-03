import React, { memo } from 'react';
import { StyleSheet, TextInput as RNTextInput, TextInputProps as RNTextInputProps, View, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, radius, fontSizes } from '../../assets/globalStyles/globalStyles';
import Text from './Text';

type TextInputProps = RNTextInputProps & {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
};

const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  inputContainerStyle,
  labelStyle,
  errorStyle,
  style,
  placeholderTextColor,
  ...props
}) => {
  const hasIcon = leftIcon || rightIcon;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text variant="label" style={[styles.label, labelStyle]}>
          {label}
        </Text>
      )}
      
      <View style={[
        styles.inputContainer,
        hasIcon && styles.inputContainerWithIcon,
        error && styles.inputContainerError,
        inputContainerStyle,
      ].filter(Boolean) as ViewStyle[]}>
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            {leftIcon}
          </View>
        )}
        
        <RNTextInput
          {...props}
          style={[
            styles.input,
            hasIcon && styles.inputWithIcon,
            style,
          ].filter(Boolean) as TextStyle[]}
          placeholderTextColor={placeholderTextColor || colors.textMuted}
          allowFontScaling={false}
        />
        
        {rightIcon && (
          <View style={styles.rightIconContainer}>
            {rightIcon}
          </View>
        )}
      </View>

      {error && (
        <Text variant="caption" color={colors.danger} style={[styles.error, errorStyle]}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default memo(TextInput);

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    marginBottom: spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    minHeight: 48,
  },
  inputContainerWithIcon: {
    paddingHorizontal: spacing.sm,
  },
  inputContainerError: {
    borderColor: colors.danger,
  },
  input: {
    flex: 1,
    fontSize: fontSizes.md,
    color: colors.text,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  inputWithIcon: {
    paddingHorizontal: spacing.sm,
  },
  leftIconContainer: {
    marginRight: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconContainer: {
    marginLeft: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    marginTop: spacing.xs,
  },
});

