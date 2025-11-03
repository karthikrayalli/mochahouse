import React, { memo } from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import { colors } from '../../assets/globalStyles/globalStyles';

type AvatarProps = {
  name?: string;
  uri?: string;
  size?: number;
  style?: object;
  textStyle?: object;
  imageStyle?: object;
};

const getInitials = (name?: string): string => {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const Avatar: React.FC<AvatarProps> = ({
  name,
  uri,
  size = 48,
  style,
  textStyle,
  imageStyle,
}) => {
  const initials = getInitials(name);

  return (
    <View
      style={[
        styles.avatarWrapper,
        { width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={[
            styles.avatarImage,
            { width: size, height: size, borderRadius: size / 2 },
            imageStyle,
          ]}
          resizeMode="cover"
        />
      ) : (
        <View
          style={[
            styles.avatarFallback,
            { width: size, height: size, borderRadius: size / 2 },
          ]}
        >
          <Text
            style={[
              styles.avatarInitials,
              { fontSize: size / 2.5 },
              textStyle,
            ]}
            allowFontScaling={false}
          >
            {initials}
          </Text>
        </View>
      )}
    </View>
  );
};

export default memo(Avatar);

const styles = StyleSheet.create({
  avatarWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarFallback: {
    backgroundColor: colors.brand,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
  },
});

