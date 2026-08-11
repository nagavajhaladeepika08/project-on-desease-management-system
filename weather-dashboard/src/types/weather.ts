export interface CurrentWeather {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  wind_deg: number;
  clouds: number;
  description: string;
  icon: string;
  visibility: number;
  uv_index?: number;
  dew_point?: number;
}

export interface ForecastItem {
  dt: number;
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  wind_deg: number;
  clouds: number;
  pop: number;
  rain?: { '3h': number };
  snow?: { '3h': number };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
}

export interface Forecast {
  list: ForecastItem[];
  city: {
    name: string;
    country: string;
    sunrise: number;
    sunset: number;
  };
}

export interface Location {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface AirQuality {
  aqi: number;
  main: string;
  components: {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
  };
}

export interface WeatherAlert {
  event: string;
  start: number;
  end: number;
  description: string;
}

export interface WeatherData {
  city: Location;
  current: CurrentWeather & { sunrise: number; sunset: number; weather: { main: string; description: string; icon: string }[] };
  forecast: ForecastItem[];
  alerts?: WeatherAlert[];
  air_quality?: AirQuality;
}
