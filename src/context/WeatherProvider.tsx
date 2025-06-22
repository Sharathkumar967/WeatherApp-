import React, { createContext, useState, useEffect } from 'react';
import { fetchWeatherByCity, fetchForecastByCity, fetchWeatherByCoordinates, fetchForecastByCoordinates } from '../api/weatherApi';
import { WeatherData, ForecastData } from '../types/weather';
import { saveToStorage, getFromStorage } from '../utils/storage';

interface WeatherContextType {
  weather: WeatherData | null;
  forecast: ForecastData | null;
  unit: 'metric' | 'imperial';
  loading: boolean;
  error: string;
  searchHistory: string[];
  setCity: (city: string) => void;
  setUnit: (unit: 'metric' | 'imperial') => void;
  fetchWeatherByLocation: (lat: number, lon: number) => Promise<void>;
  refreshWeather: () => Promise<void>;
  clearError: () => void;
  clearAllData: () => Promise<void>;
}

export const WeatherContext = createContext<WeatherContextType | null>(null);

export const WeatherProvider = ({ children }: { children: React.ReactNode }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Load saved data on mount
  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      const savedUnit = await getFromStorage('temperatureUnit');
      const savedWeather = await getFromStorage('weatherData');
      const savedForecast = await getFromStorage('forecastData');
      const savedHistory = await getFromStorage('searchHistory');
      
      if (savedUnit) setUnit(savedUnit as 'metric' | 'imperial');
      if (savedWeather) setWeather(JSON.parse(savedWeather));
      if (savedForecast) setForecast(JSON.parse(savedForecast));
      if (savedHistory) setSearchHistory(JSON.parse(savedHistory));
    } catch (err) {
      console.error('Error loading saved data:', err);
    }
  };

  const fetchWeather = async (cityName: string) => {
    try {
      setLoading(true);
      setError('');
      
      const [weatherData, forecastData] = await Promise.all([
        fetchWeatherByCity(cityName, unit),
        fetchForecastByCity(cityName, unit)
      ]);
      
      setWeather(weatherData);
      setForecast(forecastData);
      
      // Save to storage
      await saveToStorage('weatherData', JSON.stringify(weatherData));
      await saveToStorage('forecastData', JSON.stringify(forecastData));
      await saveToStorage('lastCity', cityName);
      
      // Update search history
      const newHistory = [cityName, ...searchHistory.filter(item => item !== cityName)].slice(0, 10);
      setSearchHistory(newHistory);
      await saveToStorage('searchHistory', JSON.stringify(newHistory));
      
    } catch (err: any) {
      setError(err.message || 'Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError('');
      
      const [weatherData, forecastData] = await Promise.all([
        fetchWeatherByCoordinates(lat, lon, unit),
        fetchForecastByCoordinates(lat, lon, unit)
      ]);
      
      setWeather(weatherData);
      setForecast(forecastData);
      
      // Save to storage
      await saveToStorage('weatherData', JSON.stringify(weatherData));
      await saveToStorage('forecastData', JSON.stringify(forecastData));
      
    } catch (err: any) {
      setError(err.message || 'Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  };

  const refreshWeather = async () => {
    if (city) {
      await fetchWeather(city);
    } else if (weather) {
      await fetchWeatherByLocation(weather.coord.lat, weather.coord.lon);
    }
  };

  const handleUnitChange = async (newUnit: 'metric' | 'imperial') => {
    setUnit(newUnit);
    await saveToStorage('temperatureUnit', newUnit);
    
    // Refresh weather data with new unit
    if (city) {
      await fetchWeather(city);
    } else if (weather) {
      await fetchWeatherByLocation(weather.coord.lat, weather.coord.lon);
    }
  };

  const clearError = () => {
    setError('');
  };

  const clearAllData = async () => {
    try {
      // Clear AsyncStorage
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      await AsyncStorage.clear();
      
      // Reset all state to initial values
      setWeather(null);
      setForecast(null);
      setUnit('metric');
      setCity('');
      setError('');
      setSearchHistory([]);
      setLoading(false);
      
      console.log('All data cleared successfully');
    } catch (error) {
      console.error('Error clearing all data:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (city) fetchWeather(city);
  }, [city]);

  const contextValue: WeatherContextType = {
    weather,
    forecast,
    unit,
    loading,
    error,
    searchHistory,
    setCity,
    setUnit: handleUnitChange,
    fetchWeatherByLocation,
    refreshWeather,
    clearError,
    clearAllData,
  };

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
};