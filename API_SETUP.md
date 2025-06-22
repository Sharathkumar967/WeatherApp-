# 🔑 API Key Setup Guide

## Quick Fix for "Failed to Fetch Weather" Error

If you're seeing a "failed to fetch weather" error, it's because the OpenWeatherMap API key needs to be configured.

### Step 1: Get Your Free API Key

1. Visit [OpenWeatherMap API](https://openweathermap.org/api)
2. Click "Sign Up" (it's free!)
3. Create your account
4. Go to your dashboard and find your API key
5. Copy the API key (it looks like: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)

### Step 2: Add Your API Key to the App

1. Open the file: `src/api/weatherApi.ts`
2. Find this line (around line 4):
   ```typescript
   const API_KEY = 'YOUR_OPENWEATHER_API_KEY';
   ```
3. Replace `YOUR_OPENWEATHER_API_KEY` with your actual API key:
   ```typescript
   const API_KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
   ```
4. Save the file

### Step 3: Restart the App

1. Stop the app if it's running (Ctrl+C in terminal)
2. Start it again:
   ```bash
   npm start
   npm run android  # or npm run ios
   ```

## ✅ That's It!

Your weather app should now work perfectly. You can:
- Search for any city
- Use your current location
- View 5-day forecasts
- Toggle between Celsius and Fahrenheit

## 🆘 Still Having Issues?

### Common Problems:

1. **"Invalid API key"** - Double-check you copied the key correctly
2. **"Location not found"** - Try a different city name or check spelling
3. **"Rate limit exceeded"** - You've made too many requests, wait a few minutes

### Debug Tips:

1. Check the console logs for detailed error messages
2. Make sure your internet connection is working
3. Try searching for a common city like "London" or "New York"

### API Key Limits:

- **Free tier**: 1,000 calls per day
- **Rate limit**: 60 calls per minute
- **More than enough** for personal use!

## 🌟 Features You Can Now Use:

- ✅ Current weather with detailed metrics
- ✅ 5-day weather forecast
- ✅ Search by city name
- ✅ GPS location-based weather
- ✅ Temperature unit conversion
- ✅ Offline data caching
- ✅ Weather history

Enjoy your weather app! 🌤️