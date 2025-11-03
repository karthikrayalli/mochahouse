import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { colors, spacing } from '../../assets/globalStyles/globalStyles';

type Props = {
  title: string;
  subtitle: string;
  buttonText: string;
  onPress?: () => void;
};

export default function PromoBanner({ title, subtitle, buttonText, onPress }: Props) {
  return (
    <View style={styles.container}>
      {/* Decorative star icons */}
      <View style={styles.starTopLeft}>
        <Text style={styles.starEmoji}>⭐</Text>
      </View>
      <View style={styles.starBottomRight}>
        <Text style={styles.starEmoji}>⭐</Text>
      </View>
      
      {/* First Order Offer Badge */}
      <View style={styles.firstOrderBadge}>
        <Text style={styles.partyEmoji}>🎉</Text>
        <Text style={styles.firstOrderText}>First Order Offer</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Pressable style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.brand,
    marginHorizontal: spacing.xl,
    marginTop: spacing.lg,
    borderRadius: 20,
    padding: spacing.xl,
    minHeight: 200,
    overflow: 'hidden',
    position: 'relative',
  },
  starTopLeft: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  starBottomRight: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  starEmoji: {
    fontSize: 20,
    opacity: 0.6,
  },
  firstOrderBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
  },
  partyEmoji: {
    fontSize: 16,
  },
  firstOrderText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    alignItems: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FEF08A',
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#374151',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 12,
    marginTop: spacing.md,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
