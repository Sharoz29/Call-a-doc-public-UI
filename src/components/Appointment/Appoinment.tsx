import styles from "./Appointment.module.scss";
import appointment from "../../assets/appointment.png";
import { assignmentService } from "../../services/assignment.service";
import { useEffect, useState } from "react";
import DynamicForm from "../DynamicForm/DynamicForm";

const Appointment = () => {
  const [fields, setfields] = useState();

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    assignmentService
      .getAssignmentsActions(
        "ASSIGN-WORKLIST LCS-CALLADOC-WORK A-29002!CREATEFORM_DEFAULT",
        "Create"
      )
      .then((res) => {
        const fieldsData = res?.uiResources?.resources.fields;
        setfields(fieldsData);
        console.log(res?.uiResources?.resources.fields);
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

  const mappedFields =
    fields &&
    filteredFields &&
    Object.keys(filteredFields!).map((key) => {
      const fieldConfig = fields![key][0]; // Get the first object inside the array
      return {
        type:
          fieldConfig.displayAs === "pxTextInput"
            ? "TextInput"
            : fieldConfig.displayAs === "pxDropdown"
            ? "Dropdown"
            : "TextInput", // Define types dynamically based on `displayAs`
        config: {
          label: `@L ${fieldConfig.label}`,
          value: `@P .${key}`,
          ...(fieldConfig.datasource && { datasource: fieldConfig.datasource }),
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
