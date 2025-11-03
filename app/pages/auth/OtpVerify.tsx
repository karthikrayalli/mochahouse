import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { colors, spacing, radius, shadows } from '../../assets/globalStyles/globalStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import OtpInput from '../../components/common/OtpInput';
import { Text, Button } from '../../components/common';
import BackButton from '../../components/common/BackButton';

export default function OtpVerify() {
  const nav = useNavigation<any>();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  const phoneNumber = (route.params as any)?.phoneNumber || '2344564576';

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  useEffect(() => {
    if (otp.length === 6) {
      handleVerifyOTP();
    }
  }, [otp]);

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        nav.navigate('NameEntry', { phoneNumber });
      }, 1000);
    }
  };

  const handleResend = () => {
    if (resendTimer === 0) {
      setResendTimer(30);
      // Trigger resend OTP API call here
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <BackButton color={colors.textLight} backgroundColor={colors.overlayLight} />

      <View style={styles.card}>
        {/* Title */}
        <Text titletxt="Verify OTP" variant="heading" txtStyle={styles.title} />

        {/* Instructions with phone number on same line */}
        <View style={styles.instructionsContainer}>
          <Text 
            titletxt="Enter the 6-digit code sent to " 
            variant="body" 
            color={colors.textMuted} 
            txtStyle={styles.instructionText} 
          />
          <Text 
            titletxt={phoneNumber}
            variant="body" 
            weight="semibold"
            color={colors.textMuted}
            txtStyle={styles.phoneNumber} 
          />
        </View>

        {/* Change number link */}
        <Pressable onPress={() => nav.navigate('Login')} style={styles.changeNumberContainer}>
          <Text 
            titletxt="Change number" 
            variant="body" 
            color={colors.brand} 
            weight="semibold" 
          />
        </Pressable>

        {/* OTP Input Fields */}
        <View style={styles.otpContainer}>
          <OtpInput value={otp} onChange={setOtp} length={6} />
        </View>

        {/* Verify OTP Button */}
        <Button
          title={loading ? 'Verifying...' : 'Verify OTP'}
          onPress={handleVerifyOTP}
          disabled={otp.length !== 6 || loading}
          loading={loading}
          fullWidth
          style={styles.button}
          textStyle={styles.buttonText}
        />

        {/* Resend OTP Link */}
        <Pressable
          style={styles.resendContainer}
          onPress={handleResend}
          disabled={resendTimer > 0}
        >
          <Text
            titletxt={resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
            variant="body"
            color={resendTimer > 0 ? colors.textMuted : colors.brand}
            weight="semibold"
            txtStyle={styles.resendText}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.brand,
    padding: spacing.xl,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    ...shadows.card,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  instructionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
    flexWrap: 'wrap',
  },
  instructionText: {
    textAlign: 'center',
  },
  phoneNumber: {
    textAlign: 'center',
  },
  changeNumberContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  otpContainer: {
    marginBottom: spacing.xl,
  },
  button: {
    marginBottom: spacing.lg,
    backgroundColor: colors.brandLight,
  },
  buttonText: {
    color: colors.textLight,
  },
  resendContainer: {
    alignItems: 'center',
  },
  resendText: {},
});
