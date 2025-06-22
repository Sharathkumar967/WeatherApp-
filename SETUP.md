# Weather App Setup Guide

This guide will help you set up and run the Weather App on your local development environment.

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **React Native CLI** (`npm install -g @react-native-community/cli`)
- **Git** for version control

### For Android Development
- **Android Studio** with Android SDK
- **Java Development Kit (JDK)** 11 or higher
- **Android Virtual Device (AVD)** or physical Android device

### For iOS Development (macOS only)
- **Xcode** (latest version)
- **iOS Simulator** or physical iOS device
- **CocoaPods** (`sudo gem install cocoapods`)

## Installation Steps

### 1. Clone the Repository
```bash
git clone <repository-url>
cd WeatherApp
```

### 2. Install Dependencies
```bash
npm install
```

### 3. iOS Setup (macOS only)
```bash
cd ios
pod install
cd ..
```

### 4. Configure API Key

**Important**: You must configure your OpenWeatherMap API key before running the app.

1. Visit [OpenWeatherMap](https://openweathermap.org/api) and create a free account
2. Generate an API key from your dashboard
3. Open `src/api/weatherApi.ts`
4. Replace `YOUR_OPENWEATHER_API_KEY` with your actual API key:

```typescript
const API_KEY = 'your_actual_api_key_here';
```

### 5. Android Setup

#### Configure Android SDK
1. Open Android Studio
2. Go to **Tools > SDK Manager**
3. Install the following:
   - Android SDK Platform 33 (or latest)
   - Android SDK Build-Tools
   - Android SDK Platform-Tools
   - Android Emulator

#### Set Environment Variables
Add these to your shell profile (`.bashrc`, `.zshrc`, etc.):

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
# export ANDROID_HOME=$HOME/Android/Sdk        # Linux
# export ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk  # Windows

export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

## Running the App

### Start Metro Bundler
In one terminal window:
```bash
npm start
```

### Run on Android
In another terminal window:
```bash
npm run android
```

### Run on iOS (macOS only)
In another terminal window:
```bash
npm run ios
```

## Development Commands

### Testing
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm test -- --watch
```

### Linting
```bash
# Check for linting errors
npm run lint

# Fix linting errors automatically
npm run lint -- --fix
```

### Building

#### Android APK
```bash
# Debug build
npm run build:android-debug

# Release build (requires signing configuration)
npm run build:android
```

#### iOS (requires Xcode)
1. Open `ios/WeatherApp.xcworkspace` in Xcode
2. Select your target device/simulator
3. Product → Build (⌘+B)
4. Product → Archive (for App Store builds)

### Cleaning
```bash
# Clean React Native cache
npm run clean

# Clean Android build
npm run clean:android

# Clean iOS build (macOS only)
npm run clean:ios
```

## Troubleshooting

### Common Issues

#### 1. Metro Bundler Issues
```bash
# Clear Metro cache
npx react-native start --reset-cache

# Or use the clean command
npm run clean
```

#### 2. Android Build Errors
```bash
# Clean and rebuild
cd android
./gradlew clean
cd ..
npm run android
```

#### 3. iOS Build Errors (macOS)
```bash
# Clean and reinstall pods
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
npm run ios
```

#### 4. Permission Issues (Android)
- Ensure location permission is granted in device settings
- Check that the app has internet permission

#### 5. API Key Issues
- Verify your API key is correct and active
- Check that you've replaced the placeholder in `src/api/weatherApi.ts`
- Ensure your API key has the necessary permissions

### Device-Specific Setup

#### Android Physical Device
1. Enable Developer Options on your device
2. Enable USB Debugging
3. Connect device via USB
4. Run `adb devices` to verify connection

#### iOS Physical Device
1. Connect device via USB
2. Trust the computer on your device
3. Select your device in Xcode
4. Ensure your Apple Developer account is configured

## Environment Variables

For production builds, consider using environment variables:

1. Install react-native-config:
```bash
npm install react-native-config
```

2. Create `.env` file:
```
OPENWEATHER_API_KEY=your_api_key_here
```

3. Update the API configuration to use environment variables

## Performance Tips

1. **Enable Hermes** (Android): Already enabled in `android/app/build.gradle`
2. **Enable Flipper** for debugging: Already configured
3. **Use Release builds** for performance testing
4. **Profile with Flipper** or React DevTools

## Getting Help

If you encounter issues:

1. Check the [React Native documentation](https://reactnative.dev/docs/getting-started)
2. Search for similar issues in the project's issue tracker
3. Check the [OpenWeatherMap API documentation](https://openweathermap.org/api)
4. Ensure all prerequisites are properly installed

## Next Steps

After successful setup:

1. Test the app with different cities
2. Try the location-based weather feature
3. Test offline functionality
4. Explore the settings screen
5. Run the test suite to ensure everything works

Happy coding! 🌤️