import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { colors, radius, spacing } from '../../assets/globalStyles/globalStyles';
import BackButton from '../../components/common/BackButton';

export default function AddressSelect() {
  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Select a location</Text>
      <View style={styles.search} />
      <Text style={styles.subtitle}>Current location</Text>
      <View style={styles.card}>
        <MapPin size={18} color={colors.brand} />
        <Text style={{ marginLeft: 8 }}>Use current location</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface, padding: spacing.xl },
  title: { fontSize: 22, fontWeight: '800', color: colors.text },
  search: { height: 48, backgroundColor: '#F3F4F6', marginTop: spacing.lg, borderRadius: radius.lg },
  subtitle: { marginTop: spacing.xl, fontWeight: '700', color: colors.textMuted },
  card: { marginTop: spacing.md, backgroundColor: '#F9FAFB', height: 64, borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', paddingHorizontal: spacing.lg },
});


