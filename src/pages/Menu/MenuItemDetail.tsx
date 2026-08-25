import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { menuItems } from '../../data/menu';
import { FoodCard } from '../../components/FoodCard/FoodCard';
import styles from './MenuItemDetail.module.css';
// import { useState } from 'react';
// import { ArrowLeft, Plus } from 'lucide-react';
// import { useCart } from '../../context/CartContext';
// import type { MenuVariant } from '../../types';

export function MenuItemDetail() {
  const { slug } = useParams<{ slug: string }>();
  const item = menuItems.find((m) => m.slug === slug);
  // const { addItem } = useCart();
  // const [selected, setSelected] = useState<MenuVariant | null>(
  //   item?.variants[0] ?? null
  // );
  // const [qty, setQty] = useState(1);

  if (!item) return <Navigate to="/menu" replace />;

  const related = menuItems
    .filter((m) => m.category === item.category && m.id !== item.id)
    .slice(0, 3);

  // function handleAdd() {
  //   if (!selected || !item) return;
  //   addItem(item, selected, qty);
  // }

  return (
    <div className="page">
      <div className="container">
        <Link to="/menu" className={styles.back}>
          <ArrowLeft size={18} /> Back to menu
        </Link>

        <div className={styles.layout}>
          <motion.div
            className={styles.image}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img src={item.image} alt={item.name} />
            {(item.popular || item.featured) && (
              <span className={styles.badge}>
                {item.popular ? 'Popular' : 'Featured'}
              </span>
            )}
          </motion.div>

          <motion.div
            className={styles.info}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <span className={styles.category}>{item.category}</span>
            <h1>{item.name}</h1>
            <p className={styles.desc}>{item.description}</p>

            {item.tags && item.tags.length > 0 && (
              <div className={styles.tags}>
                {item.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            )}

            {item.ingredients && (
              <div className={styles.ingredients}>
                <h3>Ingredients</h3>
                <p>{item.ingredients.join(' · ')}</p>
              </div>
            )}

            <div className={styles.variants}>
              <h3>Choose size</h3>
              <div className={styles.variantList}>
                {item.variants.map((v) => (
                  <div
                    key={v.name}
                    className={`${styles.variantBtn}`}
                  >
                    <span>{v.name}</span>
                    <strong>Rs. {v.price}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* <div className={styles.orderRow}>
              <div className={styles.qty}>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease"
                >
                  −
                </button>
                <span>{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={handleAdd}
                disabled={!selected}
              >
                <Plus size={18} />
                Add · Rs. {selected ? (selected.price * qty).toFixed(0) : '—'}
              </button>
            </div> */}
          </motion.div>
        </div>

        {related.length > 0 && (
          <section className={styles.related}>
            <h2>You might also like</h2>
            <div className={styles.relatedGrid}>
              {related.map((r, i) => (
                <FoodCard key={r.id} item={r} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
