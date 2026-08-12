import { motion } from 'framer-motion';
import { restaurantInfo } from '@/data/restaurant';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import './Owner.css';

export default function Owner() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="owner" className="section owner-section">
      <div className="container">
        <div className="owner-section__inner">
          <ScrollReveal className="owner-section__portrait">
            <motion.div
              className="owner-section__image-wrap"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={restaurantInfo.owner.image}
                alt={`${restaurantInfo.owner.name}, ${restaurantInfo.owner.title}`}
                loading="lazy"
              />
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="owner-section__content">
            <span className="section-label">By the Owner</span>
            <h2 className="owner-section__name">{restaurantInfo.owner.name}</h2>
            <p className="owner-section__title">{restaurantInfo.owner.title}</p>

            <blockquote className="owner-section__quote">
              "{restaurantInfo.owner.quote}"
            </blockquote>

            <p className="owner-section__bio">{restaurantInfo.owner.bio}</p>

            <div className="owner-section__message">
              <p>{restaurantInfo.owner.message}</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
