import React, { memo } from 'react';
import { StyleSheet, ActivityIndicator, View, Pressable, Text } from 'react-native';
import { colors, spacing, radius, fontSizes } from '../../assets/globalStyles/globalStyles';

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: object;
  textStyle?: object;
};

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size]];
    
    if (variant === 'primary') {
      baseStyle.push(styles.primary);
    } else if (variant === 'secondary') {
      baseStyle.push(styles.secondary);
    } else if (variant === 'outline') {
      baseStyle.push(styles.outline);
    }
    
    if (disabled || loading) {
      baseStyle.push(styles.disabled);
    }
    
    if (fullWidth) {
      baseStyle.push(styles.fullWidth);
    }
    
    if (style) {
      baseStyle.push(style);
    }
    
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseTextStyle = [styles.text, styles[`${size}Text`]];
    
    if (variant === 'outline') {
      baseTextStyle.push(styles.outlineText);
    }
    
    if (disabled || loading) {
      baseTextStyle.push(styles.disabledText);
    }
    
    if (textStyle) {
      baseTextStyle.push(textStyle);
    }
    
    return baseTextStyle;
  };

  return (
    <Pressable
      disabled={disabled || loading}
      style={getButtonStyle()}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? colors.brand : '#FFFFFF'} size="small" />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <Text style={getTextStyle()}>{title}</Text>
          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </View>
      )}
    </Pressable>
  );
};

export default memo(Button);

const styles = StyleSheet.create({
  button: {
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.brand,
  },
  secondary: {
    backgroundColor: colors.textMuted,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.brand,
  },
  disabled: {
    backgroundColor: '#D1D5DB',
    opacity: 0.6,
  },
  fullWidth: {
    width: '100%',
    alignSelf: 'stretch',
  },
  small: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  medium: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  large: {
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.lg,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
  },
  smallText: {
    fontSize: fontSizes.sm,
  },
  mediumText: {
    fontSize: fontSizes.md,
  },
  largeText: {
    fontSize: fontSizes.lg,
  },
  outlineText: {
    color: colors.brand,
  },
  disabledText: {
    color: colors.textMuted,
  },
  leftIcon: {
    marginRight: spacing.xs,
  },
  rightIcon: {
    marginLeft: spacing.xs,
  },
});

