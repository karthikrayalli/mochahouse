import React from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Modal as RNModal,
  TouchableWithoutFeedback,
} from 'react-native';
import { colors, spacing, radius } from '../../assets/globalStyles/globalStyles';
import Text from './Text';

type ModalProps = {
  visible: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  animationType?: 'none' | 'slide' | 'fade';
  transparent?: boolean;
  showCloseButton?: boolean;
};

const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  children,
  animationType = 'slide',
  transparent = true,
  showCloseButton = false,
}) => {
  return (
    <RNModal
      animationType={animationType}
      transparent={transparent}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.content}>
              {showCloseButton && onClose && (
                <Pressable style={styles.closeButton} onPress={onClose}>
                  <Text>✕</Text>
                </Pressable>
              )}
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  content: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: spacing.xs,
    marginBottom: spacing.sm,
  },
});

