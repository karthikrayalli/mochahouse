import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '../../assets/globalStyles/globalStyles';
import Text from './Text';

type EmptyStateProps = {
  message?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
};

const EmptyState: React.FC<EmptyStateProps> = ({
  message = 'No records found',
  icon,
  action,
}) => {
  return (
    <View style={styles.container}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text variant="body" color={colors.textMuted} style={styles.message}>
        {message}
      </Text>
      {action && <View style={styles.actionContainer}>{action}</View>}
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    minHeight: 200,
  },
  iconContainer: {
    marginBottom: spacing.md,
  },
  message: {
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  actionContainer: {
    marginTop: spacing.md,
  },
});

