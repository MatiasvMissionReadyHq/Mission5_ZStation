import styles from './promotionSection.module.css';
const PromotionSection = () => {

    return (
        <section className={styles["promotion-section"]}>
            <div className={styles["promotion-text"]}>
                <h2>Go check our app and earn exclusive rewards!</h2>
                <p>Receive exclusive rewards when you invite your friends to download and use the Z app!!</p>
                <button className={styles['promotion-more-button']}>Find out more</button>
            </div>
            <img src="./image17.png" alt="Promotion" className={styles["promotion-image"]}/>
        </section>
    );
 }

export default PromotionSection;