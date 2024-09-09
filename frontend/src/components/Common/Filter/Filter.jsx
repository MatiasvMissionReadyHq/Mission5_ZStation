import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import style from './Filter.module.css'

export default function Filter({sendDataToStation, page}){

    function checkPage(page){
        return page === "Find A Station"
    }


    return(
        <div className={style.filterContainer}>
            <div className={style.pageNavigation}>
                <NavLink to="/">
                    <p>Home</p>
                </NavLink>
                
                <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: "0.8rem" }} />

                {checkPage(page) &&
                    <NavLink to="/findStation">
                        <p className={style.currentPage}>{page}</p>
                    </NavLink>
                }
                {!checkPage(page) &&
                    <NavLink to="/findStation">
                        <p className={style.currentPage}>{page}</p>
                    </NavLink>
                }
            </div>
        </div>
    )
}