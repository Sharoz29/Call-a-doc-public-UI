import styles from "./Appointment.module.scss";
import appointment from "../../assets/appointment.png";
import { assignmentService } from "../../services/assignment.service";
import { useEffect, useState } from "react";
import DynamicForm from "../DynamicForm/DynamicForm";
import { caseService } from "../../services/case.service";


interface FieldConfig {
  displayAs: string;
  label: string;
  datasource?: { records: { key: string; value: string }[] };
}

interface Fields {
  [key: string]: FieldConfig[];
}

interface MappedField {
  type: "TextInput" | "Dropdown";
  config: {
    label: string;
    value: string;
    datasource?: { records: { key: string; value: string }[] };
  };
}

const Appointment = () => {
  const [fields, setfields] = useState<Fields | undefined>(undefined);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    caseService
      .getCaseView("LCS-CallADoc-Work-AppointmentBooking")
      .then((res) => {
        const fieldsData: Fields = res?.uiResources?.resources.fields;
        setfields(fieldsData);
      });
  }, [token]);

  const filteredFields: Fields | undefined =
    fields &&
    Object.keys(fields)
      .filter((key) => !key.startsWith("px") && !key.startsWith("py"))
      .reduce((obj: Fields, key: string) => {
        obj[key] = fields![key];
        return obj;
      }, {});

  const mappedFields: MappedField[] | undefined =
    filteredFields &&
    Object.keys(filteredFields).map((key) => {
      const fieldConfig = filteredFields[key][0];
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
          ...(fieldConfig.datasource && {
            datasource: fieldConfig.datasource,
          }),
        },
      };
    });

  return (
    <section className={styles.appointmentMain}>
      <div className={styles.appointmentSection}>
        <div className={styles.content}>
          <h3>Book an Appointment</h3>
          <div className="">
            {mappedFields && mappedFields.length > 0 && (
              <DynamicForm fields={mappedFields} />
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
