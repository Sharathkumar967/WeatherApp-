import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../theme';

interface OfflineNoticeProps {
  onRetry?: () => void;
}

export default function OfflineNotice({ onRetry }: OfflineNoticeProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📡</Text>
      <Text style={styles.message}>You're offline</Text>
      <Text style={styles.subMessage}>Showing cached data</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.warning + '20',
    borderBottomWidth: 1,
    borderBottomColor: colors.warning,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: fontSize.medium,
    marginRight: spacing.small,
  },
  message: {
    flex: 1,
    fontSize: fontSize.small,
    fontWeight: '600',
    color: colors.text,
  },
  subMessage: {
    fontSize: fontSize.small,
    color: colors.textSecondary,
    marginRight: spacing.small,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.small,
  },
  retryText: {
    color: colors.surface,
    fontSize: fontSize.small,
    fontWeight: '600',
  },
});