import React, { useEffect, useState } from 'react';
import { Typography, Box, Fade } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import WaterIcon from '@mui/icons-material/Water';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import NightsStayIcon from '@mui/icons-material/NightsStay';

function WeatherDisplay({ current }) {
  const [timeOfDay, setTimeOfDay] = useState('day');
  const [particleCount, setParticleCount] = useState(0);

  useEffect(() => {
    const hour = new Date().getHours();
    setTimeOfDay(hour >= 6 && hour < 18 ? 'day' : 'night');

    // Set particle count based on weather condition
    const weatherId = current?.weather?.[0]?.id;
    if (weatherId >= 300 && weatherId < 600) setParticleCount(20); // rain
    else if (weatherId >= 600 && weatherId < 700) setParticleCount(30); // snow
    else setParticleCount(0);
  }, [current]);

  const getWeatherIcon = (id) => {
    if (!id) return timeOfDay === 'day' ? <WbSunnyIcon /> : <NightsStayIcon />;
    
    if (id >= 200 && id < 300) return <ThunderstormIcon />; // Thunderstorm
    if (id >= 300 && id < 400) return <WaterIcon />; // Drizzle
    if (id >= 500 && id < 600) return <WaterIcon />; // Rain
    if (id >= 600 && id < 700) return <AcUnitIcon />; // Snow
    if (id >= 700 && id < 800) return <FilterDramaIcon />; // Atmosphere
    if (id === 800) return timeOfDay === 'day' ? <WbSunnyIcon /> : <NightsStayIcon />; // Clear
    if (id > 800) return <CloudIcon />; // Clouds
    
    return timeOfDay === 'day' ? <WbSunnyIcon /> : <NightsStayIcon />;
  };

  const getWeatherBackground = (weatherId) => {
    if (!weatherId) return `clear-${timeOfDay}`;
    
    if (weatherId >= 200 && weatherId < 300) return 'storm';
    if (weatherId >= 300 && weatherId < 600) return 'rain';
    if (weatherId >= 600 && weatherId < 700) return 'snow';
    if (weatherId === 800) return `clear-${timeOfDay}`;
    if (weatherId > 800) return 'cloudy';
    
    return `clear-${timeOfDay}`;
  };

  const renderParticles = () => {
    return [...Array(particleCount)].map((_, i) => (
      <div 
        key={i} 
        className="weather-particles"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`
        }}
      />
    ));
  };

  const temp = current?.main?.temp;
  const weatherId = current?.weather?.[0]?.id;
  const condition = current?.weather?.[0]?.main;
  const weatherClass = getWeatherBackground(weatherId);
  const feelsLike = current?.main?.feels_like;

  return (
    <Fade in={true} timeout={800}>
      <Box className={`weather-display ${weatherClass}`}>
        <div className="weather-animation-container">
          {renderParticles()}
        </div>
        <div className="weather-content">
          <div className="weather-main">
            <div className="weather-icon-wrapper">
              {getWeatherIcon(weatherId)}
            </div>
            <Typography className="temperature" variant="h1">
              {Math.round(temp)}°
            </Typography>
          </div>
          <Typography className="condition" variant="h4">
            {condition}
          </Typography>
          <div className="weather-details-brief">
            <Typography className="high-low">
              H:{Math.round(current?.main?.temp_max)}° L:{Math.round(current?.main?.temp_min)}°
            </Typography>
            <Typography className="feels-like">
              Feels like {Math.round(feelsLike)}°
            </Typography>
            <Typography className="updated-time">
              Updated as of {new Date().toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
              })}
            </Typography>
          </div>
        </div>
      </Box>
    </Fade>
  );
}

export default WeatherDisplay;
