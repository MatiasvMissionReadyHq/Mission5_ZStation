import { useNavigate, useLocation } from "react-router-dom"; 
import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import styles from './stationInfo.module.css';

const StationInfo = () => {

    // stationDetail?id=66e4a527721e83dab8cf95d0
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id'); // Get the id from query parameter
    console.log(id);

    const navigation = useNavigate();
    const [stationInfo, setStationInfo] = useState({});
    const [stationLocation, setStationLocation] = useState({
                    lat: -38.666499169341, 
                    lng: 177.96274210418
                });

    const handleReturn = () => {
        navigation('/FindStation');
    }

    const mapStyles = {        
        height: "100%",
        width: "100%"};
    

    const customIcon = {
        url: "./StationPin.png", 
        scaledSize: { width: 50, height: 60 }, 
    }

    useEffect(() => {
        fetchDataById('66e4a527721e83dab8cf95d0');
        console.log(`${process.env.PUBLIC_URL}/getdirections.png`);
    }, []);


    useEffect(() => {

        if(stationInfo?.latitude && stationInfo?.longitude){
            const defaultCenter = {
                lat: Number(stationInfo.latitude),
                lng: Number(stationInfo.longitude)
            }
            setStationLocation(defaultCenter);
        }
        
    }, [stationInfo]);

    const fetchDataById = async(id) =>{
    // async function fetchDataById(){

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
            setStationInfo(data);
            console.log(data)
            
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
                                <img src={`${process.env.PUBLIC_URL}/getdirections.png`} alt="Get Directions" className={styles["station-getDirections-image"]} onClick={handleOnClick(stationInfo.latitude, stationInfo.longitude)}/>
                            </div>
                        </div>
                        <div className={styles["station-fuel-info"]}>
                            <div className={styles["fuel-items-content"]}>
                                <img src='./premium.png' alt="Premium" className={styles["station-fuel-logo"]}/>
                                <p style={{alignSelf: 'center'}}>$ 2.895 / L</p>
                            </div>
                            <div className={styles["fuel-items-content"]}>
                                <img src='./unleaded.png' alt="Unleaded" className={styles["station-fuel-logo"]}/>
                                <p style={{alignSelf: 'center'}}>$2.746 / L</p>
                            </div>
                            <div className={styles["fuel-items-content"]}>
                                <img src='./diesel.png' alt="Diesel" className={styles["station-fuel-logo"]}/>
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
                        <LoadScript
                                googleMapsApiKey='AIzaSyAywyBQAsX99xiC0AoxV4EvEky6oj_Xp8M'>
                                    <GoogleMap
                                    mapContainerStyle={mapStyles}
                                    zoom={16}
                                    center={stationLocation}
                                    >
                                    <Marker 
                                        position={stationLocation} 
                                        icon={customIcon} 
                                    />
                                    </GoogleMap>
                            </LoadScript>
                    </div>
                </div>
                <div className={styles['service-main-container']}>
                    <div className={styles['service-left-container']}>
                        <h3>Services</h3>
                        <img src='./findOutMoreButton.png' alt="Z Petrol Station" className={styles["find-out-more-btn"]}/>
                    </div>
                    <div className={styles['service-right-container']}>
                        {stationInfo?.services?.map((hour, index) => (    
                            <div key={index} className={styles['service-container']}>
                                <p>{hour.name}</p>
                            </div>  
                        ))}  
                    </div>
                </div>
            </div>
        </>
    )
}


export default StationInfo;