import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing, radius, shadows } from '../../assets/globalStyles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Phone } from 'lucide-react-native';
import { Text, Button, TextInput } from '../../components/common';
import BackButton from '../../components/common/BackButton';

export default function Login() {
  const nav = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = () => {
    if (phoneNumber.length === 10) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        nav.navigate('OtpVerify', { phoneNumber });
      }, 1000);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <BackButton color={colors.textLight} backgroundColor={colors.overlayLight} />

      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Phone size={32} color={colors.brand} />
          </View>
          <Text titletxt="Log In / Sign Up" variant="heading" txtStyle={styles.title} />
          <Text 
            titletxt="Enter your phone number. We will send you a confirmation code there" 
            variant="body" 
            color={colors.textMuted} 
            txtStyle={styles.subtitle} 
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            label="Mobile Number"
            keyboardType="number-pad"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text.replace(/\D/g, '').slice(0, 10))}
            maxLength={10}
            placeholder="Enter 10 digit number"
            leftIcon={
              <View style={styles.countryCode}>
                <Text titletxt="+91" weight="semibold" />
              </View>
            }
            inputContainerStyle={styles.phoneInputContainer}
            containerStyle={styles.inputContainerStyle}
          />
        </View>

        <Button
          title={loading ? 'Sending...' : 'Send OTP'}
          onPress={handleSendOTP}
          disabled={phoneNumber.length !== 10 || loading}
          loading={loading}
          fullWidth
          style={styles.button}
        />

        <Text 
          titletxt="By continuing, you agree to our Terms of Service and Privacy Policy" 
          variant="caption" 
          txtStyle={styles.legal} 
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
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    backgroundColor: colors.brandLighter,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    marginBottom: spacing.xs,
  },
  subtitle: {
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: spacing.xl,
  },
  inputContainerStyle: {
    marginBottom: 0,
  },
  countryCode: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
    minWidth: 60,
    alignItems: 'center',
    marginRight: spacing.md,
  },
  phoneInputContainer: {
    paddingHorizontal: spacing.sm,
  },
  button: {
    marginBottom: spacing.md,
  },
  legal: {
    textAlign: 'center',
    lineHeight: 16,
  },
});
