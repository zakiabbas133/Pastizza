import { Link } from "react-router-dom";
import { Hero } from "../../components/Hero/Hero";
// import { deals } from "../../data/deals";
import { motion } from "framer-motion";
import { baseUrl } from "../../services/api";
import { FoodCard } from "../../components/FoodCard/FoodCard";
import { DealCard } from "../../components/DealCard/DealCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetCategoriesQuery } from "../../services/categoriesApi";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./Overview.module.css";
import { useGetDealsQuery } from "../../services/dealsApi";
import type { Deal } from "../../types";
import { useGetMenuItemsQuery, type MenuItem } from "../../services/menuApi";
import { SectionHeader } from "../../components/SectionHeader/SectionHeader";

export function Overview() {
  const { data: cats = [], isLoading: categoriesLoading } =
    useGetCategoriesQuery();
  const { data: dealItems, isLoading: dealsLoading } = useGetDealsQuery();

  const { data: menuItems = [], isLoading: isMenuLoading } =
    useGetMenuItemsQuery();

  const deals = dealItems?.data ?? [];

  const featured = menuItems.slice(0, 3);

  const categoryCards = cats.filter((c) => c.id !== "all" && c.image);

  return (
    <div className="page">
      <Hero />

      <section className={`section ${styles.deals}`}>
        <div className="container">
          {dealsLoading ? (
            <div
              className={styles.dealsLoading}
              role="status"
              aria-label="Loading deals"
            >
              <div className={styles.loadingIllustration} aria-hidden="true">
                <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="1.5"
                    strokeDasharray="4 7"
                    className={styles.loadingRing}
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="38"
                    fill="var(--color-cream)"
                    opacity="0.7"
                  />
                  <ellipse
                    cx="60"
                    cy="72"
                    rx="27"
                    ry="9"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="2"
                    opacity="0.55"
                  />
                  <path
                    d="M42 66 C44 51 51 42 60 39 C69 42 76 51 78 66 Z"
                    fill="var(--color-primary)"
                  />
                  <path
                    d="M47 61 C49 51 54 46 60 44 C66 46 71 51 73 61 Z"
                    fill="var(--color-cream)"
                  />
                  <circle cx="55" cy="52" r="3" fill="var(--color-primary)" />
                  <circle cx="65" cy="56" r="2.8" fill="var(--color-primary)" />
                  <circle cx="60" cy="62" r="2.5" fill="var(--color-primary)" />
                  <path
                    d="M28 43 L30 48 L35 50 L30 52 L28 57 L26 52 L21 50 L26 48 Z"
                    fill="var(--color-primary)"
                    opacity="0.65"
                  />
                  <path
                    d="M88 49 L90 53 L94 55 L90 57 L88 61 L86 57 L82 55 L86 53 Z"
                    fill="var(--color-primary)"
                    opacity="0.5"
                  />
                  <circle
                    cx="79"
                    cy="74"
                    r="10"
                    fill="var(--color-cream)"
                    stroke="var(--color-primary)"
                    strokeWidth="1.5"
                  />
                  <text
                    x="79"
                    y="78"
                    textAnchor="middle"
                    fill="var(--color-primary)"
                    fontSize="11"
                    fontWeight="700"
                    fontFamily="sans-serif"
                  >
                    %
                  </text>
                </svg>
              </div>
              <h3 className={styles.loadingTitle}>Finding delicious deals</h3>
              <p className={styles.loadingText}>
                We&apos;re checking the kitchen for something special...
              </p>
              <div className={styles.loadingDots} aria-hidden="true">
                <span /> <span /> <span />
              </div>
              <div className={styles.skeletonGrid} aria-hidden="true">
                {[1, 2, 3].map((item) => (
                  <div className={styles.skeletonCard} key={item}>
                    <div className={styles.skeletonImage} />
                    <div className={styles.skeletonContent}>
                      <span className={styles.skeletonLine} />
                      <span
                        className={`${styles.skeletonLine} ${styles.short}`}
                      />
                      <div className={styles.skeletonBottom}>
                        <span className={styles.skeletonPrice} />
                        <span className={styles.skeletonButton} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : deals.length == 0 ? (
            <motion.div
              className={styles.emptyDeals}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <motion.div
                className={styles.emptyDealsIcon}
                aria-hidden="true"
                animate={{ rotate: [0, -6, 6, -3, 0] }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
              >
                <svg
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                  role="presentation"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="3 5"
                    opacity="0.35"
                  />
                  <path
                    d="M27 28 C42 31 59 39 75 57 C79 61 77 67 72 69 L35 76 C30 77 26 73 27 68 Z"
                    fill="var(--color-primary)"
                    opacity="0.95"
                  />
                  <path
                    d="M26 27 C29 23 34 23 38 25 C55 29 67 37 76 48"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  <path
                    d="M31 34 C44 37 59 43 70 55 L35 64 Z"
                    fill="var(--color-cream)"
                  />
                  <circle cx="45" cy="43" r="4" fill="var(--color-primary)" />
                  <circle cx="59" cy="49" r="3.5" fill="var(--color-primary)" />
                  <circle cx="52" cy="58" r="3" fill="var(--color-primary)" />
                  <circle
                    cx="69"
                    cy="67"
                    r="16"
                    fill="var(--color-cream)"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M63 72 L75 61"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="65" cy="64" r="2.5" fill="currentColor" />
                  <circle cx="73" cy="70" r="2.5" fill="currentColor" />
                  <path
                    d="M22 48 L24 53 L29 55 L24 57 L22 62 L20 57 L15 55 L20 53 Z"
                    fill="currentColor"
                    opacity="0.65"
                  />
                  <path
                    d="M78 28 L80 32 L84 34 L80 36 L78 40 L76 36 L72 34 L76 32 Z"
                    fill="currentColor"
                    opacity="0.45"
                  />
                </svg>
              </motion.div>
              <span className={styles.emptyDealsEyebrow}>
                Something delicious is coming
              </span>
              <h2>No deals just yet</h2>
              <p>
                We&apos;re cooking up something special. Keep an eye out for
                exclusive offers, tasty combos, and delicious savings.
              </p>
            </motion.div>
          ) : (
            <>
              <SectionHeader
                label="Seasonal offers"
                title="Deals worth gathering for"
                description="Thoughtful combinations at a better price — built for sharing, or not."
                video={false}
              />
              <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={24}
                slidesPerView={3}
                loop={deals.length > 1}
                navigation
                pagination={{ clickable: true, dynamicBullets: true }}
                breakpoints={{
                  0: { slidesPerView: 1, spaceBetween: 16 },
                  640: { slidesPerView: 2, spaceBetween: 18 },
                  900: { slidesPerView: 2, spaceBetween: 20 },
                  1200: { slidesPerView: 3, spaceBetween: 24 },
                }}
                className={styles.swiper}
              >
                {deals.map((deal: Deal, i: number) => (
                  <SwiperSlide key={deal.id}>
                    <DealCard deal={deal} index={i} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}
        </div>
      </section>

      <section className={`section ${styles.categories}`}>
        <div className="container">
          {categoriesLoading ? (
            <div
              className={styles.categoriesLoading}
              role="status"
              aria-label="Loading categories"
            >
              <div
                className={styles.categoryLoadingIllustration}
                aria-hidden="true"
              >
                <svg viewBox="0 0 140 120" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18 35 70 18l52 17-52 17Z"
                    fill="var(--color-primary)"
                    opacity=".22"
                  />
                  <path
                    d="M18 35v48l52 18V52Z"
                    fill="var(--color-primary)"
                    opacity=".48"
                  />
                  <path
                    d="m122 35-52 17v49l52-18Z"
                    fill="var(--color-primary)"
                    opacity=".72"
                  />
                  <path
                    d="m42 44 28 9 28-9"
                    fill="none"
                    stroke="var(--color-cream)"
                    strokeWidth="3"
                    opacity=".8"
                  />
                  <circle
                    cx="70"
                    cy="52"
                    r="48"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeDasharray="3 8"
                    strokeWidth="1.5"
                    className={styles.categoryLoadingRing}
                  />
                </svg>
              </div>
              <h3 className={styles.categoryLoadingTitle}>Setting the table</h3>
              <p className={styles.categoryLoadingText}>
                We&apos;re gathering all your favourite flavours...
              </p>
              <div className={styles.loadingDots} aria-hidden="true">
                <span /> <span /> <span />
              </div>
              <div className={styles.categorySkeletonGrid} aria-hidden="true">
                {[1, 2, 3, 4].map((item) => (
                  <div className={styles.categorySkeletonCard} key={item}>
                    <div className={styles.categorySkeletonImage} />
                    <div className={styles.categorySkeletonContent}>
                      <span className={styles.categorySkeletonTitle} />
                      <span className={styles.categorySkeletonText} />
                      <span
                        className={`${styles.categorySkeletonText} ${styles.categorySkeletonTextShort}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : categoryCards.length == 0 ? (
            <motion.div
              className={styles.emptyCategories}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <motion.div
                className={styles.emptyCategoriesIcon}
                aria-hidden="true"
                animate={{ y: [0, -7, 0], rotate: [0, 2, -2, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="4 7"
                    opacity=".3"
                  />
                  <path
                    d="M31 44 60 31l29 13-29 13Z"
                    fill="var(--color-primary)"
                    opacity=".9"
                  />
                  <path
                    d="M31 44v31l29 14V57Z"
                    fill="var(--color-primary)"
                    opacity=".55"
                  />
                  <path
                    d="m89 44-29 13v32l29-14Z"
                    fill="var(--color-primary)"
                    opacity=".7"
                  />
                  <path
                    d="M43 68h12M43 75h8M67 65h12M67 72h8"
                    stroke="var(--color-cream)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity=".8"
                  />
                  <path
                    d="M24 31 27 37 33 40 27 43 24 49 21 43 15 40 21 37Z"
                    fill="currentColor"
                    opacity=".55"
                  />
                  <path
                    d="m96 76 2 4 4 2-4 2-2 4-2-4-4-2 4-2Z"
                    fill="currentColor"
                    opacity=".45"
                  />
                </svg>
              </motion.div>
              <span className={styles.emptyCategoriesEyebrow}>
                Fresh flavours are on the way
              </span>
              <h2>No categories yet</h2>
              <p>
                Our menu is being prepared. Check back soon to explore
                everything coming out of the kitchen.
              </p>
            </motion.div>
          ) : (
            <>
              <SectionHeader
                label="The kitchen"
                title="What we fire"
                description="From the oven to the board — categories built around heat and craft."
                video={false}
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
                      to={`/menu?category=${cat.label.toLowerCase()}`}
                      className={styles.catCard}
                    >
                      <img
                        src={baseUrl + cat.image}
                        alt={cat.label}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = "/logo4.png";
                        }}
                      />
                      <div className={styles.catOverlay}>
                        <h3>{cat.label}</h3>
                        {cat.description && <p>{cat.description}</p>}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className={`section ${styles.featured}`}>
        <div className="container">
          {isMenuLoading ? (
            <div
              className={styles.dealsLoading}
              role="status"
              aria-label="Loading menu items"
            >
              <div className={styles.loadingIllustration} aria-hidden="true">
                <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="1.5"
                    strokeDasharray="4 7"
                    className={styles.loadingRing}
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="34"
                    fill="var(--color-cream)"
                    opacity=".8"
                  />
                  <path
                    d="M35 56c0-13 11-24 25-24s25 11 25 24v4H35Z"
                    fill="var(--color-primary)"
                  />
                  <path
                    d="M39 60h42v8c0 9-9 16-21 16s-21-7-21-16Z"
                    fill="var(--color-primary)"
                    opacity=".72"
                  />
                  <circle cx="49" cy="49" r="3" fill="var(--color-cream)" />
                  <circle cx="65" cy="43" r="3" fill="var(--color-cream)" />
                  <circle cx="72" cy="54" r="3" fill="var(--color-cream)" />
                  <path
                    d="M24 38 27 44 33 47 27 50 24 56 21 50 15 47 21 44ZM94 72l2 4 4 2-4 2-2 4-2-4-4-2 4-2Z"
                    fill="var(--color-primary)"
                    opacity=".55"
                  />
                </svg>
              </div>
              <h3 className={styles.loadingTitle}>Plating something special</h3>
              <p className={styles.loadingText}>
                We&apos;re bringing the freshest favourites from the kitchen...
              </p>
              <div className={styles.loadingDots} aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className={styles.skeletonGrid} aria-hidden="true">
                {[1, 2, 3].map((item) => (
                  <div className={styles.skeletonCard} key={item}>
                    <div className={styles.skeletonImage} />
                    <div className={styles.skeletonContent}>
                      <span className={styles.skeletonLine} />
                      <span
                        className={`${styles.skeletonLine} ${styles.short}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : menuItems.length == 0 ? (
            <motion.div
              className={styles.emptyDeals}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.div
                className={styles.emptyDealsIcon}
                aria-hidden="true"
                animate={{ y: [0, -6, 0], rotate: [0, 3, -3, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="3 5"
                    opacity=".35"
                  />
                  <path
                    d="M25 49h50c0 17-11 27-25 27S25 66 25 49Z"
                    fill="var(--color-primary)"
                    opacity=".82"
                  />
                  <path
                    d="M29 49c2-17 10-25 21-25s19 8 21 25"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <circle cx="42" cy="42" r="3" fill="var(--color-cream)" />
                  <circle cx="57" cy="36" r="3" fill="var(--color-cream)" />
                  <circle cx="63" cy="47" r="3" fill="var(--color-cream)" />
                </svg>
              </motion.div>
              <span className={styles.emptyDealsEyebrow}>
                Fresh flavours are on the way
              </span>
              <h2>No menu items yet</h2>
              <p>
                Our kitchen is preparing something delicious. Check back soon to
                discover the menu.
              </p>
            </motion.div>
          ) : (
            <>
              <SectionHeader
                label="From the menu"
                title="Featured plates"
                description="A selection of what regulars order again — and again."
                video={false}
              />
              <div className={styles.foodGrid}>
                {featured.map((item: MenuItem, i) => (
                  <FoodCard key={item.id} item={item} index={i} />
                ))}
              </div>
              <div className={styles.centerCta}>
                <Link to="/menu" className="btn btn-primary btn-lg">
                  View Full Menu
                </Link>
              </div>
            </>
          )}
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
