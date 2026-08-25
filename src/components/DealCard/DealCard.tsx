import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Deal } from '../../types';
import styles from './DealCard.module.css';

interface Props {
  deal: Deal;
  index?: number;
}

export function DealCard({ deal, index = 0 }: Props) {
  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
    >
      <div className={styles.imageWrap}>
        <img src={deal.image} alt={deal.title} loading="lazy" width={480} height={320} />
        {deal.badge && <span className={styles.badge}>{deal.badge}</span>}
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{deal.title}</h3>
        <p className={styles.desc}>{deal.description}</p>
        <ul className={styles.items}>
          {deal.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className={styles.footer}>
          <div className={styles.pricing}>
            <span className={styles.price}>Rs. {deal.price}</span>
            {deal.originalPrice && (
              <span className={styles.original}>Rs. {deal.originalPrice}</span>
            )}
          </div>
          <Link to="/menu" className="btn btn-primary btn-sm">
            Order Deal
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
