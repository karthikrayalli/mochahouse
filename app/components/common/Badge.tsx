import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors, spacing, radius, fontSizes } from '../../assets/globalStyles/globalStyles';
import Text from './Text';

type BadgeProps = {
  label: string;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'default';
  size?: 'small' | 'medium';
  style?: ViewStyle;
  textStyle?: object;
};

const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  size = 'medium',
  style,
  textStyle,
}) => {
  const getBadgeStyle = (): ViewStyle[] => {
    const styles: ViewStyle[] = [badgeStyles.badge, badgeStyles[size] as ViewStyle];

    if (variant === 'primary') {
      styles.push(badgeStyles.primary as ViewStyle);
    } else if (variant === 'success') {
      styles.push(badgeStyles.success as ViewStyle);
    } else if (variant === 'warning') {
      styles.push(badgeStyles.warning as ViewStyle);
    } else if (variant === 'danger') {
      styles.push(badgeStyles.danger as ViewStyle);
    }

    if (style) {
      styles.push(style);
    }

    return styles;
  };

  const getTextColor = () => {
    if (variant === 'primary' || variant === 'success' || variant === 'danger') {
      return '#FFFFFF';
    }
    return colors.text;
  };

  return (
    <View style={getBadgeStyle()}>
      <Text
        size={size === 'small' ? 'xs' : 'sm'}
        weight="semibold"
        color={getTextColor()}
        style={textStyle}
      >
        {label}
      </Text>
    </View>
  );
};

export default Badge;

const badgeStyles = StyleSheet.create({
  badge: {
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    alignSelf: 'flex-start',
  },
  small: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
  },
  medium: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  primary: {
    backgroundColor: colors.brand,
  },
  success: {
    backgroundColor: colors.brand,
  },
  warning: {
    backgroundColor: '#FCD34D',
  },
  danger: {
    backgroundColor: colors.danger,
  },
  default: {
    backgroundColor: '#F3F4F6',
  },
});
