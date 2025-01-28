import React, { useState, useEffect } from 'react';
import {
  TextField, 
  Autocomplete, 
  IconButton,
  InputAdornment,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Fade,
  Tooltip,
  ClickAwayListener
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import StarIcon from '@mui/icons-material/Star';
import HistoryIcon from '@mui/icons-material/History';

const API_KEY = '59d39126af30c73f2619699ee236c34d';

function LocationSearch({ onLocationSelect, onCurrentLocation }) {
  const [open, setOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [recentSearches, setRecentSearches] = useState(
    JSON.parse(localStorage.getItem('recentSearches') || '[]')
  );

  const handleSearch = async (value) => {
    if (!value || value.length < 2) {
      setOptions([]);
      return;
    }
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error('Failed to fetch locations');
      const data = await response.json();
      setOptions(data);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setOptions([]);
    }
  };

  const handleLocationSelect = (location) => {
    if (!location) return;

    const newLocation = {
      lat: location.lat,
      lon: location.lon,
      name: location.name,
      country: location.country,
      state: location.state
    };

    const updatedRecent = [
      newLocation,
      ...recentSearches.filter(item => 
        item.lat !== newLocation.lat || item.lon !== newLocation.lon
      ).slice(0, 4)
    ];
    setRecentSearches(updatedRecent);
    localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));
    
    onLocationSelect(newLocation);
    setInputValue('');
    setShowHistory(false);
  };

  return (
    <ClickAwayListener onClickAway={() => setShowHistory(false)}>
      <Box className="search-container">
        <Autocomplete
          open={open && options.length > 0}
          onOpen={() => {
            setOpen(true);
            setShowHistory(false);
          }}
          onClose={() => setOpen(false)}
          inputValue={inputValue}
          onInputChange={(event, newValue) => {
            setInputValue(newValue);
            handleSearch(newValue);
          }}
          options={options}
          getOptionLabel={(option) =>
            `${option.name}${option.state ? `, ${option.state}` : ''}, ${option.country}`
          }
          renderInput={(params) => (
            <TextField
              {...params}
              className="search-input"
              placeholder="Search cities..."
              variant="standard"
              onFocus={() => setShowHistory(true)}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <Tooltip title="Use current location">
                      <IconButton className="location-button" onClick={onCurrentLocation}>
                        <MyLocationIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon className="search-icon" />
                  </InputAdornment>
                )
              }}
            />
          )}
          onChange={(event, newValue) => handleLocationSelect(newValue)}
          noOptionsText={inputValue.length < 2 ? "Type to search..." : "No locations found"}
        />

        {showHistory && recentSearches.length > 0 && (
          <Fade in={true}>
            <List className="search-history">
              {recentSearches.map((location, index) => (
                <ListItem 
                  key={`recent-${index}`}
                  button
                  onClick={() => handleLocationSelect(location)}
                >
                  <ListItemIcon>
                    {index === 0 ? <StarIcon color="primary" /> : <HistoryIcon />}
                  </ListItemIcon>
                  <ListItemText 
                    primary={location.name}
                    secondary={`${location.state ? `${location.state}, ` : ''}${location.country}`}
                  />
                </ListItem>
              ))}
            </List>
          </Fade>
        )}
      </Box>
    </ClickAwayListener>
  );
}

export default LocationSearch;
