import { Link } from "react-router-dom";
import { restaurantInfo, navLinks } from "@/data/restaurant";
import { scrollToSection } from "@/hooks/useLenis";
import { IonIcon } from "@ionic/react";
import { logoInstagram, logoFacebook } from "ionicons/icons";
import "./Footer.css";

export default function Footer() {
  const handleNav = (href: string) => {
    scrollToSection(href);
  };

  return (
    <footer className="footer">
      <div className="footer__panel">
        <div className="footer__content">
          <div className="container">
            <div className="footer__grid">
              <div className="footer__brand">
                <Link to="/" className="footer__logo">
                  {restaurantInfo.name}
                </Link>
                <p className="footer__desc">{restaurantInfo.description}</p>
                <div className="footer__social">
                  <a
                    href={restaurantInfo.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <IonIcon icon={logoInstagram} size="medium"></IonIcon>
                  </a>
                  <a
                    href={restaurantInfo.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <IonIcon icon={logoFacebook} size="medium"></IonIcon>
                  </a>
                </div>
              </div>

              <div className="footer__col">
                <h3 className="footer__heading">Section</h3>
                <ul className="footer__links">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <button
                        type="button"
                        onClick={() => handleNav(link.href)}
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer__col">
                <h3 className="footer__heading">Contact</h3>
                <address className="footer__address">
                  <p>{restaurantInfo.address.full}</p>
                  <p>
                    <a href={`tel:${restaurantInfo.phone}`}>
                      {restaurantInfo.phone}
                    </a>
                  </p>
                  <p>
                    <a href={`mailto:${restaurantInfo.email}`}>
                      {restaurantInfo.email}
                    </a>
                  </p>
                </address>
              </div>

              <div className="footer__col">
                <h3 className="footer__heading">Hours</h3>
                <ul className="footer__hours">
                  {restaurantInfo.openingHours.map((slot) => (
                    <li key={slot.days}>
                      <span>{slot.days}</span>
                      <span>{slot.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="footer__bottom">
              <p className="footer__copy">
                &copy; {new Date().getFullYear()} {restaurantInfo.name}. All
                rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
