import styles from "./Footer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faYoutube,
  faLinkedinIn,
  faInstagram,
  faPinterest,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.company}>
            <h3>Call a Doctor</h3>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="/about-us">About Us</a>
              </li>
              <li>
                <a href="/why-choose-us">Why Choose Us</a>
              </li>
              <li>
                <a href="/testimonials">Testimonials</a>
              </li>
              <li>
                <a href="/contact-us">Contact Us</a>
              </li>
            </ul>
          </div>

          <div className={styles.address}>
            <h3>Address</h3>
            <p>
              Lorem ipsum dolor sit amet,
              <br /> consectetur adipiscing elit.
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Maps
            </a>
            <h4>Inquiries</h4>
            <p>
              (000) 000-000
              <br /> info@calladoctor.com
            </p>
          </div>

          <div>
            <div className={styles.newsletter}>
              <h3>Newsletter</h3>
              <p>Stay Updated with our Latest News</p>
              <div className={styles.newsletterInput}>
                <input type="email" placeholder="Your Email" />
                <button>
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            </div>

            <div className={styles.social}>
              <h3>Follow Us</h3>
              <div className={styles.socialIcons}>
                <a href="#">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href="#">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="#">
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
                <a href="#">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
                <a href="#">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="#">
                  <FontAwesomeIcon icon={faPinterest} />
                </a>
                <a href="#">
                  <FontAwesomeIcon icon={faTiktok} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className={styles.bottomFotter}></div>
    </>
  );
};

export default Footer;
