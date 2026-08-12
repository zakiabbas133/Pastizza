import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import './ThemeToggle.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const reducedMotion = useReducedMotion();
  const isDark = theme === 'dark';

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      type="button"
    >
      <motion.div
        className="theme-toggle__track"
        animate={{ backgroundColor: isDark ? 'var(--color-bg-muted)' : 'var(--color-bg-muted)' }}
        transition={{ duration: reducedMotion ? 0 : 0.5 }}
      >
        <motion.div
          className="theme-toggle__thumb"
          animate={{ x: isDark ? 28 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30, duration: reducedMotion ? 0 : undefined }}
        >
          <motion.span
            key={theme}
            initial={reducedMotion ? false : { opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: reducedMotion ? 0 : 0.3 }}
          >
            {isDark ? <Moon size={14} /> : <Sun size={14} />}
          </motion.span>
        </motion.div>
        <Sun size={12} className="theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true" />
        <Moon size={12} className="theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true" />
      </motion.div>
    </button>
  );
}
