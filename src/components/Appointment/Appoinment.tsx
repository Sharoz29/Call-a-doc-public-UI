import styles from "./Appointment.module.scss";
import appointment from "../../assets/appointment.png";
import { useState } from "react";
import DynamicForm from "../DynamicForm/DynamicForm";
import { caseTypeIds } from "../../auth/global";

const Appointment = () => {
  const [showForm, setShowForm] = useState<boolean>(false);

  function openForm(e: React.MouseEvent<HTMLButtonElement | MouseEvent>) {
    e.preventDefault();
    setShowForm(true);
  }

  return (
    <section className={styles.appointmentMain}>
      <div className={styles.appointmentSection}>
        <div className={styles.content}>
          <h3>Book an Appointment</h3>
          <div className={styles.AppointmentContent}>
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </div>
          <div className={styles.appointmentBtnDiv}>
            <button
              style={{ display: showForm ? "none" : "" }}
              className={styles.appointmentBtn}
              onClick={(e) => openForm(e)}
            >
              Book an Appointment
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
