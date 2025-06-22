import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import { WeatherProvider } from './src/context/WeatherProvider';
import { colors } from './src/theme';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={colors.primary}
      />
      <WeatherProvider>
        <Navigation />
      </WeatherProvider>
    </SafeAreaProvider>
  );
};

export default App;