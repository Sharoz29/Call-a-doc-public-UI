
import styles from './GuidingPrinciples.module.scss'
import leftDoctorImage from '../../../src/assets/leftDoctorImage.png'; 
import rightDoctorImage from '../../../src/assets/rightDoctorImage.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandsHelping, faShieldAlt, faStar } from '@fortawesome/free-solid-svg-icons';

const GuidingPrinciples = () => {
  return (
    <section className={styles.guidingPrinciples}>
      <div className={styles.doctorImages}>
        <img src={leftDoctorImage} alt="Medical Team" className={styles.leftDoctor} />
        <h2>Guiding Principles</h2>
        <img src={rightDoctorImage} alt="Medical Professional" className={styles.rightDoctor} />
      </div>
      <div className={styles.principlesContainer}>
        <div className={styles.principles}>
     
          <div className={styles.principleCard}>
            <FontAwesomeIcon icon={faHandsHelping} className={styles.icon} />
            <h3>Compassion</h3>
            <p>We approach every client with empathy, kindness, and a genuine desire to improve their quality of life.</p>
          </div>
     
          <div className={styles.principleCard}>
            <FontAwesomeIcon icon={faShieldAlt} className={styles.icon} />
            <h3>Integrity</h3>
            <p>We are committed to honesty, transparency, and upholding the highest ethical standards in all that we do.</p>
          </div>
        
          <div className={styles.principleCard}>
            <FontAwesomeIcon icon={faStar} className={styles.icon} />
            <h3>Excellence</h3>
            <p>We strive for excellence in every aspect of our services, continuously improving to provide the best possible care.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuidingPrinciples;
