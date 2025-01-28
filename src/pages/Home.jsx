import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import WeatherCard from '../components/WeatherCard';
import Footer from '../components/Footer';

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('Loading...');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=59d39126af30c73f2619699ee236c34d&units=metric`
      );
      setWeather(response.data);
      setLocation(response.data.name);
    });
  }, []);

  return (
    <div style={styles.container}>
      <Header location={location} />
      <div style={styles.content}>
        {weather && <WeatherCard weather={weather} />}
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#F2F2F7',
  },
  content: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
  },
};

export default Home;