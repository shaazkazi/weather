import React from 'react';
import { Paper, Typography, Fade } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

function WeatherAlert({ alerts }) {
  if (!alerts?.length) return null;
  
  return (
    <Fade in={true}>
      <Paper className="alert-card">
        <WarningIcon color="warning" />
        <Typography variant="h6">{alerts[0].event}</Typography>
        <Typography>{alerts[0].description}</Typography>
      </Paper>
    </Fade>
  );
}

export default WeatherAlert;
