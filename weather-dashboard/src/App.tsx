import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { Forecast } from './components/Forecast';
import { useWeather, useForecast } from './hooks/useWeather';
import './App.css';

const queryClient = new QueryClient();

function AppContent() {
  const [location, setLocation] = useState('Loading...');
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const { data: currentWeather, isLoading: weatherLoading } = useWeather(lat, lon);
  const { data: forecast, isLoading: forecastLoading } = useForecast(lat, lon);

  // Get user's geolocation on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        },
        (error) => {
          console.error(error);
          // Fallback to default location (London)
          setLat(51.5074);
          setLon(-0.1278);
        }
      );
    }
  }, []);

  // Update location name when weather data changes
  useEffect(() => {
    if (currentWeather) {
      setLocation(`${currentWeather.name}, ${currentWeather.sys?.country || ''}`);
    }
  }, [currentWeather]);

  const handleLocationSelect = (newLat: number, newLon: number, name: string) => {
    setLat(newLat);
    setLon(newLon);
    setLocation(name);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600">
      <Header location={location} onSettingsClick={() => setTempUnit(tempUnit === 'C' ? 'F' : 'C')} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <SearchBar onLocationSelect={handleLocationSelect} />
          <button
            onClick={() => setTempUnit(tempUnit === 'C' ? 'F' : 'C')}
            className="bg-white text-blue-600 font-bold py-2 px-4 rounded-lg hover:bg-blue-50 transition"
          >
            Switch to °{tempUnit === 'C' ? 'F' : 'C'}
          </button>
        </div>

        {weatherLoading ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-2xl text-gray-600">Loading weather data...</p>
          </div>
        ) : (
          <>
            {currentWeather && <CurrentWeather data={currentWeather} tempUnit={tempUnit} />}
            {forecast && <Forecast data={forecast} tempUnit={tempUnit} />}
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
