
import styles from './HomeCareSection.module.scss';
import data from '../../data/data.json'

const HomeCareSection = () => {
  const homeCareData=data.components.HomeCareData;
  return (
    <section className={styles.homeCareMain}>

    <div className={styles.homeCareSection}>
    <div className={styles.content}>
          <h1>
            {homeCareData.title.split(' ')[0]} <span>{homeCareData.titleHighlight}</span>
          </h1>
          <p>{homeCareData.description}</p>

          <div className={styles.emailInput}>
            <input type="email" placeholder={homeCareData.emailPlaceholder} />
            <button>{homeCareData.buttonText}</button>
          </div>
        </div>

      <div className={styles.visuals}>
        <div className={styles.imageWrapper}>
        <img  
              src={homeCareData.imageSrc}
              alt={homeCareData.imageAlt}
              className={styles.mainImage}
            />

        </div>
      </div>
    </div>
            </section>
  );
};

export default HomeCareSection;
