import Hero from './Hero/Hero'
import Filter from '../Common/Filter/Filter'
import Location from '../Common/Location/Location'
import Map from './Map/Map'
import style from './FindStation.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'


export default function FindStation(){
    const [stationMatch, setStationMatch] = useState(246)
    const [isFilterClicked, setIsFilterClicked] = useState(false)
    const [passBackLocationFromHero, setPassBackLocationFromHero] = useState("")
    const [passBackFilterFromFilter, setPassBackFilterFromFilter] = useState([])
    const [passBackLocationAndFilterFromLocation, setPassBackLocationAndFilterFromLocation] = useState([])
    const [passBackLocationFromMap, setPassBackLocationFromMap] = useState([])
    const [dataPassToMap, setDataPassToMap] = useState({address: '', filter: [], locationData: []})
    const [dataPassToLocation, setDataPassToLocation] = useState({address: '', filter: [], locationData: []})

    function handleClickForFilter(){
        setIsFilterClicked(!isFilterClicked)
    }

    function handleDataFromHero(childData){
        setPassBackLocationFromHero(childData)
    }

    function handleDataFromFilter(childData){
        setPassBackFilterFromFilter(childData)
    }

    function handleDataFromLocation(childData){
        setPassBackLocationAndFilterFromLocation(childData)
    }

    function handleDataFromMap(childData){
        setPassBackLocationFromMap(childData)
    }

    function handleDataPassToLocation(){
        setDataPassToLocation({
            address: passBackLocationFromHero,
            filter: passBackFilterFromFilter
        })
    }

    function handleDataPassToMap(){
        setDataPassToMap({address: passBackLocationFromHero,  
                          locationData: passBackLocationAndFilterFromLocation
                        })
    }


    useEffect(() =>{
        handleDataPassToLocation()
        handleDataPassToMap()
    }, [passBackLocationFromHero, passBackFilterFromFilter, passBackLocationAndFilterFromLocation])


    return(
        <div className="findStationContainer">
            {isFilterClicked && 
                <div>
                    <button className={style.backBtn} onClick={handleClickForFilter}>
                        <FontAwesomeIcon icon={faChevronLeft} style={{ fontSize: "0.8rem" }}/>
                        Back
                    </button>
                    <Filter sendDataToStation={handleDataFromFilter} page={"Find A Station"}/>
                </div>
            }
            {!isFilterClicked &&
                <div>
                    <Hero sendDataToStation={handleDataFromHero}/>
                    {window.screen.width > 431 &&
                        <div>
                            <Filter sendDataToStation={handleDataFromFilter} page={"Find A Station"}/>
                            <p className={style.numberOfStation}>{stationMatch} stations found</p>
                            <div className={style.main}>
                                <Location className={style.location} sendDataToStation={handleDataFromLocation} getDataFromStation={dataPassToLocation}/>
                                <Map className={style.map} getDataFromStation={dataPassToMap} sendDataToStation={handleDataFromMap}/>
                            </div>
                        </div>
                    }
                    {window.screen.width <= 430 &&
                        <div>
                            <button className={style.filterBtn} onClick={handleClickForFilter}>Filters</button>
                            <div className={style.mobileMain}>
                                <Map className={style.map} getDataFromStation={dataPassToMap} sendDataToStation={handleDataFromMap}/>
                                <p className={style.numberOfStation}>{stationMatch} stations found</p>
                                <Location className={style.location} sendDataToStation={handleDataFromLocation} getDataFromStation={dataPassToLocation}/>
                            </div>
                        </div>
                    }         
                </div>       
            }
        </div>
    )
}