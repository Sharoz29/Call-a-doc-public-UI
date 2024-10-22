import styles from "./Appointment.module.scss";
import appointment from "../../assets/appointment.png";
import { assignmentService } from "../../services/assignment.service";
import { useEffect, useState } from "react";
import DynamicForm from "../DynamicForm/DynamicForm";
import { caseService } from "../../services/case.service";

const Appointment = () => {
  const [fields, setfields] = useState();

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    caseService
      .getCaseView("LCS-CallADoc-Work-AppointmentBooking")
      .then((res) => {
        const fieldsData = res?.uiResources?.resources.fields;
        setfields(fieldsData);
      });
  }, [token]);

  const filteredFields =
    fields &&
    Object.keys(fields!)
      .filter((key) => !key.startsWith("px") && !key.startsWith("py"))
      .reduce((obj, key) => {
        obj[key] = fields![key];
        return obj;
      }, {});

  //https://web.pega23.lowcodesol.co.uk/prweb/app/call-a-doctor/api/application/v2/assignments/ASSIGN-WORKLIST%20LCS-CALLADOC-WORK%20A-29002!CREATEFORM_DEFAULT/actions/Create?viewType=page
  const mappedFields =
    fields &&
    filteredFields &&
    Object.keys(filteredFields!).map((key) => {
      const fieldConfig = fields![key][0];
      return {
        type:
          fieldConfig.displayAs === "pxTextInput"
            ? "TextInput"
            : fieldConfig.displayAs === "pxDropdown"
            ? "Dropdown"
            : "TextInput",
        config: {
          label: `@L ${fieldConfig.label}`,
          value: `@P .${key}`,
          ...(fieldConfig?.datasource && {
            datasource: fieldConfig?.datasource,
          }),
        },
      };
    });

  console.log(mappedFields);

  return (
    <section className={styles.appointmentMain}>
      <div className={styles.appointmentSection}>
        <div className={styles.content}>
          <h3>Book an Appointment</h3>
        </div>
        <div className="">
          {mappedFields && mappedFields.length > 0 && (
            <DynamicForm fields={mappedFields} />
          )}
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
