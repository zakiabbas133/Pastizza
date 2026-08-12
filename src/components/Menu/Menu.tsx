import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { menuItems, menuCategories, type MenuCategory } from '@/data/menu';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import './Menu.css';

// Swiper for featured carousel (centered + coverflow)
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation, EffectCoverflow, Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('All');
  const reducedMotion = useReducedMotion();

  const filtered =
    activeCategory === 'All'
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const featured = menuItems.filter((item) => item.featured);

  const swiperParams = {
    modules: [Navigation, EffectCoverflow, Autoplay],
    centeredSlides: true,
    loop: true,
    effect: 'coverflow' as const,
    coverflowEffect: { rotate: -10, stretch: 0, depth: 0, modifier: 1.2, slideShadows: false },
    navigation: true,
    pagination: { clickable: true },
    autoplay: { delay: 3500, disableOnInteraction: true },
    breakpoints: {
      0: { slidesPerView: 1, spaceBetween: 12 },
      640: { slidesPerView: 2, spaceBetween: 16 },
      900: { slidesPerView: 3, spaceBetween: 20 },
      1100: { slidesPerView: 3, spaceBetween: 24 },
    },
  };

  return (
    <section id="menu" className="section menu-section">
      <div className="container">
        <ScrollReveal className="menu-section__header">
          <span className="section-number" aria-hidden="true">01</span>
          <span className="section-label">The Menu</span>
          <h2 className="section-title">Crafted with fire<br />& intention</h2>
          <p className="section-subtitle">
            Every dish begins with exceptional ingredients and ends with a moment worth remembering.
          </p>
        </ScrollReveal>

        {/* Featured carousel */}
        <div className="menu-featured">
          <ScrollReveal>
            <h3 className="menu-featured__title">Signature Selections</h3>
          </ScrollReveal>

          <Swiper {...swiperParams} className="menu-featured__scroll menu-featured__swiper">
            {featured.map((item, i) => (
              <SwiperSlide key={item.id} className="menu-featured__slide">
                <motion.div
                  initial={reducedMotion ? false : { opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                >
                  <Link to={`/menu/${item.id}`} className="menu-featured__card">
                    <div className="menu-featured__image">
                      <img src={item.image} alt={item.name} style={{
                        borderRadius: 20
                      }} loading="lazy" />
                      <div className="menu-featured__overlay">
                        <ArrowUpRight size={24} />
                      </div>
                    </div>
                    <div className="menu-featured__info">
                      <span className="menu-featured__category">{item.category}</span>
                      <h4 className="menu-featured__name">{item.name}</h4>
                      <span className="menu-featured__price">{item.price}</span>
                    </div>
                  </Link>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Category filter */}
        <div className="menu-filter" role="tablist" aria-label="Menu categories">
          {menuCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat}
              className={`menu-filter__btn ${activeCategory === cat ? 'menu-filter__btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
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
                    className={`menu-item ${i % 3 === 1 ? 'menu-item--alt' : ''}`}
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
                            <span key={tag} className="menu-item__tag">{tag}</span>
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
