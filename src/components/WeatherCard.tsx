import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { WeatherData } from '../types/weather';
import { colors, spacing, fontSize, borderRadius } from '../theme';
import { getWeatherIconUrl } from '../api/weatherApi';

interface WeatherCardProps {
  weather: WeatherData;
  unit: 'metric' | 'imperial';
}

export default function WeatherCard({ weather, unit }: WeatherCardProps) {
  const mainWeather = weather.weather[0];
  const tempSymbol = unit === 'metric' ? '°C' : '°F';
  const windUnit = unit === 'metric' ? 'm/s' : 'mph';

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.cityName}>{weather.name}</Text>
        <Text style={styles.country}>{weather.sys.country}</Text>
      </View>

      {/* Main Weather */}
      <View style={styles.mainWeather}>
        <View style={styles.temperatureSection}>
          <Text style={styles.temperature}>
            {Math.round(weather.main.temp)}{tempSymbol}
          </Text>
          <Text style={styles.feelsLike}>
            Feels like {Math.round(weather.main.feels_like)}{tempSymbol}
          </Text>
        </View>

        <View style={styles.weatherInfo}>
          <Image
            source={{ uri: getWeatherIconUrl(mainWeather.icon) }}
            style={styles.weatherIcon}
            resizeMode="contain"
          />
          <Text style={styles.condition}>{mainWeather.main}</Text>
          <Text style={styles.description}>{mainWeather.description}</Text>
        </View>
      </View>

      {/* Weather Details */}
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <WeatherDetail icon="💧" label="Humidity" value={`${weather.main.humidity}%`} />
          <WeatherDetail icon="💨" label="Wind" value={`${weather.wind.speed} ${windUnit}`} />
        </View>
        <View style={styles.detailRow}>
          <WeatherDetail icon="🌡️" label="Pressure" value={`${weather.main.pressure} hPa`} />
          <WeatherDetail icon="👁️" label="Visibility" value={`${(weather.visibility / 1000).toFixed(1)} km`} />
        </View>
      </View>

      {/* Temperature Range */}
      <View style={styles.tempRange}>
        <Text style={styles.tempRangeText}>
          H: {Math.round(weather.main.temp_max)}{tempSymbol}
        </Text>
        <Text style={styles.tempRangeText}>
          L: {Math.round(weather.main.temp_min)}{tempSymbol}
        </Text>
      </View>
    </View>
  );
}

function WeatherDetail({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.detailItem}>
      <Text style={styles.detailIcon}>{icon}</Text>
      <View>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.large,
    padding: spacing.large,
    margin: spacing.medium,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.large,
  },
  cityName: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.text,
  },
  country: {
    fontSize: fontSize.medium,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  mainWeather: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.large,
  },
  temperatureSection: {
    flex: 1,
  },
  temperature: {
    fontSize: fontSize.hero,
    fontWeight: 'bold',
    color: colors.text,
  },
  feelsLike: {
    fontSize: fontSize.medium,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  weatherInfo: {
    alignItems: 'center',
    flex: 1,
  },
  weatherIcon: {
    width: 80,
    height: 80,
  },
  condition: {
    fontSize: fontSize.large,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  description: {
    fontSize: fontSize.medium,
    color: colors.textSecondary,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  details: {
    marginBottom: spacing.large,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.medium,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  detailIcon: {
    fontSize: fontSize.large,
    marginRight: spacing.small,
  },
  detailLabel: {
    fontSize: fontSize.small,
    color: colors.textSecondary,
  },
  detailValue: {
    fontSize: fontSize.medium,
    fontWeight: '600',
    color: colors.text,
  },
  tempRange: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: spacing.medium,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  tempRangeText: {
    fontSize: fontSize.medium,
    fontWeight: '600',
    color: colors.textSecondary,
    marginHorizontal: spacing.medium,
  },
});