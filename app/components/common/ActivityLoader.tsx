import React, { memo } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { colors } from '../../assets/globalStyles/globalStyles';

type ActivityLoaderProps = {
  size?: 'small' | 'large';
  color?: string;
  style?: object;
  containerStyle?: object;
};

const ActivityLoader: React.FC<ActivityLoaderProps> = ({
  size = 'large',
  color = colors.brand,
  style,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <ActivityIndicator size={size} color={color} style={style} />
    </View>
  );
};

export default memo(ActivityLoader);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

