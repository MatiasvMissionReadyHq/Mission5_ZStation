import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import style from './HeadBar.module.css'

export default function HeadBar(){
    const [userInput, setUserInput] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        console.log(userInput)
    }

    return(
        <div className={style.headBarContainer}>
            <div className={style.leftSection}>
                <NavLink to="/">
                    <img className={style.stationIcon} src="./zStationIcon.png" alt="Z Station Sign" />
                </NavLink>
                <h5>Products and services <img className={style.downVectorIcon} src="./downVector.png" alt="downVector" /></h5>
                <h5>For businesses <img className={style.downVectorIcon} src="./downVector.png" alt="downVector" /></h5>
                <h5>Sustainability <img className={style.downVectorIcon} src="./downVector.png" alt="downVector" /></h5>
                <h5>About Z <img className={style.downVectorIcon} src="./downVector.png" alt="downVector" /></h5>
            </div>

            <div className={style.rightSection}>
                <NavLink to="/FindStation">
                    <button className={style.stationBtn}>Find A Station</button>
                </NavLink>
                
                <div className={style.inputField}>
                    <input
                        className={style.headBarInput} 
                        type="text" 
                        placeholder="Search" 
                        onChange={(e) => setUserInput(e.target.value)} 
                        value={userInput}
                    />
                    <button 
                        className={style.submitBtn} 
                        type="submit" 
                        onClick={(e) => handleSubmit(e)}
                    >
                        <img className={style.searchIcon} src="searchIcon.png" alt="Search Icon" />
                    </button>
                </div>
            </div>
        </div>
    )
}