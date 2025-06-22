import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeatherData, ForecastData } from '../types/weather';
import { TemperatureUnit } from '../constants/units';

// Storage keys
export const STORAGE_KEYS = {
  WEATHER_DATA: 'weather_data',
  FORECAST_DATA: 'forecast_data',
  TEMPERATURE_UNIT: 'temperature_unit',
  LAST_LOCATION: 'last_location',
  FAVORITE_LOCATIONS: 'favorite_locations',
  LAST_UPDATE: 'last_update',
} as const;

export const saveToStorage = async (key: string, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('Error saving to storage:', error);
    throw error;
  }
};

export const getFromStorage = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error('Error getting from storage:', error);
    return null;
  }
};

export const saveObjectToStorage = async <T>(key: string, value: T): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error saving object to storage:', error);
    throw error;
  }
};

export const getObjectFromStorage = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error getting object from storage:', error);
    return null;
  }
};

export const removeFromStorage = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from storage:', error);
    throw error;
  }
};

export const clearStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing storage:', error);
    throw error;
  }
};

export const clearAllStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing all storage:', error);
    throw error;
  }
};

// Specific storage functions for weather app
export const saveWeatherData = async (data: WeatherData): Promise<void> => {
  await saveObjectToStorage(STORAGE_KEYS.WEATHER_DATA, data);
};

export const getWeatherData = async (): Promise<WeatherData | null> => {
  return await getObjectFromStorage<WeatherData>(STORAGE_KEYS.WEATHER_DATA);
};

export const saveForecastData = async (data: ForecastData): Promise<void> => {
  await saveObjectToStorage(STORAGE_KEYS.FORECAST_DATA, data);
};

export const getForecastData = async (): Promise<ForecastData | null> => {
  return await getObjectFromStorage<ForecastData>(STORAGE_KEYS.FORECAST_DATA);
};

export const saveTemperatureUnit = async (unit: TemperatureUnit): Promise<void> => {
  await saveToStorage(STORAGE_KEYS.TEMPERATURE_UNIT, unit);
};

export const getTemperatureUnit = async (): Promise<TemperatureUnit> => {
  const unit = await getFromStorage(STORAGE_KEYS.TEMPERATURE_UNIT);
  return (unit as TemperatureUnit) || 'metric';
};

export const saveLastLocation = async (location: string): Promise<void> => {
  await saveToStorage(STORAGE_KEYS.LAST_LOCATION, location);
};

export const getLastLocation = async (): Promise<string | null> => {
  return await getFromStorage(STORAGE_KEYS.LAST_LOCATION);
};