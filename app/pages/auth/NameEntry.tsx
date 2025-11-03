import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing, radius, shadows } from '../../assets/globalStyles/globalStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, Button, TextInput } from '../../components/common';
import BackButton from '../../components/common/BackButton';

export default function NameEntry() {
  const nav = useNavigation<any>();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const phoneNumber = (route.params as any)?.phoneNumber || '';

  const handleComplete = async () => {
    if (name.trim()) {
      setLoading(true);
      try {
        // Simulate API call - In real app, call your authentication API here
        // const response = await authApi.completeRegistration({ phoneNumber, name });
        
        // Save token to AsyncStorage (simulate with a dummy token)
        const authToken = `token_${Date.now()}`; // Replace with actual token from API
        await AsyncStorage.setItem('authToken', authToken);
        
        // The router will automatically detect the token and switch to MainStack
        // No need to manually navigate - the RootStack will handle it
        setLoading(false);
      } catch (error) {
        console.error('Error completing registration:', error);
        setLoading(false);
      }
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <BackButton color={colors.textLight} backgroundColor={colors.overlayLight} />

      <View style={styles.card}>
        <View style={styles.header}>
          <Text titletxt="What's your name?" variant="heading" txtStyle={styles.title} />
          <Text 
            titletxt="This helps us personalize your experience" 
            variant="body" 
            color={colors.textMuted} 
            txtStyle={styles.subtitle} 
          />
        </View>

        <TextInput
          label="Full Name"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          autoFocus
          containerStyle={styles.inputContainer}
        />

        <Button
          title={loading ? 'Continuing...' : 'Continue'}
          onPress={handleComplete}
          disabled={!name.trim() || loading}
          loading={loading}
          fullWidth
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.brand,
    padding: spacing.xl,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    ...shadows.card,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    marginBottom: spacing.xs,
  },
  subtitle: {},
  inputContainer: {
    marginBottom: spacing.xl,
  },
  button: {},
});
