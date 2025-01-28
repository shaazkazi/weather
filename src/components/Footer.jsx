import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© 2023 Weather App</p>
    </footer>
  );
};

const styles = {
  footer: {
    textAlign: 'center',
    padding: '16px',
    backgroundColor: '#007AFF',
    color: '#FFFFFF',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.1)',
  },
  text: {
    margin: 0,
    fontSize: '14px',
  },
};

export default Footer;