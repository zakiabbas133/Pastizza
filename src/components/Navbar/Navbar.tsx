import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks, restaurantInfo } from '@/data/restaurant';
import { scrollToSection } from '@/hooks/useLenis';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#overview');
  const location = useLocation();
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const sectionIds = navLinks.map((link) => link.href.replace('#', ''));
    const getSections = () => sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const updateActiveSection = () => {
      const offset = window.innerHeight * 0.35;
      const sections = getSections();
      const visible = sections
        .map((section) => ({ id: section.id, top: section.getBoundingClientRect().top }))
        .filter((section) => section.top <= offset)
        .sort((a, b) => b.top - a.top)[0];

      if (visible) {
        setActiveSection(`#${visible.id}`);
      }
    };

    updateActiveSection();

    const listener = () => requestAnimationFrame(updateActiveSection);
    window.addEventListener('scroll', listener, { passive: true });
    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('scroll', listener);
      window.removeEventListener('resize', listener);
    };
  }, [location.pathname]);

  useEffect(() => {
    const overflowValue = mobileOpen ? 'hidden' : '';
    document.body.style.overflow = overflowValue;
    document.documentElement.style.overflow = overflowValue;
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (isHome) {
      scrollToSection(href);
    } else {
      navigate({ pathname: '/', hash: href.replace('#', '') });
    }
  };

  return (
    <>
      <motion.header
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={reducedMotion ? false : { y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="navbar__inner container">
          <Link to="/" className="navbar__logo" aria-label={`${restaurantInfo.name} home`}>
            <span className="navbar__logo-text">{restaurantInfo.name}</span>
          </Link>

          <nav className="navbar__nav" aria-label="Main navigation">
            <ul className="navbar__links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    className={`navbar__link ${activeSection === link.href ? 'navbar__link--active' : ''}`}
                    onClick={() => handleNavClick(link.href)}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="navbar__actions">
            <ThemeToggle />
            
            <button
              type="button"
              className="navbar__burger"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-nav"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="mobile-nav__backdrop"
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              className="mobile-nav__panel"
              initial={reducedMotion ? false : { x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              aria-label="Mobile navigation"
            >
              <button
                type="button"
                className="mobile-nav__close"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
              <ul className="mobile-nav__links">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={reducedMotion ? false : { opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <button
                      type="button"
                      className={`mobile-nav__link ${activeSection === link.href ? 'mobile-nav__link--active' : ''}`}
                      onClick={() => handleNavClick(link.href)}
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
