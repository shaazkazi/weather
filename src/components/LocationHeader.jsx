import React from 'react';
import { Typography, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function LocationHeader({ location }) {
  return (
    <div className="location-header">
      <IconButton color="primary" size="small">
        <LocationOnIcon fontSize="small" />
      </IconButton>
      <Typography variant="h6" noWrap sx={{ maxWidth: '200px' }}>
        {location}
      </Typography>
    </div>
  );
}

export default LocationHeader;
