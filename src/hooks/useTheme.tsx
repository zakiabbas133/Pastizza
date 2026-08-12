import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'pastizza-theme';

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setIsTransitioning(true);
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    window.setTimeout(() => setIsTransitioning(false), 600);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
