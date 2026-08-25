import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { SectionHeader } from '../../components/SectionHeader/SectionHeader';
import { reviews, reviewStats } from '../../data/reviews';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './Reviews.module.css';

function Stars({ rating }: { rating: number }) {
  return (
    <div className={styles.stars} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          fill={i < rating ? 'currentColor' : 'none'}
          strokeWidth={1.5}
          className={i < rating ? styles.starFilled : styles.starEmpty}
        />
      ))}
    </div>
  );
}

export function Reviews() {
  const maxCount = Math.max(...reviewStats.breakdown.map((b) => b.count));

  return (
    <div className="page">
      <section className={styles.hero}>
        <div className="container">
          <SectionHeader
            label="Guest voices"
            title="Reviews"
            description="Demo testimonials from guests who dined with us. Ratings are illustrative only."
          />
        </div>
      </section>

      <section className={styles.stats}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={styles.score}>
              <span className={styles.avg}>{reviewStats.average}</span>
              <Stars rating={5} />
              <p>Based on {reviewStats.total} demo reviews</p>
            </div>
            <div className={styles.breakdown}>
              {reviewStats.breakdown.map((b) => (
                <div key={b.stars} className={styles.barRow}>
                  <span>{b.stars}★</span>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{ width: `${(b.count / maxCount) * 100}%` }}
                    />
                  </div>
                  <span className={styles.count}>{b.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.list}`}>
        <div className="container">
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              700: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className={styles.swiper}
          >
            {reviews.map((r, i) => (
              <SwiperSlide key={r.id}>
                <motion.article
                  className={styles.card}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Stars rating={r.rating} />
                  <p className={styles.comment}>"{r.comment}"</p>
                  <div className={styles.author}>
                    <div className={styles.avatar}>
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <strong>{r.name}</strong>
                      <span>
                        {new Date(r.date).toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric',
                        })}
                        {r.verified && ' · Verified'}
                      </span>
                    </div>
                  </div>
                </motion.article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
}
