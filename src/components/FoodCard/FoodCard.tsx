import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { MenuItem } from '../../types';
import styles from './FoodCard.module.css';

interface Props {
  item: MenuItem;
  index?: number;
}

export function FoodCard({ item, index = 0 }: Props) {
  const fromPrice = Math.min(...item.variants.map((v) => v.price));

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.3) }}
    >
      <Link to={`/menu/${item.slug}`} className={styles.link}>
        <div className={styles.imageWrap}>
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            width={400}
            height={300}
          />
          {item.popular && <span className={styles.badge}>Popular</span>}
          {item.featured && !item.popular && (
            <span className={styles.badge}>Featured</span>
          )}
        </div>
        <div className={styles.body}>
          <div className={styles.meta}>
            <span className={styles.category}>{item.category}</span>
            {item.tags?.includes('vegetarian') && (
              <span className={styles.tag}>Veg</span>
            )}
          </div>
          <h3 className={styles.name}>{item.name}</h3>
          <p className={styles.desc}>{item.description}</p>
          <div className={styles.footer}>
            <span className={styles.price}>
              from <strong>Rs. {fromPrice}</strong>
            </span>
            <span className={styles.cta}>View</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
