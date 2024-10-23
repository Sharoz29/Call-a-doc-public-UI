import styles from "./Header.module.scss";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"; 
import {
  faMapMarkerAlt,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useLocation } from "react-router-dom"; 
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); 
  const location = useLocation();


  useEffect(() => {
    const navLinks = document.querySelectorAll(`.${styles.links} a`);
    

    navLinks.forEach((link) => {
      link.classList.remove(styles.activeLink);
    });


    navLinks.forEach((link) => {
      if (link.getAttribute("href") === location.pathname) {
        link.classList.add(styles.activeLink);
      }
    });
  }, [location.pathname]); 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); 
  };

  return (
    <header className={styles.header}>
      <div>
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
      </div>

      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <a href="/">Call a Doctor</a>
   
        </div>
        <div className={`${styles.links} ${menuOpen ? styles.showMenu : ''}`}>
          <a href="/">Home</a>
          <a href="/about-us">About</a>
          <a href="/services">Services</a>
          <a href="/contact-us">Contact</a>
        </div>
        <div className={styles.contact}>
          <a className="phone"  href="tel:0000-000-000">
            <FontAwesomeIcon icon={faPhone} /> <span> 0000-000-000  </span>
          </a>

          <a href="/appointment" className={styles.appointmentBtn}>
           Book an Appointment
          </a>
        </div>
        <button className={styles.hamburger} onClick={toggleMenu}>
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>
      </nav>
    </header>
  );
};

export default Header;
