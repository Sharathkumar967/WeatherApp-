import { useState, useCallback } from 'react';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export const useLocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocationPermission = useCallback(async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Weather App Location Permission',
            message: 'Weather App needs access to your location to show local weather.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
          return true;
        } else {
          console.log('Location permission denied');
          Alert.alert(
            'Location Permission Required',
            'To get weather for your current location, please enable location permissions in your device settings.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Open Settings', onPress: () => {
                // You can add code here to open device settings if needed
                console.log('User should open settings manually');
              }}
            ]
          );
          return false;
        }
      } catch (err) {
        console.warn('Location permission error:', err);
        Alert.alert('Permission Error', 'Failed to request location permission. Please try again.');
        return false;
      }
    }
    return true; // iOS handles permissions automatically
  }, []);

  const getCurrentPosition = useCallback(async (): Promise<{ latitude: number; longitude: number } | null> => {
    console.log('Getting current position...');
    
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      const errorMsg = 'Location permission denied. Please enable location access in your device settings.';
      setError(errorMsg);
      return null;
    }

    setLoading(true);
    setError(null);

    return new Promise((resolve) => {
      console.log('Requesting geolocation...');
      
      Geolocation.getCurrentPosition(
        (position) => {
          console.log('Location obtained:', position.coords);
          setLoading(false);
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLoading(false);
          
          let errorMessage = 'Unable to get your location. ';
          
          switch (error.code) {
            case 1: // PERMISSION_DENIED
              errorMessage += 'Location permission was denied. Please enable location services.';
              break;
            case 2: // POSITION_UNAVAILABLE
              errorMessage += 'Location information is unavailable. Please check your GPS settings.';
              break;
            case 3: // TIMEOUT
              errorMessage += 'Location request timed out. Please try again.';
              break;
            default:
              errorMessage += error.message || 'Please try again or search for a city manually.';
          }
          
          setError(errorMessage);
          
          Alert.alert(
            'Location Error',
            errorMessage,
            [
              { text: 'OK', style: 'default' }
            ]
          );
          
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000, // Increased timeout
          maximumAge: 30000, // Allow slightly older location data
        }
      );
    });
  }, [requestLocationPermission]);

  return {
    loading,
    error,
    getCurrentPosition,
    clearError: () => setError(null),
  };
};