import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../theme';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorDisplay({ message, onRetry }: ErrorDisplayProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⚠️</Text>
      <Text style={styles.errorText}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.large,
    backgroundColor: colors.error + '20',
    borderRadius: borderRadius.medium,
    margin: spacing.medium,
    alignItems: 'center',
  },
  icon: {
    fontSize: fontSize.xl,
    marginBottom: spacing.small,
  },
  errorText: {
    color: colors.error,
    fontWeight: 'bold',
    fontSize: fontSize.medium,
    textAlign: 'center',
    marginBottom: spacing.medium,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.small,
    borderRadius: borderRadius.small,
  },
  retryText: {
    color: colors.surface,
    fontWeight: '600',
  },
});