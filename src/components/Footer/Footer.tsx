import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <img className={styles.logoMark} src="/logo4.png" />
            <p className={styles.tagline}>
              Fire-kissed cuisine crafted with patience, the finest ingredients,
              and a respect for tradition.
            </p>
          </div>
          <div className={styles.social}>
            <a
              href="https://ig.me/m/pastizzapakistan"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <img src={"/instagram.png"} alt="" aria-hidden="true" />
            </a>
            <a
              href="https://m.me/pastizza"
              aria-label="Facebook"
              target="_blank"
              rel="noreferrer"
            >
              <img src={"/facebook.png"} alt="" aria-hidden="true" />
            </a>
            <a
              href={`https://wa.me/923348609461?text=${encodeURIComponent("Assalamualaikum Pastizza! 🍕 I would like to place an order. Please share the available options.")}`}
              aria-label="Twitter"
              target="_blank"
              rel="noreferrer"
            >
              <img src={"/whatsapp.png"} alt="" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div>
          <h4 className={styles.heading}>Explore</h4>
          <ul className={styles.links}>
            <li>
              <Link to="/">Overview</Link>
            </li>
            <li>
              <Link to="/menu">Menu</Link>
            </li>
            <li>
              <Link to="/reviews">Reviews</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className={styles.heading}>Menu</h4>
          <ul className={styles.links}>
            <li>
              <Link to="/menu?category=pizza">Pizza</Link>
            </li>
            <li>
              <Link to="/menu?category=pasta">Pasta</Link>
            </li>
            <li>
              <Link to="/menu?category=burgers">Burgers</Link>
            </li>
            <li>
              <Link to="/menu?category=desserts">Desserts</Link>
            </li>
            <li>
              <Link to="/menu?category=drinks">Drinks</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className={styles.heading}>Visit</h4>
          <ul className={styles.links}>
            <li>Riverside — 42 Ember Lane</li>
            <li>Oak & Main — 118 Main St</li>
            <li>
              <a href="tel:+15550142200">+1 (555) 014-2200</a>
            </li>
            <li>
              <a href="mailto:hello@pastizza.example">hello@pastizza.example</a>
            </li>
          </ul>
          <Link to="/menu" className={`btn btn-primary btn-sm ${styles.order}`}>
            Order Now
          </Link>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className="container">
          <p>© {new Date().getFullYear()} Pastizza. Demo restaurant website.</p>
        </div>
      </div>
    </footer>
  );
}
