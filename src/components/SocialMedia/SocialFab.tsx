import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useLocation } from "react-router-dom";

import "./SocialFab.css";

const SOCIAL_LINKS = [
  {
    name: "WhatsApp",
    icon: "/whatsapp.png",
    url: `https://wa.me/923348609461?text=${encodeURIComponent("Assalamualaikum Pastizza! 🍕 I would like to place an order. Please share the available options.")}`,
    className: "social-fab__whatsapp",
  },
  {
    name: "Facebook",
    icon: "/facebook.png",
    url: "https://m.me/pastizza",
    className: "social-fab__facebook",
  },
  {
    name: "Instagram",
    icon: "/instagram.png",
    url: "https://ig.me/m/pastizzapakistan",
    className: "social-fab__instagram",
  },
];

const SocialFab = () => {
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const fabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fabRef.current && !fabRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /*
   * Reset on route change.
   */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    setVisible(false);
    setOpen(false);
  }, [pathname]);

  /*
   * Show FAB after scrolling down.
   */
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      const shouldShow = scrollTop > 400;

      setVisible(shouldShow);

      /*
       * Close social menu when returning
       * to the top of the page.
       */
      if (!shouldShow) {
        setOpen(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={fabRef}
          className="social-fab"
          initial={{
            opacity: 0,
            scale: 0.65,
            y: 25,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.65,
            y: 25,
          }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <AnimatePresence>
            {open && (
              <motion.div
                className="social-fab__menu"
                initial={{
                  opacity: 0,
                  y: 20,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: 15,
                  scale: 0.8,
                }}
                transition={{
                  duration: 0.25,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {SOCIAL_LINKS.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className={`social-fab__item ${social.className}`}
                    initial={{
                      opacity: 0,
                      scale: 0.5,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.5,
                      y: 15,
                    }}
                    transition={{
                      delay: index * 0.06,
                      duration: 0.25,
                      type: "spring",
                      stiffness: 400,
                      damping: 20,
                    }}
                    whileHover={{
                      scale: 1.12,
                      x: -4,
                    }}
                    whileTap={{
                      scale: 0.92,
                    }}
                  >
                    <img src={social.icon} alt="" aria-hidden="true" />

                    <span className="social-fab__tooltip">{social.name}</span>
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="button"
            className="social-fab__button"
            aria-label={
              open ? "Close social media links" : "Open social media links"
            }
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            animate={{
              rotate: open ? 90 : 0,
            }}
            whileHover={{
              scale: 1.08,
            }}
            whileTap={{
              scale: 0.92,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            {open ? (
              <X size={30} color="#fff" strokeWidth={2.4} />
            ) : (
              <img width={30} src="/social-media.png" />
            )}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialFab;
