import React from 'react';
import MapComponent from './Googlemap/MapComponent';
import HeroBanner from './HeroBanner/Herobanner';
import Filter from '../Common/Filter/Filter'

export default function JourneyPlanner(){
    return (
        <div>
            
            <HeroBanner />
            <Filter />
            <MapComponent />
           
             {/* Other components */}
        </div>
    );
};
