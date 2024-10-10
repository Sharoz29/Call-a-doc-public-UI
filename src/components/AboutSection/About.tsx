
import styles from './About.module.scss';
import image1 from '../../../src/assets/image1.jpg'; 


const AboutSection = () => {
  return (
    <>
      <section className={styles.aboutSection}>
        <div className={styles.imageContainer}>
          <img src={image1} alt="Nurse helping elderly" className={styles.mainImage} />
          <div className={styles.checkupTag}>
            <p>Regular Checkup</p>
          </div>
          <div className={styles.badge}>
            <p><strong>98k+</strong> Happy Patients</p>
          </div>
        </div>

        <div className={styles.textContainer}>
          <h2>About Us</h2>
          <h3>Dedicated to Improving Lives</h3>
          <p>
            At Home Health Services, our mission is to provide compassionate, personalized care that empowers
            our clients to live independently and with dignity. We believe in treating each individual with the utmost
            respect and care, tailoring our services to meet their unique needs and preferences.
          </p>
          <h4>Our Mission</h4>
          <p>
            Our goal is to create a nurturing and supportive environment where our clients can flourish and experience
            the highest possible quality of life.
          </p>
          <a href="#" className={styles.learnMoreButton}>Learn More &rarr;</a>
        </div>
      </section>


    </>
  );
};

export default AboutSection;
