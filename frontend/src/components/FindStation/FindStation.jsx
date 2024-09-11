import Hero from './Hero/Hero'
import Filter from '../Common/Filter/Filter'
import Location from './Location/Location'
import { useState } from 'react'


export default function FindStation(){
    const [passBackLocationFromHero, setPassBackLocationFromHero] = useState("")
    const [passBackFilterFromFilter, setPassBackFilterFromFilter] = useState([])

    function handleDataFromHero(childData){
        setPassBackLocationFromHero(childData)
    }

    function handleDataFromFilter(childData){
        setPassBackFilterFromFilter(childData)
    }

    return(
        <div>
            <Hero sendDataToStation={handleDataFromHero}/>
            <Filter sendDataToStation={handleDataFromFilter} page={"Find A Station"}/>
            <Location />
        </div>
    )
}