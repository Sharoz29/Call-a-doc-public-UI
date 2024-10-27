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
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message,setMessage]=useState("");
  const [address,setAddress]=useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      phone,
      address,
      message
    };
    console.log("Form Submitted", formData);
  };


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

  return (
    <>
      <section className={styles.contactMain}>
        <div className={styles.contatctSection}>
          <div className={styles.content}>
            <h3>Contact Us</h3>
            <div className="">
              {/* {mappedFields && mappedFields.length > 0 && caseId && (
                <DynamicForm
                  fields={mappedFields}
                  caseUpdateId={caseId}
                  etag={etag}
                />
              )} */}
            <form onSubmit={handleSubmit}>

              <div >
              <label htmlFor="name">Name</label>
               <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  className={styles.inputField}
                />
              </div>


              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.inputField}
                />
              </div>
              <div>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={styles.inputField}
                />
              </div>
              <div>
                <label htmlFor="phone">Phone</label>
                <input
                  type="number"
                  id="phone"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={styles.inputField}
                />
              </div>
         

              <div>
                <label >Message</label>
                <textarea
                  id="textarea"
                  placeholder="Message"
                  value={message  }
                  onChange={(e) => setMessage(e.target.value)}
                  className={styles.inputField}
                />
              </div>

          
<div className={styles.formActions} >

              <button type="submit" className={styles.submitButton}>
                Submit
              </button>
</div>
            </form>

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
