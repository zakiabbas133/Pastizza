import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

const links = [
  { to: "/", label: "Overview" },
  { to: "/menu", label: "Menu" },
  { to: "/reviews", label: "Reviews" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Detect page scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Prevent background scrolling while mobile menu is open
  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = "";
      return;
    }

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileOpen]);

  // Close mobile menu when viewport becomes desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Close mobile menu with Escape
  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={`container-wide ${styles.inner}`}>
          {/* Logo */}
          <Link to="/" className={styles.logo} aria-label="Pastizza home">
            <img className={styles.logoMark} src="/logo4.png" />

            <span className={styles.logoText}>PASTIZZA</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav} aria-label="Primary navigation">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            <Link to="/menu" className={`btn btn-primary btn-sm ${styles.cta}`}>
              Order Now
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              className={styles.hamburger}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              <Menu size={24} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <div className={styles.mobileMenuRoot}>
            {/* Backdrop */}
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeMobileMenu}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.aside
              id="mobile-navigation"
              className={styles.drawer}
              initial={{
                x: "100%",
                opacity: 0.8,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{
                x: "100%",
                opacity: 0.8,
              }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 300,
              }}
              aria-label="Mobile navigation"
            >
              {/* Drawer Header */}
              <div className={styles.drawerHeader}>
                <Link
                  to="/"
                  className={styles.drawerLogo}
                  onClick={closeMobileMenu}
                >
                  {/* <span className={styles.logoMark}>P</span> */}
                  <img className={styles.logoMark} src="/logo4.png" />

                  <span className={styles.logoText}>PASTIZZA</span>
                </Link>

                <button
                  type="button"
                  className={styles.closeButton}
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                >
                  <X size={24} strokeWidth={1.75} />
                </button>
              </div>

              {/* Mobile Links */}
              <nav className={styles.mobileNav} aria-label="Mobile navigation">
                {links.map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={{
                      opacity: 0,
                      x: 25,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: 0.05 * index,
                      duration: 0.25,
                    }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === "/"}
                      className={({ isActive }) =>
                        `${styles.mobileLink} ${isActive ? styles.active : ""}`
                      }
                      onClick={closeMobileMenu}
                    >
                      <span>{link.label}</span>

                      <span
                        className={styles.mobileLinkArrow}
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile CTA */}
              <Link
                to="/menu"
                className={`btn btn-primary ${styles.mobileCta}`}
                onClick={closeMobileMenu}
              >
                Order Now
              </Link>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
