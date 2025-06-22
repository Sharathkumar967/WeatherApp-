import React from 'react';
import { render } from '@testing-library/react-native';
import WeatherCard from '../../src/components/WeatherCard';
import { WeatherData } from '../../src/types/weather';

const mockWeatherData: WeatherData = {
  id: 1,
  name: 'London',
  coord: { lat: 51.5074, lon: -0.1278 },
  main: {
    temp: 20,
    feels_like: 22,
    temp_min: 18,
    temp_max: 24,
    pressure: 1013,
    humidity: 65,
  },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d',
    },
  ],
  wind: {
    speed: 3.5,
    deg: 180,
  },
  clouds: {
    all: 0,
  },
  dt: 1640995200,
  sys: {
    type: 1,
    id: 1414,
    country: 'GB',
    sunrise: 1640937600,
    sunset: 1640966400,
  },
  timezone: 0,
  visibility: 10000,
};

describe('WeatherCard', () => {
  it('renders weather data correctly in metric units', () => {
    const { getByText } = render(
      <WeatherCard weather={mockWeatherData} unit="metric" />
    );

    expect(getByText('London')).toBeTruthy();
    expect(getByText('GB')).toBeTruthy();
    expect(getByText('20°C')).toBeTruthy();
    expect(getByText('Feels like 22°C')).toBeTruthy();
    expect(getByText('Clear')).toBeTruthy();
    expect(getByText('clear sky')).toBeTruthy();
    expect(getByText('65%')).toBeTruthy();
    expect(getByText('3.5 m/s')).toBeTruthy();
  });

  it('renders weather data correctly in imperial units', () => {
    const { getByText } = render(
      <WeatherCard weather={mockWeatherData} unit="imperial" />
    );

    expect(getByText('London')).toBeTruthy();
    expect(getByText('GB')).toBeTruthy();
    expect(getByText('20°F')).toBeTruthy();
    expect(getByText('Feels like 22°F')).toBeTruthy();
    expect(getByText('3.5 mph')).toBeTruthy();
  });

  it('displays temperature range correctly', () => {
    const { getByText } = render(
      <WeatherCard weather={mockWeatherData} unit="metric" />
    );

    expect(getByText('H: 24°C')).toBeTruthy();
    expect(getByText('L: 18°C')).toBeTruthy();
  });
});