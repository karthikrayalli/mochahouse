import React, { memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../../assets/globalStyles/globalStyles';
import { Plus, Minus } from 'lucide-react-native';

type Props = {
  title: string;
  price: string;
  originalPrice?: string;
  image?: string;
  serves?: string;
  discount?: string;
  isBestseller?: boolean;
  isVeg?: boolean;
  quantity?: number;
  onPress?: () => void;
  onAdd?: () => void;
  onRemove?: () => void;
};

function ProductCard({ 
  title, 
  price, 
  originalPrice, 
  image, 
  serves,
  discount,
  isBestseller = true,
  isVeg = true,
  quantity = 0,
  onPress, 
  onAdd,
  onRemove
}: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imageWrap}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
        
        {/* Vegetarian/Non-veg Indicator - bottom left */}
        <View style={styles.vegIndicator}>
          <View style={[styles.vegBox, isVeg ? styles.vegBoxGreen : styles.vegBoxRed]}>
            <View style={[styles.vegDot, isVeg ? styles.vegDotGreen : styles.vegDotRed]} />
          </View>
        </View>
        
        {/* Bestseller Badge - top left */}
        {isBestseller && (
          <View style={styles.bestsellerBadge}>
            <Text style={styles.starIcon}>★</Text>
            <Text style={styles.bestsellerText}>Bestseller</Text>
          </View>
        )}
        
        {/* Discount Badge - top right */}
        {discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discount}%{'\n'}OFF</Text>
          </View>
        )}
        
        {/* Add/Quantity Controls - bottom right */}
        {quantity > 0 ? (
          <Pressable 
            style={styles.quantityControls}
            onPress={() => {}} // Prevent parent press
          >
            <Pressable style={styles.quantityButton} onPress={onRemove}>
              <Minus size={12} color="#FFFFFF" />
            </Pressable>
            <Text style={styles.quantityText}>{quantity}</Text>
            <Pressable style={styles.quantityButton} onPress={onAdd}>
              <Plus size={12} color="#FFFFFF" />
            </Pressable>
          </Pressable>
        ) : (
          <Pressable style={styles.addButton} onPress={onAdd}>
            <Plus size={18} color="#FFFFFF" />
          </Pressable>
        )}
      </View>

      {/* Product Info */}
      <View style={styles.productInfo}>
        {serves && (
          <View style={styles.servesBadge}>
            <Text style={styles.servesText}>{serves}</Text>
          </View>
        )}
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{price}</Text>
          {originalPrice && (
            <Text style={styles.originalPrice}>{originalPrice}</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}

export default memo(ProductCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
    width: 160,
    marginRight: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  imageWrap: {
    height: 120,
    overflow: 'hidden',
    position: 'relative',
  },
  image: { 
    height: '100%', 
    width: '100%',
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  vegIndicator: {
    position: 'absolute',
    bottom: 6,
    left: 6,
  },
  vegBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  vegBoxGreen: {
    borderColor: colors.brand,
  },
  vegBoxRed: {
    borderColor: '#EF4444',
  },
  vegDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  vegDotGreen: {
    backgroundColor: colors.brand,
  },
  vegDotRed: {
    backgroundColor: '#EF4444',
  },
  bestsellerBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    gap: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  starIcon: {
    fontSize: 10,
    color: colors.brand,
  },
  bestsellerText: {
    fontSize: 9,
    fontWeight: '600',
    color: colors.text,
  },
  discountBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: colors.brand,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 6,
    alignItems: 'center',
  },
  discountText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 11,
  },
  addButton: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: colors.brand,
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  quantityControls: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brand,
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  quantityButton: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
    minWidth: 16,
    textAlign: 'center',
  },
  productInfo: {
    padding: spacing.md,
  },
  servesBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    marginBottom: spacing.xs,
  },
  servesText: {
    fontSize: 9,
    color: colors.textMuted,
    fontWeight: '500',
  },
  title: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  price: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 16,
  },
  originalPrice: {
    color: colors.textMuted,
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
});
