import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { menuItems, menuCategories, type MenuCategory } from "@/data/menu";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  EffectCoverflow,
  Autoplay,
  Parallax,
} from "swiper/modules";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import SearchBar from "./SearchBar";
import "./Menu.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("All");
  const [dealQuery, setDealQuery] = useState("");
  const [menuQuery, setMenuQuery] = useState("");
  const reducedMotion = useReducedMotion();

  const matchesQuery = (item: (typeof menuItems)[number], query: string) => {
    if (query.trim() === "") return true;

    const q = query.toLowerCase();
    const hay = (
      item.name +
      " " +
      item.shortDescription +
      " " +
      item.description +
      " " +
      item.tags.join(" ") +
      " " +
      item.ingredients.join(" ") +
      " " +
      item.category
    ).toLowerCase();

    return hay.includes(q);
  };

  const baseFiltered =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const filtered = baseFiltered.filter((item) => matchesQuery(item, menuQuery));
  const hotDeals = menuItems.filter((item) => item.hotDeal).slice(0, 4);
  const filteredHotDeals = hotDeals.filter((item) =>
    matchesQuery(item, dealQuery),
  );
  const featured = menuItems.filter((item) => item.featured);

  const swiperParams = {
    modules: [Navigation, EffectCoverflow, Parallax],
    parallax: true,
    centeredSlides: true,
    loop: true,
    effect: "coverflow",

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

      900: {
        slidesPerView: 3,
        spaceBetween: 24,
      },

      1100: {
        slidesPerView: 3,
        spaceBetween: 30,
      },

      1400: {
        slidesPerView: 3,
        spaceBetween: 36,
      },
    },
  };

  return (
    <section id="menu" className="section menu-section">
      <div className="container">
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
        <div className="menu-featured">
          <ScrollReveal>
            <h3 className="menu-featured__title">Signature Selections</h3>
          </ScrollReveal>

          <Swiper
            {...swiperParams}
            className="menu-featured__scroll menu-featured__swiper"
            parallax={true}
            rewind={true}
          >
            {featured.map((item) => (
              <SwiperSlide key={item.id} className="menu-featured__slide">
                <motion.div
                  initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link to={`/menu/${item.id}`} className="menu-featured__card">
                    <div className="menu-featured__image">
                      <img
                        src={item.image}
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
                        <h4 className="menu-featured__name">{item.name}</h4>
                        <p className="menu-featured__desc">
                          {item.shortDescription}
                        </p>
                        <span className="menu-featured__price">{item.price}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

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
              filteredHotDeals.map((item, i) => (
                // <Link key={item.id} to={`/menu/${item.id}`} className="menu-hot-deals__card">
                //   <div className="menu-hot-deals__image">
                //     <img src={item.image} alt={item.name} loading="lazy" />
                //   </div>
                //   <div className="menu-hot-deals__content">
                //     <div className="menu-hot-deals__meta">
                //       <span className="menu-hot-deals__tag">Hot deal</span>
                //       <span className="menu-hot-deals__category">{item.category}</span>
                //     </div>
                //     <h4 className="menu-hot-deals__name">{item.name}</h4>
                //     <p className="menu-hot-deals__desc">{item.shortDescription}</p>
                //     <div className="menu-hot-deals__pricing">
                //       <span className="menu-hot-deals__deal-price">{item.dealPrice ?? item.price}</span>
                //       <span className="menu-hot-deals__original-price">{item.price}</span>
                //     </div>
                //   </div>
                // </Link>
                <motion.div
                  key={item.id}
                  initial={reducedMotion ? false : { opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                >
                  <Link
                    to={`/menu/${item.id}`}
                    className={`menu-item ${i % 3 === 1 ? "menu-item--alt" : ""}`}
                  >
                    <div className="menu-item__image">
                      <img src={item.image} alt={item.name} loading="lazy" />
                    </div>
                    <div className="menu-item__content">
                      <div className="menu-item__top">
                        <h4 className="menu-item__name">{item.name}</h4>
                        <span className="menu-item__price">{item.price}</span>
                      </div>
                      <p className="menu-item__desc">{item.shortDescription}</p>
                      {item.tags.length > 0 && (
                        <div className="menu-item__tags">
                          {item.tags.map((tag) => (
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

        {/* Category filter */}
        <div
          className="menu-filter"
          role="tablist"
          aria-label="Menu categories"
        >
          {menuCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat}
              className={`menu-filter__btn ${activeCategory === cat ? "menu-filter__btn--active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="menu-items-search">
          <SearchBar value={menuQuery} onChange={setMenuQuery} />
        </div>

        {/* Menu grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="menu-grid"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.length === 0 ? (
              <div className="menu-empty">
                <p>No items in this category yet.</p>
              </div>
            ) : (
              filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={reducedMotion ? false : { opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                >
                  <Link
                    to={`/menu/${item.id}`}
                    className={`menu-item ${i % 3 === 1 ? "menu-item--alt" : ""}`}
                  >
                    <div className="menu-item__image">
                      <img src={item.image} alt={item.name} loading="lazy" />
                    </div>
                    <div className="menu-item__content">
                      <div className="menu-item__top">
                        <h4 className="menu-item__name">{item.name}</h4>
                        <span className="menu-item__price">{item.price}</span>
                      </div>
                      <p className="menu-item__desc">{item.shortDescription}</p>
                      {item.tags.length > 0 && (
                        <div className="menu-item__tags">
                          {item.tags.map((tag) => (
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
  );
}
