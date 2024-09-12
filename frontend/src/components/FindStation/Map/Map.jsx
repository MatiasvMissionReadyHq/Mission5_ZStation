import style from './Map.module.css'
import GoogleMapReact from 'google-map-react'


export default function Map(){
    const apiKey = "AIzaSyAnj1Qo1B2pSFFL2nOeUlGUafRW0TnSw9c"
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