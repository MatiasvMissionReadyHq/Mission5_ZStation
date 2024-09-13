import style from './Map.module.css'
import GoogleMapReact from 'google-map-react'
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import { useState, useEffect } from 'react'


export default function Map({getDataFromStation}){
    const [address, setAddress] = useState('')
    const [filterItem, setFilterItem] = useState([])
    const [locationData, setLocationData] = useState({})
    const apiKey = process.env.REACT_APP_API_KEY

    useEffect(() => {
        setAddress(getDataFromStation.address)
        setFilterItem(getDataFromStation.filter)
        handleLocationArea(getDataFromStation.locationData)
    }, [getDataFromStation])

    function handleLocationArea(locationDataFromStation){
        const sortLocation = {}

        locationDataFromStation.map(location => {    
            const region = location.region

            if(sortLocation[region]){
                sortLocation[region].push(location)
            }
            else{
                sortLocation[region] = [location]
            }
        })

        setLocationData(sortLocation)
    }


    console.log("Address:", address, "Filter: ", filterItem, "Location: ", locationData)
    return(
        <div className={style.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{key : apiKey}}
                defaultCenter={{
                    lat:-40.88694417577929, 
                    lng:172.25732675689105
                }}
                defaultZoom={5.6}
            >
                {/* {
                    locationData.map((location, index) => (
                        <div>

                        </div>
                    ))
                } */}
            </GoogleMapReact>
        </div>
    )
}