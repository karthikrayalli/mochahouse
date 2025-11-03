import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../../assets/globalStyles/globalStyles';

export default function Refer() {
  return (
    <View style={styles.container}>
      <Text style={styles.big}>Refer a friend, get ₹250 and a free cold coffee</Text>
      <View style={styles.card}>
        <Text>Share your code</Text>
        <Text style={styles.code}>7XDC59W</Text>
      </View>
      <Pressable style={styles.btn}><Text style={styles.btnText}>Invite via link</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface, padding: spacing.xl },
  big: { fontSize: 22, fontWeight: '800', color: colors.text },
  card: { marginTop: spacing.xl, backgroundColor: '#F9FAFB', padding: spacing.lg, borderRadius: radius.lg },
  code: { marginTop: spacing.sm, color: colors.brand, fontWeight: '800', fontSize: 18 },
  btn: { marginTop: spacing.xl, height: 56, borderRadius: radius.lg, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' },
  btnText: { color: colors.surface, fontWeight: '800' },
});


