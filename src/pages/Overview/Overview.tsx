import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { motion } from "framer-motion";
import { Hero } from "../../components/Hero/Hero";
import { SectionHeader } from "../../components/SectionHeader/SectionHeader";
import { DealCard } from "../../components/DealCard/DealCard";
import { FoodCard } from "../../components/FoodCard/FoodCard";
import { deals } from "../../data/deals";
import { menuItems } from "../../data/menu";
import { categories } from "../../data/categories";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./Overview.module.css";

const featured = menuItems.filter((m) => m.featured);
const categoryCards = categories.filter((c) => c.id !== "all" && c.image);

export function Overview() {
  return (
    <div className="page">
      <Hero />

      <section className={`section ${styles.deals}`}>
        <div className="container">
          <SectionHeader
            label="Seasonal offers"
            title="Deals worth gathering for"
            description="Thoughtful combinations at a better price — built for sharing, or not."
          />
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={24}
            slidesPerView={3}
            loop={true}
            navigation
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              // Mobile
              0: {
                slidesPerView: 1,
                spaceBetween: 16,
              },

              // Small tablets
              640: {
                slidesPerView: 2,
                spaceBetween: 18,
              },

              // Tablets / small desktop
              900: {
                slidesPerView: 2,
                spaceBetween: 20,
              },

              // Desktop
              1200: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className={styles.swiper}
          >
            {deals.map((deal, i) => (
              <SwiperSlide key={deal.id}>
                <DealCard deal={deal} index={i} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className={`section ${styles.categories}`}>
        <div className="container">
          <SectionHeader
            label="The kitchen"
            title="What we fire"
            description="From the oven to the board — categories built around heat and craft."
          />
          <div className={styles.catGrid}>
            {categoryCards.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/menu?category=${cat.id}`}
                  className={styles.catCard}
                >
                  <img src={cat.image} alt="" loading="lazy" />
                  <div className={styles.catOverlay}>
                    <h3>{cat.label}</h3>
                    {cat.description && <p>{cat.description}</p>}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.featured}`}>
        <div className="container">
          <SectionHeader
            label="From the menu"
            title="Featured plates"
            description="A selection of what regulars order again — and again."
          />
          <div className={styles.foodGrid}>
            {featured.map((item, i) => (
              <FoodCard key={item.id} item={item} index={i} />
            ))}
          </div>
          <div className={styles.centerCta}>
            <Link to="/menu" className="btn btn-primary btn-lg">
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.ctaBand}>
        <div className="container">
          <motion.div
            className={styles.ctaInner}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Ready when you are</h2>
            <p>
              Order for pickup or delivery from either of our locations. Fresh
              from the fire to your table.
            </p>
            <Link to="/menu" className="btn btn-primary btn-lg">
              Order Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
