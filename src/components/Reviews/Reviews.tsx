import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { reviews } from '@/data/reviews';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import './Reviews.css';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="star-rating" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
        >
          <Star
            size={16}
            fill={i < rating ? 'var(--color-gold)' : 'none'}
            stroke={i < rating ? 'var(--color-gold)' : 'var(--color-text-subtle)'}
          />
        </motion.span>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const reducedMotion = useReducedMotion();

  const next = () => setCurrent((c) => (c + 1) % reviews.length);
  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);

  return (
    <section id="reviews" className="section reviews-section">
      <div className="container">
        <ScrollReveal className="reviews-section__header">
          <span className="section-number" aria-hidden="true">02</span>
          <span className="section-label">Guest Voices</span>
          <h2 className="section-title">Stories from<br />our table</h2>
        </ScrollReveal>

        <div className="reviews-carousel">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="reviews-carousel__slide"
              initial={reducedMotion ? false : { opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, x: -60 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Quote className="reviews-carousel__quote-icon" size={48} aria-hidden="true" />
              <StarRating rating={reviews[current].rating} />
              <blockquote className="reviews-carousel__text">
                "{reviews[current].text}"
              </blockquote>
              <div className="reviews-carousel__author">
                {reviews[current].avatar && (
                  <img
                    src={reviews[current].avatar}
                    alt=""
                    className="reviews-carousel__avatar"
                    loading="lazy"
                  />
                )}
                <div>
                  <cite className="reviews-carousel__name">{reviews[current].name}</cite>
                  <span className="reviews-carousel__date">{reviews[current].date}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="reviews-carousel__controls">
            <button type="button" className="reviews-carousel__btn" onClick={prev} aria-label="Previous review">
              <ChevronLeft size={20} />
            </button>
            <div className="reviews-carousel__dots" role="tablist" aria-label="Review navigation">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Review ${i + 1}`}
                  className={`reviews-carousel__dot ${i === current ? 'reviews-carousel__dot--active' : ''}`}
                  onClick={() => setCurrent(i)}
                />
              ))}
            </div>
            <button type="button" className="reviews-carousel__btn" onClick={next} aria-label="Next review">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal scroll strip */}
    
      </div>
    </section>
  );
}
