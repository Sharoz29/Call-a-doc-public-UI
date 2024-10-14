
import styles from './Header.module.scss';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Header = () => {
  useEffect(() => {

    const navLinks = document.querySelectorAll(`.${styles.links} a`);
    

    const currentPath = window.location.pathname;
    
    
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add(styles.activeLink);
      }
    });
  }, []);

  return (
    <header className={styles.header}>
      {/* Topbar */}
      <div className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <span>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> Lorem Ipsum Dolor
          </span>
          <span>
            <FontAwesomeIcon icon={faEnvelope} /> Lorem Lorem dolor dolor
          </span>
        </div>
        <div className={styles.topbarRight}>
          <a href="#">
            <FontAwesomeIcon icon={faWhatsapp} /> Connect on Whatsapp
          </a>
        </div>
      </div>


      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <a href="/">Call a Doctor</a>
        </div>
        <div className={styles.links}>
          <a href="/">Home</a>
          <a href="/about-us">About</a>
          <a href="/services">Services</a>
          <a href="/blogs">Blogs</a>
          <a href="/contact">Contact</a>
        </div>
        <div className={styles.contact}>
          <a href="tel:0000-000-000">
            <FontAwesomeIcon icon={faPhone} /> 0000-000-000
          </a>
          <a href="/appointment" className={styles.appointmentBtn}>Appointment</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
