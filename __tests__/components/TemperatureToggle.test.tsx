import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TemperatureToggle from '../../src/components/TemperatureToggle';

describe('TemperatureToggle', () => {
  it('renders correctly with metric unit selected', () => {
    const mockOnToggle = jest.fn();
    const { getByText } = render(
      <TemperatureToggle unit="metric" onToggle={mockOnToggle} />
    );

    expect(getByText('°C')).toBeTruthy();
    expect(getByText('°F')).toBeTruthy();
  });

  it('calls onToggle when Fahrenheit is pressed', () => {
    const mockOnToggle = jest.fn();
    const { getByText } = render(
      <TemperatureToggle unit="metric" onToggle={mockOnToggle} />
    );

    fireEvent.press(getByText('°F'));
    expect(mockOnToggle).toHaveBeenCalledWith('imperial');
  });

  it('calls onToggle when Celsius is pressed', () => {
    const mockOnToggle = jest.fn();
    const { getByText } = render(
      <TemperatureToggle unit="imperial" onToggle={mockOnToggle} />
    );

    fireEvent.press(getByText('°C'));
    expect(mockOnToggle).toHaveBeenCalledWith('metric');
  });
});