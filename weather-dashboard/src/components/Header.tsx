import React from 'react';
import { Cloud, Settings, MapPin } from 'lucide-react';

interface HeaderProps {
  location: string;
  onSettingsClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ location, onSettingsClick }) => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Cloud size={32} />
            <h1 className="text-3xl font-bold">Weather Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg">
              <MapPin size={20} />
              <span className="text-lg font-semibold">{location}</span>
            </div>
            <button
              onClick={onSettingsClick}
              className="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition"
            >
              <Settings size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
