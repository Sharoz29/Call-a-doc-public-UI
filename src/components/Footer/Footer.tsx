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
import  data from '../../data/data.json'
import { IconProp } from "@fortawesome/fontawesome-svg-core";
const iconMap: Record<string, IconProp> = {
  faFacebookF,
  faTwitter,
  faYoutube,
  faLinkedinIn,
  faInstagram,
  faPinterest,
  faTiktok
};
const Footer = () => {
  const {footer}=data.components
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.company}>
         <h3>{footer.companyName}</h3>
            <ul>
            {footer.companyLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.path}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.address}>
          <h3>{footer.address.heading}</h3>
          {footer.address.lines.map((line, index) => (
              <p key={index}>{line}<br /></p>
            ))}
            <a
              href={footer.address.mapLink} 
              target="_blank"
              rel="noopener noreferrer"
            >
              {footer.address.mapLinkText}
            </a>
            <h4>{footer.address.inquiriesHeading}</h4>
            <p>
            {footer.address.inquiries.phone}
              <br /> {footer.address.inquiries.email}
            </p>
          </div>

          <div>
            <div className={styles.newsletter}>
            <h3>{footer.newsletter.title}</h3>
            <p>{footer.newsletter.description}</p>
              <div className={styles.newsletterInput}>
                <input type="email" placeholder="Your Email" />
                <button>
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            </div>

            <div className={styles.social}>
            <h3>{footer.social.heading}</h3>
              <div className={styles.socialIcons}>
              {footer.social.socialLinks.map((social, index) => (
                  <a key={index} href={social.link}>
                    <FontAwesomeIcon icon={iconMap[social.icon]} />
                  </a>
                ))}
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
