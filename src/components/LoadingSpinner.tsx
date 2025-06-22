import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSize } from '../theme';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'large';
}

export default function LoadingSpinner({ message = 'Loading...', size = 'large' }: LoadingSpinnerProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={colors.primary} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.large,
  },
  message: {
    marginTop: spacing.medium,
    fontSize: fontSize.medium,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});