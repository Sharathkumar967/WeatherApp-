export const formatDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString();
};

export const formatTime = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

export const formatDateTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
};

export const getDayName = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString([], { weekday: 'long' });
};

export const getShortDayName = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString([], { weekday: 'short' });
};

export const formatForecastDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString([], { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
};

export const isToday = (timestamp: number): boolean => {
  const today = new Date();
  const date = new Date(timestamp * 1000);
  return today.toDateString() === date.toDateString();
};

export const isTomorrow = (timestamp: number): boolean => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const date = new Date(timestamp * 1000);
  return tomorrow.toDateString() === date.toDateString();
};