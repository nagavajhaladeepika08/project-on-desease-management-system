import axios from 'axios';
import { CurrentWeather, Forecast, AirQuality, Location } from '../types/weather';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'your-api-key';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const weatherAPI = axios.create({
  baseURL: BASE_URL,
});

export const weatherService = {
  getCurrentWeather: async (lat: number, lon: number) => {
    const response = await weatherAPI.get('/weather', {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  },

  getForecast: async (lat: number, lon: number) => {
    const response = await weatherAPI.get('/forecast', {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  },

  searchCity: async (city: string) => {
    const response = await weatherAPI.get('/find', {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data.list;
  },

  getWeatherByCity: async (city: string) => {
    const response = await weatherAPI.get('/weather', {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  },

  getUVIndex: async (lat: number, lon: number) => {
    const response = await weatherAPI.get('/uvi', {
      params: {
        lat,
        lon,
        appid: API_KEY,
      },
    });
    return response.data;
  },

  getAirQuality: async (lat: number, lon: number) => {
    const response = await weatherAPI.get('/air_pollution', {
      params: {
        lat,
        lon,
        appid: API_KEY,
      },
    });
    return response.data;
  },
};
