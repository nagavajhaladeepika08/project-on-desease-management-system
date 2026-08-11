import { useQuery } from 'react-query';
import { weatherService } from '../services/weatherApi';

export const useWeather = (lat: number | null, lon: number | null) => {
  return useQuery(
    ['weather', lat, lon],
    () => weatherService.getCurrentWeather(lat!, lon!),
    {
      enabled: lat !== null && lon !== null,
      staleTime: 10 * 60 * 1000, // 10 minutes
    }
  );
};

export const useForecast = (lat: number | null, lon: number | null) => {
  return useQuery(
    ['forecast', lat, lon],
    () => weatherService.getForecast(lat!, lon!),
    {
      enabled: lat !== null && lon !== null,
      staleTime: 30 * 60 * 1000, // 30 minutes
    }
  );
};

export const useSearchCity = (city: string) => {
  return useQuery(
    ['search', city],
    () => weatherService.searchCity(city),
    {
      enabled: city.length > 0,
      staleTime: 24 * 60 * 60 * 1000, // 24 hours
    }
  );
};
