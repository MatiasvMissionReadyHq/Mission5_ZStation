import styles from './heroSection.module.css';

const HeroSection = () => {
    return (
        //Hero Section
        <section className={styles["hero-section"]}>
            <img src='./Z-Energy.png' alt="Z Petrol Station" className={styles["hero-image"]}/>
        </section>
    );
}

export default HeroSection;