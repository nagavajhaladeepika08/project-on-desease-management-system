# Weather Dashboard

A modern, responsive weather dashboard application that fetches real-time weather data from a public weather API and displays it with beautiful visualizations and charts.

## Features

### Core Features
- ✅ Real-time weather data fetching
- ✅ Current weather conditions (temperature, humidity, wind speed, pressure)
- ✅ 5-day forecast with hourly details
- ✅ Search for weather by city name or coordinates
- ✅ Geolocation support (auto-detect user location)
- ✅ Multiple weather metrics display
- ✅ Weather alerts and warnings
- ✅ UV index and air quality information
- ✅ Sunrise/sunset times
- ✅ Wind direction and speed visualization
- ✅ Precipitation probability
- ✅ "Feels like" temperature calculation

### Dashboard Features
- Clean and intuitive UI
- Real-time weather updates
- Interactive maps (optional)
- Weather history charts
- Favorites/bookmarks for multiple locations
- Dark/Light theme toggle
- Responsive design (mobile, tablet, desktop)
- Search suggestions/autocomplete
- Temperature unit toggle (Celsius/Fahrenheit)
- Detailed weather information cards

## Tech Stack

### Frontend
- React 18.x with TypeScript
- Tailwind CSS for styling
- React Query for data fetching and caching
- Axios for HTTP requests
- Chart.js / Recharts for visualizations
- React Router for navigation
- Leaflet/Mapbox for weather maps
- Lucide React for icons

### Backend (Optional)
- Node.js with Express.js
- Weather API integration (OpenWeatherMap, WeatherAPI, etc.)
- Redis for caching
- MongoDB for storing user preferences

### APIs
- OpenWeatherMap API (free tier available)
- Or WeatherAPI.com (alternative)
- Geolocation API (browser built-in)

## Project Structure

```
weather-dashboard/
├── frontend/
│   ├── public/
│   │   ├── icons/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── CurrentWeather.tsx
│   │   │   ├── Forecast.tsx
│   │   │   ├── WeatherDetails.tsx
│   │   │   ├── AirQuality.tsx
│   │   │   ├── UVIndex.tsx
│   │   │   ├── WeatherAlerts.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Forecast.tsx
│   │   │   ├── Map.tsx
│   │   │   └── Settings.tsx
│   │   ├── services/
│   │   │   ├── weatherApi.ts
│   │   │   └── geolocation.ts
│   │   ├── hooks/
│   │   │   ├── useWeather.ts
│   │   │   ├── useForecast.ts
│   │   │   └── useGeolocation.ts
│   │   ├── context/
│   │   │   └── WeatherContext.tsx
│   │   ├── types/
│   │   │   └── weather.ts
│   │   ├── utils/
│   │   │   ├── formatters.ts
│   │   │   └── calculations.ts
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── tsconfig.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.ts
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenWeatherMap API key (free from https://openweathermap.org/api)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup (Optional)

```bash
cd backend
npm install
cp .env.example .env
# Update .env with your API keys
npm run dev
```

## Environment Variables

### Frontend (.env)
```
VITE_WEATHER_API_KEY=your-openweathermap-api-key
VITE_WEATHER_API_URL=https://api.openweathermap.org/data/2.5
VITE_BACKEND_URL=http://localhost:5000
```

### Backend (.env)
```
PORT=5000
NODE_ENV=development
WEATHER_API_KEY=your-openweathermap-api-key
REDIS_URL=redis://localhost:6379
MONGODB_URI=mongodb://localhost:27017/weather-dashboard
```

## API Endpoints

### Weather API
- `GET /api/weather/current` - Get current weather
- `GET /api/weather/forecast` - Get 5-day forecast
- `GET /api/weather/search` - Search weather by city
- `GET /api/weather/coordinates` - Get weather by lat/lon
- `GET /api/weather/air-quality` - Get air quality data
- `GET /api/weather/uv-index` - Get UV index

### User Preferences
- `POST /api/preferences` - Save user preferences
- `GET /api/preferences` - Get user preferences
- `POST /api/favorites` - Add favorite location
- `GET /api/favorites` - Get favorite locations

## Weather Data Displayed

### Current Weather
- Temperature (with feels like)
- Weather condition and description
- Humidity percentage
- Wind speed and direction
- Atmospheric pressure
- Visibility
- Dew point
- Cloud coverage

### Forecast
- 5-day forecast
- 3-hourly breakdown
- Precipitation probability
- Temperature highs/lows
- Weather icons

### Additional Info
- Sunrise and sunset times
- UV index and recommendations
- Air quality index (AQI)
- Pollen count
- Moon phase
- Atmospheric pressure trend

## Features in Detail

### Search Functionality
- Search by city name
- Search by coordinates
- Autocomplete suggestions
- Recent searches history
- Favorite locations

### Alerts & Warnings
- Severe weather alerts
- Temperature extremes
- Air quality warnings
- UV index alerts

### Visualizations
- Temperature trends chart
- Humidity graph
- Wind speed chart
- Precipitation bars
- Weather radar (optional)

### User Preferences
- Temperature units (°C / °F)
- Wind speed units (km/h, mph, knots)
- Theme (light/dark)
- Location preferences
- Notification settings

## Color Scheme

```
Primary: #2563eb (Blue)
Secondary: #1e40af (Dark Blue)
Success: #10b981 (Green)
Warning: #f59e0b (Amber)
Danger: #ef4444 (Red)
Background: #f9fafb (Light)
Text: #1f2937 (Dark)
```

## Getting Started

1. Clone the repository
2. Create `.env` files with API keys
3. Install dependencies for frontend and backend
4. Run both servers
5. Access dashboard at `http://localhost:5173`

## API Integration

### Using OpenWeatherMap

```typescript
const response = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
);
const data = await response.json();
```

### Using WeatherAPI.com

```typescript
const response = await fetch(
  `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`
);
const data = await response.json();
```

## Caching Strategy

- Current weather: 10 minutes
- Forecast data: 30 minutes
- Air quality: 1 hour
- UV index: 1 hour
- Location searches: 24 hours

## Performance Optimizations

- API response caching
- Image optimization
- Lazy loading components
- Code splitting
- Debounced search
- Service worker for offline mode

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Frontend
- Vercel, Netlify, or GitHub Pages
- Build: `npm run build`
- Deploy dist folder

### Backend
- Heroku, Railway, or DigitalOcean
- Docker containerization
- Environment variables for production

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT License - feel free to use this project

## Support

For issues and questions, please create an issue in the repository.

---

**Built with ❤️ for weather enthusiasts**
