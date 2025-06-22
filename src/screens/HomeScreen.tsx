import React, { useState, useEffect } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  RefreshControl, 
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';
import TemperatureToggle from '../components/TemperatureToggle';
import ApiKeySetup from '../components/ApiKeySetup';
import { useWeather } from '../hooks/useWeather';
import { useLocation } from '../hooks/useLocation';
import { colors, spacing, fontSize } from '../theme';

export default function HomeScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showApiSetup, setShowApiSetup] = useState(false);
  
  const { 
    currentWeather, 
    loading, 
    error, 
    unit,
    searchHistory,
    fetchWeatherForCurrentLocation,
    searchWeatherByCity,
    refreshWeatherData,
    setTemperatureUnit,
    clearError
  } = useWeather();

  const { getCurrentPosition } = useLocation();

  useEffect(() => {
    // Check if the error is related to API key configuration
    if (error && error.includes('API key not configured')) {
      setShowApiSetup(true);
    } else {
      setShowApiSetup(false);
    }
  }, [error]);

  useEffect(() => {
    // Load weather for current location on app start if no weather data
    if (!currentWeather && !showApiSetup) {
      handleLocationPress();
    }
  }, [showApiSetup]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    setShowApiSetup(false);
    await searchWeatherByCity(query);
    setSearchQuery('');
  };

  const handleLocationPress = async () => {
    console.log('Location button pressed');
    
    try {
      setShowApiSetup(false);
      clearError();
      
      // Show immediate feedback
      Alert.alert(
        'Getting Location',
        'Requesting your current location...',
        [{ text: 'OK' }]
      );
      
      await fetchWeatherForCurrentLocation();
    } catch (error: any) {
      console.error('Error getting current location weather:', error);
      
      if (error.message && error.message.includes('API key not configured')) {
        setShowApiSetup(true);
      } else {
        const errorMessage = error.message || 'Unable to get your current location. Please try searching for a city instead.';
        Alert.alert(
          'Location Error', 
          errorMessage,
          [
            { text: 'Try Again', onPress: handleLocationPress },
            { text: 'Cancel', style: 'cancel' }
          ]
        );
      }
    }
  };

  const handleRefresh = async () => {
    setShowApiSetup(false);
    await refreshWeatherData();
  };

  const handleRetryError = () => {
    clearError();
    setShowApiSetup(false);
    if (currentWeather) {
      handleRefresh();
    } else {
      handleLocationPress();
    }
  };

  const handleApiSetupRetry = () => {
    setShowApiSetup(false);
    clearError();
    // Try to fetch weather again
    handleLocationPress();
  };

  const navigateToForecast = () => {
    if (currentWeather) {
      navigation.navigate('Forecast');
    }
  };

  const navigateToSettings = () => {
    navigation.navigate('Settings');
  };

  // Show API setup screen if API key is not configured
  if (showApiSetup) {
    return (
      <SafeAreaView style={styles.container}>
        <ApiKeySetup onRetry={handleApiSetupRetry} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Weather App</Text>
        <View style={styles.headerControls}>
          <TemperatureToggle 
            unit={unit} 
            onToggle={setTemperatureUnit}
          />
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={navigateToSettings}
          >
            <Text style={styles.settingsButtonText}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onSearch={handleSearch}
        onLocationPress={handleLocationPress}
        placeholder="Search for a city..."
      />

      {/* Content */}
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {loading && !currentWeather && (
          <LoadingSpinner message="Getting weather data..." />
        )}

        {error && !showApiSetup && (
          <ErrorDisplay
            message={error}
            onRetry={handleRetryError}
          />
        )}

        {currentWeather && (
          <>
            <WeatherCard weather={currentWeather} unit={unit} />
            
            {/* Forecast Button */}
            <TouchableOpacity 
              style={styles.forecastButton}
              onPress={navigateToForecast}
            >
              <Text style={styles.forecastButtonText}>
                View 5-Day Forecast →
              </Text>
            </TouchableOpacity>
          </>
        )}

        {!loading && !error && !currentWeather && !showApiSetup && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>🌤️</Text>
            <Text style={styles.emptyStateTitle}>Welcome to Weather App</Text>
            <Text style={styles.emptyStateMessage}>
              Search for a city or use your current location to get started
            </Text>
            <TouchableOpacity 
              style={styles.locationButton}
              onPress={handleLocationPress}
            >
              <Text style={styles.locationButtonText}>
                📍 Use Current Location
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.text,
  },
  headerControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsButton: {
    marginLeft: spacing.small,
    padding: spacing.small,
  },
  settingsButtonText: {
    fontSize: fontSize.large,
  },
  content: {
    flex: 1,
  },
  forecastButton: {
    backgroundColor: colors.primary,
    marginHorizontal: spacing.medium,
    marginVertical: spacing.small,
    paddingVertical: spacing.medium,
    borderRadius: 8,
    alignItems: 'center',
  },
  forecastButtonText: {
    color: colors.surface,
    fontSize: fontSize.medium,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.xxxl,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: spacing.large,
  },
  emptyStateTitle: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.medium,
    textAlign: 'center',
  },
  emptyStateMessage: {
    fontSize: fontSize.medium,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.large,
  },
  locationButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.medium,
    borderRadius: 8,
  },
  locationButtonText: {
    color: colors.surface,
    fontSize: fontSize.medium,
    fontWeight: '600',
  },
});