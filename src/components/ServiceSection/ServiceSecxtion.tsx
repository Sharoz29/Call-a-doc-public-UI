import styles from './ServiceSection.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope, faUserNurse, faHeartbeat, faUserMd, faHandsHelping, faWheelchair } from '@fortawesome/free-solid-svg-icons';
import data from '../../data/data.json'
const iconMapping: { [key: string]: any } = {
  faStethoscope,
  faUserNurse,
  faHeartbeat,
  faUserMd,
  faHandsHelping,
  faWheelchair
};

const ServicesSection = () => {
  const {services}=data.components;
  return (
    <section className={styles.servicesSection}>
  <h2 className={styles.servicesHeading}>{services.heading}</h2>
  <h3 className={styles.servicesSubHeading}>{services.subHeading}</h3>
      <div className={styles.servicesGrid}>
      {services.services.map((service, index) => (
          <div key={index} className={styles.serviceCard}>
            <div className={styles.serviceIcon}>
              <FontAwesomeIcon icon={iconMapping[service.icon]} />
            </div>
            <div className={styles.innerServiceCard}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href={service.link} className={styles.readMore}>{services.buttonText}</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
