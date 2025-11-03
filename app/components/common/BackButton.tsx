import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, radius, spacing } from '../../assets/globalStyles/globalStyles';

type BackButtonProps = {
  color?: string;
  backgroundColor?: string;
  style?: object;
};

export default function BackButton({ 
  color = colors.text, 
  backgroundColor = '#F3F4F6',
  style 
}: BackButtonProps = {}) {
  const nav = useNavigation<any>();
  
  return (
    <View style={[styles.wrap, style]}>
      <Pressable style={[styles.btn, { backgroundColor }]} onPress={() => nav.goBack()}>
        <ArrowLeft size={20} color={color} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { 
    paddingTop: spacing.sm, 
    // paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  btn: {
    height: 40,
    width: 40,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
