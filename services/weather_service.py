# Weather Service
# Fetches weather data from API for smart agriculture system

import os
import requests

# Get weather data from API
def get_weather(city='Mathura'):
    api_key = os.environ.get('OPENWEATHER_API_KEY')
    if not api_key or api_key == 'mock-key-for-now':
        # Return mock data if no key is configured
        return {
            'temp': 32.5,
            'humidity': 58,
            'rainfall': 5,
            'description': 'partly cloudy'
        }
    
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        data = response.json()
        
        # OpenWeatherMap sometimes doesn't have rain
        rain_1h = data.get('rain', {}).get('1h', 0)
        
        return {
            'temp': round(data['main']['temp'], 1),
            'humidity': data['main']['humidity'],
            'rainfall': rain_1h,
            'description': data['weather'][0]['description']
        }
    except Exception as e:
        print(f"Weather API Error: {e}")
        return None
