const API_KEY = '59d39126af30c73f2619699ee236c34d';

export const fetchWeatherData = async (lat, lon) => {
  // Current weather
  const currentWeather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  
  // 5 day forecast (includes 3-hour step data we can use for hourly)
  const forecast = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  const weatherData = await currentWeather.json();
  const forecastData = await forecast.json();

  return {
    current: weatherData,
    hourly: forecastData.list.slice(0, 8), // Next 24 hours (3-hour steps)
    daily: forecastData.list.filter(item => new Date(item.dt * 1000).getHours() === 12) // One reading per day at noon
  };
};

export const fetchLocationName = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  const data = await response.json();
  return data.name;
};