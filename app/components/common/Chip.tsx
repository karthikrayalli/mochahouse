import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { X } from 'lucide-react-native';
import { colors, spacing, radius, fontSizes } from '../../assets/globalStyles/globalStyles';
import Text from './Text';

type ChipProps = {
  label: string;
  onPress?: () => void;
  onRemove?: () => void;
  variant?: 'default' | 'selected' | 'outline';
  style?: object;
};

const Chip: React.FC<ChipProps> = ({
  label,
  onPress,
  onRemove,
  variant = 'default',
  style,
}) => {
  const getChipStyle = () => {
    const styles = [chipStyles.chip];

    if (variant === 'selected') {
      styles.push(chipStyles.selected);
    } else if (variant === 'outline') {
      styles.push(chipStyles.outline);
    }

    if (style) {
      styles.push(style);
    }

    return styles;
  };

  const getTextColor = () => {
    if (variant === 'selected') {
      return '#FFFFFF';
    }
    return colors.text;
  };

  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component
      style={getChipStyle()}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        size="sm"
        weight="medium"
        color={getTextColor()}
        style={chipStyles.text}
      >
        {label}
      </Text>
      {onRemove && (
        <TouchableOpacity onPress={onRemove} style={chipStyles.removeButton}>
          <X size={16} color={variant === 'selected' ? '#FFFFFF' : colors.textMuted} />
        </TouchableOpacity>
      )}
    </Component>
  );
};

export default Chip;

const chipStyles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  selected: {
    backgroundColor: colors.brand,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.brand,
  },
  text: {
    marginRight: spacing.xs,
  },
  removeButton: {
    marginLeft: spacing.xs,
    padding: spacing.xs / 2,
  },
});

