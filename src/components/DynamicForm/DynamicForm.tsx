import React, { useState } from "react";
import styles from './DynamicForm.module.scss'
import '@fortawesome/fontawesome-free/css/all.min.css';


// Define Field and FormData types
interface FieldConfig {
  value: string;
  label: string;
  listType?: string;
  datasource?: { records: { key: string; value: string }[] };
  inline?: boolean;
}

interface Field {
  type: "TextInput" | "Dropdown" | "RadioButtons" | "Email" | "Decimal";
  config: FieldConfig;
}

interface FormData {
  [key: string]: string;
}

const DynamicForm = ({ fields }: { fields: Field[] }) => {
  console.log(fields);
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

  const generateField = (field: Field) => {
    const { label, value, datasource } = field.config;
    console.log(field, "sharoz");

    switch (field.type) {
      case "TextInput":
        return (
          <div key={label}>
            <label htmlFor={label}>{convertLabel(label)}</label>
            <input
              type="text"
              id={label}
              name={label}
              value={formData[label] || ""}
              onChange={handleChange}
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
              name={label}
              value={formData[label] || ""}
              onChange={handleChange}
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
    console.log("Form Submitted: ", formData);
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {fields && fields?.map((field) => generateField(field))}
        <div className={styles.formActions}>
          <button type="submit">Submit  <i className="fas fa-arrow-right"></i></button>
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;
