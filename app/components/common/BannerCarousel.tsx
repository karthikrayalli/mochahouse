import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, StyleSheet, View, FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { radius, spacing } from '../../assets/globalStyles/globalStyles';

const { width } = Dimensions.get('window');

type Props = { images: string[] };

export default function BannerCarousel({ images }: Props) {
  const listRef = useRef<FlatList<string>>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      const next = (index + 1) % images.length;
      listRef.current?.scrollToIndex({ index: next, animated: true });
      setIndex(next);
    }, 4000);
    return () => clearInterval(id);
  }, [index, images.length]);

  const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const page = Math.round(e.nativeEvent.contentOffset.x / (width - spacing.xl * 2));
    if (page !== index) setIndex(page);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={images}
        keyExtractor={(u, i) => `${u}-${i}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumEnd}
        renderItem={({ item }) => (
          <>
          <Image source={{ uri: item }} style={[styles.image, { width: width - spacing.xl * 2 }]} />
          <View style={styles.dotsWrap}>
            {images.map((_, i) => (
              <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
            ))}
          </View>
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: spacing.lg },
  image: {
    height: 140,
    width: '100%',
    borderRadius: radius.xl,
  },
  dotsWrap: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(0,0,0,0.2)' },
  dotActive: { backgroundColor: '#22C55E' },
});


