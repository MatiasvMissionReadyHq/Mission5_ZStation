import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Search } from 'lucide-react';
import styles from './Herobanner.module.css';

const HeroBanner = ({ sendDataToStation }) => {
  const [startLocation, setStartLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [inputLocation, setInputLocation] = useState('');
  const [isClicked, setIsClicked] = useState('FindStation');
  const [error, setError] = useState('');
  const [autocomplete, setAutocomplete] = useState({ start: null, dest: null });

  useEffect(() => {
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
    };

    // This function updates the inputLocation state when the user types in the input field
    const handleInputLocation = (e) => setInputLocation(e.target.value);

    const handleSubmit = (e) => {
      e.preventDefault();
      sendDataToStation(inputLocation);
    };

  return (
    <div className={styles.heroContainer}>
      <div className={styles.leftSection}>
        {/* Container for navigation buttons */}
        <div className={styles.bthContainer}>
          <NavLink to="/findStation">
            <button
              type="button"
              onClick={() => setIsClicked('FindStation')}
              className={isClicked === 'FindStation' ? styles.activeHeroBtn : styles.heroBtn}
            >
              Find a Station
            </button>
          </NavLink>

          <NavLink to="/journeyPlanner">
            <button
              type="button"
              onClick={() => setIsClicked('JourneyPlanner')}
              className={isClicked === 'JourneyPlanner' ? styles.activeHeroBtn : styles.heroBtn}
            >
              Journey Planner
            </button>
          </NavLink>
        </div>

        {/* Main content area */}
        <div className={styles.content}>
          {/* Form for journey search */}
          <form onSubmit={handleSearch} className={styles.form}>

            {/* Input group for starting location */}
            <div className={styles.inputGroup}>
              
              <input
                id="start-location"
                type="text"
                placeholder="Enter starting location"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                className={styles.input}
              />
               {/* Pin icon on the right */} 
               <Search size={10} className={styles.icon} />

            </div>

            {/* Input group for destination */}
            <div className={styles.inputGroup}>
              
              <input
                id="destination"
                type="text"
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className={styles.input}
              />
               {/* Pin icon on the right */} 
               <Search size={10} className={styles.icon} />

            </div>

            {/* Submit button for the form */}
            <button type="submit" className={styles.button}>
              { /*Search*/}      
              <Search size={10} className={styles.icon} />       
              {/*<img className={styles.searchIcon} src="searchIcon.png" alt="Search Icon" />*/}
            </button>
          </form>

          {/* Error message display */}
          {error && <p className={styles.error}>{error}</p>}
        </div>

        {/* Link for using current location */}
        <div className={styles.currentLocationLink}>
          <p>
            <img className={styles.crosshair} src="" alt="" />
            Use my current location
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
