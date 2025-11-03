import React, { useMemo, useRef, useState, useEffect } from 'react';
import {
  Animated,
  Easing,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, QrCode, ChevronDown, Wallet, User, ChevronRight, Utensils, Lock, Plus, X } from 'lucide-react-native';

import { colors, spacing, radius } from '../../assets/globalStyles/globalStyles';
import PromoBanner from '../../components/common/PromoBanner';
import ProductCard from '../../components/common/ProductCard';
import SectionHeader from '../../components/common/SectionHeader';
import { categories as categoriesData, exploreCards, newlyLaunchedProducts, chaatProducts, brewProducts } from './mockData';

const products = [
  { id: '1', title: 'Peri Peri Potato Wedges', price: '₹129', originalPrice: '₹169', image: 'https://images.unsplash.com/photo-1533777324565-a040eb52fac1?q=80&w=1600', serves: 'Serves 1', discount: '23', isVeg: true },
  { id: '2', title: 'Ginger Chai', price: '₹89', originalPrice: '₹139', image: 'https://images.unsplash.com/photo-1533777324565-a040eb52fac1?q=80&w=1600', serves: 'Serves 2-3', discount: '35', isVeg: true },
  { id: '3', title: 'Classic Maggi', price: '₹69', originalPrice: '₹99', image: 'https://images.unsplash.com/photo-1533777324565-a040eb52fac1?q=80&w=1600', serves: 'Serves 1', discount: '30', isVeg: true },
];

const trustBadges = [
  { id: '1', icon: '⚡', text: 'Curated by Top-Rated Chefs' },
  { id: '2', icon: '🍃', text: 'Made Fresh • Delivered Fast' },
  { id: '3', icon: '✨', text: 'High Quality Ingredients' },
];

const combos = [
  { id: 'combo-1', title: 'Idli Sambar & Poha', desc: 'Idli, sambar and poha', price: '₹149', originalPrice: '₹248', image: 'https://images.unsplash.com/photo-1663082076072-838f8dafec13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', discount: '39' },
  { id: 'combo-2', title: 'Poha & Ginger Chai', desc: 'Light poha with zesty ginger chai', price: '₹179', originalPrice: '₹308', image: 'https://images.unsplash.com/photo-1648192312898-838f9b322f47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', discount: '41' },
  { id: 'combo-3', title: 'Elaichi Chai & Corn Bhel', desc: 'Aromatic elaichi chai with corn bhel', price: '₹159', originalPrice: '₹278', image: 'https://images.unsplash.com/photo-1641053336141-8b0339f48f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', discount: '42' },
  { id: 'combo-4', title: 'Ginger Tea & Poha', desc: 'Spicy ginger tea with poha', price: '₹169', originalPrice: '₹268', image: 'https://images.unsplash.com/photo-1644289450169-bc58aa16bacb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', discount: '38' },
];

