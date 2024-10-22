import styles from "./Appointment.module.scss";
import appointment from "../../assets/appointment.png";
import { useEffect, useState } from "react";
import DynamicForm from "../DynamicForm/DynamicForm";
import { caseService } from "../../services/case.service";

interface FieldConfig {
  displayAs: string;
  label: string;
  datasource?: { records: { key: string; value: string }[] };
  maxLength?: number | undefined;
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
  const [caseId, setCaseId] = useState("");
  const [etag, setEtag] = useState("");

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    caseService
      .getCaseView("LCS-CallADoc-Work-AppointmentBooking")
      .then((res) => {
        console.log(res);
        const fieldsData: Fields = res?.uiResources?.resources.fields;
        const caseUpdateId = res.data?.caseInfo?.assignments?.[0]?.ID;
        setCaseId(caseUpdateId);
        setfields(fieldsData);
        setEtag(res.etag);
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
        maxLength: fieldConfig.maxLength || null,
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
            {mappedFields && mappedFields.length > 0 && caseId && (
              <DynamicForm
                fields={mappedFields}
                caseUpdateId={caseId}
                etag={etag}
              />
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
