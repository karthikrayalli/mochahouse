import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import BackButton from '../../components/common/BackButton';
import { colors, radius, spacing } from '../../assets/globalStyles/globalStyles';

export default function ProductDetails() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <BackButton />
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1533777324565-a040eb52fac1?q=80&w=1600' }}
          style={styles.image}
        />
        <View style={{ padding: spacing.xl }}>
          <Text style={styles.title}>Peri Peri Potato Wedges</Text>
          <Text style={styles.price}>₹129</Text>
          <Text style={styles.sectionTitle}>About the product</Text>
          <Text style={styles.desc}>
            Potato fries, but chunkier and fiery. Crispy outside, tasty inside. Served with two
            flavourful dips.
          </Text>
        </View>
      </ScrollView>
      <View style={styles.ctaWrap}>
        <Pressable style={styles.cta}>
          <Text style={styles.ctaText}>View Cart →</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: { width: '100%', height: 280 },
  title: { fontSize: 22, fontWeight: '800', color: colors.text },
  price: { marginTop: 6, fontSize: 18, fontWeight: '700' },
  sectionTitle: { marginTop: spacing.xl, fontSize: 18, fontWeight: '700' },
  desc: { marginTop: spacing.sm, color: colors.textMuted, lineHeight: 20 },
  ctaWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: spacing.xl,
    backgroundColor: 'rgba(255,255,255,0.9)'
  },
  cta: {
    height: 56,
    borderRadius: radius.lg,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: { color: colors.surface, fontWeight: '800' },
});