export default function Home() {
  const nav = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<Record<string, number>>({});

  // ===== Infinite trust-badges marquee (smooth, native driver)
  const marqueeX = useRef(new Animated.Value(0)).current;
  const [rowWidth, setRowWidth] = useState(0);

  const duplicatedBadges = useMemo(() => [...trustBadges, ...trustBadges], []);
  useEffect(() => {
    if (!rowWidth) return;
    marqueeX.setValue(0);
    Animated.loop(
      Animated.timing(marqueeX, {
        toValue: -rowWidth,
        duration: Math.max(8000, rowWidth * 20), // speed ~20px/s
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rowWidth]);

  const snackStackItems = products.slice(0, 4);
  const cartItems = products.filter(p => cart[p.id] > 0);
  const cartTotal = cartItems.reduce((sum, p) => sum + parseInt(p.price.replace('₹', '')) * cart[p.id], 0);
  const cartCount = Object.values(cart).reduce((sum, n) => sum + n, 0);

  const add = (id: string) => setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const remove = (id: string) =>
    setCart(prev => {
      const next = { ...prev };
      if ((next[id] || 0) > 1) next[id] -= 1;
      else delete next[id];
      return next;
    });

  // ======== FAB → SHEET morph (matches your video)
  const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
  const FAB_SIZE = 64;
  const FAB_BOTTOM = 80;
  const SHEET_TOP = SCREEN_H * 0.22;
  const SHEET_H = SCREEN_H * 0.60;
  const SHEET_W = SCREEN_W - spacing.lg * 2;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMorphing, setIsMorphing] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;

  const fabStartTop = SCREEN_H - (FAB_BOTTOM + FAB_SIZE);
  const fabStartLeft = (SCREEN_W - FAB_SIZE) / 2;

  const animateOpen = () => {
    setIsMorphing(true);
    setIsMenuOpen(true);
    Animated.timing(progress, {
      toValue: 1,
      duration: 150,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false, // width/height/position need layout
    }).start(() => setIsMorphing(false));
  };

  const animateClose = () => {
    setIsMorphing(true);
    Animated.timing(progress, {
      toValue: 0,
      duration: 120,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: false,
    }).start(() => {
      setIsMorphing(false);
      setIsMenuOpen(false);
    });
  };

  const morphTop = progress.interpolate({ inputRange: [0, 1], outputRange: [fabStartTop, SHEET_TOP] });
  const morphLeft = progress.interpolate({ inputRange: [0, 1], outputRange: [fabStartLeft, spacing.lg] });
  const morphW = progress.interpolate({ inputRange: [0, 1], outputRange: [FAB_SIZE, SHEET_W] });
  const morphH = progress.interpolate({ inputRange: [0, 1], outputRange: [FAB_SIZE, SHEET_H] });
  const morphRadius = progress.interpolate({ inputRange: [0, 1], outputRange: [FAB_SIZE / 2, 28] });
  const morphShadow = progress.interpolate({ inputRange: [0, 1], outputRange: [8, 12] });
  const backdropOpacity = progress.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });
  const contentOpacity = progress.interpolate({ inputRange: [0, 0.6, 1], outputRange: [0, 0, 1] });
  const contentTranslate = progress.interpolate({ inputRange: [0, 1], outputRange: [12, 0] });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top }]} showsVerticalScrollIndicator={false}>
        {/* ===== Header */}
        <View style={styles.topBar}>
          <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
              <Text style={styles.inMinutes}>In 10 minutes</Text>
              <Pressable style={styles.locationRow}>
                <Text numberOfLines={1} style={styles.locationLabel}>
                  INDIAN INSTITUTE OF MANAG…
                </Text>
                <ChevronDown size={14} color="#fff" />
              </Pressable>
            </View>

            <View style={styles.headerRight}>
              <View style={styles.rewardButton}>
                <Wallet size={12} color={colors.brand} />
                <Text style={styles.rewardText}>Get ₹250</Text>
              </View>
              <Pressable style={styles.profileButton}>
                <User size={18} color="#fff" />
              </Pressable>
            </View>
          </View>

          {/* Search */}
          <View style={styles.searchContainer}>
            <Search size={18} color={colors.textMuted} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search Swish"
              placeholderTextColor="#667085"
              style={styles.searchInput}
            />
            <Pressable style={styles.qrBtn}>
              <QrCode size={16} color={colors.textMuted} />
            </Pressable>
          </View>
        </View>

        {/* ===== Trust badges – marquee */}
        <View style={styles.trustBadgesContainer}>
          <View style={styles.trustBadgesMask}>
            <Animated.View
              style={{ flexDirection: 'row', transform: [{ translateX: marqueeX }] }}
              onLayout={e => setRowWidth(e.nativeEvent.layout.width / 2)} // width of one set
            >
              {[duplicatedBadges, duplicatedBadges].flat().map((b, i) => (
                <View key={`${b.id}-${i}`} style={styles.trustBadge}>
                  <Text style={styles.trustIcon}>{b.icon}</Text>
                  <Text style={styles.trustText}>{b.text}</Text>
                </View>
              ))}
            </Animated.View>
          </View>
        </View>

        {/* ===== Promo banner */}
        <PromoBanner title="50% OFF" subtitle="UNLOCKED" buttonText="Use Code: TRYSWISH" />

        {/* ===== Snack Stack */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderWrap}>
            <SectionHeader
              title="Snack Stack"
              action={
                <Pressable>
                  <View style={styles.viewAllRow}>
                    <Text style={styles.viewAll}>View all</Text>
                    <ChevronRight size={14} color={colors.brand} />
                  </View>
                </Pressable>
              }
            />
            <Text style={styles.sectionSubtitleSmall}>Top picks for you ♡</Text>
          </View>

          <FlatList
            data={snackStackItems}
            keyExtractor={i => i.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productList}
            renderItem={({ item }) => (
              <ProductCard
                title={item.title}
                price={item.price}
                originalPrice={item.originalPrice}
                image={item.image}
                serves={item.serves}
                discount={item.discount}
                isVeg={item.isVeg}
                isBestseller
                quantity={cart[item.id] || 0}
                onPress={() => nav.navigate('ProductDetails')}
                onAdd={() => add(item.id)}
                onRemove={() => remove(item.id)}
              />
            )}
          />
        </View>

        {/* ===== Explore */}
        <View style={styles.exploreSection}>
          <View style={styles.exploreHeaderWrap}>
            <Text style={styles.exploreTitle}>Explore more on Swish</Text>
          </View>
    <FlatList
            data={exploreCards}
      keyExtractor={i => i.id}
      horizontal
      showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.exploreList}
            renderItem={({ item }) => (
              <View style={styles.exploreCard}>
                <Image source={{ uri: item.image }} style={styles.exploreImage} />
                <View style={styles.exploreContent}>
                  <Text style={[styles.exploreText, { color: item.color }]}>{item.title1}</Text>
                  {!!item.title2 && <Text style={[styles.exploreText, { color: item.color }]}>{item.title2}</Text>}
                </View>
              </View>
            )}
          />
        </View>

        {/* ===== Curated Combos (2-col grid) */}
        <View style={styles.combosSection}>
          <Text style={styles.combosTitle}>Curated Combos</Text>
          <FlatList
            data={combos}
            keyExtractor={i => i.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            ItemSeparatorComponent={() => <View style={{ height: spacing.xl }} />}
            renderItem={({ item: c }) => (
              <View style={styles.comboCard}>
                <View style={styles.comboDiscountBadge}>
                  <Text style={styles.comboDiscountText}>{c.discount}%{'\n'}OFF</Text>
                </View>
                <Image source={{ uri: c.image }} style={styles.comboImage} />
                <Pressable style={styles.comboAddButton}>
                  <Plus size={16} color="#fff" />
                </Pressable>
                <View style={styles.comboInfo}>
                  <View style={styles.comboBadgeRow}>
                    <View style={styles.comboVegCircle}>
                      <View style={styles.comboVegDot} />
                    </View>
                    <View style={styles.comboTag}>
                      <Text style={styles.comboTagText}>bestseller</Text>
                    </View>
                  </View>
                  <Text style={styles.comboTitle}>{c.title}</Text>
                  <Text style={styles.comboDesc}>{c.desc}</Text>
                  <View style={styles.comboPriceRow}>
                    <Text style={styles.comboPrice}>{c.price}</Text>
                    <Text style={styles.comboOriginalPrice}>{c.originalPrice}</Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>

        {/* ===== Food for every mood */}
        <View style={styles.moodCategoriesSection}>
          <Text style={styles.moodCategoriesTitle}>Food for every mood</Text>
        </View>
        <FlatList
          data={Array.from({ length: Math.ceil(categoriesData.length / 2) }, (_, i) => categoriesData.slice(i * 2, i * 2 + 2))}
          keyExtractor={(_, idx) => `cat-col-${idx}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.moodCategoriesGrid}
      renderItem={({ item }) => (
            <View style={styles.moodCategoryColumn}>
              {item.map(c => (
                <View key={c.id} style={styles.moodCategory}>
                  <View style={styles.moodCategoryIcon}>
                    <Image source={{ uri: c.image }} style={styles.moodCategoryImage} />
                  </View>
                  <Text style={styles.moodCategoryText}>{c.label}</Text>
                </View>
              ))}
            </View>
          )}
        />

        {/* ===== Refer & Earn */}
        <View style={styles.referBanner}>
          <View style={styles.referBannerLeft}>
            <Text style={styles.referBannerTitle}>REFER EARN &</Text>
          </View>
          <View style={styles.referBannerRight}>
            <Text style={styles.referBannerAmount}>₹250</Text>
            <Text style={styles.referBannerPlus}>+</Text>
            <View style={styles.referBannerIcon}>
              <Text style={styles.referBannerCoffeeEmoji}>☕☕</Text>
              <Text style={styles.referBannerCoffeeText}>free cold coffee</Text>
            </View>
          </View>
        </View>

        {/* ===== Newly Launched */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderWrap}>
            <SectionHeader
              title="Newly Launched"
              action={
                <Pressable>
                  <View style={styles.viewAllRow}>
                    <Text style={styles.viewAll}>View all</Text>
                    <ChevronRight size={14} color={colors.brand} />
                  </View>
                </Pressable>
              }
            />
          </View>
          <FlatList
            data={newlyLaunchedProducts}
            keyExtractor={i => i.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productList}
            renderItem={({ item: p }) => (
              <ProductCard
                title={p.title}
                price={p.price}
                originalPrice={p.originalPrice}
                image={p.image}
                serves={p.serves}
                discount={p.discount}
                isVeg={p.isVeg}
                isBestseller={p.isBestseller}
                quantity={cart[p.id] || 0}
                onPress={() => nav.navigate('ProductDetails')}
                onAdd={() => add(p.id)}
                onRemove={() => remove(p.id)}
              />
            )}
          />
        </View>

        {/* ===== Street-style chaats */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderWrap}>
            <SectionHeader
              title="Street-style chaats"
              action={
                <Pressable>
                  <View style={styles.viewAllRow}>
                    <Text style={styles.viewAll}>View all</Text>
                    <ChevronRight size={14} color={colors.brand} />
                  </View>
                </Pressable>
              }
            />
          </View>
          <FlatList
            data={chaatProducts}
            keyExtractor={i => i.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productList}
            renderItem={({ item: p }) => (
              <ProductCard
                title={p.title}
                price={p.price}
                originalPrice={p.originalPrice}
                image={p.image}
                serves={p.serves}
                discount={p.discount}
                isVeg={p.isVeg}
                isBestseller={p.isBestseller}
                quantity={cart[p.id] || 0}
                onPress={() => nav.navigate('ProductDetails')}
                onAdd={() => add(p.id)}
                onRemove={() => remove(p.id)}
              />
            )}
          />
        </View>

        {/* ===== Brews for you */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderWrap}>
            <SectionHeader
              title="Brews for you"
              action={
                <Pressable>
                  <View style={styles.viewAllRow}>
                    <Text style={styles.viewAll}>View all</Text>
                    <ChevronRight size={14} color={colors.brand} />
                  </View>
                </Pressable>
              }
            />
          </View>
          <FlatList
            data={brewProducts}
            keyExtractor={i => i.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productList}
            renderItem={({ item: p }) => (
              <ProductCard
                title={p.title}
                price={p.price}
                originalPrice={p.originalPrice}
                image={p.image}
                serves={p.serves}
                discount={p.discount}
                isVeg={p.isVeg}
                isBestseller={p.isBestseller}
                quantity={cart[p.id] || 0}
                onPress={() => nav.navigate('ProductDetails')}
                onAdd={() => add(p.id)}
                onRemove={() => remove(p.id)}
              />
            )}
          />
        </View>

        {/* ===== Cashback bar */}
        <View style={styles.cashbackBar}>
          <View style={styles.cashbackLock}>
            <Lock size={20} color="#fff" />
          </View>
          <Text style={styles.cashbackText}>
            Add items for <Text style={styles.cashbackHighlight}>₹25</Text> to get upto <Text style={styles.cashbackHighlight}>₹300 cashback</Text>
          </Text>
        </View>
      </ScrollView>

      {/* ===== Floating Menu FAB (hidden during morph/open) ===== */}
      {!isMenuOpen && !isMorphing && (
        <View pointerEvents="box-none" style={styles.menuFabWrap}>
          <Pressable style={styles.menuButton} onPress={animateOpen}>
            <Utensils size={16} color={colors.brand} />
            <Text style={styles.menuButtonText}>Menu</Text>
          </Pressable>
        </View>
      )}

      {/* ===== Overlay (backdrop + morph box) ===== */}
      {isMenuOpen && (
        <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
          {/* Backdrop */}
          <Animated.View style={[styles.menuBackdrop, { opacity: backdropOpacity }]}>
            <Pressable style={StyleSheet.absoluteFill} onPress={animateClose} />
          </Animated.View>

          {/* Morphing container */}
{/* Morphing container */}
<Animated.View
  style={{
    position: 'absolute',
    top: morphTop as any,
    left: morphLeft as any,
    width: morphW as any,
    height: morphH as any,
    borderRadius: morphRadius as any,
    backgroundColor: colors.surface,
    // was 'hidden' – allow the floating button to sit half outside
    overflow: 'visible',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: (morphShadow as unknown) as number,
    elevation: 12,
  }}
>
  {/* Content fades/slides in */}
  <Animated.View
    style={{
      flex: 1,
      opacity: contentOpacity,
      transform: [{ translateY: contentTranslate as any }],
      paddingVertical: spacing.xl,
      paddingHorizontal: spacing.xl,
    }}
  >
    <FlatList
      data={categoriesData}
      keyExtractor={(i) => i.id}
      contentContainerStyle={{ paddingBottom: spacing.xxl * 2 }} // a bit more room so last row isn’t behind the button
      ItemSeparatorComponent={() => <View style={{ height: spacing.lg }} />}
      renderItem={({ item, index }) => (
        <Animated.View
          style={{
            opacity: contentOpacity,
            transform: [
              {
                translateY: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [10 + index * 2, 0],
                }) as any,
              },
            ],
          }}
        >
          <View style={styles.menuRow}>
            <Text style={styles.menuRowText}>{item.label}</Text>
            <Text style={styles.menuRowCount}>{(item as any).count ?? ''}</Text>
          </View>
        </Animated.View>
      )}
    />
  </Animated.View>

  {/* (Removed) Floating close over sheet – we now keep the close in Menu FAB spot */}
</Animated.View>

        </View>
      )}

      {/* Close pill identical to Menu pill */}
      {isMenuOpen && (
        <View pointerEvents="box-none" style={styles.menuFabWrap}>
          <Pressable style={styles.menuButton} onPress={animateClose}>
            <X size={16} color={colors.brand} />
          </Pressable>
        </View>
      )}
    </View>
  );
}

/* =================== styles =================== */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingBottom: 120 },

  /* Header */
  topBar: {
    backgroundColor: colors.brand,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    paddingTop: spacing.md,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.md },
  headerLeft: { flex: 1 },
  inMinutes: { fontSize: 14, color: '#fff', marginBottom: spacing.xs / 2 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  locationLabel: { fontSize: 12, color: '#fff', fontWeight: '600', maxWidth: 220 },

  headerRight: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  rewardButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, gap: spacing.xs },
  rewardText: { fontSize: 11, color: colors.brand, fontWeight: '800' },
  profileButton: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  searchInput: { flex: 1, fontSize: 14, color: colors.text },
  qrBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Trust badges */
  trustBadgesContainer: { borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  trustBadgesMask: { overflow: 'hidden', paddingHorizontal: spacing.xl, paddingVertical: spacing.md },
  trustBadge: { flexDirection: 'row', alignItems: 'center', paddingRight: spacing.lg, marginRight: spacing.lg },
  trustIcon: { fontSize: 12 },
  trustText: { fontSize: 11, color: colors.textMuted, fontWeight: '600', marginLeft: 6 },

  /* Sections */
  sectionContainer: { marginTop: spacing.xl, marginBottom: spacing.xl },
  sectionHeaderWrap: { paddingHorizontal: spacing.xl },
  sectionSubtitleSmall: { fontSize: 12, color: colors.textMuted, fontWeight: '400', marginTop: 2 },

  viewAllRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs / 2 },
  viewAll: { fontSize: 14, color: colors.brand, fontWeight: '800', marginTop: 4 },
  productList: { paddingBottom: spacing.lg, paddingHorizontal: spacing.xl },

  /* Explore */
  exploreSection: { marginTop: spacing.xl, marginBottom: spacing.xl },
  exploreHeaderWrap: { paddingHorizontal: spacing.xl },
  exploreTitle: { fontSize: 18, fontWeight: '800', color: colors.text, marginBottom: spacing.md },
  exploreList: { paddingBottom: spacing.md, paddingHorizontal: spacing.xl },
  exploreCard: { width: 90, marginRight: spacing.md, backgroundColor: colors.surface, borderRadius: radius.xl, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  exploreImage: { width: '100%', height: 60, resizeMode: 'cover' },
  exploreContent: { padding: spacing.sm, alignItems: 'center' },
  exploreText: { fontSize: 10, fontWeight: '700' },

  /* Combos */
  combosSection: { paddingHorizontal: spacing.xl, marginBottom: spacing.xl },
  combosTitle: { fontSize: 18, fontWeight: '800', color: colors.text, marginBottom: spacing.md },
  comboCard: { width: '48%', backgroundColor: colors.surface, borderRadius: radius.xl, overflow: 'hidden' },
  comboDiscountBadge: { position: 'absolute', top: spacing.sm, right: spacing.sm, backgroundColor: colors.brand, borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, zIndex: 10 },
  comboDiscountText: { fontSize: 12, fontWeight: '800', color: '#fff', textAlign: 'center', lineHeight: 14 },
  comboImage: { width: '100%', height: 140, resizeMode: 'cover' },
  comboAddButton: { position: 'absolute', bottom: 138, right: spacing.sm, backgroundColor: colors.brand, borderRadius: radius.md, padding: spacing.sm, zIndex: 10 },
  comboInfo: { padding: spacing.md },
  comboBadgeRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginBottom: spacing.sm },
  comboVegCircle: { width: 16, height: 16, borderRadius: 4, borderWidth: 2, borderColor: colors.brand, alignItems: 'center', justifyContent: 'center' },
  comboVegDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.brand },
  comboTag: { backgroundColor: '#FEF3C7', borderRadius: 4, paddingHorizontal: spacing.xs, paddingVertical: 2 },
  comboTagText: { fontSize: 10, color: '#D97706', fontWeight: '700' },
  comboTitle: { fontSize: 14, fontWeight: '800', color: colors.text, marginBottom: spacing.xs },
  comboDesc: { fontSize: 12, color: colors.textMuted, marginBottom: spacing.sm },
  comboPriceRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  comboPrice: { fontSize: 16, fontWeight: '800', color: colors.text },
  comboOriginalPrice: { fontSize: 12, color: colors.textMuted, textDecorationLine: 'line-through' },

  /* Mood categories */
  moodCategoriesSection: { paddingHorizontal: spacing.xl, marginTop: spacing.xl, marginBottom: spacing.xl },
  moodCategoriesTitle: { fontSize: 18, fontWeight: '800', color: colors.text, marginBottom: spacing.md },
  moodCategoriesGrid: { flexDirection: 'row', marginHorizontal: spacing.md },
  moodCategoryColumn: { marginRight: spacing.md, alignItems: 'center' },
  moodCategory: { width: 88, alignItems: 'center', marginBottom: spacing.md },
  moodCategoryIcon: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.backgroundSecondary, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xs, overflow: 'hidden' },
  moodCategoryImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  moodCategoryText: { fontSize: 10, fontWeight: '600', color: colors.text, textAlign: 'center', marginTop: spacing.xs },

  /* Refer banner */
  referBanner: { flexDirection: 'row', marginHorizontal: spacing.xl, marginTop: spacing.xl, marginBottom: spacing.xl, borderRadius: radius.lg, overflow: 'hidden', minHeight: 100 },
  referBannerLeft: { flex: 1, backgroundColor: colors.brandLight, padding: spacing.lg, justifyContent: 'center' },
  referBannerTitle: { fontSize: 16, fontWeight: '800', color: colors.brand },
  referBannerRight: { flex: 1, backgroundColor: colors.brand, padding: spacing.lg, flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  referBannerAmount: { fontSize: 32, fontWeight: '900', color: '#fff' },
  referBannerPlus: { fontSize: 24, fontWeight: '800', color: '#fff', marginTop: -spacing.xs },
  referBannerIcon: { alignItems: 'center', marginLeft: spacing.xs },
  referBannerCoffeeEmoji: { fontSize: 24, marginBottom: spacing.xs / 2 },
  referBannerCoffeeText: { fontSize: 10, fontWeight: '700', color: '#fff' },

  /* Cashback */
  cashbackBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#D4F4E7', marginHorizontal: spacing.xl, marginTop: spacing.xl, marginBottom: spacing.xxl, padding: spacing.md, borderRadius: radius.md, gap: spacing.md },
  cashbackLock: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' },
  cashbackText: { flex: 1, fontSize: 12, color: colors.brand, fontWeight: '700' },
  cashbackHighlight: { fontWeight: '900' },

  /* Floating menu */
  menuFabWrap: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 30,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: colors.brand,
    borderRadius: radius.full,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    width: 'auto',
    gap: spacing.xs,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 12 },
      android: { elevation: 8 },
    }),
  },
  menuButtonText: { color: colors.brand, fontWeight: '900', fontSize: 14 },

  menuBackdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' },

  // Keep your existing menu row styles for the sheet content
  menuCloseOverSheet: { position: 'absolute', alignSelf: 'center', bottom: -36, width: 64, height: 64, borderRadius: 32, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: '#B8EDD5' },
  closeFab: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: '#B8EDD5', ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 12 }, android: { elevation: 8 } }) },
  menuList: { paddingVertical: spacing.sm, paddingBottom: spacing.xxl * 1.5 },
  menuRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  menuRowText: { fontSize: 22, color: colors.text, fontWeight: '900' },
  menuRowCount: { fontSize: 18, color: colors.text, fontWeight: '700' },

  /* Cart preview */
  cartPreview: { position: 'absolute', left: spacing.xl, right: spacing.xl, zIndex: 20 },
  cartPreviewContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cartPreviewImage: { position: 'relative' },
  cartImage: { width: 48, height: 48, borderRadius: 8 },
  cartBadge: { position: 'absolute', top: -4, right: -4, width: 20, height: 20, borderRadius: 10, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' },
  cartBadgeText: { color: '#fff', fontSize: 9, fontWeight: '900' },
  cartPreviewInfo: { flex: 1 },
  cartPreviewItems: { fontSize: 12, color: colors.textMuted, marginBottom: spacing.xs / 2 },
  cartPreviewTotal: { fontSize: 16, fontWeight: '900', color: colors.text },
  cartPreviewButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.brand, borderRadius: 12, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, gap: spacing.xs },
  cartPreviewButtonText: { color: '#fff', fontWeight: '900', fontSize: 14 },
});
