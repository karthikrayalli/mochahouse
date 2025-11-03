import React from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { Search as SearchIcon } from 'lucide-react-native';
import { colors, radius, spacing } from '../../assets/globalStyles/globalStyles';
import ProductCard from '../../components/common/ProductCard';
import BackButton from '../../components/common/BackButton';

const data = new Array(6).fill(0).map((_, i) => ({ id: `${i}`, title: 'Peri Peri French Fries', price: '₹119' }));

export default function Search() {
  return (
    <View style={styles.container}>
      <BackButton />
      <View style={styles.searchWrap}>
        <SearchIcon size={18} color={colors.textMuted} />
        <TextInput placeholder={'Search Swish'} style={{ flex: 1, marginLeft: spacing.sm }} />
      </View>
      <Text style={styles.section}>Trending searches</Text>
      <FlatList
        contentContainerStyle={{ paddingVertical: spacing.md }}
        horizontal
        data={data}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <ProductCard title={item.title} price={item.price} />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface, padding: spacing.xl },
  searchWrap: { height: 48, backgroundColor: '#F3F4F6', borderRadius: radius.lg, paddingHorizontal: spacing.lg, alignItems: 'center', flexDirection: 'row' },
  section: { marginTop: spacing.lg, fontWeight: '700', color: colors.text },
});


