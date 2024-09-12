import styles from './serviceSection.module.css';

function ServiceSection(){
    
    return (
        /* Services Section */
        <section className={styles["services-section"]}>
            <h2>Browse our services</h2>
            <p className={styles['service-subtitle']}>Lorem ipsum dolor sit amet consectetur. Gravida sodales purus lorem odio lobortis id donec.</p>
            <img src="./chip.png" alt="Product & Service" style={{marginTop: "30px"}} className={styles["btn-image"]}/>
            <div className={styles["services-cards-container"]}>
                <div className={styles["services-card"]}>
                <img src="./unsplash_CfhtS2nj95c.png" alt="Trailer Hire" className={styles["card-image"]}/>
                    <h3>Trailer Hire</h3>
                    <p>From flat deck to caged to furniture and more, we've got the top-quality Hire race trailers to move your things from A to B.</p>
                    <button className={styles['more-button']}>Find out more</button>
                </div>
                <div className={styles["services-card"]}>
                    <img src="./unsplash_1KtU1Pf80Vs.png" alt="Trailer Hire" className={styles["card-image"]}/>
                    <h3>Car Wash</h3>
                    <p>GA clean car is a good car. So if your car could do with a good clean, head in to Z and try our Z₂O car wash.</p>
                    <button className={styles['more-button']}>Find out more</button>
                </div>
                <div className={styles["services-card"]}>
                    <img src="./unsplash_KDfQ9lY-MkQ.png" alt="Trailer Hire" className={styles["card-image"]}/>
                    <h3>LPG Bottle Swap</h3>
                    <p>Drive to your nearest Z and swap your 9kg gas bottle for a new one which is yours to keep.</p>
                    <button className={styles['more-button']}>Find out more</button>
                </div>
                <div className={styles["services-card"]}>
                    <img src="./image16.png" alt="Trailer Hire" className={styles["card-image"]}/>
                    <h3>Food & Beverage</h3>
                    <p>Fresh food, great coffee, essential snacks and more. You’ll find a Z shop at over 100 locations around Aotearoa New Zealand.</p>
                    <button className={styles['more-button']}>Find out more</button>
                </div>
            </div>
        </section>
    );
}

export default ServiceSection;