import { useEffect } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from './useReducedMotion';

export function useLenis() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [reducedMotion]);
}

export function scrollToSection(hash: string) {
  const id = hash.replace('#', '');
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
