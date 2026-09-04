import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./FoodCard.module.css";
import type { MenuItem as ApiMenuItem } from "../../services/menuApi";
import type { MenuItem as LocalMenuItem } from "../../types";
import { baseUrl } from "../../services/api";

interface Props {
  item: ApiMenuItem | LocalMenuItem;
  index?: number;
}

export function FoodCard({ item, index = 0 }: Props) {
  const fromPrice =
    item.variants.length === 0
      ? "price" in item
        ? item.price
        : 0
      : Math.min(...item.variants.map((v) => v.price));

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.3) }}
    >
      <Link to={`/menu/${item.id}`} className={styles.link}>
        <div className={styles.imageWrap}>
          <img
            src={baseUrl + (item.image ?? "")}
            alt={item.name}
            loading="lazy"
            width={400}
            height={300}
            onError={(e) => {
              e.currentTarget.src = "/logo4.png";
            }}
          />
          {item.popular && <span className={styles.badge}>Popular</span>}
          {item.featured && <span className={styles.badge}>Featured</span>}
          {item.popular && <span className={styles.badgePopular}>Popular</span>}
        </div>
        <div className={styles.body}>
          <div className={styles.meta}>
            <span className={styles.category}>
              {"categoryName" in item ? item.categoryName : item.category}
            </span>
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
