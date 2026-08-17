import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { restaurantInfo } from "@/data/restaurant";
import { scrollToSection } from "@/hooks/useLenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { IonIcon } from "@ionic/react";
import { logoInstagram, logoFacebook } from "ionicons/icons";
import "./Hero.css";

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 800], [0, reducedMotion ? 0 : 200]);
  const textY = useTransform(scrollY, [0, 800], [0, reducedMotion ? 0 : 100]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0.3]);

  return (
    <section id="overview" className="hero" aria-label="Welcome to Pastizza">
      <motion.div className="hero__bg" style={{ y: imageY }}>
        {/* <img
          src={restaurantInfo.hero.image}
          alt="Elegant Pastizza dining room with warm candlelight"
          className="hero__bg-image"
          loading="eager"
          fetchPriority="high"
        /> */}
        <video
          autoPlay
          loop
          playsInline
          className="hero__bg-image"
          muted
        >
          <source src="https://pastizza.vercel.app/videos/heropizza.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero__overlay" />
      </motion.div>

      <motion.div
        className="hero__content container"
        style={{ y: textY, opacity }}
      >
        <motion.div
          className="hero__eyebrow"
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Artisan Italian · Brooklyn
        </motion.div>

        <motion.h1
          className="hero__title"
          initial={reducedMotion ? false : { opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hero__title-line">Pastizza</span>
        </motion.h1>

        <motion.div
          className="hero__social"
          initial={reducedMotion ? false : { opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href={restaurantInfo.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <IonIcon icon={logoInstagram} size="medium"></IonIcon>
          </a>
          <a
            href={restaurantInfo.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <IonIcon icon={logoFacebook} size="medium"></IonIcon>
          </a>
        </motion.div>

        <motion.p
          className="hero__tagline"
          initial={reducedMotion ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {restaurantInfo.tagline}
        </motion.p>

        <motion.p
          className="hero__description"
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          Enter a place where fire, flour, and devotion converge — where every
          plate is a chapter in an unfolding story of Italian craft.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => scrollToSection("#menu")}
          >
            Explore Menu
          </button>
        </motion.div>
      </motion.div>

      {/* <motion.div
        className="hero__floating-image"
        initial={reducedMotion ? false : { opacity: 0, scale: 0.9, x: 40 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={restaurantInfo.hero.secondaryImage}
          alt="Wood-fired pastizza with fresh ingredients"
          loading="eager"
        />
      </motion.div> */}

      <motion.button
        type="button"
        className="hero__scroll"
        onClick={() => scrollToSection("#story")}
        aria-label="Scroll to learn more"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.span
          animate={reducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={24} />
        </motion.span>
      </motion.button>
    </section>
  );
}
