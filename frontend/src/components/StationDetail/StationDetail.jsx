import { useNavigate, useParams } from "react-router-dom"; 
import { useEffect, useState } from "react";
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import {APIProvider, Map, Marker, AdvancedMarker} from '@vis.gl/react-google-maps';
import styles from './stationInfo.module.css';


export default function StationDetail(){

    const { id } = useParams();
    const apiKey = process.env.REACT_APP_API_KEY;
    const navigation = useNavigate();
    const [stationInfo, setStationInfo] = useState({});
    const [stationLocation, setStationLocation] = useState(false);


    const handleReturn = () => {
        navigation('/FindStation');
    }

    const mapStyles = {        
        height: "100%",
        width: "100%"};
    

    const customIcon = {
        url: "/StationPin.png", 
        scaledSize: { width: 50, height: 60 }, 
    }

    useEffect(() => {

        if(typeof(id) === 'undefined'){
            navigation('/FindStation');
        }else{
            fetchDataById(id);
        }
        
    }, []);

    const ServiceType = [

        { "EV Charging": ["Ultra-Fast", "Fast", "Fast &/or Ultra-Fast"] },
        { "Food & Drink": ["f'real", "Pre-order Coffee", "Z Espress Coffee & Fresh Food"] },
        { "Car Wash": ["Z2O carwash"] },
        { "Payment Option": ["Pay by plate", "Pay at pump", "Pay in app"] },
        { "Fueling and Maintenance Gear": ["Super long hoses", "AdBlue Diesel Exhaust Fluid", "Fast fill Diesel lane", "LPG SWAP'n'GO"] },
        { "Other": ["Compostable Cups", "Trailer hire", "Bathrooms", "A-Z Screen", "ATM"] }
    ];

    // Convert ServiceType to a lookup object for easier access
    const serviceCategoryMap = ServiceType.reduce((acc, category) => {
        const [categoryName, services] = Object.entries(category)[0];
        services.forEach(service => {
        acc[service] = categoryName;
        });
        return acc;
    }, {});

    useEffect(() => {

        if(stationInfo?.latitude && stationInfo?.longitude){
            const defaultCenter = {
                lat: Number(stationInfo.latitude),
                lng: Number(stationInfo.longitude)
            }
            setStationLocation(defaultCenter);
            //console.log(stationInfo)
        }
        
    }, [stationInfo]);


    const fetchDataById = async(id) =>{

        const options = {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: {
            'Content-Type': 'application/json',
            }
        }

        try{
            const response = await fetch('http://localhost:5000/stationDetailsById', options)
            const data = await response.json();
            if(typeof(data?.error)==='undefined'){

                const classifiedServices = data.services.reduce((acc, service) => {
                    const category = serviceCategoryMap[service.name] || 'Unknown';
                    if (!acc[category]) {
                        acc[category] = [];
                    }
                        acc[category].push(service);
                    return acc;
                }, {});

            
                data.services=classifiedServices;
                setStationInfo(data);
            }else{
                navigation('/FindStation');
            }    
            
        }
        catch(error){
            console.log(error)
        }
    }
    
    const handleOnClick = (lat, lng) => {   
        return () => {
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`);
        }   
    }


    

    return (
        /******* Station Info ********/
        // {station.length > 0 && (
        <>
            <div className={styles['fuel-main-container']}>
                <div className={styles["station-info-container"]}>
                    <div className={styles["left-station-info"]}>
                        <p onClick={()=>handleReturn()} className={styles["get-back-link"]}> {`< Back to find a station`}</p>
                        <h2>{`${stationInfo?.name ? stationInfo.name :'Z Station'}`}</h2>
                        <div className={styles["display-address-getDirection-container"]}>
                            <div className={styles["address-container"]}>
                                <p style={{marginBottom:'20px'}}>{`${stationInfo?.address ? stationInfo.address + ' ' +stationInfo.city :''}`}, New Zealand</p>
                                <p>Contact Us: <span className={styles["phone-number"]}>00-0000000</span></p>
                            </div>
                            <div className={styles["get-directionBtn-container"]}>
                                <img src="/getdirections.png" alt="Get Directions" className={styles["station-getDirections-image"]} onClick={handleOnClick(stationInfo.latitude, stationInfo.longitude)}/>
                            </div>
                        </div>
                        <div className={styles["station-fuel-info"]}>
                            <div className={styles["fuel-items-content"]}>
                                <img src='/premium.png' alt="Premium" className={styles["station-fuel-logo"]}/>
                                <p style={{alignSelf: 'center'}}>$ 2.895 / L</p>
                            </div>
                            <div className={styles["fuel-items-content"]}>
                                <img src='/unleaded.png' alt="Unleaded" className={styles["station-fuel-logo"]}/>
                                <p style={{alignSelf: 'center'}}>$2.746 / L</p>
                            </div>
                            <div className={styles["fuel-items-content"]}>
                                <img src='/diesel.png' alt="Diesel" className={styles["station-fuel-logo"]}/>
                                <p style={{alignSelf: 'center'}}>$2.346 / L</p>
                            </div>
                        </div>    
                        <div className={styles["payment-option-container"]}>
                            <h4>Payment</h4>
                            <p>Pay in app</p>
                            <p>Pay at pump</p>
                        </div>
                        <div className={styles["time-info-container"]}>
                            <h4>Station Hours:</h4>
                            {stationInfo?.openingHours?.map((hour, index) => (    
                                <div key={index} className={styles['time-info']}>
                                    <p className={styles['days-info']}>{hour.day}</p>
                                    <p className={styles['time-info']}>{hour.hours}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles["right-station-info"]}>

                    {stationLocation && (   
                        <APIProvider apiKey={apiKey}>
                            <Map
                                style={mapStyles}
                                defaultZoom={16}
                                defaultCenter={stationLocation}
                                gestureHandling={"greedy"}
                                disableDefaultUI
                                >
                                <Marker 
                                    position={stationLocation} 
                                    icon={customIcon} />
                            </Map>
                            </APIProvider>
                            )}
                    </div>
                </div>
                <div className={styles['service-main-container']}>
                    <div className={styles['service-left-container']}>
                        <h3>Services</h3>
                        <img src='/findOutMoreButton.png' alt="Z Petrol Station" className={styles["find-out-more-btn"]}/>
                    </div>
                    <div className={styles['service-right-container']}>

                        {
                            typeof(stationInfo.services) !== 'undefined' &&

                            Object.entries(stationInfo.services).map(([category, services], index) => (
                                <div key={index} className={styles['container-service-details']}>
                                    <div className={styles['service-title-container']}>{category}</div>
                                    <div className={styles['service-details-container']}>
                                        {services.map((service, index) => (
                                            <p key={index}>{service.name}</p>
                                        ))}
                                    </div>
                                </div>
                            ))
                        }  
                    </div>
                </div>
            </div>
        </>
    )
}