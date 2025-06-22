# 🌤️ Weather App

A simple React Native weather application that shows current weather and 5-day forecasts.

## 📱 Features

- Current weather for any city
- 5-day weather forecast
- Location-based weather (GPS)
- Temperature unit toggle (°C/°F)
- Search history
- Offline support

## 🚀 Quick Start

### Prerequisites

- Node.js (version 18 or higher)
- React Native development environment
- Android Studio (for Android) or Xcode (for iOS)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sharathkumar967/WeatherApp-.git
   cd WeatherApp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Get API Key:**
   - Go to [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Get your API key
   - Verify your email (important!)

4. **Add your API key:**
   - Open `src/api/weatherApi.ts`
   - Replace `YOUR_OPENWEATHER_API_KEY` with your actual API key:
   ```typescript
   const API_KEY = 'your_api_key_here';
   ```

### Running the App

1. **Start Metro bundler:**
   ```bash
   npm start
   ```

2. **Run on Android:**
   ```bash
   npm run android
   ```

3. **Run on iOS:**
   ```bash
   npm run ios
   ```

## 🔧 Troubleshooting

### API Key Issues
- Make sure you verified your email with OpenWeatherMap
- Wait 10-15 minutes for new API keys to activate
- Test your API key: `node test_api.js`

### Location Not Working
- Enable location permissions when prompted
- Make sure GPS is enabled on your device
- Test on a real device (not emulator)

### Build Issues
- Clean build: `cd android && ./gradlew clean`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## 📋 Usage

1. **Search for weather:** Type city name and tap search 
2. **Use current location:** Tap the location button 
3. **View forecast:** Tap "View 5-Day Forecast"
4. **Change units:** Toggle between °C and °F
5. **Settings:** Access via settings button

##  Built With

- React Native 0.80
- TypeScript
- OpenWeatherMap API
- AsyncStorage for offline data
