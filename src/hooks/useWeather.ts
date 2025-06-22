import { useWeatherContext } from '../context/useWeatherContext';
import { useLocation } from './useLocation';
import { useConnectivity } from './useConnectivity';
import { useCallback } from 'react';

export const useWeather = () => {
  const weatherContext = useWeatherContext();
  const { getCurrentPosition } = useLocation();
  const { isConnected } = useConnectivity();

  const fetchWeatherForCurrentLocation = useCallback(async () => {
    try {
      const position = await getCurrentPosition();
      if (position) {
        await weatherContext.fetchWeatherByLocation(
          position.latitude,
          position.longitude
        );
      }
    } catch (error) {
      console.error('Error fetching weather for current location:', error);
    }
  }, [getCurrentPosition, weatherContext]);

  const searchWeatherByCity = useCallback(async (city: string) => {
    if (!city.trim()) return;
    
    try {
      weatherContext.setCity(city.trim());
    } catch (error) {
      console.error('Error searching weather by city:', error);
    }
  }, [weatherContext]);

  const refreshWeatherData = useCallback(async () => {
    await weatherContext.refreshWeather();
  }, [weatherContext]);

  return {
    currentWeather: weatherContext.weather,
    forecast: weatherContext.forecast,
    loading: weatherContext.loading,
    error: weatherContext.error,
    unit: weatherContext.unit,
    searchHistory: weatherContext.searchHistory,
    isConnected,
    fetchWeatherForCurrentLocation,
    searchWeatherByCity,
    refreshWeatherData,
    setTemperatureUnit: weatherContext.setUnit,
    clearError: weatherContext.clearError,
    clearAllData: weatherContext.clearAllData,
  };
};