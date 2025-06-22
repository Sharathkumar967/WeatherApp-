import React, { useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  FlatList,
  RefreshControl 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ForecastItem from '../components/ForecastItem';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';
import { useWeather } from '../hooks/useWeather';
import { colors, spacing, fontSize } from '../theme';

export default function ForecastScreen() {
  const { 
    forecast, 
    currentWeather,
    loading, 
    error, 
    unit,
    refreshWeatherData,
    clearError
  } = useWeather();

  // Process forecast data to get daily forecasts
  const dailyForecasts = useMemo(() => {
    if (!forecast) return [];

    const dailyData: { [key: string]: any } = {};

    forecast.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toDateString();

      if (!dailyData[dateKey]) {
        dailyData[dateKey] = {
          date: dateKey,
          day: date.toLocaleDateString([], { weekday: 'short' }),
          tempMax: item.main.temp_max,
          tempMin: item.main.temp_min,
          condition: item.weather[0].main,
          icon: item.weather[0].icon,
        };
      } else {
        dailyData[dateKey].tempMax = Math.max(dailyData[dateKey].tempMax, item.main.temp_max);
        dailyData[dateKey].tempMin = Math.min(dailyData[dateKey].tempMin, item.main.temp_min);
      }
    });

    return Object.values(dailyData).slice(0, 5);
  }, [forecast]);

  const handleRefresh = async () => {
    await refreshWeatherData();
  };

  const handleRetry = () => {
    clearError();
    handleRefresh();
  };

  if (loading && !forecast) {
    return <LoadingSpinner message="Loading forecast..." />;
  }

  if (error && !forecast) {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorDisplay message={error} onRetry={handleRetry} />
      </SafeAreaView>
    );
  }

  if (!forecast) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📅</Text>
          <Text style={styles.emptyTitle}>No Forecast Data</Text>
          <Text style={styles.emptyMessage}>
            Please search for a location first to view the forecast
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>5-Day Forecast</Text>
        {currentWeather && (
          <Text style={styles.location}>
            {currentWeather.name}, {currentWeather.sys.country}
          </Text>
        )}
      </View>

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
        {error && (
          <ErrorDisplay message={error} onRetry={handleRetry} />
        )}

        {/* Horizontal Forecast List */}
        {dailyForecasts.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Daily Overview</Text>
            <FlatList
              data={dailyForecasts}
              keyExtractor={(item) => item.date}
              renderItem={({ item }) => (
                <ForecastItem
                  day={item.day}
                  tempMax={item.tempMax}
                  tempMin={item.tempMin}
                  condition={item.condition}
                  icon={item.icon}
                  unit={unit}
                  isHorizontal
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />

            {/* Detailed Forecast List */}
            <Text style={styles.sectionTitle}>Detailed Forecast</Text>
            {dailyForecasts.map((item, index) => (
              <ForecastItem
                key={item.date}
                day={item.day}
                tempMax={item.tempMax}
                tempMin={item.tempMin}
                condition={item.condition}
                icon={item.icon}
                unit={unit}
              />
            ))}
          </>
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
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.text,
  },
  location: {
    fontSize: fontSize.medium,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: fontSize.large,
    fontWeight: '600',
    color: colors.text,
    marginHorizontal: spacing.medium,
    marginTop: spacing.large,
    marginBottom: spacing.medium,
  },
  horizontalList: {
    paddingHorizontal: spacing.medium,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.large,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing.large,
  },
  emptyTitle: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.medium,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: fontSize.medium,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});