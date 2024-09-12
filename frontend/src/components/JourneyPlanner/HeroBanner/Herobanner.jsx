import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import styles from './Herobanner.module.css';

const HeroBanner = () => {
  const [startLocation, setStartLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [error, setError] = useState('');
  const [autocomplete, setAutocomplete] = useState({ start: null, dest: null });

  useEffect(() => {
    // Load Google Maps JavaScript API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    script.async = true;
    script.onload = initAutocomplete;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initAutocomplete = () => {
    const startAutocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById('start-location'),
      { types: ['geocode'] }
    );
    const destAutocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById('destination'),
      { types: ['geocode'] }
    );

    setAutocomplete({ start: startAutocomplete, dest: destAutocomplete });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setError('');

    if (!startLocation || !destination) {
      setError('Please enter both starting location and destination.');
      return;
    }

    console.log('Searching:', { startLocation, destination });
    // Here you would typically handle the search logic
  };

  return (
    <div className={styles.heroBanner}>
      <div className={styles.content}>
        <h1 className={styles.title}>Plan Your Journey</h1>
        <p className={styles.subtitle}>Find the best route from start to finish</p>
        
        <form onSubmit={handleSearch} className={styles.form}>
          <div className={styles.inputGroup}>
            <Search size={20} className={styles.icon} />
            <input
              id="start-location"
              type="text"
              placeholder="Enter starting location"
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
              className={styles.input}
            />
          </div>
          
          <div className={styles.inputGroup}>
            <Search size={20} className={styles.icon} />
            <input
              id="destination"
              type="text"
              placeholder="Enter destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className={styles.input}
            />
          </div>
          
          <button type="submit" className={styles.button}>
            Search
          </button>
        </form>

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};



export default HeroBanner;
