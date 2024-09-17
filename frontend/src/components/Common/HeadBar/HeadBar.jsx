import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import style from './HeadBar.module.css'
import HeadBarContent from './HeadBarContent'

export default function HeadBar({ sendIsClickedBackToApp }){
    const [userInput, setUserInput] = useState("")
    const [isMenuClicked, setIsMenuClicked] = useState(false)

    function handleSubmit(e){
        e.preventDefault()
        console.log(userInput)
    }

    function handleClick(){
        setIsMenuClicked(!isMenuClicked)
    }

    useEffect(() => {
        sendIsClickedBackToApp(isMenuClicked)
    })

    return(
        <div className={style.headBarContainer}>
            <div className={style.leftSection}>
                    <NavLink to="/">
                        <img className={style.stationIcon} src="./zStationIcon.png" alt="Z Station Sign" />
                    </NavLink>                
                    {isMenuClicked && window.screen.width <= 430 &&
                        <HeadBarContent />
                    }
                    {window.screen.width > 431 && 
                        <div className={style.normal}>
                            <h5>Products and services <img className={style.downVectorIcon} src="./downVector.png" alt="downVector" /></h5>
                            <h5>For businesses <img className={style.downVectorIcon} src="./downVector.png" alt="downVector" /></h5>
                            <h5>Sustainability <img className={style.downVectorIcon} src="./downVector.png" alt="downVector" /></h5>
                            <h5>About Z <img className={style.downVectorIcon} src="./downVector.png" alt="downVector" /></h5>
                        </div>
                    }
            </div>

            <div className={style.rightSection}>
                {window.screen.width > 431 &&
                    <NavLink to="/FindStation">
                        <button className={style.stationBtn}>Find A Station</button>
                    </NavLink>
                }
                
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

                {window.screen.width <= 430 &&
                    <div className={style.menuContainer}>
                        <span className={style.divider}></span>
                        <button onClick={handleClick} className={style.menuBtn}>
                            {isMenuClicked 
                                ? <FontAwesomeIcon icon={faXmark} style={{color:"#ED560E", fontSize:"1.5rem"}}/> 
                                : <FontAwesomeIcon icon={faBars} style={{color:"#ED560E", fontSize:"1.5rem"}}/>}
                        </button>
                    </div>
                }

            </div>
        </div>
    )
}