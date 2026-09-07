import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { useGetWebsiteSettingsQuery } from "../../services/websiteSettingsApi";
import { baseUrl } from "../../services/api";
import { useGetCategoriesQuery } from "../../services/categoriesApi";

export function Footer() {
  const {
    data: websiteSettings = null,
    isLoading: websiteSettingsLoading,
  } = useGetWebsiteSettingsQuery();
  const { data: cats = [], isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  return (
    <footer
      className={styles.footer}
      aria-busy={websiteSettingsLoading || categoriesLoading}
    >
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            {websiteSettingsLoading ? (
              <div className={`${styles.logoMark} ${styles.skeleton}`} aria-hidden="true" />
            ) : (
              <img
                className={styles.logoMark}
                src={baseUrl + websiteSettings?.logo}
                onError={(e) => {
                  e.currentTarget.src = "/logo4.png";
                }}
              />
            )}
            <p className={styles.tagline}>
              Fire-kissed cuisine crafted with patience, the finest ingredients,
              and a respect for tradition.
            </p>
          </div>
          <div className={styles.social}>
            {websiteSettingsLoading ? (
              ["instagram", "facebook", "whatsapp"].map((social) => (
                <span className={`${styles.socialSkeleton} ${styles.skeleton}`} key={social} aria-hidden="true" />
              ))
            ) : (
              <>
                <a href={websiteSettings?.instagramUrl} aria-label="Instagram" target="_blank" rel="noreferrer">
                  <img src="/instagram.png" alt="" aria-hidden="true" />
                </a>
                <a href={websiteSettings?.facebookUrl} aria-label="Facebook" target="_blank" rel="noreferrer">
                  <img src="/facebook.png" alt="" aria-hidden="true" />
                </a>
                <a
                  href={`${websiteSettings?.whatsappUrl}?text=${encodeURIComponent(websiteSettings?.whatsappMessage as string)}`}
                  aria-label="WhatsApp"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="/whatsapp.png" alt="" aria-hidden="true" />
                </a>
              </>
            )}
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
            {categoriesLoading
              ? ["one", "two", "three", "four"].map((item) => (
                  <li key={item}>
                    <span className={`${styles.categorySkeleton} ${styles.skeleton}`} aria-hidden="true" />
                  </li>
                ))
              : cats
              .filter((item) => item.description != "all")
              .map((cat, index) => {
                return (
                  <li key={index}>
                    <Link to={`/menu?category=${cat.label.toLowerCase()}`}>
                      {cat.label}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>

        <div>
          <h4 className={styles.heading}>Visit</h4>
          <ul className={styles.links}>
            <li>Riverside — 42 Ember Lane</li>
            <li>Oak & Main — 118 Main St</li>
            {websiteSettingsLoading ? (
              ["phone", "email"].map((item) => (
                <li key={item}>
                  <span className={`${styles.visitSkeleton} ${styles.skeleton}`} aria-hidden="true" />
                </li>
              ))
            ) : (
              <>
                <li>
                  <a href={`tel:+${websiteSettings?.whatsappUrl?.split("/").pop()}`}>
                    +{websiteSettings?.whatsappUrl?.split("/").pop()}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${websiteSettings?.email}`}>{websiteSettings?.email}</a>
                </li>
              </>
            )}
          </ul>
          <Link to="/menu" className={`btn btn-primary btn-sm ${styles.order}`}>
            Order Now
          </Link>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className="container">
          <p>© {new Date().getFullYear()} — Pastizza</p>
        </div>
      </div>
    </footer>
  );
}
