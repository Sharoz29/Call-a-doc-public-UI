
import styles from './HomeCareSection.module.scss';

const HomeCareSection = () => {
  return (
    <section className={styles.homeCareSection}>
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
            src="/images/nurse-patient.jpg"
            alt="Nurse helping elderly"
            className={styles.mainImage}
          />
          <div className={styles.tag}>
            <p>24/7 Service</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCareSection;
