import Hero from './Hero/Hero'
import Filter from '../Common/Filter/Filter'
import Location from '../Common/Location/Location'
import Map from './Map/Map'
import style from './FindStation.module.css'
import { useState, useEffect } from 'react'


export default function FindStation(){
    const [passBackLocationFromHero, setPassBackLocationFromHero] = useState("")
    const [passBackFilterFromFilter, setPassBackFilterFromFilter] = useState([])
    const [passBackLocationAndFilterFromLocation, setPassBackLocationAndFilterFromLocation] = useState([])
    const [dataPassToMap, setDataPassToMap] = useState({address: '', filter: [], locationData: []})

    function handleDataFromHero(childData){
        setPassBackLocationFromHero(childData)
    }

    function handleDataFromFilter(childData){
        setPassBackFilterFromFilter(childData)
    }

    function handleDataFromLocation(childData){
        setPassBackLocationAndFilterFromLocation(childData)
    }

    function handleDataPassToMap(){
        setDataPassToMap({address: passBackLocationFromHero, 
                          filter: passBackFilterFromFilter, 
                          locationData: passBackLocationAndFilterFromLocation
                        })
    }

    useEffect(() =>{
        handleDataPassToMap()
    }, [passBackLocationFromHero, passBackFilterFromFilter, passBackLocationAndFilterFromLocation])

    return(
        <div className="findStationContainer">
            <Hero sendDataToStation={handleDataFromHero}/>
            <Filter sendDataToStation={handleDataFromFilter} page={"Find A Station"}/>
            <div className={style.main}>
                <Location className={style.location} sendDataToStation={handleDataFromLocation}/>
                <Map className={style.map} getDataFromStation={dataPassToMap}/>
            </div>
        </div>
    )
}