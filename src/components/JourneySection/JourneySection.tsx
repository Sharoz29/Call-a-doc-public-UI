
import styles from './JourneySection.module.scss';
import patientdoctor from '../../assets/patient-doctor.jpg'
import Healthcareprofessionals from '../../assets/Healthcareprofessionals.jpg'

const JourneySection = () => {
  return (
    <section className={styles.journeySection}>
   
      <div className={styles.peopleContainer}>
        <img src={Healthcareprofessionals} alt="Healthcare professionals" /> 
      </div>


      <div className={styles.contentContainer}>
        <div className={styles.textContainer}>
          <h2>Start Your Journey With Us Now</h2>
          <a href='/appointment
          
          
          
           ' className={styles.ctaButton}>Start Now</a>
        </div>

        <div className={styles.imageContainer}>
          <img src={patientdoctor} alt="Doctor and Patient" /> 
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
