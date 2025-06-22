import { useState, useEffect } from 'react';

// Simple connectivity hook - in a real app you'd use @react-native-community/netinfo
export const useConnectivity = () => {
  const [isConnected, setIsConnected] = useState(true);

  // For now, we'll assume we're always connected
  // In a real implementation, you would use NetInfo to check connectivity
  useEffect(() => {
    // NetInfo.addEventListener(state => {
    //   setIsConnected(state.isConnected ?? false);
    // });
  }, []);

  return { isConnected };
};