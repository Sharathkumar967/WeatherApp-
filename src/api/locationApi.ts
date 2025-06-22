import axios from 'axios';
import { ENDPOINTS, OPENWEATHER_API_KEY } from '../constants/endpoints';
import { ApiResponse, LocationData } from '../types/api';

// Create axios instance for location API
const locationApi = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add API key
locationApi.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    appid: OPENWEATHER_API_KEY,
  };
  return config;
});

export const searchLocationsByName = async (
  query: string,
  limit: number = 5
): Promise<ApiResponse<LocationData[]>> => {
  try {
    const response = await locationApi.get(ENDPOINTS.GEOCODING, {
      params: {
        q: query,
        limit,
      },
    });
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to search locations',
    };
  }
};

export const getLocationByCoordinates = async (
  lat: number,
  lon: number,
  limit: number = 1
): Promise<ApiResponse<LocationData[]>> => {
  try {
    const response = await locationApi.get(ENDPOINTS.REVERSE_GEOCODING, {
      params: {
        lat,
        lon,
        limit,
      },
    });
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to get location data',
    };
  }
};