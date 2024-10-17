
import styles from './Appointment.module.scss'
import appointment from '../../assets/appointment.png'


const Appointment = () => {
  return (
    <section className={styles.appointmentMain}>

    <div className={styles.appointmentSection}>
      <div className={styles.content}>
        <h3>Book an Appointment</h3>
      </div>

      <div className={styles.visuals}>
        <div className={styles.imageWrapper}>
          <img
            src={appointment}
            alt="Appointment"
            className={styles.mainImage}
            />

        </div>
      </div>
    </div>
            </section>
  );
};

export default Appointment;