import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TemperatureUnit } from '../../constants/units';

interface SettingsState {
  temperatureUnit: TemperatureUnit;
  locationPermissionGranted: boolean;
  notificationsEnabled: boolean;
  autoRefresh: boolean;
  refreshInterval: number; // in minutes
  theme: 'light' | 'dark' | 'auto';
  language: string;
}

const initialState: SettingsState = {
  temperatureUnit: 'metric',
  locationPermissionGranted: false,
  notificationsEnabled: true,
  autoRefresh: true,
  refreshInterval: 30,
  theme: 'auto',
  language: 'en',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTemperatureUnit: (state, action: PayloadAction<TemperatureUnit>) => {
      state.temperatureUnit = action.payload;
    },
    setLocationPermission: (state, action: PayloadAction<boolean>) => {
      state.locationPermissionGranted = action.payload;
    },
    setNotificationsEnabled: (state, action: PayloadAction<boolean>) => {
      state.notificationsEnabled = action.payload;
    },
    setAutoRefresh: (state, action: PayloadAction<boolean>) => {
      state.autoRefresh = action.payload;
    },
    setRefreshInterval: (state, action: PayloadAction<number>) => {
      state.refreshInterval = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'auto'>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    resetSettings: () => initialState,
  },
});

export const {
  setTemperatureUnit,
  setLocationPermission,
  setNotificationsEnabled,
  setAutoRefresh,
  setRefreshInterval,
  setTheme,
  setLanguage,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;