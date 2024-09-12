import styles from './ctaSection.module.css';

const CtaSection = () => {

    return (
        /*CTA Section */
        <section className={styles["cta-section"]}>
            <p className={styles["cta-title"]}>Power your home</p>
            <p className={styles["cta-text"]}>Specialized home power plans to help keep your home and vehicles running, tailored for both EV and non-EV drivers.</p>
            <button className={styles["cta-button"]}>Learn more</button>
            <img src="./image29.png" alt="Cta image" />
        </section>
    );
    }

export default CtaSection;    