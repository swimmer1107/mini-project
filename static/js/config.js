// ⚠️ DO NOT share this key publicly.
// This file is used to store API configurations for the Crop Recommendation System.

const CONFIG = {
    // OpenWeather API Key (Get your own at https://openweathermap.org/api)
    WEATHER_API_KEY: "7dd12d6d04c849f8053a9d57995e4301",

    // Ideal NPK Values for Fertilizer Recommendation
    IDEAL_NPK: {
        "rice": { N: 80, P: 40, K: 40 },
        "maize": { N: 100, P: 50, K: 50 },
        "chickpea": { N: 40, P: 60, K: 80 },
        "kidneybeans": { N: 20, P: 60, K: 20 },
        "pigeonpeas": { N: 20, P: 70, K: 20 },
        "mothbeans": { N: 20, P: 40, K: 20 },
        "mungbean": { N: 20, P: 40, K: 20 },
        "blackgram": { N: 20, P: 40, K: 20 },
        "lentil": { N: 20, P: 60, K: 20 },
        "pomegranate": { N: 20, P: 10, K: 40 },
        "banana": { N: 100, P: 75, K: 50 },
        "mango": { N: 20, P: 20, K: 30 },
        "grapes": { N: 23, P: 125, K: 125 },
        "watermelon": { N: 50, P: 25, K: 30 },
        "muskmelon": { N: 100, P: 60, K: 50 },
        "apple": { N: 20, P: 125, K: 200 },
        "orange": { N: 10, P: 10, K: 10 },
        "papaya": { N: 50, P: 50, K: 50 },
        "coconut": { N: 20, P: 10, K: 30 },
        "cotton": { N: 120, P: 60, K: 60 },
        "jute": { N: 80, P: 40, K: 40 },
        "coffee": { N: 100, P: 20, K: 30 }
    }
};
