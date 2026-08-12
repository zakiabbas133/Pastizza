import { motion } from 'framer-motion';
import { restaurantInfo } from '@/data/restaurant';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import './About.css';

export default function About() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="about-section__layout">
          <ScrollReveal className="about-section__content">
            <span className="section-number" aria-hidden="true">04</span>
            <span className="section-label">About Us</span>
            <h2 className="section-title">Rooted in heritage,<br />reaching forward</h2>
            <div className="divider" />

            <div className="about-block">
              <h3 className="about-block__title">Our History</h3>
              <p className="about-block__text">{restaurantInfo.about.history}</p>
            </div>

            <div className="about-block">
              <h3 className="about-block__title">Philosophy</h3>
              <p className="about-block__text">{restaurantInfo.about.philosophy}</p>
            </div>

            <div className="about-block">
              <h3 className="about-block__title">Cuisine</h3>
              <p className="about-block__text">{restaurantInfo.about.cuisine}</p>
            </div>

            <div className="about-values">
              {restaurantInfo.about.values.map((value, i) => (
                <motion.span
                  key={value}
                  className="about-values__item"
                  initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  {value}
                </motion.span>
              ))}
            </div>
          </ScrollReveal>

          <div className="about-section__visual">
            <ScrollReveal delay={0.2}>
              <motion.div
                className="about-section__image-stack"
                initial={reducedMotion ? false : { opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
                  alt="Pastizza dining room atmosphere"
                  loading="lazy"
                  className="about-section__img about-section__img--main"
                />
                <img
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80"
                  alt="Chef at work in Pastizza kitchen"
                  loading="lazy"
                  className="about-section__img about-section__img--accent"
                />
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
