import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { useReducedMotion } from "@/hooks/useReducedMotion";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  EffectCoverflow,
  Autoplay,
  Parallax,
} from "swiper/modules";

import { getDishes } from "../../services/dishes";
import type { Dish } from "../../services/dishes";

import { getCategories, type Category } from "@/services/categories";

import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import FullscreenLoader from "../Loader/FullscreenLoader";
import SearchBar from "./SearchBar";

import "./Menu.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

export default function Menu() {
  const reducedMotion = useReducedMotion();

  /**
   * "All" means all dishes.
   * Otherwise this contains the selected category name.
   */
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const [dealQuery, setDealQuery] = useState<string>("");

  const [menuQuery, setMenuQuery] = useState<string>("");

  const [menuItems, setMenuItems] = useState<Dish[]>([]);

  const [menuCategories, setMenuCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Check whether a dish matches a search query.
   */
  const matchesQuery = useCallback((item: Dish, query: string): boolean => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return true;
    }

    const searchableText = [
      item.name,
      item.shortDescription,
      item.description,
      item.category,
      ...item.tags,
      ...item.ingredients,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  }, []);

  /**
   * Filter dishes by category.
   *
   * "All" => all dishes
   * "Burgers" => every dish where category === "Burgers"
   */
  const baseFiltered = useMemo<Dish[]>(() => {
    if (activeCategory === "All") {
      return menuItems;
    }

    return menuItems.filter(
      (item: Dish) =>
        item.category.trim().toLowerCase() ===
        activeCategory.trim().toLowerCase(),
    );
  }, [activeCategory, menuItems]);

  /**
   * Apply search after category filtering.
   */
  const filtered = useMemo<Dish[]>(() => {
    return baseFiltered.filter((item: Dish) => matchesQuery(item, menuQuery));
  }, [baseFiltered, menuQuery, matchesQuery]);

  /**
   * Get hot deals.
   */
  const hotDeals = useMemo<Dish[]>(() => {
    return menuItems.filter((item: Dish) => item.hotDeal).slice(0, 4);
  }, [menuItems]);

  /**
   * Filter hot deals.
   */
  const filteredHotDeals = useMemo<Dish[]>(() => {
    return hotDeals.filter((item: Dish) => matchesQuery(item, dealQuery));
  }, [hotDeals, dealQuery, matchesQuery]);

  /**
   * Get featured dishes.
   */
  const featured = useMemo<Dish[]>(() => {
    return menuItems.filter((item: Dish) => item.featured);
  }, [menuItems]);

  /**
   * Swiper configuration.
   */
  const swiperParams = {
    modules: [Navigation, EffectCoverflow, Parallax, Autoplay],

    parallax: true,

    centeredSlides: true,

    loop: true,

    effect: "coverflow" as const,

    coverflowEffect: {
      rotate: -8,
      stretch: 10,
      depth: 100,
      modifier: 1.2,
      slideShadows: false,
    },

    navigation: true,

    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    speed: 900,

    breakpoints: {
      0: {
        slidesPerView: 1.15,
        spaceBetween: 14,
      },

      640: {
        slidesPerView: 2,
        spaceBetween: 18,
      },
    },
  };

  /**
   * Get the first image of a dish.
   */
  const getDishImage = (item: Dish): string => {
    console.log(item);
    return item.images?.[0].src ?? "";
  };

  /**
   * Fetch categories.
   */
  const fetchAndDisplayCategories = useCallback(async (): Promise<void> => {
    try {
      const categoriesData = await getCategories();

      if (categoriesData.success && Array.isArray(categoriesData.data)) {
        setMenuCategories(categoriesData.data);
      } else {
        setMenuCategories([]);
      }
    } catch (error: unknown) {
      console.error("Error fetching categories:", error);

      setMenuCategories([]);
    }
  }, []);

  /**
   * Fetch dishes.
   */
  const fetchAndDisplayDishes = useCallback(async (): Promise<void> => {
    try {
      const dishesData = await getDishes();

      if (dishesData.success && Array.isArray(dishesData.data)) {
        setMenuItems(dishesData.data);
      } else {
        setMenuItems([]);
      }
    } catch (error: unknown) {
      console.error("Error fetching dishes:", error);

      setMenuItems([]);
    }
  }, []);

  /**
   * Fetch dishes + categories.
   */
  useEffect(() => {
    const fetchMenu = async (): Promise<void> => {
      setLoading(true);

      try {
        await Promise.all([
          fetchAndDisplayDishes(),
          fetchAndDisplayCategories(),
        ]);
      } finally {
        setLoading(false);
      }
    };

    void fetchMenu();
  }, [fetchAndDisplayDishes, fetchAndDisplayCategories]);

  /**
   * Handle category selection.
   */
  const handleCategoryChange = (category: Category): void => {
    setActiveCategory(category.name);
  };

  /**
   * Show all dishes.
   */
  const handleAllCategories = (): void => {
    setActiveCategory("All");
  };

  return (
    <>
      <FullscreenLoader open={loading} />

      <section id="menu" className="section menu-section">
        <div className="container">
          {/* Header */}
          <ScrollReveal className="menu-section__header">
            <span className="section-number" aria-hidden="true">
              01
            </span>

            <span className="section-label">The Menu</span>

            <h2 className="section-title">
              Crafted with fire
              <br />& intention
            </h2>

            <p className="section-subtitle">
              Every dish begins with exceptional ingredients and ends with a
              moment worth remembering.
            </p>
          </ScrollReveal>

          {/* Featured carousel */}
          {menuItems.length > 0 && (
            <div className="menu-featured">
              <ScrollReveal>
                <h3 className="menu-featured__title">Signature Selections</h3>
              </ScrollReveal>

              <Swiper
                {...swiperParams}
                className="menu-featured__scroll menu-featured__swiper"
                parallax
                rewind
                loop
                slidesPerView={3}
              >
                {featured.map((item: Dish) => {
                  return (
                    <SwiperSlide key={item.id} className="menu-featured__slide">
                      <motion.div
                        initial={
                          reducedMotion
                            ? false
                            : {
                                opacity: 0,
                                y: 20,
                              }
                        }
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{
                          once: true,
                          amount: 0.2,
                        }}
                        transition={{
                          duration: 0.6,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <Link
                          to={`/menu/${item.id}`}
                          className="menu-featured__card"
                        >
                          <div className="menu-featured__image">
                            <img
                              src={getDishImage(item)}
                              alt={item.name}
                              style={{
                                borderRadius: 20,
                              }}
                              loading="lazy"
                            />

                            <div className="menu-featured__overlay">
                              <ArrowUpRight size={24} />
                            </div>

                            <div className="menu-featured__info">
                              <span className="menu-featured__category">
                                {item.category}
                              </span>

                              <h4 className="menu-featured__name">
                                {item.name}
                              </h4>

                              <p className="menu-featured__desc">
                                {item.shortDescription}
                              </p>

                              <span className="menu-featured__price">
                                Rs. {item.price}/-
                              </span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          )}

          {/* Hot deals */}
          {filteredHotDeals.length > 0 && (
            <div className="menu-hot-deals">
              <div className="menu-hot-deals__header">
                <div>
                  <span className="menu-hot-deals__eyebrow">Hot deals</span>

                  <h3 className="menu-hot-deals__title">
                    Tonight's best-value picks
                  </h3>
                </div>

                <span className="menu-hot-deals__badge">Limited time</span>
              </div>

              <SearchBar value={dealQuery} onChange={setDealQuery} />

              <div className="menu-hot-deals__cards">
                {filteredHotDeals.length === 0 ? (
                  <div className="menu-hot-deals__empty">
                    No hot deals match your search.
                  </div>
                ) : (
                  filteredHotDeals.map((item: Dish, index: number) => (
                    <motion.div
                      key={item.id}
                      initial={
                        reducedMotion
                          ? false
                          : {
                              opacity: 0,
                              y: 30,
                            }
                      }
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.5,
                      }}
                    >
                      <Link
                        to={`/menu/${item.id}`}
                        className={`menu-item ${
                          index % 3 === 1 ? "menu-item--alt" : ""
                        }`}
                      >
                        <div className="menu-item__image">
                          <img
                            src={getDishImage(item)}
                            alt={item.name}
                            loading="lazy"
                          />
                        </div>

                        <div className="menu-item__content">
                          <div className="menu-item__top">
                            <h4 className="menu-item__name">{item.name}</h4>

                            <span className="menu-item__price">
                              Rs. {item.price}/-
                            </span>
                          </div>

                          <p className="menu-item__desc">
                            {item.shortDescription}
                          </p>

                          {item.tags.length > 0 && (
                            <div className="menu-item__tags">
                              {item.tags.map((tag: string) => (
                                <span key={tag} className="menu-item__tag">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <span className="menu-item__link">
                            View details <ArrowUpRight size={14} />
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Category filter */}
          <div
            className="menu-filter"
            role="tablist"
            aria-label="Menu categories"
          >
            {/* All */}
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === "All"}
              className={`menu-filter__btn ${
                activeCategory === "All" ? "menu-filter__btn--active" : ""
              }`}
              onClick={handleAllCategories}
            >
              All
            </button>

            {/* Firestore categories */}
            {menuCategories.map((category: Category) => {
              const isActive =
                activeCategory.trim().toLowerCase() ===
                category.name.trim().toLowerCase();

              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`menu-filter__btn ${
                    isActive ? "menu-filter__btn--active" : ""
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category.name}
                </button>
              );
            })}
          </div>

          {/* Menu search */}
          <div className="menu-items-search">
            <SearchBar value={menuQuery} onChange={setMenuQuery} />
          </div>

          {/* Menu grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="menu-grid"
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                    }
              }
              animate={{
                opacity: 1,
              }}
              exit={
                reducedMotion
                  ? undefined
                  : {
                      opacity: 0,
                    }
              }
              transition={{
                duration: 0.3,
              }}
            >
              {menuItems.length === 0 ? (
                <div className="menu-empty">
                  <div className="empty-illustration">
                    <svg
                      width="150"
                      height="150"
                      viewBox="0 0 180 180"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="90"
                        cy="90"
                        r="68"
                        fill="rgba(219, 120, 60, 0.06)"
                      />

                      <circle
                        cx="90"
                        cy="90"
                        r="55"
                        stroke="rgba(219, 120, 60, 0.18)"
                        strokeWidth="1.5"
                        strokeDasharray="5 6"
                      />

                      {/* Plate */}
                      <ellipse
                        cx="90"
                        cy="104"
                        rx="48"
                        ry="15"
                        fill="rgba(219, 120, 60, 0.08)"
                        stroke="rgba(219, 120, 60, 0.45)"
                        strokeWidth="2"
                      />

                      <ellipse
                        cx="90"
                        cy="100"
                        rx="38"
                        ry="11"
                        stroke="rgba(219, 120, 60, 0.3)"
                        strokeWidth="1.5"
                      />

                      {/* Fork */}
                      <path
                        d="M55 62V91"
                        stroke="rgba(219, 120, 60, 0.45)"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      <path
                        d="M50 62V76M55 62V76M60 62V76"
                        stroke="rgba(219, 120, 60, 0.45)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />

                      <path
                        d="M55 76V102"
                        stroke="rgba(219, 120, 60, 0.45)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />

                      {/* Knife */}
                      <path
                        d="M124 62C130 72 130 84 124 94V102"
                        stroke="rgba(219, 120, 60, 0.45)"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      <path
                        d="M124 62V92"
                        stroke="rgba(219, 120, 60, 0.25)"
                        strokeWidth="1.5"
                      />

                      {/* Food sparkle */}
                      <path
                        d="M88 75C82 69 78 72 78 77C78 82 83 85 90 88C97 85 102 82 102 77C102 72 98 69 92 75L90 77L88 75Z"
                        fill="rgba(219, 120, 60, 0.18)"
                        stroke="rgba(219, 120, 60, 0.45)"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />

                      {/* Decorative dots */}
                      <circle
                        cx="42"
                        cy="93"
                        r="3"
                        fill="rgba(219, 120, 60, 0.25)"
                      />

                      <circle
                        cx="139"
                        cy="87"
                        r="3"
                        fill="rgba(219, 120, 60, 0.25)"
                      />

                      <circle
                        cx="128"
                        cy="49"
                        r="2"
                        fill="rgba(219, 120, 60, 0.35)"
                      />

                      <circle
                        cx="48"
                        cy="50"
                        r="2"
                        fill="rgba(219, 120, 60, 0.35)"
                      />
                    </svg>
                  </div>

                  <h3>No menu items yet</h3>
                  <p>Your menu is waiting for its first delicious addition.</p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="menu-empty">
                  <div className="empty-illustration">
                    <svg
                      width="150"
                      height="150"
                      viewBox="0 0 180 180"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="90"
                        cy="90"
                        r="68"
                        fill="rgba(219, 120, 60, 0.06)"
                      />

                      <circle
                        cx="90"
                        cy="90"
                        r="55"
                        stroke="rgba(219, 120, 60, 0.18)"
                        strokeWidth="1.5"
                        strokeDasharray="5 6"
                      />

                      {/* Search circle */}
                      <circle
                        cx="82"
                        cy="82"
                        r="25"
                        fill="rgba(219, 120, 60, 0.06)"
                        stroke="rgba(219, 120, 60, 0.45)"
                        strokeWidth="3"
                      />

                      <path
                        d="M100 101L121 122"
                        stroke="rgba(219, 120, 60, 0.45)"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />

                      {/* Small plate inside */}
                      <ellipse
                        cx="82"
                        cy="82"
                        rx="12"
                        ry="7"
                        stroke="rgba(219, 120, 60, 0.28)"
                        strokeWidth="1.5"
                      />

                      <path
                        d="M76 82C78 77 86 77 88 82C86 86 78 86 76 82Z"
                        fill="rgba(219, 120, 60, 0.18)"
                      />

                      {/* Decorative sparkle */}
                      <path
                        d="M123 53V66M116.5 59.5H129.5"
                        stroke="rgba(219, 120, 60, 0.4)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />

                      <path
                        d="M48 112V122M43 117H53"
                        stroke="rgba(219, 120, 60, 0.3)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />

                      <circle
                        cx="130"
                        cy="108"
                        r="3"
                        fill="rgba(219, 120, 60, 0.3)"
                      />
                    </svg>
                  </div>

                  <h3>No items in this category</h3>
                  <p>There aren't any dishes available in this category yet.</p>
                </div>
              ) : (
                filtered.map((item: Dish, index: number) => (
                  <motion.div
                    key={item.id}
                    initial={
                      reducedMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 30,
                          }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.05,
                      duration: 0.5,
                    }}
                  >
                    <Link
                      to={`/menu/${item.id}`}
                      className={`menu-item ${
                        index % 3 === 1 ? "menu-item--alt" : ""
                      }`}
                    >
                      <div className="menu-item__image">
                        <img
                          src={getDishImage(item)}
                          alt={item.name}
                          loading="lazy"
                        />
                      </div>

                      <div className="menu-item__content">
                        <div className="menu-item__top">
                          <h4 className="menu-item__name">{item.name}</h4>

                          <span className="menu-item__price">Rs. {item.price}/-</span>
                        </div>

                        <p className="menu-item__desc">
                          {item.shortDescription}
                        </p>

                        {item.tags.length > 0 && (
                          <div className="menu-item__tags">
                            {item.tags.map((tag: string) => (
                              <span key={tag} className="menu-item__tag">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <span className="menu-item__link">
                          View details <ArrowUpRight size={14} />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
