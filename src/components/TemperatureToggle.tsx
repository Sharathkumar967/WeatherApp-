import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../theme';

interface TemperatureToggleProps {
  unit: 'metric' | 'imperial';
  onToggle: (unit: 'metric' | 'imperial') => void;
}

export default function TemperatureToggle({ unit, onToggle }: TemperatureToggleProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.leftButton, unit === 'metric' && styles.activeButton]}
        onPress={() => onToggle('metric')}
      >
        <Text style={[styles.buttonText, unit === 'metric' && styles.activeText]}>°C</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.button, styles.rightButton, unit === 'imperial' && styles.activeButton]}
        onPress={() => onToggle('imperial')}
      >
        <Text style={[styles.buttonText, unit === 'imperial' && styles.activeText]}>°F</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: borderRadius.medium,
    padding: 2,
  },
  button: {
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    minWidth: 40,
    alignItems: 'center',
  },
  leftButton: {
    borderTopLeftRadius: borderRadius.medium,
    borderBottomLeftRadius: borderRadius.medium,
  },
  rightButton: {
    borderTopRightRadius: borderRadius.medium,
    borderBottomRightRadius: borderRadius.medium,
  },
  activeButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    fontSize: fontSize.medium,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeText: {
    color: colors.surface,
  },
});