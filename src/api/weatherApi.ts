import { OPENWEATHER_BASE_URL } from '../constants/endpoints';

// ⚠️ IMPORTANT: Replace this with your actual OpenWeatherMap API key
// Get your free API key from: https://openweathermap.org/api
const API_KEY = '38be004aa596b66103544147c212ea99';

// Check if API key is configured
const isApiKeyConfigured = () => {
  return API_KEY !== 'YOUR_OPENWEATHER_API_KEY' && API_KEY.length > 0;
};

const handleApiResponse = async (response: Response, endpoint: string) => {
  if (!response.ok) {
    let errorMessage = `Failed to fetch data from ${endpoint}`;
    
    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch (e) {
      // If we can't parse the error response, use the status
      errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    }
    
    // Special handling for common errors
    if (response.status === 401) {
      errorMessage = 'Invalid API key. Please check your OpenWeatherMap API key.';
    } else if (response.status === 404) {
      errorMessage = 'Location not found. Please check the city name.';
    } else if (response.status === 429) {
      errorMessage = 'API rate limit exceeded. Please try again later.';
    }
    
    throw new Error(errorMessage);
  }
  
  return response.json();
};

export const fetchWeatherByCity = async (city: string, units = 'metric') => {
  if (!isApiKeyConfigured()) {
    throw new Error('API key not configured. Please add your OpenWeatherMap API key in src/api/weatherApi.ts');
  }
  
  if (!city.trim()) {
    throw new Error('City name is required');
  }
  
  try {
    const url = `${OPENWEATHER_BASE_URL}/weather?q=${encodeURIComponent(city)}&units=${units}&appid=${API_KEY}`;
    console.log('Fetching weather for city:', city);
    
    const response = await fetch(url);
    return await handleApiResponse(response, 'current weather');
  } catch (error) {
    console.error('Error fetching weather by city:', error);
    throw error;
  }
};

export const fetchForecastByCity = async (city: string, units = 'metric') => {
  if (!isApiKeyConfigured()) {
    throw new Error('API key not configured. Please add your OpenWeatherMap API key in src/api/weatherApi.ts');
  }
  
  if (!city.trim()) {
    throw new Error('City name is required');
  }
  
  try {
    const url = `${OPENWEATHER_BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=${units}&appid=${API_KEY}`;
    console.log('Fetching forecast for city:', city);
    
    const response = await fetch(url);
    return await handleApiResponse(response, 'forecast');
  } catch (error) {
    console.error('Error fetching forecast by city:', error);
    throw error;
  }
};

export const fetchWeatherByCoordinates = async (lat: number, lon: number, units = 'metric') => {
  if (!isApiKeyConfigured()) {
    throw new Error('API key not configured. Please add your OpenWeatherMap API key in src/api/weatherApi.ts');
  }
  
  if (typeof lat !== 'number' || typeof lon !== 'number') {
    throw new Error('Invalid coordinates provided');
  }
  
  try {
    const url = `${OPENWEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;
    console.log('Fetching weather for coordinates:', lat, lon);
    
    const response = await fetch(url);
    return await handleApiResponse(response, 'current weather');
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error);
    throw error;
  }
};

export const fetchForecastByCoordinates = async (lat: number, lon: number, units = 'metric') => {
  if (!isApiKeyConfigured()) {
    throw new Error('API key not configured. Please add your OpenWeatherMap API key in src/api/weatherApi.ts');
  }
  
  if (typeof lat !== 'number' || typeof lon !== 'number') {
    throw new Error('Invalid coordinates provided');
  }
  
  try {
    const url = `${OPENWEATHER_BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;
    console.log('Fetching forecast for coordinates:', lat, lon);
    
    const response = await fetch(url);
    return await handleApiResponse(response, 'forecast');
  } catch (error) {
    console.error('Error fetching forecast by coordinates:', error);
    throw error;
  }
};

export const getWeatherIconUrl = (iconCode: string, size = '2x') => {
  return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
};

// Export for testing purposes
export { isApiKeyConfigured };