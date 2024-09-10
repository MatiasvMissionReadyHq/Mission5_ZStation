import styles from './heroSection.module.css';

const HeroSection = () => {
    return (
        //Hero Section
        <section className={styles["hero-section"]}>
            <img src='./group22.jpg' alt="Z Petrol Station" className={styles["hero-image"]}/>
        </section>
    );
}

export default HeroSection;