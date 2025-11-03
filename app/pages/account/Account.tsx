import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { colors, radius, spacing } from '../../assets/globalStyles/globalStyles';
import BackButton from '../../components/common/BackButton';
import { useNavigation } from '@react-navigation/native';

function Row({ label }: { label: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowText}>{label}</Text>
      <ChevronRight size={20} color={colors.textMuted} />
    </View>
  );
}

export default function Account() {
  const nav = useNavigation<any>();
  return (
    <View style={styles.container}>
      <BackButton />
      <View style={styles.header}>
        <Text style={styles.hi}>Hi, Karthik 👋</Text>
        <Text style={styles.phone}>+91 82967 65198</Text>
      </View>
      <Pressable onPress={() => nav.navigate('Refer')}>
        <Row label="Your Earnings" />
      </Pressable>
      <Row label="Order History" />
      <Row label="Your Address" />
      <Row label="Your Rewards" />
      <Row label="Need Help?" />
      <Row label="Your Profile" />
      <Row label="Logout" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface, padding: spacing.xl },
  header: {
    backgroundColor: '#F9FAFB',
    padding: spacing.lg,
    borderRadius: radius.lg,
    marginBottom: spacing.lg,
  },
  hi: { fontSize: 22, fontWeight: '800', color: colors.brand },
  phone: { marginTop: 4, color: colors.textMuted },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: spacing.lg, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#E5E7EB' },
  rowText: { color: colors.text },
});


