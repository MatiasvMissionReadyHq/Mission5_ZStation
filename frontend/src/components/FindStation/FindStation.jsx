import Hero from './Hero/Hero'
import Filter from './Filter/Filter'
import { useState } from 'react'


export default function FindStation(){
    const [passBackLocationFromHero, setPassBackLocationFromHero] = useState("")

    function handleDataFromHero(childData){
        setPassBackLocationFromHero(childData)
    }

    return(
        <div>
            <Hero sendDataToStation={handleDataFromHero}/>
        </div>
    )
}