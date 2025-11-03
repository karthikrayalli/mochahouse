import React, { memo } from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet, TextStyle } from 'react-native';
import { colors, fontSizes } from '../../assets/globalStyles/globalStyles';

type TextProps = RNTextProps & {
  titletxt?: string | number; // Simplified API - text content as prop
  variant?: 'heading' | 'subheading' | 'body' | 'caption' | 'label';
  color?: string;
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  txtStyle?: TextStyle; // Simplified API - style as prop
};

const Text: React.FC<TextProps> = ({
  children,
  titletxt, // Support both APIs
  variant,
  color,
  weight,
  size,
  style,
  txtStyle, // Support both APIs
  ...props
}) => {
  // Use titletxt if provided, otherwise use children
  const textContent = titletxt !== undefined ? String(titletxt) : children;
  
  // Use txtStyle if provided, otherwise use style
  const customStyle = txtStyle || style;

  const getTextStyle = (): TextStyle[] => {
    const styles: TextStyle[] = [baseStyles.text];

    // Variant-based styles
    if (variant === 'heading') {
      styles.push(baseStyles.heading);
    } else if (variant === 'subheading') {
      styles.push(baseStyles.subheading);
    } else if (variant === 'body') {
      styles.push(baseStyles.body);
    } else if (variant === 'caption') {
      styles.push(baseStyles.caption);
    } else if (variant === 'label') {
      styles.push(baseStyles.label);
    }

    // Size override
    if (size) {
      styles.push({ fontSize: fontSizes[size] });
    }

    // Color override
    if (color) {
      styles.push({ color });
    }

    // Weight
    if (weight === 'medium') {
      styles.push({ fontWeight: '500' });
    } else if (weight === 'semibold') {
      styles.push({ fontWeight: '600' });
    } else if (weight === 'bold') {
      styles.push({ fontWeight: '700' });
    }

    if (customStyle) {
      styles.push(customStyle as TextStyle);
    }

    return styles;
  };

  return (
    <RNText
      allowFontScaling={false}
      style={getTextStyle()}
      {...props}
    >
      {textContent}
    </RNText>
  );
};

export default memo(Text);

const baseStyles = StyleSheet.create({
  text: {
    includeFontPadding: false,
    color: colors.text,
  },
  heading: {
    fontSize: fontSizes.xxl,
    fontWeight: '800',
    color: colors.text,
    includeFontPadding: false,
  },
  subheading: {
    fontSize: fontSizes.xl,
    fontWeight: '700',
    color: colors.text,
    includeFontPadding: false,
  },
  body: {
    fontSize: fontSizes.md,
    fontWeight: '400',
    color: colors.text,
    includeFontPadding: false,
  },
  caption: {
    fontSize: fontSizes.sm,
    fontWeight: '400',
    color: colors.textMuted,
    includeFontPadding: false,
  },
  label: {
    fontSize: fontSizes.sm,
    fontWeight: '600',
    color: colors.text,
    includeFontPadding: false,
  },
});
