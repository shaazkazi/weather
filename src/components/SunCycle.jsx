import React from 'react';
import { Paper, Box } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

function SunCycle({ sunrise, sunset }) {
  const now = Date.now() / 1000;
  const progress = ((now - sunrise) / (sunset - sunrise)) * 100;

  return (
    <Paper className="weather-details-card">
      <Box className="sun-path">
        <WbSunnyIcon 
          className="sun-icon"
          style={{ left: `${progress}%` }}
        />
      </Box>
    </Paper>
  );
}
