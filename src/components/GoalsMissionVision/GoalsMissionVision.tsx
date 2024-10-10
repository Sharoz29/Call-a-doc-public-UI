
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faHandshake, faEye } from '@fortawesome/free-solid-svg-icons'; 
import styles from './GoalsMissionVision.module.scss';

const GoalsMissionVision = () => {
  return (
    <section className={styles.gmvSection}>
      <div className={styles.card}>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faBullseye} />
        </div>
        <h3>Our Goal</h3>
        <p>
          To provide compassionate and personalized care that empowers our clients to live independently.
        </p>
      </div>

      <div className={styles.card}>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faHandshake} />
        </div>
        <h3>Our Mission</h3>
        <p>
          At Home Health Services, we are dedicated to treating each individual with respect, tailoring our services to meet their unique needs and preferences.
        </p>
      </div>

      <div className={styles.card}>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faEye} />
        </div>
        <h3>Our Vision</h3>
        <p>
          To be the leading provider of home health care, recognized for our commitment to dignity, integrity, and excellence in serving our community.
        </p>
      </div>
    </section>
  );
};

export default GoalsMissionVision;
