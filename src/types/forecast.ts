export interface ForecastItem {
  date: string;
  temp: {
    min: number;
    max: number;
  };
  condition: string;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export interface DailyForecast {
  date: string;
  dayName: string;
  temp: {
    min: number;
    max: number;
  };
  condition: string;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pop: number; // Probability of precipitation
}