// Simple API test script
const API_KEY = '38be004aa596b66103544147c212ea99';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

async function testAPI() {
  try {
    console.log('Testing OpenWeatherMap API...');
    
    // Test current weather for London
    const weatherUrl = `${BASE_URL}/weather?q=London&units=metric&appid=${API_KEY}`;
    console.log('Fetching:', weatherUrl);
    
    const response = await fetch(weatherUrl);
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      return;
    }
    
    const data = await response.json();
    console.log('✅ API Test Successful!');
    console.log('City:', data.name);
    console.log('Temperature:', data.main.temp + '°C');
    console.log('Weather:', data.weather[0].description);
    console.log('Humidity:', data.main.humidity + '%');
    
  } catch (error) {
    console.error('❌ API Test Failed:', error.message);
  }
}

testAPI();