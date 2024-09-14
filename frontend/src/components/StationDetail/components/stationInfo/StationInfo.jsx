import { useNavigate } from "react-router-dom"; 
import styles from './stationInfo.module.css';

const StationInfo = ({ station }) => {

    const navigation = useNavigate();

    const handleReturn = () => {
        navigation('/FindStation');
    }

    return (
        /******* Station Info ********/
        <div className={styles['fuel-main-container']}>
            <div className={styles["station-info-container"]}>
                <div className={styles["left-station-info"]}>
                    <p onClick={()=>handleReturn()} className={styles["get-back-link"]}> {`< Back to find a station`}</p>
                    <h2>Z Station</h2>
                    <div className={styles["display-address-getDirection-container"]}>
                        <div className={styles["address-container"]}>
                            <p style={{marginBottom:'20px'}}>49 Address, New Zealand</p>
                            <p>Contact Us: <span className={styles["phone-number"]}>00-0000000</span></p>
                        </div>
                        <div className={styles["get-directionBtn-container"]}>
                            <img src='./getdirections.png' alt="Get Directions" className={styles["station-getDirections-image"]}/>
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
                        <div className={styles['time-info']}>
                            <p className={styles['days-info']}>Monday</p>
                            <p className={styles['time-info']}>Open 24 hours</p>
                        </div>
                        <div className={styles['time-info']}>
                            <p className={styles['days-info']}>Tuesday</p>
                            <p className={styles['time-info']}>Open 24 hours</p>
                        </div>
                        <div className={styles['time-info']}>
                            <p className={styles['days-info']}>Wednesday</p>
                            <p className={styles['time-info']}>Open 24 hours</p>
                        </div>
                        <div className={styles['time-info']}>
                            <p className={styles['days-info']}>Thursday</p>
                            <p className={styles['time-info']}>Open 24 hours</p>
                        </div>
                        <div className={styles['time-info']}>
                            <p className={styles['days-info']}>Friday</p>
                            <p className={styles['time-info']}>Open 24 hours</p>
                        </div>
                        <div className={styles['time-info']}>
                            <p className={styles['days-info']}>Saturday</p>
                            <p className={styles['time-info']}>Open 24 hours</p>
                        </div>
                        <div className={styles['time-info']}>
                            <p className={styles['days-info']}>Sunday</p>
                            <p className={styles['time-info']}>Open 24 hours</p>
                        </div>
                    </div>
                </div>
                <div className={styles["right-station-info"]}>
                    <img src='./ScreenStationInfo.png' alt="Z Petrol Station" className={styles["station-info-image"]}/>
                </div>
            </div>
            <div className={styles['service-main-container']}>
                <div className={styles['service-left-container']}>
                    <h3>Services</h3>
                    <img src='./findOutMoreButton.png' alt="Z Petrol Station" className={styles["find-out-more-btn"]}/>
                    
                </div>
                <div className={styles['service-right-container']}>a</div>
            </div>
        </div>
    )
}


export default StationInfo;