import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BadgeCheck,
  Clock3,
  Gift,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import styles from "./DealDetails.module.css";
import { useGetDealByIdQuery } from "../../services/dealsApi";
import { baseUrl } from "../../services/api";

const DealDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetDealByIdQuery(id ?? "", {
    skip: !id,
  });
  const deal = data?.data;

  if (!id) return <Navigate to="/" replace />;

  if (isLoading) {
    return (
      <div className="page">
        <div className="container">
          <div
            className={styles.loading}
            role="status"
            aria-label="Loading deal"
          >
            <div className={styles.loadingIcon} aria-hidden="true">
              <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeDasharray="4 8"
                  className={styles.loadingRing}
                />
                <path
                  d="M31 52h58v28H31zM38 52c0-18 44-18 44 0"
                  fill="var(--color-primary)"
                  opacity=".8"
                />
                <path
                  d="M42 63h36M47 72h26"
                  stroke="var(--color-cream)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="m22 35 2 5 5 2-5 2-2 5-2-5-5-2 5-2ZM96 75l2 4 4 2-4 2-2 4-2-4-4-2 4-2Z"
                  fill="var(--color-primary)"
                  opacity=".55"
                />
              </svg>
            </div>
            <h1>Unwrapping your deal</h1>
            <p>We&apos;re fetching the good stuff from the kitchen...</p>
            <div className={styles.loadingDots} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className={styles.loadingLines} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !deal) {
    return (
      <div className="page">
        <div className="container">
          <motion.div
            className={styles.empty}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={styles.emptyIcon} aria-hidden="true">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle
                  cx="50"
                  cy="50"
                  r="43"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="3 6"
                  opacity=".35"
                />
                <path
                  d="M27 35h46v38H27z"
                  fill="var(--color-primary)"
                  opacity=".78"
                />
                <path
                  d="M50 35v38M27 48h46"
                  stroke="var(--color-cream)"
                  strokeWidth="4"
                />
                <path
                  d="m50 51 12 12M62 51 50 63"
                  stroke="var(--color-cream)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span>That offer has moved on</span>
            <h1>Deal not found</h1>
            <p>
              This special offer is no longer available. There are plenty more
              delicious options waiting for you.
            </p>
            <Link to="/" className="btn btn-primary">
              Back to home
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  const includedItems = deal.dealItems ?? [];
  const image = deal.image ? baseUrl + deal.image : "/logo4.png";
  const savings = deal.originalPrice ? deal.originalPrice - deal.price : 0;

  return (
    <div className="page">
      <div className="container">
        <Link to="/" className={styles.back}>
          <ArrowLeft size={18} /> Back to home
        </Link>
        <div className={styles.layout}>
          <motion.div
            className={styles.image}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={image}
              alt={deal.title}
              onError={(event) => {
                event.currentTarget.src = "/logo4.png";
              }}
            />
            {deal.badge && (
              <span className={styles.badge}>
                <Sparkles size={14} /> {deal.badge}
              </span>
            )}
            <div className={styles.imageCaption}>
              <Gift size={15} /> A little extra for your table
            </div>
          </motion.div>

          <motion.div
            className={styles.info}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <div className={styles.eyebrow}>
              <span>Pastizza special</span>
              <strong
                className={
                  deal.isActive ? styles.available : styles.unavailable
                }
              >
                <i />
                {deal.isActive ? "Available now" : "Currently unavailable"}
              </strong>
            </div>
            <h1>{deal.title}</h1>
            <p className={styles.desc}>{deal.description}</p>
            <div className={styles.highlights}>
              <div>
                <BadgeCheck size={18} />
                <span>Curated for sharing</span>
              </div>
              <div>
                <Clock3 size={18} />
                <span>Made fresh to order</span>
              </div>
            </div>
            <div className={styles.pricePanel}>
              <div>
                <span>Special deal price</span>
                <strong>
                  Rs. {deal.price}
                  <small>/-</small>
                </strong>
              </div>
              {savings > 0 && (
                <div className={styles.savings}>
                  Save Rs. {savings}
                  <del>Rs. {deal.originalPrice}</del>
                </div>
              )}
            </div>
            <section className={styles.included}>
              <h2>Inside this deal</h2>
              {includedItems.length > 0 ? (
                <ul>
                  {includedItems.map((item) => (
                    <li key={item.id}>
                      <ShoppingBag size={16} />
                      <span>
                        {item.quantity}× {item.menuItemName ?? "Menu item"}
                        {item.menuItemVariantName
                          ? ` · ${item.menuItemVariantName}`
                          : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Everything described above, prepared with Pastizza care.</p>
              )}
            </section>
            <div className={styles.orderNote}>
              <Gift size={18} />
              <span>
                Bring everyone to the table. This one is made for sharing.
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DealDetails;
