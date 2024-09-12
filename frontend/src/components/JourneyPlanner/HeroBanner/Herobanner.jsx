import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

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
    <div style={styles.heroBanner}>
      <div style={styles.content}>
        <h1 style={styles.title}>Plan Your Journey</h1>
        <p style={styles.subtitle}>Find the best route from start to finish</p>
        
        <form onSubmit={handleSearch} style={styles.form}>
          <div style={styles.inputGroup}>
            <Search size={20} style={styles.icon} />
            <input
              id="start-location"
              type="text"
              placeholder="Enter starting location"
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
              style={styles.input}
            />
          </div>
          
          <div style={styles.inputGroup}>
            <Search size={20} style={styles.icon} />
            <input
              id="destination"
              type="text"
              placeholder="Enter destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              style={styles.input}
            />
          </div>
          
          <button type="submit" style={styles.button}>
            Search
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};



export default HeroBanner;
