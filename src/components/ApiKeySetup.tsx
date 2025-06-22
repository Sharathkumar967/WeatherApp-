import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../theme';

interface ApiKeySetupProps {
  onRetry?: () => void;
}

export default function ApiKeySetup({ onRetry }: ApiKeySetupProps) {
  const handleOpenApiSite = () => {
    Linking.openURL('https://openweathermap.org/api').catch(() => {
      Alert.alert('Error', 'Could not open the website. Please visit https://openweathermap.org/api manually.');
    });
  };

  const handleOpenGithub = () => {
    Linking.openURL('https://github.com/openweathermap/openweathermap-api-node#getting-started').catch(() => {
      Alert.alert('Error', 'Could not open the documentation.');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔑</Text>
      <Text style={styles.title}>API Key Required</Text>
      <Text style={styles.message}>
        To use this weather app, you need to configure your OpenWeatherMap API key.
      </Text>
      
      <View style={styles.stepsContainer}>
        <Text style={styles.stepsTitle}>Setup Steps:</Text>
        
        <View style={styles.step}>
          <Text style={styles.stepNumber}>1.</Text>
          <Text style={styles.stepText}>Get a free API key from OpenWeatherMap</Text>
        </View>
        
        <TouchableOpacity style={styles.linkButton} onPress={handleOpenApiSite}>
          <Text style={styles.linkButtonText}>🌐 Visit OpenWeatherMap API</Text>
        </TouchableOpacity>
        
        <View style={styles.step}>
          <Text style={styles.stepNumber}>2.</Text>
          <Text style={styles.stepText}>Open the file: src/api/weatherApi.ts</Text>
        </View>
        
        <View style={styles.step}>
          <Text style={styles.stepNumber}>3.</Text>
          <Text style={styles.stepText}>Replace 'YOUR_OPENWEATHER_API_KEY' with your actual API key</Text>
        </View>
        
        <View style={styles.codeExample}>
          <Text style={styles.codeTitle}>Example:</Text>
          <Text style={styles.codeText}>
            const API_KEY = 'your_actual_api_key_here';
          </Text>
        </View>
        
        <View style={styles.step}>
          <Text style={styles.stepNumber}>4.</Text>
          <Text style={styles.stepText}>Save the file and restart the app</Text>
        </View>
      </View>
      
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryButtonText}>I've Added My API Key - Retry</Text>
        </TouchableOpacity>
      )}
      
      <View style={styles.noteContainer}>
        <Text style={styles.noteTitle}>📝 Note:</Text>
        <Text style={styles.noteText}>
          The free tier includes 1,000 API calls per day, which is more than enough for personal use.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.large,
    backgroundColor: colors.background,
    justifyContent: 'center',
  },
  icon: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: spacing.large,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.medium,
  },
  message: {
    fontSize: fontSize.medium,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.large,
  },
  stepsContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.medium,
    padding: spacing.large,
    marginBottom: spacing.large,
  },
  stepsTitle: {
    fontSize: fontSize.large,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.medium,
  },
  step: {
    flexDirection: 'row',
    marginBottom: spacing.medium,
    alignItems: 'flex-start',
  },
  stepNumber: {
    fontSize: fontSize.medium,
    fontWeight: 'bold',
    color: colors.primary,
    marginRight: spacing.small,
    minWidth: 20,
  },
  stepText: {
    fontSize: fontSize.medium,
    color: colors.text,
    flex: 1,
    lineHeight: 22,
  },
  linkButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.medium,
    padding: spacing.medium,
    alignItems: 'center',
    marginVertical: spacing.small,
    marginLeft: 20,
  },
  linkButtonText: {
    color: colors.surface,
    fontSize: fontSize.medium,
    fontWeight: '600',
  },
  codeExample: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: borderRadius.small,
    padding: spacing.medium,
    marginVertical: spacing.small,
    marginLeft: 20,
  },
  codeTitle: {
    fontSize: fontSize.small,
    fontWeight: 'bold',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  codeText: {
    fontSize: fontSize.small,
    fontFamily: 'monospace',
    color: colors.text,
  },
  retryButton: {
    backgroundColor: colors.success,
    borderRadius: borderRadius.medium,
    padding: spacing.large,
    alignItems: 'center',
    marginBottom: spacing.large,
  },
  retryButtonText: {
    color: colors.surface,
    fontSize: fontSize.medium,
    fontWeight: 'bold',
  },
  noteContainer: {
    backgroundColor: colors.info + '20',
    borderRadius: borderRadius.medium,
    padding: spacing.medium,
    borderLeftWidth: 4,
    borderLeftColor: colors.info,
  },
  noteTitle: {
    fontSize: fontSize.medium,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  noteText: {
    fontSize: fontSize.small,
    color: colors.text,
    lineHeight: 20,
  },
});