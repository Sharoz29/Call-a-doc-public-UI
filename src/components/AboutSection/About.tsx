import styles from './About.module.scss';
import image1 from '../../../src/assets/image1.jpg';
import data from '../../data/data.json'

const AboutSection = () => {
  const {aboutUs}=data.components;
  return (
    <>
      <section className={styles.aboutSection}>
        <div className={styles.imageContainer}>
          <img src={image1} alt="Nurse helping elderly" className={styles.mainImage} />
          <div className={styles.checkupTag}>
          <p>{aboutUs.stats.tagline}</p>
        </div>
        <div className={styles.badge}>
          <p><strong>{aboutUs.stats.patientsCount}</strong></p>
        </div>
      </div>

      <div className={styles.textContainer}>
        <h2>{aboutUs.title}</h2>
        <h3>{aboutUs.subtitle}</h3>
        <p>{aboutUs.mainText}</p>
        <h4>{aboutUs.missionTitle}</h4>
        <p>{aboutUs.missionText}</p>
          <a href='/about-us' className={styles.learnMoreButton}>Learn More &rarr;</a>
        </div>
      </section>


    </>
  );
};

export default AboutSection;
