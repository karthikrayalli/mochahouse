import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../../assets/globalStyles/globalStyles';
import BackButton from '../../components/common/BackButton';

export default function Cart() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      <ScrollView contentContainerStyle={{ padding: spacing.xl }}>
        <BackButton />
        <Text style={styles.title}>Order confirmation</Text>
        <View style={styles.banner}><Text style={{ color: colors.brand }}>Delivery in 10 minutes</Text></View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Billing details</Text>
          <Row label="Subtotal" value="₹104" />
          <Row label="Delivery" value="Free" />
          <Row label="Taxes" value="₹5" />
          <Row label="Total" value="₹109" bold />
        </View>
        <View style={styles.addressSel}>
          <Text style={styles.addrTitle}>Select delivery address</Text>
        </View>
      </ScrollView>
      <View style={styles.payWrap}>
        <Pressable style={styles.payBtn}>
          <Text style={styles.payText}>Pay ₹109</Text>
        </Pressable>
      </View>
    </View>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, bold && { fontWeight: '800' }]}>{label}</Text>
      <Text style={[styles.rowValue, bold && { fontWeight: '800' }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '800', color: colors.text },
  banner: {
    backgroundColor: '#ECFDF5',
    padding: spacing.md,
    borderRadius: radius.md,
    marginTop: spacing.md,
  },
  card: {
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: '#F9FAFB',
  },
  cardTitle: { fontWeight: '700', marginBottom: spacing.md, color: colors.text },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm },
  rowLabel: { color: colors.textMuted },
  rowValue: { color: colors.text },
  addressSel: {
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: '#F9FAFB',
  },
  addrTitle: { fontWeight: '700', color: colors.text },
  payWrap: {
    position: 'absolute', left: 0, right: 0, bottom: 0, padding: spacing.xl, backgroundColor: colors.surface,
  },
  payBtn: { height: 56, borderRadius: radius.lg, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' },
  payText: { color: colors.surface, fontWeight: '800' },
});


