/**
 * Global Styles - Reusable colors, spacing, radius, font sizes, and shadows
 * Used across all components and screens for consistency
 */

// ============================================================================
// COLORS
// ============================================================================

export const colors = {
  // Brand Colors
  brand: '#22C55E', // Primary green
  brandDark: '#16A34A', // Darker green
  brandLight: '#B8EDD5', // Light green (for buttons, backgrounds)
  brandLighter: '#DCFCE7', // Very light green (for icons, backgrounds)
  brandLightest: '#D4F4E7', // Lightest green (for backgrounds)
  brandLightest2: '#ECFDF5', // Another light green variant

  // Text Colors
  text: '#101828', // Primary text
  textMuted: '#667085', // Secondary/muted text
  textLight: '#FFFFFF', // White text (for dark backgrounds)

  // Surface Colors
  surface: '#FFFFFF', // White surface
  surfaceSecondary: '#F9FAFB', // Light gray surface
  background: '#F7F7F7', // Background color
  backgroundSecondary: '#F3F4F6', // Secondary background (inputs, cards)

  // Border Colors
  border: '#E5E7EB', // Default border
  borderLight: '#F3F4F6', // Light border

  // Status Colors
  danger: '#EF4444', // Red for errors/danger
  dangerLight: '#FEE2E2', // Light red background
  warning: '#FCD34D', // Yellow/orange
  warningLight: '#FEF3C7', // Light yellow background
  warningText: '#FEF08A', // Yellow text color
  success: '#059669', // Success green
  successLight: '#D1FAE5', // Light green background

  // Neutral Colors
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',

  // Accent Colors
  orange: '#EA580C', // Orange
  orangeDark: '#C86A2B', // Dark orange
  orangeLight: '#FED7AA', // Light orange
  orangeLightest: '#FFE8D6', // Lightest orange

  // Overlay Colors
  overlay: 'rgba(0, 0, 0, 0.5)', // Dark overlay for modals
  overlayLight: 'rgba(255, 255, 255, 0.2)', // Light overlay for buttons on colored backgrounds
  overlayDark: 'rgba(255, 255, 255, 0.9)', // Light overlay for transparent backgrounds

  // Special Colors
  disabled: '#D1D5DB', // Disabled state color
  shadow: '#000000', // Shadow color
};

// ============================================================================
// SPACING
// ============================================================================

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 20,
  xl: 24,
  xxl: 28,
  full: 9999, // Full circle/rounded
};

// ============================================================================
// FONT SIZES
// ============================================================================

export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
  xxxl: 36,
};

// ============================================================================
// FONT WEIGHTS
// ============================================================================

export const fontWeights = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
  black: '900' as const,
};

// ============================================================================
// SHADOWS
// ============================================================================

export const shadows = {
  sm: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 12,
  },
  card: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
};

// ============================================================================
// COMMON STYLES
// ============================================================================

export const commonStyles = {
  // Card styles
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    ...shadows.card,
  },
  
  // Input styles
  input: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: fontSizes.md,
    color: colors.text,
  },
  
  // Button base styles (use Button component for actual buttons)
  buttonPrimary: {
    backgroundColor: colors.brand,
    borderRadius: radius.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  
  // Section divider
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  
  // Container with safe padding
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.xl,
  },
};
