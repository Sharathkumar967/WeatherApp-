import { celsiusToFahrenheit, fahrenheitToCelsius, formatTemperature } from '../../src/utils/unitConverter';

describe('Unit Converter', () => {
  describe('celsiusToFahrenheit', () => {
    it('converts 0°C to 32°F', () => {
      expect(celsiusToFahrenheit(0)).toBe(32);
    });

    it('converts 100°C to 212°F', () => {
      expect(celsiusToFahrenheit(100)).toBe(212);
    });

    it('converts 25°C to 77°F', () => {
      expect(celsiusToFahrenheit(25)).toBe(77);
    });

    it('converts negative temperatures correctly', () => {
      expect(celsiusToFahrenheit(-10)).toBe(14);
    });
  });

  describe('fahrenheitToCelsius', () => {
    it('converts 32°F to 0°C', () => {
      expect(fahrenheitToCelsius(32)).toBe(0);
    });

    it('converts 212°F to 100°C', () => {
      expect(fahrenheitToCelsius(212)).toBe(100);
    });

    it('converts 77°F to 25°C', () => {
      expect(fahrenheitToCelsius(77)).toBe(25);
    });

    it('converts negative temperatures correctly', () => {
      expect(fahrenheitToCelsius(14)).toBe(-10);
    });
  });

  describe('formatTemperature', () => {
    it('formats metric temperature correctly', () => {
      expect(formatTemperature(25.7, 'metric')).toBe('26°C');
    });

    it('formats imperial temperature correctly', () => {
      expect(formatTemperature(77.5, 'imperial')).toBe('78°F');
    });

    it('rounds temperatures correctly', () => {
      expect(formatTemperature(25.4, 'metric')).toBe('25°C');
      expect(formatTemperature(25.6, 'metric')).toBe('26°C');
    });
  });
});