import { useNavigate } from 'react-router-dom';
import styles from './contentSection.module.css';

const ContentSection = () => {

    const navigate = useNavigate();

    const handleClick = (path) => {
        if(path === 'find'){
            navigate('/findStation');
        }
        else if(path === 'journey'){
            navigate('/journeyPlanner');
        }
        
    }
    return (
        /***** Content Section *****/
        <section className={styles["content-section"]}>
            <div className={styles["content-text"]}>
                <h2>Looking to get fuelled up?</h2>
                <p>Plan your trips using our Journey Planner and see the nearest stations along the way!</p>
                <img src="./findaStationL.png" onClick={()=>handleClick('find')} alt="Find a station" style={{marginTop: "30px"}} className={styles["btn-image"]}/>
                <img src="./planyourjourneybutton.png" alt="Plan your journey" onClick={()=>handleClick('journey')} style={{marginLeft:"10px", marginTop: "30px"}} className={styles["btn-image"]}/>
            </div>
            <img src="./image1.png" alt="Map" className={styles["content-map"]}/>
        </section>
    );
}
export default ContentSection;