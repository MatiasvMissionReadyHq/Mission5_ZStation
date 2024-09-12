import style from './Map.module.css'
import GoogleMapReact from 'google-map-react'


export default function Map({getDataFromStation}){
    const apiKey = process.env.REACT_APP_API_KEY
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
            </GoogleMapReact>
        </div>
    )
}