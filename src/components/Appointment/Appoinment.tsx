import styles from "./Appointment.module.scss";
import appointment from "../../assets/appointment.png";
import { useState } from "react";
import DynamicForm from "../DynamicForm/DynamicForm";
import { caseTypeIds } from "../../auth/global";
import data from "../../data/data.json";
const Appointment = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const { appointmentData } = data.components;

  function openForm(e: React.MouseEvent<HTMLButtonElement | MouseEvent>) {
    e.preventDefault();
    setShowForm(true);
  }

  return (
    <section className={styles.appointmentMain}>
      <div className={styles.appointmentSection}>
        <div className={styles.content}>
          <h3>{appointmentData.Header}</h3>
          <div className={styles.AppointmentContent}>
            <div>{appointmentData.para1}</div>
            <div>{appointmentData.para2}</div>
          </div>
          <div className={styles.appointmentBtnDiv}>
            <button
              style={{ display: showForm ? "none" : "" }}
              className={styles.appointmentBtn}
              onClick={(e) => openForm(e)}
            >
              {appointmentData.Header}
            </button>
          </div>

          <div className="">
            {showForm && (
              <DynamicForm caseTypeId={caseTypeIds.APPOINTMENT_BOOKING} />
            )}
          </div>
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
