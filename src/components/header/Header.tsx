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
import data from '../../data/data.json'
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const {header}=data.components

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
    <>
    <header className={styles.header}>
      <div>
        <div className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <span>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> {header.topbar.locationText}
            </span>
            <span>
            <FontAwesomeIcon icon={faEnvelope} /> {header.topbar.emailText}   
            </span>
          </div>
          <div className={styles.topbarRight}>
            <a href="#">
            <FontAwesomeIcon icon={faWhatsapp} /> {header.topbar.whatsappText}
            </a>
          </div>
        </div>
      </div>

    </header>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
        <a href="/">{header.navbar.logoText}</a>
        </div>
        <div className={`${styles.links} ${menuOpen ? styles.showMenu : ""}`}>
        {header.links.map((link, index) => (
            <a key={index} href={link.path}>
              {link.name}
            </a>
          ))}
        </div>
        <div className={styles.contact}>
          <a className="phone" href={`tel:${header.navbar.phone}`}>
          <FontAwesomeIcon icon={faPhone} /> <span>{header.navbar.phone}</span>
          </a>
        </div>
        <button className={styles.hamburger} onClick={toggleMenu}>
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>
      </nav>
    </>
  );
};

export default Header;
