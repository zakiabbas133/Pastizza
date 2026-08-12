import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import BackToTop from '@/components/BackToTop/BackToTop';
import Home from '@/pages/Home/Home';
import { ThemeProvider, useTheme } from '@/hooks/useTheme';
import { useLenis } from '@/hooks/useLenis';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const MenuItemDetails = lazy(() => import('@/pages/MenuItemDetails/MenuItemDetails'));

function AppContent() {
  const location = useLocation();
  const { isTransitioning } = useTheme();
  const reducedMotion = useReducedMotion();
  useLenis();

  useEffect(() => {
    document.body.classList.toggle('theme-transitioning', isTransitioning);
    return () => document.body.classList.remove('theme-transitioning');
  }, [isTransitioning]);

  return (
    <>
      <a href="#overview" className="skip-link">Skip to content</a>
      <div className="grain" aria-hidden="true" />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Suspense fallback={<div className="page-loader" aria-label="Loading" />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/menu/:id" element={<MenuItemDetails />} />
            </Routes>
          </Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <BackToTop />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
