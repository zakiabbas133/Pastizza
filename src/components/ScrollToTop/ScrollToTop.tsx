import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

import "./ScrollToTop.css";

export function ScrollToTop() {
  const { pathname } = useLocation();

  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  /*
   * Scroll to top whenever route changes.
   */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    setVisible(false);
    setScrollProgress(0);
  }, [pathname]);

  /*
   * Track scrolling and calculate scroll progress.
   */
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

      setScrollProgress(Math.min(progress, 100));

      setVisible(scrollTop > 400);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /*
   * Smoothly scroll to top.
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          className="scroll-to-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          initial={{
            opacity: 0,
            scale: 0.6,
            y: 30,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.6,
            y: 30,
          }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{
            scale: 1.08,
          }}
          whileTap={{
            scale: 0.92,
          }}
        >
          {/* Progress ring */}
          <svg
            className="scroll-to-top__progress"
            viewBox="0 0 44 44"
            aria-hidden="true"
          >
            <circle className="scroll-to-top__track" cx="22" cy="22" r="19" />

            <motion.circle
              className="scroll-to-top__indicator"
              cx="22"
              cy="22"
              r="19"
              initial={{
                pathLength: 0,
              }}
              animate={{
                pathLength: scrollProgress / 100,
              }}
              transition={{
                duration: 0.15,
                ease: "linear",
              }}
            />
          </svg>

          {/* Arrow */}
          <motion.span
            className="scroll-to-top__icon"
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ArrowUp size={19} strokeWidth={2.4} />
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
