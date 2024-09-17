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
            if (!window.google) {
                const script = document.createElement("script");
                script.src = src;
                script.async = true;
                script.onload = () => {
                    if (window.google) {
                        initMap();
                    } else {
                        console.error("Google Maps script failed to load.");
                    }
                };
                script.onerror = () => {
                    console.error("Error loading the Google Maps script.");
                };
                document.body.appendChild(script);
            } else {
                initMap();
            }
        };

        loadScript("https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places");
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.details}>
                <h2>Z  15th Ave</h2>
                <p>10-18 Fifteenth Avenue,Tauranga</p>
                <p>24/7 pay at pump</p>
                <p>Monday open 24 hours</p>
                <p>Tuesday open 24 hours </p>
                <p>Wednesday open 24 hours </p>
                <p>Thursday open 24 hours </p>
                <p>Friday open 24 hours </p>
                <p>Saturday open 24 hours </p>
                <p>Sunday open 24 hours </p>
                <p>open 24 hours</p>
                <p>Services</p>
                <p>Fuel Prices: $2.00 per litre</p>

                <h2>Z Aerodrone Road truck stop</h2>
                <p>Aerodrone Road</p>
                <p>open 24 hours</p>
                <p>Services</p>
                <p>Fuel Prices: $2.00 per gallon</p>

                <h2>Z Hornby North truck stop</h2>
                <p>74 Carmen Road</p>
                <p>open 24 hours</p>
                <p>Services</p>
                <p>Fuel Prices: $2.00 per litre</p>
            </div>

            <div className={styles.map} id="map" />
        </div>
    );
};

export default MapComponent;