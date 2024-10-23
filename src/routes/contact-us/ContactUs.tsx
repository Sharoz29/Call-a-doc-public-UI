import styles from './Contact.module.scss'
import rightDoctorImage from '../../../src/assets/rightDoctorImage.png'; 
const ContactUs = () => {
  return<>
  <section className={styles.contactMain}>
      <div className={styles.contatctSection}>
        <div className={styles.content}>
          <h3>Contact Us</h3>
          <div className="">
          
          </div>
        </div>
        <div className={styles.visuals}>
          <div className={styles.imageWrapper}> 
          <img
              src={rightDoctorImage}
              alt="Contact Us"
              className={styles.mainImage}
            />    
          </div>
        </div>
      </div>
    </section>
  </>
};
export default ContactUs;
