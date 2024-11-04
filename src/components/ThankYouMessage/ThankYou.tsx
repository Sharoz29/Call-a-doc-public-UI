import React from "react";
import styles from "./ThankYou.module.scss";
import { useNavigate } from "react-router-dom";

interface ThankYouProps {
  message?: string; 
}

const ThankYou: React.FC<ThankYouProps> = ({ message = "Thank You for Reaching Out!" }) => {
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className={styles.thankYouContainer}>
      <div className={styles.iconContainer}>
        <svg
          className={styles.checkmark}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle className={styles.checkmarkCircle} cx="26" cy="26" r="25" />
          <path
            className={styles.checkmarkCheck}
            fill="none"
            d="M14 27l7 7 16-16"
          />
        </svg>
      </div>
      <div className={styles.animatedMessage}>
        <h2 className={styles.thankYouText}>{message}</h2>
        <p className={styles.subText}>We’ll get back to you shortly.</p>
        <div className={styles.underline}></div>
      </div>
      <button className={styles.backButton} onClick={handleGoBack}>
        Go Back
      </button>
    </div>
  );
};

export default ThankYou;
