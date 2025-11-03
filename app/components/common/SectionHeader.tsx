import React, { memo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Edit } from 'lucide-react-native';
import { colors, spacing, fontSizes } from '../../assets/globalStyles/globalStyles';
import Text from './Text';

type SectionHeaderProps = {
  title: string;
  onEdit?: () => void;
  action?: React.ReactNode;
  style?: object;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  onEdit,
  action,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text variant="subheading" weight="semibold">
        {title}
      </Text>
      {onEdit && (
        <TouchableOpacity
          onPress={onEdit}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Edit size={18} color={colors.brand} />
        </TouchableOpacity>
      )}
      {action && <View>{action}</View>}
    </View>
  );
};

export default memo(SectionHeader);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
});

