import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Container, CircularProgress, Box } from '@mui/material';
import theme from './styles/globalStyles';
import WeatherDisplay from './components/WeatherDisplay';
import LocationHeader from './components/LocationHeader';
import WeatherDetails from './components/WeatherDetails';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import LocationSearch from './components/LocationSearch';
import WeatherMap from './components/WeatherMap';
import WeatherAlert from './components/WeatherAlert';
import { fetchWeatherData, fetchLocationName } from './services/weatherAPI';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeOfDay, setTimeOfDay] = useState('day');

  useEffect(() => {
    const hour = new Date().getHours();
    setTimeOfDay(hour >= 6 && hour < 18 ? 'day' : 'night');

    const interval = setInterval(() => {
      const currentHour = new Date().getHours();
      setTimeOfDay(currentHour >= 6 && currentHour < 18 ? 'day' : 'night');
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const handleLocationSelect = async (newLocation) => {
    setLoading(true);
    try {
      const [weather, locationName] = await Promise.all([
        fetchWeatherData(newLocation.lat, newLocation.lon),
        fetchLocationName(newLocation.lat, newLocation.lon)
      ]);
      setWeatherData(weather);
      setLocation(locationName);
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    setLoading(true);
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      
      const { latitude, longitude } = position.coords;
      const [weather, locationName] = await Promise.all([
        fetchWeatherData(latitude, longitude),
        fetchLocationName(latitude, longitude)
      ]);
      
      setWeatherData(weather);
      setLocation(locationName);
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentLocation();
    
    // Auto-refresh weather data every 30 minutes
    const refreshInterval = setInterval(() => {
      if (weatherData) {
        handleLocationSelect({
          lat: weatherData.lat,
          lon: weatherData.lon
        });
      }
    }, 1800000);

    return () => clearInterval(refreshInterval);
  }, []);

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="loading-container">
          <CircularProgress />
        </div>
      </ThemeProvider>
    );
  }

  const weatherClass = weatherData?.current?.weather?.[0]?.id
    ? `weather-bg-${timeOfDay}-${weatherData.current.weather[0].main.toLowerCase()}`
    : `weather-bg-${timeOfDay}-clear`;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container className={`app-container ${weatherClass}`} maxWidth="sm">
        <Box className="content-wrapper">
          <LocationHeader location={location} />
          <LocationSearch
            onLocationSelect={handleLocationSelect}
            onCurrentLocation={getCurrentLocation}
          />
          {weatherData?.alerts && (
            <WeatherAlert alerts={weatherData.alerts} />
          )}
          <WeatherDisplay
            current={weatherData?.current}
            timeOfDay={timeOfDay}
          />
          <HourlyForecast data={weatherData?.hourly?.slice(0, 24)} />
          <WeatherDetails
            current={weatherData?.current}
            sunrise={weatherData?.current?.sunrise}
            sunset={weatherData?.current?.sunset}
          />
          <DailyForecast data={weatherData?.daily?.slice(1, 8)} />
          {weatherData && (
            <WeatherMap
              lat={weatherData.lat}
              lon={weatherData.lon}
              location={location}
            />
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
