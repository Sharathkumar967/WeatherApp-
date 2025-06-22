# 🔧 API Key Troubleshooting Guide

## Current Issue: "Invalid API key" (Error 401)

Your API key `38be004aa596b66103544147c212ea99` is returning a 401 error, which means it's not being accepted by OpenWeatherMap.

## ✅ Step-by-Step Fix:

### 1. Verify Email Confirmation
- **Check your email inbox** (including spam folder)
- **Click the verification link** from OpenWeatherMap
- **Wait 5-10 minutes** after clicking the link

### 2. Check API Key Status
- Go to [OpenWeatherMap API Keys](https://home.openweathermap.org/api_keys)
- Make sure your key shows as **"Active"**
- If it shows "Pending" or "Inactive", wait a bit longer

### 3. API Key Activation Time
- New API keys can take **up to 2 hours** to become active
- Most activate within **10-15 minutes**

### 4. Copy API Key Again
Sometimes there are invisible characters. Let's get a fresh copy:

1. Go to your [OpenWeatherMap dashboard](https://home.openweathermap.org/api_keys)
2. **Copy the API key again** (select all and copy)
3. Replace it in the app:

```typescript
// In src/api/weatherApi.ts, line 5:
const API_KEY = 'paste_your_key_here';
```

### 5. Test the API Key
Run this command to test your API key:
```bash
node test_api.js
```

## 🔍 Common Issues:

### Issue 1: Email Not Verified
**Solution**: Check email and click verification link

### Issue 2: API Key Not Active Yet
**Solution**: Wait 10-60 minutes after email verification

### Issue 3: Wrong API Key Copied
**Solution**: Copy the key again from the dashboard

### Issue 4: Spaces in API Key
**Solution**: Make sure there are no spaces before/after the key

## 🧪 Manual API Test

You can test your API key directly in a browser:

```
https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY_HERE
```

Replace `YOUR_API_KEY_HERE` with your actual key.

**Expected Result**: JSON data with London weather
**Error Result**: `{"cod":401, "message": "Invalid API key"}`

## 📞 If Still Not Working:

1. **Create a new API key** in your OpenWeatherMap dashboard
2. **Wait for email verification** 
3. **Test the new key** with the browser method above
4. **Update the app** with the new working key

## ⏰ Timeline:
- **Email verification**: Immediate
- **API key activation**: 10 minutes - 2 hours
- **Most common**: Works within 15 minutes

## 🎯 Next Steps:

1. ✅ Verify your email (check spam folder)
2. ⏰ Wait 15-30 minutes for activation
3. 🔄 Try the API test again: `node test_api.js`
4. 📱 Once API test passes, the app will work!

Your API key: `38be004aa596b66103544147c212ea99`

Let me know when the API test passes and we'll get your weather app running! 🌤️