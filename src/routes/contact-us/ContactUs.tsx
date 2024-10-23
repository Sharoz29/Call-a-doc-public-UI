import styles from "./Contact.module.scss";
import rightDoctorImage from "../../../src/assets/rightDoctorImage.png";
import { useEffect, useState } from "react";
import { caseService } from "../../services/case.service";
import DynamicForm from "../../components/DynamicForm/DynamicForm";

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

const ContactUs = () => {
  const [fields, setfields] = useState<Fields | undefined>(undefined);
  const [caseId, setCaseId] = useState("");
  const [etag, setEtag] = useState("");

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    caseService.getCaseView("LCS-CallADoc-Work-ContactUs").then((res) => {
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
      .reduce((obj: any, key: string) => {
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

  console.log(fields, caseId, etag);

  return (
    <>
      <section className={styles.contactMain}>
        <div className={styles.contatctSection}>
          <div className={styles.content}>
            <h3>Contact Us</h3>
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
                src={rightDoctorImage}
                alt="Contact Us"
                className={styles.mainImage}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ContactUs;
