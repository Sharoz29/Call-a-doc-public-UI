import styles from './ServiceSection.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope, faUserNurse, faHeartbeat, faUserMd, faHandsHelping, faWheelchair } from '@fortawesome/free-solid-svg-icons';

const ServicesSection = () => {
  return (
    <section className={styles.servicesSection}>
      <h2 className={styles.servicesHeading}>Our Services</h2>
      <h3 className={styles.servicesSubHeading}>Tailored Home Health Care</h3>
      <div className={styles.servicesGrid}>
  
        <div className={styles.serviceCard}>
          <div className={styles.serviceIcon}>
            <FontAwesomeIcon icon={faStethoscope} />
          </div>
          <div className={styles.innerServiceCard}>

          <h3>Nursing Care</h3>
          <p>Our registered nurses provide skilled medical care, medication management, and chronic disease management.</p>
          <a href="#" className={styles.readMore}>Read More</a>
          </div>
        </div>

  
        <div className={styles.serviceCard}>
          <div className={styles.serviceIcon}>
            <FontAwesomeIcon icon={faUserNurse} />
          </div>
          <div className={styles.innerServiceCard}>
          <h3>Personal Care</h3>
          <p>Our compassionate caregivers assist with daily living activities such as bathing, dressing, and meal preparation.</p>
          <a href="#" className={styles.readMore}>Read More</a>
          </div>
        </div>

     
        <div className={styles.serviceCard}>
          <div className={styles.serviceIcon}>
            <FontAwesomeIcon icon={faHeartbeat} />
          </div>
          <div className={styles.innerServiceCard}>
          <h3>Therapy Services</h3>
          <p>Our physical, occupational, and speech therapists help clients regain independence and improve their quality of life.</p>
          <a href="#" className={styles.readMore}>Read More</a>
          </div>
        </div>

  
        <div className={styles.serviceCard}>
          <div className={styles.serviceIcon}>
            <FontAwesomeIcon icon={faUserMd} />
          </div>
          <div className={styles.innerServiceCard}>
          <h3>Skilled Nursing</h3>
          <p>Our registered nurses provide comprehensive medical care, including wound care and chronic disease management.</p>
          <a href="#" className={styles.readMore}>Read More</a>
          </div>
        </div>

        <div className={styles.serviceCard}>
          <div className={styles.serviceIcon}>
            <FontAwesomeIcon icon={faHandsHelping} />
          </div>
          <div className={styles.innerServiceCard}>
          <h3>Supportive Care</h3>
          <p>Our compassionate caregivers assist with daily living activities, grooming, and meal preparation.</p>
          <a href="#" className={styles.readMore}>Read More</a>
          </div>
        </div>


        <div className={styles.serviceCard}>
          <div className={styles.serviceIcon}>
            <FontAwesomeIcon icon={faWheelchair} />
          </div>
          <div className={styles.innerServiceCard}>
          <h3>Rehabilitation Therapy</h3>
          <p>Our physical, occupational, and speech therapists help clients regain independence through personalized treatment plans.</p>
          <a href="#" className={styles.readMore}>Read More</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
