import styles from './footer.module.css';

const Footer = ()=>{
    return(
        /******* Footer ********/
        <footer>
            <div className={styles["column"]}>
                <h3>Products & Services</h3>
                <ul>
                    <li><a href="#">At the station</a></li>
                    <li><a href="#">Z App</a></li>
                    <li><a href="#">Power your home with Z</a></li>
                    <li><a href="#">Rewards & Promotions</a></li>
                </ul>
            </div>
            <div className={styles["column"]}>
                <h3>For Businesses</h3>
                <ul>
                    <li><a href="#">Z Business Fuel Card</a></li>
                    <li><a href="#">Fuels & Services</a></li>
                    <li><a href="#">Business Tips & Stories</a></li>
                </ul>
            </div>
            <div className={styles["column"]}>
                <h3>Sustainability</h3>
                <ul>
                    <li><a href="#">Our Sustainability Goals</a></li>
                    <li><a href="#">Nature Restoration</a></li>
                    <li><a href="#">Supplier Code of Conduct</a></li>
                    <li><a href="#">Supporting Electric Vehicles</a></li>
                </ul>
            </div>
            <div className={styles["column"]}>
                <h3>About Z</h3>
                <ul>
                    <li><a href="#">Our Story</a></li>
                    <li><a href="#">What We Stand For</a></li>
                    <li><a href="#">Our People</a></li>
                    <li><a href="#">News</a></li>
                    <li><a href="#">Careers at Z</a></li>
                    <li><a href="#">Corporate Centres</a></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;