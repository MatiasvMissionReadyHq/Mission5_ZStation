import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import style from './HeadBarContent.module.css'

export default function HeadBarContent({ getIsClickFromHeadBar }){
    const [isClicked, setIsClicked] = useState(false)

    useEffect(() => {
        handleIsClicked(getIsClickFromHeadBar)
    }, [getIsClickFromHeadBar])

    function handleIsClicked(resultFromHeadBar){
        setIsClicked(resultFromHeadBar)
    }

    return(
        <div className={style.mobile}>
            <div className={style.contentContainer}>
                <h5 className={style.content}>Products and services</h5>
                <FontAwesomeIcon icon={faPlus}/>
            </div>
            <span className={style.divider}></span>
            
            <div className={style.contentContainer}>
                <h5 className={style.content}>For businesses</h5>
                <FontAwesomeIcon icon={faPlus}/>
            </div>
            <span className={style.divider}></span>

            <div className={style.contentContainer}>
                <h5 className={style.content}>Sustainability</h5>
                <FontAwesomeIcon icon={faPlus}/>
            </div>
            <span className={style.divider}></span>
            
            <div className={style.contentContainer}>
                <h5 className={style.content}>About Z</h5>
                <FontAwesomeIcon icon={faPlus}/>
            </div>
            <span className={style.divider}></span>

            <div className={style.btnContainer}>
                <NavLink to='/findStation'>
                    <button className={style.directBtn}>
                        <img src='/findStationBtn.png' alt='Find a station button'/>
                    </button>
                </NavLink>

                <NavLink to='/journeyPlanner'>
                    <button className={style.directBtn}>
                        <img src='/planJourneyBtn.png' alt='Plan your Journey button'/>
                    </button>
                </NavLink>
            </div>
        </div>
    )
}