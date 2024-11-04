import React, { useEffect, useState } from "react";
import styles from "./DynamicForm.module.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { assignmentService } from "../../services/assignment.service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { caseService } from "../../services/case.service";
import ClipLoader from "react-spinners/ClipLoader";
import ThankYou from "../ThankYouMessage/ThankYou";
interface FieldData {
  value: string;
  label: string;
  listType?: string;
  datasource?: { records: { key: string; value: string }[] };
  inline?: boolean;
  maxLength?: number | undefined;
  readOnly?: boolean;
  required?: boolean;
}

interface Field {
  type: string;
  config: FieldData;
  maxLength?: number | undefined;
  readOnly?: boolean;
  required?: boolean;
}
interface FieldConfig {
  displayAs: string;
  type: string;
  label: string;
  datasource?: { records: { key: string; value: string }[] };
  maxLength?: number | undefined;
  readOnly?: boolean;
  required?: boolean;
}

interface Fields {
  [key: string]: FieldConfig[];
}

interface FormData {
  [key: string]: string;
}
interface DynamicFormProps {
  caseTypeId: string;
}
interface MappedField {
  type: Field["type"];
  config: {
    label: string;
    value: string;
    datasource?: { records: { key: string; value: string }[] };
  };
}

const DynamicForm = ({ caseTypeId }: DynamicFormProps) => {
  const [fields, setfields] = useState<any | undefined>(undefined);
  const [mappedFields, setMappedFields] = useState<MappedField[] | undefined>(
    []
  );
  const [caseId, setCaseId] = useState("");
  const [etag, setEtag] = useState("");
  const [actions, setActions] = useState<any>();
  const [formData, setFormData] = useState<FormData>({});
  const [filteredContent, setFilteredContent] = useState<any>();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const stepLabels = [
    "Start",
    "Patient Info",
    "Insurance Info",
    "Appointment Booking",
  ];

  useEffect(() => {
    setLoading(true);
    caseService.getCaseView(caseTypeId).then((res) => {
      const fieldsData: Fields = res?.uiResources?.resources.fields;
      const caseUpdateId = res.data?.caseInfo?.assignments?.[0]?.ID;
      const actions = res.actions[0];
      const content = res?.data.caseInfo.content;

      const viewConfigValue: any = Object.values(
        res.uiResources?.resources?.views
      )[1];
      const fieldsConfigData = viewConfigValue[0]?.children[0]?.children;

      mergeArrayAndObjectConfig(fieldsConfigData, fieldsData);

      const filteredcontent = Object.keys(content).reduce((acc, key) => {
        if (
          !key.startsWith("px") &&
          !key.startsWith("py") &&
          !/^[a-z]/.test(key)
        ) {
          acc[key] = content[key];
        }
        return acc;
      }, {} as { [key: string]: string });

      setFilteredContent(filteredcontent);
      setFormData(filteredcontent);
      setCaseId(caseUpdateId);
      setfields(fieldsData);
      setEtag(res.etag);
      setActions(actions);
      setLoading(false);
    });
  }, [caseTypeId]);

  const processFields = (
    fields: Fields | undefined
  ): MappedField[] | undefined => {
    if (!fields) return undefined;

    const filteredFields: Fields = Object.keys(fields)
      .filter((key) => !key.startsWith("px") && !key.startsWith("py"))
      .reduce((obj: Fields, key: string) => {
        obj[key] = fields![key];
        return obj;
      }, {});

    return Object.keys(filteredFields)?.map((key) => {
      const fieldConfig = filteredFields[key][0];
      return {
        type: fieldConfig?.displayAs?.replace(/^px/, "") as Field["type"],
        maxLength: fieldConfig?.maxLength || null,
        readOnly: fieldConfig?.readOnly || null,
        required: fieldConfig?.required || null,
        config: {
          label: `@L ${fieldConfig?.label}`,
          value: `@P .${key}`,
          ...(fieldConfig?.datasource && {
            datasource: fieldConfig?.datasource,
          }),
        },
      };
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    let updatedValue = value;

    if (type === "date") {
      const selectedDate = new Date(value);
      updatedValue = selectedDate.toISOString();
    }

    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  function convertLabel(label: string): string {
    let cleanedLabel = label.includes("@L @L")
      ? label.replace("@L @L", "")
      : label.replace("@L ", "");
    cleanedLabel = cleanedLabel.replace(/([a-z])([A-Z])/g, "$1 $2");
    return cleanedLabel;
  }

  function cleanKeys(obj: { [key: string]: any }): { [key: string]: any } {
    const cleanedObject: { [key: string]: any } = {};

    Object.keys(obj).forEach((key) => {
      let cleanedKey = key.replace("@L ", "");

      cleanedKey = cleanedKey.includes(" ")
        ? cleanedKey
            .toLowerCase()
            .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
              index === 0 ? match.toUpperCase() : match.toUpperCase()
            )
            .replace(/\s+/g, "")
        : cleanedKey.replace(/\s+/g, "");

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

  const generateField = (field: Field, filledContent?: any) => {
    const { label, datasource } = field.config;
    const { maxLength, readOnly, required } = field;
    const formattedKey = convertLabel(label)
      .split(" ")
      ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");

    const currentValue =
      formData[label] || (filledContent ? filledContent[formattedKey] : "");

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
              required={required}
              value={currentValue}
              onChange={handleChange}
              placeholder={convertLabel(label)}
              readOnly={readOnly}
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
              disabled={readOnly}
              required={required}
            >
              <option value="">Select...</option>
              {datasource?.records?.map((option: any) => (
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
                    readOnly={readOnly}
                    required={required}
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
              readOnly={readOnly}
              maxLength={maxLength}
              name={label}
              value={formData[label] || ""}
              onChange={handleChange}
              placeholder={convertLabel(label)}
              required={required}
            />
          </div>
        );

      case "Integer":
        return (
          <div key={label}>
            <label htmlFor={label}>{convertLabel(label)}</label>
            <input
              type="number"
              id={label}
              readOnly={readOnly}
              name={label}
              value={formData[label] || ""}
              onChange={handleChange}
              placeholder={convertLabel(label)}
              required={required}
            />
          </div>
        );

      case "DateTime":
        let cleanedLabel = label.replace("@L ", "");

        cleanedLabel = cleanedLabel.includes(" ")
          ? cleanedLabel
              .toLowerCase()
              .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
                index === 0 ? match.toUpperCase() : match.toUpperCase()
              )
              .replace(/\s+/g, "")
          : cleanedLabel.replace(/\s+/g, "");

        return (
          <div key={label}>
            <label htmlFor={label}>{convertLabel(label)}</label>
            <input
              type="date"
              id={label}
              name={label}
              required={required}
              value={
                currentValue
                  ? new Date(currentValue).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleChange}
              readOnly={readOnly}
            />
          </div>
        );
      default:
        return null;
    }
  };

  function routeNextStep(etag: any, fields: Fields | undefined, action: any) {
    setCaseId(caseId);
    setfields(fields);
    setActions(action);
    setEtag(etag);
    setFormData({});
  }

  function mergeArrayAndObjectConfig(array: any[], object: any) {
    array.forEach((item) => {
      let labelWithoutPrefix = item.config.label.replace("@L ", "");

      if (labelWithoutPrefix.includes(" ")) {
        labelWithoutPrefix = labelWithoutPrefix
          .split(" ")
          .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
          .join("");
      }

      if (object[labelWithoutPrefix] && object[labelWithoutPrefix].length > 0) {
        const { label, datasource, ...configWithoutLabel } = item.config;
        object[labelWithoutPrefix][0] = {
          ...object[labelWithoutPrefix][0],
          ...configWithoutLabel,
        };
      }
    });

    return object;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let count = 0;
    const updatedForm = cleanKeys(formData);
    const submissionData = {
      content: updatedForm,
      pageInstructions: [],
    };

    await assignmentService
      .createAssignment(caseId, actions.ID, submissionData, etag!)
      .then((res) => {
        count++;
        if (!res.hasOwnProperty("nextAssignmentInfo")) {
          setFormSubmitted(true);
          toast.success(
            res.data.confirmationNote || "Form submitted successfully!",
            {
              autoClose: 5000,
            }
          );
        } else {
          const nextFields = res.uiResources.resources.fields;
          const nextAction = res.data.caseInfo.assignments[0].actions[0];
          const content = res?.data?.caseInfo?.content;

          const nextViewConfigValue: any = Object.values(
            res.uiResources?.resources?.views
          )[1];

          const nextFieldsConfigData =
            nextViewConfigValue[0]?.children[0]?.children;

          const filteredcontent = Object.keys(content).reduce((acc, key) => {
            if (
              !key.startsWith("px") &&
              !key.startsWith("py") &&
              !/^[a-z]/.test(key)
            ) {
              acc[key] = content[key];
            }
            return acc;
          }, {} as { [key: string]: string });

          const filteredNextFieldConfigData = nextFieldsConfigData.filter(
            (field: any) => {
              return field.type !== "Group";
            }
          );

          const groupedFilteredNextConfigData = nextFieldsConfigData.filter(
            (field: any) => {
              return field.type === "Group";
            }
          );

          mergeArrayAndObjectConfig(filteredNextFieldConfigData, nextFields);

          groupedFilteredNextConfigData?.forEach((configData: any) => {
            mergeArrayAndObjectConfig(configData.children, nextFields);
          });

          setFilteredContent(filteredcontent);
          routeNextStep(res.etag, nextFields, nextAction);
        }
        setCurrentStep(currentStep + 1);
      })
      .catch((error) => {
        toast.error("Error submitting form. Please try again.", {
          autoClose: 5000,
        });
        console.error(error);
      });
    console.log("Form Submitted: ", submissionData);
  };
  useEffect(() => {
    const processedFields = processFields(fields);
    setMappedFields(processedFields || []);
  }, [fields]);

  return (
    <div className={styles.formContainer}>
      {loading ? (
        <div className={styles.loaderContainer}>
          <ClipLoader className={styles.loader} loading={loading} size={50} />
          <p>Loading form, please wait...</p>
        </div>
      ) : (
        <>
          <div className={styles.stepProgressBar}>
            {!formSubmitted &&
              stepLabels?.map((label, index) => (
                <div
                  key={index}
                  className={`${styles.stepWrapper} ${
                    index + 1 <= currentStep ? styles.completed : ""
                  }`}
                >
                  <div
                    className={`${styles.stepCircle} ${
                      index + 1 <= currentStep ? styles.completed : ""
                    }`}
                  >
                    {index + 1 <= currentStep ? (
                      <i className="fas fa-check"></i>
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>

                  {index < stepLabels.length - 1 && (
                    <div
                      className={`${styles.stepLine} ${
                        index + 1 < currentStep ? styles.completedLine : ""
                      }`}
                    ></div>
                  )}

                  <p className={styles.stepLabel}>{label}</p>
                </div>
              ))}
          </div>
          <ToastContainer />

          {formSubmitted && (
            <div>
              <ThankYou />
            </div>
          )}
          {!formSubmitted &&
            mappedFields &&
            mappedFields.length > 0 &&
            caseId && (
              <form className={styles.form} onSubmit={handleSubmit}>
                {fields &&
                  mappedFields?.map((field: any) =>
                    generateField(field, filteredContent)
                  )}
                <div className={styles.formActions}>
                  <button type="submit">
                    Submit <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </form>
            )}
        </>
      )}
    </div>
  );
};

export default DynamicForm;
