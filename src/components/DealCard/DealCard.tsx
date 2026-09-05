import { motion } from "framer-motion";
import type { Deal } from "../../types";
import styles from "./DealCard.module.css";
import { Link } from "react-router-dom";
import { baseUrl } from "../../services/api";

interface Props {
  deal: Deal;
  index?: number;
}

export function DealCard({ deal, index = 0 }: Props) {
  const dealItems =
    deal.items ??
    deal.dealItems?.map((item) => {
      const itemName = item.menuItemName ?? "Menu item";
      return item.menuItemVariantName
        ? `${item.quantity}× ${itemName} (${item.menuItemVariantName})`
        : `${item.quantity}× ${itemName}`;
    }) ??
    [];

  const openWhatsapp = () => {
    const message = [
      "Assalamualaikum Pastizza!",
      "",
      `I would like to order: *${deal.title}*`,
      `Description: ${deal.description}`,
      dealItems.length > 0 ? `Includes: ${dealItems.join(" • ")}` : "",
      "",
      "Please share the available options and delivery details.",
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/923348609461?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
    >
      <Link to={"/deal/" + deal?.id}>
        <div className={styles.imageWrap}>
          <img
            src={deal.image ?? "/logo4.png"}
            alt={deal.title}
            loading="lazy"
            width={480}
            height={320}
            onError={(e) => {
              e.currentTarget.src = "/logo4.png";
            }}
          />
          {deal.badge && <span className={styles.badge}>{deal.badge}</span>}
        </div>
      </Link>
      <div className={styles.body}>
        <Link to={"/deal/" + deal?.id}>
          <h3 className={styles.title}>{deal.title}</h3>
          <p className={styles.desc}>{deal.description}</p>
          {dealItems.length > 0 && (
            <ul className={styles.items}>
              {dealItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </Link>
        <div className={styles.footer}>
          <div className={styles.pricing}>
            <span className={styles.price}>Rs. {deal.price}</span>
            {deal.originalPrice && (
              <span className={styles.original}>Rs. {deal.originalPrice}</span>
            )}
          </div>
          <button onClick={openWhatsapp} className="btn btn-primary btn-sm">
            Order Deal
          </button>
        </div>
      </div>
    </motion.article>
  );
}
