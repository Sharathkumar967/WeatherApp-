import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../theme';
import { getWeatherIconUrl } from '../api/weatherApi';

interface ForecastItemProps {
  day: string;
  tempMax: number;
  tempMin: number;
  condition: string;
  icon: string;
  unit: 'metric' | 'imperial';
  isHorizontal?: boolean;
}

export default function ForecastItem({ 
  day, 
  tempMax, 
  tempMin, 
  condition, 
  icon, 
  unit,
  isHorizontal = false 
}: ForecastItemProps) {
  const tempSymbol = unit === 'metric' ? '°C' : '°F';

  if (isHorizontal) {
    return (
      <View style={styles.horizontalItem}>
        <Text style={styles.horizontalDay}>{day}</Text>
        <Image
          source={{ uri: getWeatherIconUrl(icon) }}
          style={styles.horizontalIcon}
          resizeMode="contain"
        />
        <Text style={styles.horizontalTemp}>
          {Math.round(tempMax)}{tempSymbol}
        </Text>
        <Text style={styles.horizontalTempMin}>
          {Math.round(tempMin)}{tempSymbol}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.item}>
      <View style={styles.daySection}>
        <Text style={styles.day}>{day}</Text>
        <Text style={styles.condition}>{condition}</Text>
      </View>
      
      <Image
        source={{ uri: getWeatherIconUrl(icon) }}
        style={styles.icon}
        resizeMode="contain"
      />
      
      <View style={styles.tempSection}>
        <Text style={styles.tempMax}>
          {Math.round(tempMax)}{tempSymbol}
        </Text>
        <Text style={styles.tempMin}>
          {Math.round(tempMin)}{tempSymbol}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.medium,
    padding: spacing.medium,
    marginVertical: spacing.xs,
    marginHorizontal: spacing.medium,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  daySection: {
    flex: 1,
  },
  day: {
    fontWeight: 'bold',
    fontSize: fontSize.medium,
    color: colors.text,
  },
  condition: {
    fontSize: fontSize.small,
    color: colors.textSecondary,
    marginTop: spacing.xs / 2,
  },
  icon: {
    width: 50,
    height: 50,
    marginHorizontal: spacing.medium,
  },
  tempSection: {
    alignItems: 'flex-end',
  },
  tempMax: {
    fontSize: fontSize.medium,
    fontWeight: 'bold',
    color: colors.text,
  },
  tempMin: {
    fontSize: fontSize.small,
    color: colors.textSecondary,
    marginTop: spacing.xs / 2,
  },
  // Horizontal styles
  horizontalItem: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.medium,
    padding: spacing.medium,
    marginHorizontal: spacing.xs,
    alignItems: 'center',
    minWidth: 100,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  horizontalDay: {
    fontSize: fontSize.small,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  horizontalIcon: {
    width: 40,
    height: 40,
    marginBottom: spacing.xs,
  },
  horizontalTemp: {
    fontSize: fontSize.medium,
    fontWeight: 'bold',
    color: colors.text,
  },
  horizontalTempMin: {
    fontSize: fontSize.small,
    color: colors.textSecondary,
    marginTop: spacing.xs / 2,
  },
});