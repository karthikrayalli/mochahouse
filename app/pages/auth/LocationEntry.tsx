import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing, radius, fontSizes, shadows } from '../../assets/globalStyles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MapPin, DollarSign, ArrowRight } from 'lucide-react-native';
import { Text, Button, TextInput } from '../../components/common';
import BackButton from '../../components/common/BackButton';

export default function LocationEntry() {
  const nav = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [location, setLocation] = useState('');

  const handleContinue = () => {
    if (location.trim()) {
      nav.navigate('Login');
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <BackButton color={colors.textLight} backgroundColor={colors.overlayLight} />
      
      {/* Brand Section */}
      <View style={styles.brandSection}>
        <View style={styles.brandIcon}>
          <Text style={styles.brandIconEmoji}>⚡</Text>
        </View>
        <Text titletxt="Swish" variant="heading" color={colors.textLight} txtStyle={styles.brandName} />
        <Text titletxt="Food in 10 minutes" variant="body" color={colors.textLight} txtStyle={styles.brandTagline} />
      </View>

      <View style={styles.card}>
        <Text titletxt="Enter your location" variant="heading" txtStyle={styles.title} />
        <Text 
          titletxt="We'll check if we deliver to your area" 
          variant="body" 
          color={colors.textMuted} 
          txtStyle={styles.subtitle} 
        />

        {/* Location Input */}
        <TextInput
          placeholder="Enter your area or apartment name"
          value={location}
          onChangeText={setLocation}
          leftIcon={<MapPin size={20} color={colors.textMuted} />}
          inputContainerStyle={styles.locationInputContainer}
        />

        {/* Continue Button */}
        <Button
          title="Continue"
          onPress={handleContinue}
          disabled={!location.trim()}
          fullWidth
          rightIcon={<ArrowRight size={20} color={colors.textLight} />}
          style={styles.button}
        />

        {/* Features List */}
        <View style={styles.features}>
          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureEmoji}>⚡</Text>
            </View>
            <View style={styles.featureText}>
              <Text titletxt="10-minute delivery" variant="body" weight="bold" txtStyle={styles.featureTitle} />
              <Text titletxt="Lightning fast service" variant="caption" txtStyle={styles.featureSubtitle} />
            </View>
          </View>

          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureEmoji}>🍕</Text>
            </View>
            <View style={styles.featureText}>
              <Text titletxt="Fresh snacks & beverages" variant="body" weight="bold" txtStyle={styles.featureTitle} />
              <Text titletxt="Wide variety of choices" variant="caption" txtStyle={styles.featureSubtitle} />
            </View>
          </View>

          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <DollarSign size={24} color={colors.warning} />
            </View>
            <View style={styles.featureText}>
              <Text titletxt="Best prices" variant="body" weight="bold" txtStyle={styles.featureTitle} />
              <Text titletxt="Great deals every day" variant="caption" txtStyle={styles.featureSubtitle} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.brand,
    padding: spacing.xl,
  },
  brandSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  brandIcon: {
    width: 80,
    height: 80,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  brandIconEmoji: {
    fontSize: fontSizes.xxxl,
  },
  brandName: {
    marginBottom: spacing.xs,
  },
  brandTagline: {
    opacity: 0.9,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    ...shadows.card,
  },
  title: {
    marginBottom: spacing.sm,
  },
  subtitle: {
    marginBottom: spacing.xl,
  },
  locationInputContainer: {
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 0,
    marginBottom: spacing.xl,
  },
  button: {
    marginBottom: spacing.xl,
  },
  features: {
    gap: spacing.lg,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    backgroundColor: colors.warningLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureEmoji: {
    fontSize: fontSizes.xl,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    marginBottom: spacing.xs / 2,
  },
  featureSubtitle: {},
});
