export const colors = {
  // Primary colors
  primary: '#007AFF',
  primaryDark: '#0056CC',
  primaryLight: '#4DA3FF',
  
  // Background colors
  background: '#FFFFFF',
  backgroundSecondary: '#F8F9FA',
  backgroundDark: '#1C1C1E',
  backgroundSecondaryDark: '#2C2C2E',
  
  // Surface colors
  surface: '#FFFFFF',
  surfaceDark: '#2C2C2E',
  card: '#FFFFFF',
  cardDark: '#2C2C2E',
  
  // Text colors
  text: '#000000',
  textSecondary: '#6C6C70',
  textDark: '#FFFFFF',
  textSecondaryDark: '#AEAEB2',
  
  // Status colors
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
  info: '#007AFF',
  
  // Weather specific colors
  sunny: '#FFD60A',
  cloudy: '#8E8E93',
  rainy: '#007AFF',
  snowy: '#E5E5EA',
  stormy: '#5856D6',
  
  // Utility colors
  border: '#E5E5EA',
  borderDark: '#38383A',
  shadow: '#000000',
  overlay: 'rgba(0, 0, 0, 0.5)',
  
  // Gradient colors
  gradientStart: '#007AFF',
  gradientEnd: '#5856D6',
  
  // Temperature colors
  hot: '#FF3B30',
  warm: '#FF9500',
  mild: '#34C759',
  cool: '#007AFF',
  cold: '#5856D6',
};

export const getTemperatureColor = (temp: number, unit: 'metric' | 'imperial' = 'metric'): string => {
  const celsius = unit === 'imperial' ? (temp - 32) * 5 / 9 : temp;
  
  if (celsius >= 30) return colors.hot;
  if (celsius >= 20) return colors.warm;
  if (celsius >= 10) return colors.mild;
  if (celsius >= 0) return colors.cool;
  return colors.cold;
};

export const getWeatherColor = (condition: string): string => {
  const lowerCondition = condition.toLowerCase();
  
  if (lowerCondition.includes('clear') || lowerCondition.includes('sunny')) {
    return colors.sunny;
  }
  if (lowerCondition.includes('cloud')) {
    return colors.cloudy;
  }
  if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
    return colors.rainy;
  }
  if (lowerCondition.includes('snow')) {
    return colors.snowy;
  }
  if (lowerCondition.includes('storm') || lowerCondition.includes('thunder')) {
    return colors.stormy;
  }
  
  return colors.primary;
};