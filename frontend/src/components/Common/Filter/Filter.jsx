import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import React, { useState } from 'react'
import style from './Filter.module.css'

export default function Filter({sendDataToStation, page}){
    const [selectedService, setSelectedService] = useState("Select a service or services")
    const [selectedStationType, setSelectedStationType] = useState("Select Station Type")
    const [selectedFuelType, setSelectedFuelType] = useState("Select Fuel Type")

    const ServiceType = [{"EV Charging":["Ultra-Fast", "Fast", "Fast &/or Ultra-Fast"]},
                         {"Food & Drink": ["f'real", "Pre-order Coffee", "Z Espress Coffee & Fresh Food"]},
                         
                         {"Car Wash" : ["Z2O carwash"]},
                         {"Payment Option": ["Pay by plate", "Pay at pump", "Pay in app"]},
                         {"Fueling and Maintenance Gear" : ["Super long hoses", 
                                                            "AdBlue Diesel Exhaust Fluid", 
                                                            "Fast fill Diesel lane",
                                                            "LPG SWAP'n'GO"]},
                         {"Other": ["Compostable Cups", "Trailer hire", "Bathrooms", "A-Z Screen", "ATM"]}
                        ]
    const StationType = ["Truck stop", "Service Station"]
    const FuelType = ["ZX Premium", "Z91 Unleaded", "Z Diesel"]

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
            {window.screen.width > 431 &&
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
                        <NavLink to="/journeyPlanner" className={style.currentPage}>
                            <p>{page}</p>
                        </NavLink>
                    }
                </div>
            }

            <div className={style.filterList}>
                <div className={style.filter}>
                    <p>Services</p>
                    <select className={style.selectService} value={selectedService} onChange={handleService}>
                        <option>Select a service or services</option>
                        {
                            ServiceType.map((category, index) => {
                                const categoryName = Object.keys(category)[0]
                                const services = category[categoryName]

                                return(
                                    <React.Fragment  key={index} >
                                        <option disabled className={style.serviceTypeLabel}>{categoryName}</option>
                                        {
                                            services.map((service, index) => (
                                                <option key={index} value={service}>
                                                    {service}
                                                </option>
                                            ))
                                        }
                                    </React.Fragment>
                                )
                            }) 
                        }
                    </select>
                </div>

                <div className={style.filter}>
                    <p>Station Type</p>
                    <select className={style.selectType} value={selectedStationType} onChange={handleStationType}>
                        <option>Select Station Type</option>
                            {
                                StationType.map((station, index) => (
                                    <option key={index} value={station}>{station}</option>
                                ))
                            }
                    </select>
                </div>

                <div className={style.filter}>
                    <p>Fuel Type</p>
                    <select className={style.selectType} value={selectedFuelType} onChange={handleFuelType}>
                        <option>Select Fuel Type</option>
                            {
                                FuelType.map((fuel, index) => (
                                    <option key={index} value={fuel}>{fuel}</option>
                                ))
                            }
                    </select>
                </div>

                <div className={style.btnContainer}>
                    <button className={style.filterBtn} onClick={handleDataBackToStation}>Apply Filters</button>
                    {window.screen.width > 431 &&
                        <button className={style.clearBtn} onClick={clearFilter}>Clear Filters</button>
                    }
                </div> 
            </div>
        </div>
    )
}