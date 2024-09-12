import React, { useEffect } from 'react';
import styles from './Mapcomponent.module.css'

const MapComponent = () => {
    useEffect(() => {
        const initMap = () => {
            const location = { lat: 40.7128, lng: -74.0060 }; // Example coordinates (New York City)

            const map = new window.google.maps.Map(document.getElementById("map"), {
                zoom: 12,
                center: location,
            });

            new window.google.maps.Marker({
                position: location,
                map: map,
            });
        };

        // Load the Google Maps script
        const loadScript = (src) => {
            const script = document.createElement("script");
            script.src = src;
            script.async = true;
            script.onload = initMap;
            document.body.appendChild(script);
        };

        loadScript("https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places");
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.details}>
                <h2>Location Details</h2>
                <p>Address: 123 Main St, Anytown, USA</p>
                <p>Description: This is a beautiful place to visit.</p>
            </div>

            <div className={styles.map} id="map" />
        </div>
    );

};
export default MapComponent;