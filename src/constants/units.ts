export const UNIT_LABELS = {
  metric: 'Celsius',
  imperial: 'Fahrenheit',
};

export const UNIT_SYMBOLS = {
  metric: '°C',
  imperial: '°F',
};

export const SPEED_UNITS = {
  metric: 'm/s',
  imperial: 'mph',
};

export const PRESSURE_UNIT = 'hPa';
export const HUMIDITY_UNIT = '%';

export const DEFAULT_UNIT = 'metric' as const;

export type TemperatureUnit = 'metric' | 'imperial';