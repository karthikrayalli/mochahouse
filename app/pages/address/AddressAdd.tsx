import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radius, spacing } from '../../assets/globalStyles/globalStyles';
import BackButton from '../../components/common/BackButton';

export default function AddressAdd() {
  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Add address details</Text>
      <View style={styles.map} />
      <View style={styles.input}>
        <TextInput placeholder="House No / Flat / Floor" />
      </View>
      <View style={styles.input}>
        <TextInput placeholder="Building & Block No. (Optional)" />
      </View>
      <View style={styles.labels}>
        {['Home', 'Office', 'PG', 'Chill Spot', 'Gym'].map(l => (
          <View key={l} style={styles.chip}><Text>{l}</Text></View>
        ))}
      </View>
      <View style={styles.save}><Text style={{ color: '#fff', fontWeight: '800' }}>Save Address</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface, padding: spacing.xl },
  title: { fontSize: 22, fontWeight: '800', color: colors.text },
  map: { height: 220, backgroundColor: '#E5E7EB', borderRadius: radius.lg, marginTop: spacing.lg },
  input: { height: 52, borderRadius: radius.lg, backgroundColor: '#F3F4F6', paddingHorizontal: spacing.lg, marginTop: spacing.lg, justifyContent: 'center' },
  labels: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.lg },
  chip: { paddingHorizontal: spacing.md, paddingVertical: 8, borderRadius: radius.md, backgroundColor: '#F3F4F6' },
  save: { marginTop: spacing.xl, height: 56, borderRadius: radius.lg, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' },
});


