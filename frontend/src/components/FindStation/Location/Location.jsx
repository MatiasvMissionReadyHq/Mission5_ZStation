import { useQuery } from 'react-query'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import style from './Location.module.css'


export default function Location(){
    const {data, isLoading, error } = useQuery("Location", getLocation)
    const [isOpen, setIsOpen] = useState(false)
    const [isServiceOpen, setIsServiceOpen] = useState(false)
    const [serviceOpen, setServiceOpen] = useState(new Set([0]))
    const [storeOpen, setStoreOpen] = useState(new Set([0]))

    const priceOrder = ["Lowest Price", "Highest Price"]

    function handleServiceOpen(index){
        const updatedServiceOpen = new Set(serviceOpen)
        if(updatedServiceOpen.has(index)){
            updatedServiceOpen.delete(index)
        }
        else{
            updatedServiceOpen.add(index)
        }
        setServiceOpen(updatedServiceOpen)
        setIsServiceOpen(!isServiceOpen)
    }

    function handleOpen(index){
        const updatedStoreOpen = new Set(storeOpen)
        if(updatedStoreOpen.has(index)){
            updatedStoreOpen.delete(index)
        }
        else{
            updatedStoreOpen.add(index)
        }
        setStoreOpen(updatedStoreOpen)
        setIsOpen(!isOpen)
    }

    async function getLocation(){
        const res = await fetch('http://localhost:5000/storeLocation')

        if(!res.ok){
            throw new Error("Network response was not ok")
        }

        return res.json()
    }

    if(isLoading){
        return(<p>Loading</p>)
    }

    if(error){
        return(<p>Error!!</p>)
    }

    return(
        <div className={style.locationContainer}>
            <select className={style.sortPrice} onChange={(e) => {}}>
                <option>Sort prices ..</option>
                {
                    priceOrder.map((order, index) => {
                        return(
                            <option key={index} value={order}>
                                {order}
                            </option>
                        ) 
                    })
                }
            </select>

            {
                data.map((store, index) => (
                    <div className={style.locationCard} key={index}>    
                        <h3>{store.name}</h3>
                        <p>{store.address}</p>
                        

                        <div className={style.openStore}>
                            <button className={style.openStoreBtn} onClick={() => handleOpen(index)}>
                                Opening Hours 
                                {
                                    !storeOpen.has(index) ? 
                                    <FontAwesomeIcon icon={faChevronDown} style={{ fontSize: "0.7rem" }}/> 
                                    : <FontAwesomeIcon icon={faChevronUp} style={{ fontSize: "0.7rem" }} />
                                }
                            </button>

                            {storeOpen.has(index) &&
                                store.openingHours.map((time, index) => (
                                    <div className={style.openingHours} key={index}>
                                        <div className={style.openInfoContainer}>
                                            <p>{time.day}</p>
                                            <p>{time.hours}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        
                        <div className={style.service}>
                            <button className={style.serviceBtn} onClick={() => handleServiceOpen(index)}>
                                Services 
                                {
                                    !serviceOpen.has(index) ? 
                                    <FontAwesomeIcon icon={faChevronDown} style={{ fontSize: "0.7rem" }}/> 
                                    : <FontAwesomeIcon icon={faChevronUp} style={{ fontSize: "0.7rem" }} />
                                }
                            </button>

                            {serviceOpen.has(index) &&
                                store.services.map((service, index) => (
                                    <div key={index}>
                                        <button className={style.serviceInfoBtn}>{service.name}</button>
                                    </div>
                                ))
                            }
                        </div>

                        <div className={style.fuelPrice}>
                            <p>Fuel Prices :</p>
                            <div className={style.fuels}>
                                <p>TEMP FUEL 1</p>
                                <p>TEMP FUEL 2</p>
                                <p>TEMP FUEL 3</p>
                                <button className={style.findOutMoreBtn}>Find out more</button>
                            </div>
                            
                        </div>
                    </div>
                ))
            }
        </div>
    )
}