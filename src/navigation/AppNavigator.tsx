import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ForecastScreen from '../screens/ForecastScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { colors } from '../theme';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.surface,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          title: 'Weather',
          headerShown: false // We have custom header in HomeScreen
        }} 
      />
      <Stack.Screen 
        name="Forecast" 
        component={ForecastScreen} 
        options={{ 
          title: '5-Day Forecast',
          headerShown: false // We have custom header in ForecastScreen
        }} 
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ 
          title: 'Settings' 
        }} 
      />
    </Stack.Navigator>
  );
}