import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import style from './Filter.module.css'

export default function Filter({sendDataToStation, page}){
    const [stationMatch, setStationMatch] = useState(247)
    const [selectedService, setSelectedService] = useState("Select a service or services")
    const [selectedStationType, setSelectedStationType] = useState("Select Station Type")
    const [selectedFuelType, setSelectedFuelType] = useState("Select Fuel Type")

    function checkPage(page){
        return page === "Find A Station"
    }

    function handleService(e){
        setSelectedService(e.target.value)
    }

    function handleStationType(e){
        setSelectedStationType(e.target.value)
    }

    function handleFuelType(e){
        setSelectedFuelType(e.target.value)
    }

    function handleDataBackToStation(){
        sendDataToStation([selectedService, selectedStationType, selectedFuelType])
    }

    function clearFilter(){
        setSelectedService("Select a service or services")
        setSelectedStationType("Select Station Type")
        setSelectedFuelType("Select Fuel Type")
    }


    return(
        <div className={style.filterContainer}>
            <div className={style.pageNavigation}>
                <NavLink to="/" className={style.page}>
                    <p>Home</p>
                </NavLink>
                
                <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: "0.8rem" }} />

                {checkPage(page) &&
                    <NavLink to="/findStation" className={style.currentPage}>
                        <p>{page}</p>
                    </NavLink>
                }
                {!checkPage(page) &&
                    <NavLink to="/findStation" className={style.currentPage}>
                        <p>{page}</p>
                    </NavLink>
                }
            </div>

            <div className={style.filterList}>
                <div className={style.filter}>
                    <p>Services</p>
                    <select className={style.selectService} value={selectedService} onChange={handleService}>
                        <option>Select a service or services</option>
                        <option>
                        </option>
                    </select>
                </div>

                <div className={style.filter}>
                    <p>Station Type</p>
                    <select className={style.selectStationType} value={selectedStationType} onChange={handleStationType}>
                        <option>Select Station Type</option>
                        <option>
                        </option>
                    </select>
                </div>

                <div className={style.filter}>
                    <p>Fuel Type</p>
                    <select className={style.selectFuelType} value={selectedFuelType} onChange={handleFuelType}>
                        <option>Select Fuel Type</option>
                        <option>
                        </option>
                    </select>
                </div>

                <div className={style.btnContainer}>
                    <button className={style.filterBtn} onClick={handleDataBackToStation}>Apply Filters</button>
                    <button className={style.clearBtn} onClick={clearFilter}>Clear Filters</button>
                </div> 
            </div>


            {checkPage(page) &&
                <div className={style.resultStation}>
                    <p>{stationMatch} Stations Found</p>
                </div>
            }
            {!checkPage(page) &&
                <div className={style.resultStation}>
                    <p>{stationMatch} stations on route</p>
                </div>
            }
        </div>
    )
}