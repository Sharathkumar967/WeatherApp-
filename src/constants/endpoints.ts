export const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';
export const OPENWEATHER_GEO_URL = 'https://api.openweathermap.org/geo/1.0';

// You need to get your API key from https://openweathermap.org/api
export const OPENWEATHER_API_KEY = 'c3634100910d1ac491df17235cff10de';

export const ENDPOINTS = {
  CURRENT_WEATHER: `${OPENWEATHER_BASE_URL}/weather`,
  FORECAST: `${OPENWEATHER_BASE_URL}/forecast`,
  GEOCODING: `${OPENWEATHER_GEO_URL}/direct`,
  REVERSE_GEOCODING: `${OPENWEATHER_GEO_URL}/reverse`,
};

export const WEATHER_ICON_URL = 'https://openweathermap.org/img/wn';