import React from 'react';
import { formatDate, formatTime, getWeatherIcon } from '../utils/formatters';

interface ForecastProps {
  data: any;
  tempUnit: 'C' | 'F';
}

export const Forecast: React.FC<ForecastProps> = ({ data, tempUnit }) => {
  if (!data || !data.list) return null;

  // Get next 5 days (one entry per day at noon)
  const dailyForecasts = data.list.filter((_: any, index: number) => index % 8 === 0).slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {dailyForecasts.map((item: any) => {
          const temp = tempUnit === 'F' ? (item.main.temp * 9/5) + 32 : item.main.temp;
          return (
            <div
              key={item.dt}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center hover:shadow-lg transition"
            >
              <p className="font-semibold text-gray-800 mb-2">{formatDate(item.dt)}</p>
              <img
                src={getWeatherIcon(item.weather[0].icon)}
                alt={item.weather[0].description}
                className="w-16 h-16 mx-auto mb-2"
              />
              <p className="text-sm text-gray-600 capitalize mb-2">{item.weather[0].description}</p>
              <p className="text-2xl font-bold text-gray-800">{temp.toFixed(0)}°{tempUnit}</p>
              <p className="text-sm text-gray-500 mt-2">💧 {item.pop}% chance of rain</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
