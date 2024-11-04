
import styles from './GuidingPrinciples.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandsHelping, faShieldAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import data from '../../data/data.json'

type Principle = {
  icon: any;
  title: string;
  description: string;
};

const iconMapping: { [key in Principle['icon']]: any } = {
  faHandsHelping,
  faShieldAlt,
  faStar
};

const GuidingPrinciples = () => {
  const {guidingPrinciples}=data.components;
  return (
    <section className={styles.guidingPrinciples}>
      <div className={styles.doctorImages}>
      <img src={guidingPrinciples.images.left} alt="Medical Team" className={styles.leftDoctor} />
        <h2>{guidingPrinciples.title}</h2>
        <img src={guidingPrinciples.images.right} alt="Medical Professional" className={styles.rightDoctor} />
      </div>
      <div className={styles.principlesContainer}>
        <div className={styles.principles}>
     
        {guidingPrinciples.principles.map((principle, index) => (
            <div key={index} className={styles.principleCard}>
              <FontAwesomeIcon icon={iconMapping[principle.icon]}className={styles.icon} />
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuidingPrinciples;
