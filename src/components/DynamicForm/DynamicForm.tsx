import React, { useState } from "react";
import styles from "./DynamicForm.module.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { assignmentService } from "../../services/assignment.service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface FieldConfig {
  value: string;
  label: string;
  listType?: string;
  datasource?: { records: { key: string; value: string }[] };
  inline?: boolean;
  maxLength?: number | undefined;
}

interface Field {
  type: "TextInput" | "Dropdown" | "RadioButtons" | "Email" | "Decimal";
  config: FieldConfig;
}

interface FormData {
  [key: string]: string;
}
interface DynamicFormProps {
  fields: Field[];
  caseUpdateId: string;
  etag?: string;
}

const DynamicForm = ({ fields, caseUpdateId, etag }: DynamicFormProps) => {
  const [formData, setFormData] = useState<FormData>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function convertLabel(label: string): string {
    let cleanedLabel = label.replace("@L ", "");

    cleanedLabel = cleanedLabel.replace(/([a-z])([A-Z])/g, "$1 $2");

    return cleanedLabel;
  }

  function cleanKeys(obj: { [key: string]: any }): { [key: string]: any } {
    const cleanedObject: { [key: string]: any } = {};

    Object.keys(obj).forEach((key) => {
      let cleanedKey = key.replace("@L ", "");

      cleanedKey = cleanedKey.replace(/\s+/g, "");

      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        cleanedObject[cleanedKey] = cleanKeys(obj[key]);
      } else {
        cleanedObject[cleanedKey] = obj[key];
      }
    });

    return cleanedObject;
  }

  const generateField = (field: Field) => {
    const { label, datasource, maxLength } = field.config;

    switch (field.type) {
      case "TextInput":
        return (
          <div key={label}>
            <label htmlFor={label}>{convertLabel(label)}</label>
            <input
              maxLength={maxLength}
              type={convertLabel(label) === "Email" ? "email" : "text"}
              id={label}
              name={label}
              value={formData[label] || ""}
              onChange={handleChange}
              placeholder={convertLabel(label)}
            />
          </div>
        );

      case "Dropdown":
        return (
          <div key={label}>
            <label htmlFor={label}>{convertLabel(label)}</label>
            <select
              id={label}
              name={label}
              value={formData[label] || ""}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              {datasource?.records.map((option: any) => (
                <option key={option.key} value={option.value}>
                  {option.value}
                </option>
              ))}
            </select>
          </div>
        );

      case "RadioButtons":
        return (
          <div key={label}>
            <label>{convertLabel(label)}</label>
            <div>
              {datasource?.records?.map((option: any) => (
                <div key={option.key}>
                  <input
                    type="radio"
                    id={`${label}-${option.key}`}
                    name={label}
                    value={option.value}
                    onChange={handleChange}
                    checked={formData[label] === option.value}
                  />
                  <label htmlFor={`${label}-${option.key}`}>
                    {option.value}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case "Email":
        return (
          <div key={label}>
            <label htmlFor={label}>{convertLabel(label)}</label>
            <input
              type="email"
              id={label}
              maxLength={maxLength}
              name={label}
              value={formData[label] || ""}
              onChange={handleChange}
              placeholder={convertLabel(label)}
            />
          </div>
        );

      case "Decimal":
        return (
          <div key={label}>
            <label htmlFor={label}>{convertLabel(label)}</label>
            <input
              type="number"
              id={label}
              name={label}
              value={formData[label] || ""}
              onChange={handleChange}
            />
          </div>
        );

      default:
        return null;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedForm = cleanKeys(formData);
    const submissionData = {
      content: updatedForm,
      pageInstructions: [],
    };

    assignmentService
      .createAssignment(caseUpdateId, "Create", submissionData, etag!)
      .then((res) =>
        toast.success(
          res.data.confirmationNote || "Form submitted successfully!",
          {
            autoClose: 5000,
          }
        )
      )
      .catch((error) => {
        toast.error("Error submitting form. Please try again.", {
          autoClose: 5000,
        });
        console.error(error);
      });
    setFormData({});
    console.log("Form Submitted: ", submissionData);
  };

  return (
    <div className={styles.formContainer}>
      <ToastContainer />
      <form className={styles.form} onSubmit={handleSubmit}>
        {fields && fields?.map((field) => generateField(field))}
        <div className={styles.formActions}>
          <button type="submit">
            Submit <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;
