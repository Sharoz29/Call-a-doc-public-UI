
import styles from './HomeCareSection.module.scss';
import HomeHealthCare from '../../../src/assets/HomeHealthCare.png';

const HomeCareSection = () => {
  return (
    <section className={styles.homeCareMain}>

    <div className={styles.homeCareSection}>
      <div className={styles.content}>
        <h1>
          Compassionate <span>Home Health Care</span>
        </h1>
        <p>
          Providing personalized, high-quality home health services to help you
          or your loved ones live independently and with dignity.
        </p>

        <div className={styles.emailInput}>
          <input type="email" placeholder="Enter Your Email" />
          <button>Lets Talk</button>
        </div>
      </div>

      <div className={styles.visuals}>
        <div className={styles.imageWrapper}>
          <img
            src={HomeHealthCare}
            alt="Nurse helping elderly"
            className={styles.mainImage}
            />

        </div>
      </div>
    </div>
            </section>
  );
};

export default HomeCareSection;
