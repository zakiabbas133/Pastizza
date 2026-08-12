import { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { getMenuItemById, getRelatedItems } from '@/data/menu';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import './MenuItemDetails.css';

export default function MenuItemDetails() {
  const { id } = useParams<{ id: string }>();
  const reducedMotion = useReducedMotion();
  const item = id ? getMenuItemById(id) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!item) {
    return <Navigate to="/" replace />;
  }

  const related = getRelatedItems(item.id);

  return (
    <motion.article
      className="menu-detail"
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="menu-detail__hero">
        <motion.img
          src={item.image}
          alt={item.name}
          className="menu-detail__hero-image"
          initial={reducedMotion ? false : { scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="menu-detail__hero-overlay" />
      </div>

      <div className="container menu-detail__content">
        <Link to={{ pathname: '/', hash: 'menu' }} className="menu-detail__back">
          <ArrowLeft size={18} /> Back to Menu
        </Link>

        <motion.div
          className="menu-detail__header"
          initial={reducedMotion ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className="menu-detail__category">{item.category}</span>
          <h1 className="menu-detail__name">{item.name}</h1>
          <span className="menu-detail__price">{item.price}</span>
          {item.tags.length > 0 && (
            <div className="menu-detail__tags">
              {item.tags.map((tag) => (
                <span key={tag} className="menu-detail__tag">{tag}</span>
              ))}
            </div>
          )}
        </motion.div>

        <div className="menu-detail__body">
          <motion.div
            className="menu-detail__main"
            initial={reducedMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <p className="menu-detail__description">{item.description}</p>

            {item.chefRecommendation && (
              <blockquote className="menu-detail__chef-note">
                <span className="menu-detail__chef-label">Chef's Recommendation</span>
                {item.chefRecommendation}
              </blockquote>
            )}

            <div className="menu-detail__meta-grid">
              <div className="menu-detail__meta">
                <h3>Ingredients</h3>
                <ul>
                  {item.ingredients.map((ing) => (
                    <li key={ing}>{ing}</li>
                  ))}
                </ul>
              </div>
              <div className="menu-detail__meta">
                <h3>Allergens</h3>
                <ul>
                  {item.allergens.length > 0 ? (
                    item.allergens.map((a) => <li key={a}>{a}</li>)
                  ) : (
                    <li>None listed</li>
                  )}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {related.length > 0 && (
          <section className="menu-detail__related" aria-label="Related dishes">
            <h2 className="menu-detail__related-title">You may also enjoy</h2>
            <div className="menu-detail__related-grid">
              {related.map((rel) => (
                <Link key={rel.id} to={`/menu/${rel.id}`} className="menu-detail__related-card">
                  <img src={rel.image} alt={rel.name} loading="lazy" />
                  <div className="menu-detail__related-info">
                    <h3>{rel.name}</h3>
                    <span>{rel.price}</span>
                    <ArrowUpRight size={16} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </motion.article>
  );
}
