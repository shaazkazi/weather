import React from 'react';
import { Paper, Grid, Typography, Tooltip } from '@mui/material';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import CompressIcon from '@mui/icons-material/Compress';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import VisibilityIcon from '@mui/icons-material/Visibility';

function WeatherDetails({ current }) {
  const weatherMetrics = [
    {
      icon: <DeviceThermostatIcon />,
      label: "Feels Like",
      value: `${Math.round(current?.main?.feels_like)}°`,
      tooltip: "How the temperature actually feels"
    },
    {
      icon: <OpacityIcon />,
      label: "Humidity",
      value: `${current?.main?.humidity}%`,
      tooltip: "Amount of water vapor in the air"
    },
    {
      icon: <AirIcon />,
      label: "Wind",
      value: `${Math.round(current?.wind?.speed)} km/h`,
      tooltip: "Wind speed"
    },
    {
      icon: <CompressIcon />,
      label: "Pressure",
      value: `${current?.main?.pressure} hPa`,
      tooltip: "Atmospheric pressure"
    },
    {
      icon: <WaterDropIcon />,
      label: "Dew Point",
      value: `${Math.round(current?.main?.temp - (100 - current?.main?.humidity) / 5)}°`,
      tooltip: "Temperature at which dew forms"
    },
    {
      icon: <VisibilityIcon />,
      label: "Visibility",
      value: `${(current?.visibility / 1000).toFixed(1)} km`,
      tooltip: "Distance at which objects can be clearly seen"
    }
  ];

  return (
    <Paper className="weather-details-card">
      <Typography variant="h6" className="details-title">Weather Details</Typography>
      <Grid container spacing={3}>
        {weatherMetrics.map((metric, index) => (
          <Grid item xs={6} sm={4} key={index}>
            <Tooltip title={metric.tooltip} arrow placement="top">
              <div className="detail-item">
                <div className="detail-icon-wrapper">
                  {metric.icon}
                </div>
                <Typography className="detail-label">{metric.label}</Typography>
                <Typography className="detail-value">{metric.value}</Typography>
              </div>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default WeatherDetails;
