import style from './Map.module.css'
import GoogleMapReact from 'google-map-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle as solidCircle} from '@fortawesome/free-solid-svg-icons'
import { faCircle as regularCircle} from '@fortawesome/free-regular-svg-icons'
import StationPin from '/StationPin.png'
import { useState, useEffect } from 'react'


export default function Map({getDataFromStation}){
    const [address, setAddress] = useState('')
    const [stationLocation, setStationLocation] = useState(getDataFromStation.locationData)
    const [locationData, setLocationData] = useState({})
    const [map, setMap] = useState(null)
    const [maps, setMaps] = useState(null)
    const [coordinate, setCoordinates] = useState({lat: -40.88694417577929, lng: 172.25732675689105})
    const [mapZoom, setMapZoom] = useState(5.6)
    const [radius, setRadius] = useState(5000)
    const [displayRadius, setDisplayRadius] = useState(radius / 1000)
    const [circle, setCircle] = useState(null)
    const apiKey = process.env.REACT_APP_API_KEY


    const locationPosition= [
        {
            region: "Auckland",
            latitude:-36.848822281804644,
            longitude:174.75521620223307
        }, 
        {
            region:"Bay of Plenty",
            latitude:-38.071153960657895,
            longitude:176.8898470084462
        }, 
        {
            region:"Canterbury",
            latitude:-43.319949602570276,
            longitude:172.43597833938347
        }, 
        {
            region:"Gisborne",
            latitude:-38.63237898761293,
            longitude:177.9504248551218
        }, 
        {
            region:"Hawkes Bay",
            latitude:-39.430255708701395,
            longitude:176.78757764694
        }, 
        {
            region:"Manawatu-Wanganui",
            latitude:-39.91875400309465,
            longitude:175.08823324160463
        }, 
        {
            region: "Nelson, Tasman, Marlborough",
            latitude:-41.29102117725894,
            longitude:173.29338139463258
        }, 
        {
            region:"Northland",
            latitude:-35.25532369963732,
            longitude:173.64282653685146
        }, 
        {
            region:"Otago",
            latitude:-45.10299286110708,
            longitude:169.42897005594716
        }, 
        {
            region:"Southland",
            latitude:-46.1058167159193,
            longitude:168.22156162883638
        }, 
        {
            region:"Taranaki",
            latitude:"-39.30929368291425",
            longitude:"174.28370285496015"
        }, 
        {
            region:"Waikato",
            latitude:-37.485614597170084,
            longitude:175.02105659728073
        }, 
        {
            region:"Wellington",
            latitude:-41.28184802654788,
            longitude:"174.7769263684856"
        }, 
        {
            region:"West Coast",
            latitude:-42.47696520275326,
            longitude:171.4517923892756
        },
    ]

    useEffect(() => {
        if(getDataFromStation){
            setAddress(getDataFromStation.address)
            setStationLocation(getDataFromStation.locationData)
            handleLocationArea(getDataFromStation.locationData)
        }
        else{
            console.error("getDataFromStation is not available or not an array")
        }
    }, [getDataFromStation])

    useEffect(() =>{
        if(map && maps && address){
            handleGeoCodeAddress(address)

            if(address !== ""){
                setMapZoom(17)

                if(!isNaN(coordinate.lat) && !isNaN(coordinate.lng)){
                    console.log("Coordinate: ", coordinate)
                    const nearestStation = findNearestStation(coordinate.lat, coordinate.lng, stationLocation)
                    console.log(nearestStation)
                    if(nearestStation){
                        setCoordinates({ lat: nearestStation.latitude, lng: nearestStation.longitude})
                        map.setCenter({ lat:nearestStation.latitude, lng:nearestStation.longitude})
                    }
                }
            }
        }
    }, [map, maps, address, coordinate])

    useEffect(() =>{
        if(map && maps && circle){
            circle.setCenter(coordinate)
            circle.setRadius(radius)
        }
        setDisplayRadius(radius / 1000)
    }, [coordinate, radius, map, maps, circle])

    function handleApiLoaded({ map, maps }){
        setMap(map)
        setMaps(maps)

        if(address !== ""){
            const newCircle = new maps.Circle({
                map: map,
                center: coordinate,
                radius: radius,
                fillColor:"#FF5200",
                fillOpacity: 0.3,
                strokeColor: "#FF5200",
                strokeOpacity: 0.8,
                strokeWeight: 2,
            });
            setCircle(newCircle)
        }
    }

    async function handleLocationArea(locationDataFromStation){
        const sortLocation = {}
        const locationDataFromDb = await locationDataFromStation

        if(locationDataFromDb && Array.isArray(locationDataFromDb)){
            locationDataFromDb.map(location => {    
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
        else{
            console.error("Location data is not available or is not an array.")
        }

        
    }

    function getNumberOfStore(locationData, region){
        return locationData[region] ? locationData[region].length : 0
    }

    function haversineDistance(lat1, lng1, lat2, lng2){
        const toRadians = (degree) => degree * (Math.PI / 180)

        const R = 6371;
        const dLat = toRadians(lat2 - lat1)
        const dLng = toRadians(lng2 - lng1)

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
                  Math.sin(dLng / 2) * Math.sin(dLng / 2)

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
        
        return R * c * 1000
    }

    function handleGeoCodeAddress(address){
        if(maps && maps.Geocoder){
            const geocoder = new maps.Geocoder()

            geocoder.geocode({address: address}, (results, status) => {
                if(status === "OK"){
                    const location = results[0].geometry.location
                    setCoordinates({lat:location.lat(), lng: location.lng()})
                    map.setCenter(location)
                }
                else{
                    console.error("Geocode was not successful for the following reason: ", + status)
                }
            })
        }
        else{
            console.error("Maps or Geocoder is not loaded yet.")
        }
    }

    function findNearestStation(userLat, userLng, stations){
        let nearestStation = null
        let minDistance = Infinity

        stations.forEach(station => {
            const distance = haversineDistance(userLat, userLng, station.latitude, station.longitude)
            if(distance < minDistance){
                minDistance = distance
                nearestStation = station
            }
        })
        return nearestStation
    }

    function handleSliderChange(event){
        const newRadius = Number(event.target.value)
        setRadius(newRadius)
        setDisplayRadius(newRadius / 1000)

        if(circle){
            circle.setRadius(newRadius)
        }

        const nearestStation = findNearestStation(coordinate.lat, coordinate.lng, stationLocation)
        if(nearestStation){
            setCoordinates({lat: nearestStation.latitude, lng: nearestStation.longitude})
            map.setCenter({ lat:nearestStation.latitude, lng: nearestStation.longitude})
        }
    }

    return(
        <div className={style.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{key : apiKey}}
                center={coordinate}
                zoom={mapZoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={handleApiLoaded}
                options={{
                    keyboardShortcuts: false,
                    zoomControl: false
                }}
            >
                {address === "" &&
                    locationPosition.map((place, index) => {
                        return(
                            <div 
                                 className={style.markerContainer}
                                 key={index}
                                 lat={place.latitude}
                                 lng={place.longitude}
                            >
                                <FontAwesomeIcon icon={solidCircle} 
                                                 style={{ color: '#ED560E', fontSize: '2rem', opacity: '0.6', position:'absolute'}} 
                                />
                                <FontAwesomeIcon icon={regularCircle} style={{ color: '#ED560E', fontSize: '2rem', opacity: '1'}} />
                                <span className={style.markerNumber}>
                                    {getNumberOfStore(locationData, place.region)}
                                </span>
                            </div>
                        )
                    })
                }
                {address !== "" && location && (
                    <div lat={location.latitude} lng={location.longitude}>
                        <img src={StationPin} alt="Station Pin.png" style={{width:"3vw", height:"9vh"}}/>
                    </div>
                )}
            </GoogleMapReact>

            {address !== "" && <div className={style.sliderContainer}>
                <input
                    type="range"
                    min="5000"
                    max="50000"
                    step="5000"
                    value={radius}
                    onChange={handleSliderChange}
                />
                <p>{displayRadius}km</p>
            </div>}
        </div>
    )
}