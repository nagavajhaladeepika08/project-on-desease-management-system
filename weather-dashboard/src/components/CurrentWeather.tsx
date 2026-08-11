import React from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge } from 'lucide-react';
import { formatTemperature, getWindDirection, getWeatherIcon } from '../utils/formatters';

interface CurrentWeatherProps {
  data: any;
  tempUnit: 'C' | 'F';
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, tempUnit }) => {
  if (!data) return null;

  const temp = tempUnit === 'F' ? (data.main.temp * 9/5) + 32 : data.main.temp;
  const feelsLike = tempUnit === 'F' ? (data.main.feels_like * 9/5) + 32 : data.main.feels_like;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center justify-center">
          <img
            src={getWeatherIcon(data.weather[0].icon)}
            alt={data.weather[0].description}
            className="w-32 h-32 mb-4"
          />
          <div className="text-center">
            <p className="text-gray-500 text-lg capitalize">{data.weather[0].description}</p>
            <h2 className="text-6xl font-bold text-gray-800 mt-2">
              {temp.toFixed(1)}°{tempUnit}
            </h2>
            <p className="text-gray-500 text-lg">
              Feels like {feelsLike.toFixed(1)}°{tempUnit}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="text-blue-500" size={20} />
              <span className="text-gray-600 font-semibold">Humidity</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{data.main.humidity}%</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Wind className="text-orange-500" size={20} />
              <span className="text-gray-600 font-semibold">Wind</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{data.wind.speed.toFixed(1)}</p>
            <p className="text-sm text-gray-600">m/s {getWindDirection(data.wind.deg)}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Gauge className="text-purple-500" size={20} />
              <span className="text-gray-600 font-semibold">Pressure</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{data.main.pressure}</p>
            <p className="text-sm text-gray-600">hPa</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="text-green-500" size={20} />
              <span className="text-gray-600 font-semibold">Visibility</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{(data.visibility / 1000).toFixed(1)}</p>
            <p className="text-sm text-gray-600">km</p>
          </div>
        </div>
      </div>
    </div>
  );
};
