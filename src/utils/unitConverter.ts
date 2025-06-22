import { TemperatureUnit } from '../constants/units';

export const celsiusToFahrenheit = (c: number): number => (c * 9) / 5 + 32;
export const fahrenheitToCelsius = (f: number): number => ((f - 32) * 5) / 9;

export const convertTemperature = (
  temp: number,
  fromUnit: TemperatureUnit,
  toUnit: TemperatureUnit
): number => {
  if (fromUnit === toUnit) return temp;
  
  if (fromUnit === 'metric' && toUnit === 'imperial') {
    return celsiusToFahrenheit(temp);
  }
  
  if (fromUnit === 'imperial' && toUnit === 'metric') {
    return fahrenheitToCelsius(temp);
  }
  
  return temp;
};

export const formatTemperature = (temp: number, unit: TemperatureUnit): string => {
  const symbol = unit === 'metric' ? '°C' : '°F';
  return `${Math.round(temp)}${symbol}`;
};

export const convertWindSpeed = (speed: number, fromUnit: TemperatureUnit, toUnit: TemperatureUnit): number => {
  if (fromUnit === toUnit) return speed;
  
  // OpenWeatherMap returns m/s for metric and mph for imperial
  if (fromUnit === 'metric' && toUnit === 'imperial') {
    return speed * 2.237; // m/s to mph
  }
  
  if (fromUnit === 'imperial' && toUnit === 'metric') {
    return speed / 2.237; // mph to m/s
  }
  
  return speed;
};

export const formatWindSpeed = (speed: number, unit: TemperatureUnit): string => {
  const unitLabel = unit === 'metric' ? 'm/s' : 'mph';
  return `${Math.round(speed * 10) / 10} ${unitLabel}`;
};