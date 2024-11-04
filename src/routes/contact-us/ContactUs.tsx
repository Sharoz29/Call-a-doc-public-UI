import styles from "./Contact.module.scss";
import rightDoctorImage from "../../../src/assets/rightDoctorImage.png";
import { useState } from "react";
import { caseService } from "../../services/case.service";
import { actions, caseTypeIds } from "../../auth/global";
import { assignmentService } from "../../services/assignment.service";
import { ToastContainer, toast } from "react-toastify";
import ThankYou from "../../components/ThankYouMessage/ThankYou";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [messageResponse,setMessageResponse]=useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const reqBody = {
      content: {
        YourName: name,
        Email: email,
        Phone: phone,
        MessageUs: message,
        Address: address,
      },
      pageInformation: [],
    };

    try {
      const res = await caseService.getCaseView(caseTypeIds.CONTACT_US);
      const caseUpdateId = res.data?.caseInfo?.assignments?.[0]?.ID;

      const assignmentResponse = await assignmentService.createAssignment(
        caseUpdateId,
        actions.CREATE,
        reqBody,
        res.etag
      );
      if (assignmentResponse) {
        setMessageResponse(assignmentResponse.confirmationNote)
        toast.success("Your message has been successfully sent!", {
          autoClose: 5000,
        });
        setIsSubmitted(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <ToastContainer />

      <section className={styles.contactMain}>
        <div className={styles.contatctSection}>
          <div className={styles.content}>
            {isSubmitted ? (
              <div>
                <ThankYou message={messageResponse} />
              </div>
            ) : (
              <div className="">
                <h3>Contact Us</h3>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter your name"
                      required
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
                      required
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
                      required
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
                      required
                      onChange={(e) => setPhone(e.target.value)}
                      className={styles.inputField}
                    />
                  </div>

                  <div>
                    <label>Message</label>
                    <textarea
                      id="textarea"
                      required
                      placeholder="Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={styles.inputField}
                    />
                  </div>

                  <div className={styles.formActions}>
                    <button type="submit" className={styles.submitButton}>
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            )}
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
