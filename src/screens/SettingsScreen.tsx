import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TemperatureToggle from '../components/TemperatureToggle';
import { useWeather } from '../hooks/useWeather';
import { colors, spacing, fontSize, borderRadius } from '../theme';

export default function SettingsScreen() {
  const { unit, setTemperatureUnit, searchHistory, clearAllData } = useWeather();

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will clear all saved weather data and search history. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: async () => {
            try {
              await clearAllData();
              Alert.alert(
                'Success', 
                'All data has been cleared successfully!',
                [{ text: 'OK' }]
              );
            } catch (error) {
              console.error('Error clearing data:', error);
              Alert.alert(
                'Error', 
                'Failed to clear data. Please try again.',
                [{ text: 'OK' }]
              );
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Temperature Unit Setting */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Temperature Unit</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Choose your preferred temperature unit</Text>
            <TemperatureToggle unit={unit} onToggle={setTemperatureUnit} />
          </View>
        </View>

        {/* Search History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Search History</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>
              Recent searches: {searchHistory.length} cities
            </Text>
            {searchHistory.length > 0 && (
              <View style={styles.historyList}>
                {searchHistory.slice(0, 5).map((city, index) => (
                  <Text key={index} style={styles.historyItem}>
                    • {city}
                  </Text>
                ))}
                {searchHistory.length > 5 && (
                  <Text style={styles.historyMore}>
                    and {searchHistory.length - 5} more...
                  </Text>
                )}
              </View>
            )}
          </View>
        </View>

        {/* App Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Weather App</Text>
            <Text style={styles.settingValue}>Version 1.0.0</Text>
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Data Source</Text>
            <Text style={styles.settingValue}>OpenWeatherMap API</Text>
          </View>
        </View>

        {/* Data Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          <TouchableOpacity style={styles.dangerButton} onPress={handleClearData}>
            <Text style={styles.dangerButtonText}>Clear All Data</Text>
          </TouchableOpacity>
          <Text style={styles.dangerNote}>
            This will remove all saved weather data and search history
          </Text>
        </View>

        {/* API Key Notice */}
        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Setup</Text>
          <View style={styles.noticeCard}>
            <Text style={styles.noticeTitle}>⚠️ API Key Required</Text>
            <Text style={styles.noticeText}>
              To use this app, you need to add your OpenWeatherMap API key in the api/weatherApi.ts file.
              {'\n\n'}
              1. Get a free API key from openweathermap.org
              {'\n'}
              2. Replace 'YOUR_OPENWEATHER_API_KEY' with your actual API key
            </Text>
          </View>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.medium,
  },
  section: {
    marginBottom: spacing.large,
  },
  sectionTitle: {
    fontSize: fontSize.large,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.medium,
  },
  settingItem: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.medium,
    padding: spacing.medium,
    marginBottom: spacing.small,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  settingLabel: {
    fontSize: fontSize.medium,
    color: colors.text,
    marginBottom: spacing.small,
  },
  settingValue: {
    fontSize: fontSize.medium,
    color: colors.textSecondary,
  },
  historyList: {
    marginTop: spacing.small,
  },
  historyItem: {
    fontSize: fontSize.small,
    color: colors.textSecondary,
    marginBottom: spacing.xs / 2,
  },
  historyMore: {
    fontSize: fontSize.small,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: spacing.xs,
  },
  dangerButton: {
    backgroundColor: colors.error,
    borderRadius: borderRadius.medium,
    padding: spacing.medium,
    alignItems: 'center',
    marginBottom: spacing.small,
  },
  dangerButtonText: {
    color: colors.surface,
    fontSize: fontSize.medium,
    fontWeight: '600',
  },
  dangerNote: {
    fontSize: fontSize.small,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  noticeCard: {
    backgroundColor: colors.warning + '20',
    borderRadius: borderRadius.medium,
    padding: spacing.medium,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  noticeTitle: {
    fontSize: fontSize.medium,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.small,
  },
  noticeText: {
    fontSize: fontSize.small,
    color: colors.text,
    lineHeight: 20,
  },
});