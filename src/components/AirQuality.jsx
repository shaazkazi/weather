import React from 'react';
import { Paper, Typography, LinearProgress } from '@mui/material';

function AirQuality({ aqi }) {
  const getAQIColor = (value) => {
    if (value <= 50) return '#00e400';
    if (value <= 100) return '#ffff00';
    if (value <= 150) return '#ff7e00';
    return '#ff0000';
  };

  return (
    <Paper className="weather-details-card">
      <Typography variant="h6">Air Quality</Typography>
      <LinearProgress 
        variant="determinate" 
        value={(aqi/500)*100}
        sx={{ backgroundColor: getAQIColor(aqi) }}
      />
      <Typography>{aqi} AQI</Typography>
    </Paper>
  );
}
