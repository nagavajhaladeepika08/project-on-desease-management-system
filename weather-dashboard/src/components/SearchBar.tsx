import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { useSearchCity } from '../hooks/useWeather';

interface SearchBarProps {
  onLocationSelect: (lat: number, lon: number, name: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onLocationSelect }) => {
  const [input, setInput] = useState('');
  const { data: results } = useSearchCity(input);

  const handleSelect = (item: any) => {
    onLocationSelect(item.coord.lat, item.coord.lon, item.name);
    setInput('');
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="flex items-center bg-white rounded-lg shadow-md border border-gray-200">
        <Search className="ml-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search for a city..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 outline-none rounded-lg"
        />
      </div>
      
      {input && results && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
          {results.slice(0, 5).map((item: any) => (
            <button
              key={`${item.coord.lat}-${item.coord.lon}`}
              onClick={() => handleSelect(item)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 border-b last:border-b-0 flex items-center gap-2"
            >
              <MapPin size={16} className="text-blue-500" />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">{item.sys?.country}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
