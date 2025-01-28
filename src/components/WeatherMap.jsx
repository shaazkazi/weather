import React from 'react';
import { Paper, Typography } from '@mui/material';

function WeatherMap({ lat, lon }) {
  // Only render map when we have valid coordinates
  if (!lat || !lon) return null;

  // Using OpenWeatherMap's weather map for better weather visualization
  const mapUrl = `https://tile.openweathermap.org/map/temp_new/${lat}/${lon}/10.png?appid=59d39126af30c73f2619699ee236c34d`;

  return (
    <Paper className="weather-details-card">
      <Typography variant="h6" className="details-title">Weather Map</Typography>
      <div className="map-container" style={{ height: '300px', width: '100%' }}>
        <img 
          src={mapUrl}
          alt="Weather Map"
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            borderRadius: '12px'
          }}
        />
      </div>
    </Paper>
  );
}

export default WeatherMap;
