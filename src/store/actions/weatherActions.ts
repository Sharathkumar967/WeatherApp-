import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWeatherByCity, fetchWeatherByCoordinates, fetchForecastByCity, fetchForecastByCoordinates } from '../../api/weatherApi';
import { TemperatureUnit } from '../../constants/units';
import { saveWeatherData, saveForecastData, saveLastLocation } from '../../utils/storage';

// Async thunk for fetching weather by city
export const fetchWeatherByCityAsync = createAsyncThunk(
  'weather/fetchByCity',
  async ({ city, units }: { city: string; units: TemperatureUnit }, { rejectWithValue }) => {
    try {
      const weatherResponse = await fetchWeatherByCity(city, units);
      if (!weatherResponse.success) {
        return rejectWithValue(weatherResponse.error);
      }

      const forecastResponse = await fetchForecastByCity(city, units);
      if (!forecastResponse.success) {
        return rejectWithValue(forecastResponse.error);
      }

      // Save to storage for offline access
      await saveWeatherData(weatherResponse.data!);
      await saveForecastData(forecastResponse.data!);
      await saveLastLocation(city);

      return {
        weather: weatherResponse.data,
        forecast: forecastResponse.data,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch weather data');
    }
  }
);

// Async thunk for fetching weather by coordinates
export const fetchWeatherByCoordinatesAsync = createAsyncThunk(
  'weather/fetchByCoordinates',
  async ({ lat, lon, units }: { lat: number; lon: number; units: TemperatureUnit }, { rejectWithValue }) => {
    try {
      const weatherResponse = await fetchWeatherByCoordinates(lat, lon, units);
      if (!weatherResponse.success) {
        return rejectWithValue(weatherResponse.error);
      }

      const forecastResponse = await fetchForecastByCoordinates(lat, lon, units);
      if (!forecastResponse.success) {
        return rejectWithValue(forecastResponse.error);
      }

      // Save to storage for offline access
      await saveWeatherData(weatherResponse.data!);
      await saveForecastData(forecastResponse.data!);

      return {
        weather: weatherResponse.data,
        forecast: forecastResponse.data,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch weather data');
    }
  }
);

// Async thunk for refreshing weather data
export const refreshWeatherData = createAsyncThunk(
  'weather/refresh',
  async ({ city, lat, lon, units }: { 
    city?: string; 
    lat?: number; 
    lon?: number; 
    units: TemperatureUnit 
  }, { rejectWithValue }) => {
    try {
      if (city) {
        return await fetchWeatherByCityAsync({ city, units });
      } else if (lat !== undefined && lon !== undefined) {
        return await fetchWeatherByCoordinatesAsync({ lat, lon, units });
      } else {
        return rejectWithValue('No location data provided');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to refresh weather data');
    }
  }
);