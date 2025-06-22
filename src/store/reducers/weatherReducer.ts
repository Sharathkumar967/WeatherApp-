import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeatherData, ForecastData } from '../../types/weather';

interface WeatherState {
  currentWeather: WeatherData | null;
  forecast: ForecastData | null;
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
  searchHistory: string[];
}

const initialState: WeatherState = {
  currentWeather: null,
  forecast: null,
  loading: false,
  error: null,
  lastUpdated: null,
  searchHistory: [],
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setCurrentWeather: (state, action: PayloadAction<WeatherData>) => {
      state.currentWeather = action.payload;
      state.loading = false;
      state.error = null;
      state.lastUpdated = Date.now();
    },
    setForecast: (state, action: PayloadAction<ForecastData>) => {
      state.forecast = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    addToSearchHistory: (state, action: PayloadAction<string>) => {
      const location = action.payload;
      // Remove if already exists
      state.searchHistory = state.searchHistory.filter(item => item !== location);
      // Add to beginning
      state.searchHistory.unshift(location);
      // Keep only last 10 searches
      state.searchHistory = state.searchHistory.slice(0, 10);
    },
    clearSearchHistory: (state) => {
      state.searchHistory = [];
    },
    clearWeatherData: (state) => {
      state.currentWeather = null;
      state.forecast = null;
      state.error = null;
      state.lastUpdated = null;
    },
  },
});

export const {
  setLoading,
  setCurrentWeather,
  setForecast,
  setError,
  clearError,
  addToSearchHistory,
  clearSearchHistory,
  clearWeatherData,
} = weatherSlice.actions;

export default weatherSlice.reducer;