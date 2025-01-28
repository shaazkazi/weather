import React from 'react';
import { Paper, Grid, Typography } from '@mui/material';

function DailyForecast({ data }) {
  if (!data) return null;

  return (
    <Paper className="forecast-card">
      <Typography variant="h6" sx={{ mb: 2 }}>5-Day Forecast</Typography>
      <Grid container spacing={1}>
        {data.map((day) => (
          <Grid item xs={12} key={day.dt}>
            <div className="daily-forecast-item">
              <div className="day-temp-container">
                <Typography className="day-name">
                  {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                </Typography>
                <div className="temp-range">
                  <Typography className="high-temp">{Math.round(day.main.temp_max)}°</Typography>
                  <Typography className="low-temp">{Math.round(day.main.temp_min)}°</Typography>
                </div>
              </div>
              <Typography className="weather-condition">{day.weather[0].main}</Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default DailyForecast;
