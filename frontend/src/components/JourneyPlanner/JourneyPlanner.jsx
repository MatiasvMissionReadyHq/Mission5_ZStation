import React from 'react';
import MapComponent from './Googlemap/MapComponent';
import Herobanner from './HeroBanner/Herobanner';

export default function JourneyPlanner(){
    return (
        <div>
            <Herobanner />
             {/* Other components */}
            <MapComponent />
        </div>
    );
};
