import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BadgeCheck,
  Clock3,
  Flame,
  ShoppingBag,
  Sparkles,
  Utensils,
} from "lucide-react";
import { FoodCard } from "../../components/FoodCard/FoodCard";
import styles from "./MenuItemDetail.module.css";
import { useGetMenuItemsQuery } from "../../services/menuApi";
import { baseUrl } from "../../services/api";
// import { useState } from 'react';
// import { ArrowLeft, Plus } from 'lucide-react';
// import { useCart } from '../../context/CartContext';
// import type { MenuVariant } from '../../types';

export function MenuItemDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: menuItems = [], isLoading } = useGetMenuItemsQuery();
  const item = menuItems.find((m) => m.id === id);
  // const { addItem } = useCart();
  // const [selected, setSelected] = useState<MenuVariant | null>(
  //   item?.variants[0] ?? null
  // );
  // const [qty, setQty] = useState(1);

  if (isLoading) return <div className="page" />;
  if (!item) return <Navigate to="/menu" replace />;

  const related = menuItems
    .filter((m) => m.categoryName === item?.categoryName && m.id !== item.id)
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

        <div
          className={styles.layout}
          style={related.length == 0 ? { paddingBottom: 20 } : {}}
        >
          <motion.div
            className={styles.image}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={baseUrl + (item.image ?? "")}
              alt={item?.name}
              onError={(e) => {
                e.currentTarget.src = "/logo4.png";
              }}
            />
            <div className={styles.imageBadges}>
              {item.featured && (
                <span className={styles.badge}>
                  <Sparkles size={14} /> Featured
                </span>
              )}
              {item.popular && (
                <span className={styles.badge}>
                  <Flame size={14} /> Popular
                </span>
              )}
            </div>
            <div className={styles.imageCaption}>
              <span>
                <Utensils size={15} /> Made fresh for you
              </span>
            </div>
          </motion.div>

          <motion.div
            className={styles.info}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <div className={styles.eyebrow}>
              <span className={styles.category}>{item.categoryName}</span>
              <span
                className={
                  item.isActive ? styles.available : styles.unavailable
                }
              >
                <span className={styles.statusDot} />
                {item.isActive ? "Available now" : "Currently unavailable"}
              </span>
            </div>
            <h1>{item.name}</h1>
            <p className={styles.desc}>{item.description}</p>

            <div className={styles.highlights}>
              <div>
                <BadgeCheck size={18} />
                <span>House favourite</span>
              </div>
              <div>
                <Clock3 size={18} />
                <span>Freshly prepared</span>
              </div>
            </div>

            <div className={styles.variants}>
              <h3>Choose your size</h3>
              <div className={styles.variantList}>
                {item.variants.length === 0 ? (
                  <div className={styles.singlePrice}>
                    <div>
                      <span className={styles.priceLabel}>
                        One delicious size
                      </span>
                      <strong>Ready to order</strong>
                    </div>
                    <span className={styles.price}>
                      Rs. {item.price}
                      <small>/-</small>
                    </span>
                  </div>
                ) : (
                  <>
                    {item.variants.map((v) => (
                      <div key={v.name} className={styles.variantBtn}>
                        <span>{v.name}</span>
                        <strong>Rs. {v.price}0/-</strong>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>

            <div className={styles.orderNote}>
              <ShoppingBag size={18} />
              <span>Perfect for a satisfying meal, made with care.</span>
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
