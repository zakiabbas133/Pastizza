import { useCallback, useEffect, useState } from "react";

import { Link, Navigate, useParams } from "react-router-dom";

import { motion } from "framer-motion";

import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { useReducedMotion } from "@/hooks/useReducedMotion";

import { Swiper, SwiperSlide } from "swiper/react";

import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";

import { getMenuItemsByCategory, getMenuItemById } from "../../services/dishes";

import type { Dish } from "../../services/dishes";

import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./MenuItemDetails.css";

/* =========================================================
   Skeleton
========================================================= */

function MenuItemDetailsSkeleton() {
  return (
    <div
      className="menu-detail-skeleton"
      aria-busy="true"
      aria-label="Loading menu item"
    >
      {/* =====================================================
          HERO IMAGE
      ====================================================== */}

      <div className="menu-detail-skeleton__hero">
        <div className="menu-detail-skeleton__image" />
      </div>

      {/* =====================================================
          THUMBNAILS
      ====================================================== */}

      <div className="container">
        <div className="menu-detail-skeleton__thumbnails">
          {Array.from({ length: 5 }).map((_, index: number) => (
            <div
              key={index}
              className="menu-detail-skeleton__thumbnail menu-detail-skeleton__box"
            />
          ))}
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="container menu-detail-skeleton__content">
        <div className="menu-detail-skeleton__back menu-detail-skeleton__line" />

        <div className="menu-detail-skeleton__category menu-detail-skeleton__line" />

        <div className="menu-detail-skeleton__title menu-detail-skeleton__line" />

        <div className="menu-detail-skeleton__price menu-detail-skeleton__line" />

        {/* Tags */}

        <div className="menu-detail-skeleton__tags">
          {Array.from({ length: 3 }).map((_, index: number) => (
            <div
              key={index}
              className="menu-detail-skeleton__tag menu-detail-skeleton__line"
            />
          ))}
        </div>

        {/* Description */}

        <div className="menu-detail-skeleton__description">
          {Array.from({ length: 4 }).map((_, index: number) => (
            <div
              key={index}
              className="menu-detail-skeleton__description-line menu-detail-skeleton__line"
            />
          ))}
        </div>

        {/* Ingredients / Allergens */}

        <div className="menu-detail-skeleton__meta-grid">
          {Array.from({ length: 2 }).map((_, columnIndex: number) => (
            <div key={columnIndex} className="menu-detail-skeleton__meta">
              <div className="menu-detail-skeleton__meta-title menu-detail-skeleton__line" />

              <div className="menu-detail-skeleton__meta-list">
                {Array.from({ length: 4 }).map((__, itemIndex: number) => (
                  <div
                    key={itemIndex}
                    className="menu-detail-skeleton__meta-item menu-detail-skeleton__line"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Related */}

        <div className="menu-detail-skeleton__related">
          <div className="menu-detail-skeleton__related-title menu-detail-skeleton__line" />

          <div className="menu-detail-skeleton__related-grid">
            {Array.from({ length: 3 }).map((_, index: number) => (
              <div key={index} className="menu-detail-skeleton__related-card">
                <div className="menu-detail-skeleton__related-image menu-detail-skeleton__box" />

                <div className="menu-detail-skeleton__related-info">
                  <div className="menu-detail-skeleton__related-name menu-detail-skeleton__line" />

                  <div className="menu-detail-skeleton__related-price menu-detail-skeleton__line" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Component
========================================================= */

export default function MenuItemDetails() {
  const { id } = useParams<{
    id: string;
  }>();

  const reducedMotion = useReducedMotion();

  const [item, setItem] = useState<Dish | null>(null);

  const [related, setRelated] = useState<Dish[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [notFound, setNotFound] = useState<boolean>(false);

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  /* =======================================================
     Scroll to top
  ======================================================= */

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;

    window.history.scrollRestoration = "manual";

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    const frameId = window.requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    });

    return () => {
      window.cancelAnimationFrame(frameId);

      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, [id]);

  /* =======================================================
     Fetch
  ======================================================= */

  const fetchMenuItem = useCallback(async (): Promise<void> => {
    if (!id) {
      setItem(null);
      setRelated([]);
      setNotFound(true);
      setLoading(false);

      return;
    }

    try {
      setLoading(true);
      setNotFound(false);

      const response = await getMenuItemById(id);

      if (!response.success || !response.data) {
        setItem(null);
        setRelated([]);
        setNotFound(true);

        return;
      }

      const menuItem: Dish = response.data;

      setItem(menuItem);

      if (!menuItem.category) {
        setRelated([]);

        return;
      }

      const relatedResponse = await getMenuItemsByCategory(menuItem.category);

      if (relatedResponse.success && Array.isArray(relatedResponse.data)) {
        const relatedItems = relatedResponse.data.filter(
          (relatedItem: Dish): boolean => relatedItem.id !== menuItem.id,
        );

        setRelated(relatedItems);
      } else {
        setRelated([]);
      }
    } catch (error: unknown) {
      console.error("Error fetching menu item:", error);

      setItem(null);
      setRelated([]);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [id]);

  /* =======================================================
     Route change / Fetch
  ======================================================= */

  useEffect(() => {
    setThumbsSwiper(null);

    void fetchMenuItem();

    return () => {
      setThumbsSwiper(null);
    };
  }, [fetchMenuItem]);

  /* =======================================================
     Additional scroll protection
  ======================================================= */

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [id]);

  /* =======================================================
     Not found
  ======================================================= */

  if (!loading && (notFound || !item)) {
    return <Navigate to="/" replace />;
  }

  /* =======================================================
     Loading skeleton
  ======================================================= */

  if (loading || !item) {
    return (
      <main className="menu-detail">
        <MenuItemDetailsSkeleton />
      </main>
    );
  }

  /*
   * From this point onward TypeScript knows that
   * `item` is a Dish because the null case has been
   * handled above.
   */
  const dish: Dish = item;

  /* =======================================================
     Render
  ======================================================= */

  return (
    <main className="menu-detail">
      <motion.article
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
        transition={{
          duration: 0.5,
        }}
      >
        {/* =================================================
            IMAGES
        ================================================== */}

        {dish.images.length > 0 && (
          <div>
            {/* Main image swiper */}

            <Swiper
              spaceBetween={10}
              navigation
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              modules={[FreeMode, Navigation, Thumbs, Pagination]}
              slidesPerView={1}
              loop={dish.images.length > 1}
              pagination={{
                dynamicBullets: true,
              }}
              className="mySwiper2"
            >
              {dish.images.map((image) => (
                <SwiperSlide key={image.id}>
                  <motion.img
                    src={image.src}
                    alt={image.name || dish.name}
                    className="menu-detail__hero-image"
                    initial={
                      reducedMotion
                        ? false
                        : {
                            scale: 1.1,
                          }
                    }
                    animate={{
                      scale: 1,
                    }}
                    transition={{
                      duration: 1.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />

                  <div className="menu-img__overlay" />

                  <div className="menu-detail__hero-overlay-carousel-image" />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbnail swiper */}

            {dish.images.length > 1 && (
              <Swiper
                onSwiper={(swiper: SwiperType): void => {
                  setThumbsSwiper(swiper);
                }}
                spaceBetween={10}
                slidesPerView={Math.min(dish.images.length, 5)}
                freeMode
                watchSlidesProgress
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
              >
                {dish.images.map((image) => (
                  <SwiperSlide key={image.id}>
                    <motion.img
                      src={image.src}
                      alt={image.name || dish.name}
                      className="menu-detail__hero-image"
                      initial={
                        reducedMotion
                          ? false
                          : {
                              scale: 1.1,
                            }
                      }
                      animate={{
                        scale: 1,
                      }}
                      transition={{
                        duration: 1.2,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />

                    <div className="menu-img__overlay" />

                    <div className="menu-detail__hero-overlay" />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        )}

        {/* =================================================
            CONTENT
        ================================================== */}

        <div className="container menu-detail__content">
          {/* Back */}

          <motion.div
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 40,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
              duration: 0.6,
            }}
          >
            <Link
              to={{
                pathname: "/",
                hash: "menu",
              }}
              className="menu-detail__back"
            >
              <ArrowLeft size={18} />
              Back to Menu
            </Link>
          </motion.div>

          {/* Header */}

          <motion.div
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 40,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
              duration: 0.6,
            }}
          >
            <span className="menu-detail__category">{dish.category}</span>

            <h1 className="menu-detail__name">{dish.name}</h1>

            <span className="menu-detail__price">Rs. {dish.price}/-</span>

            {dish.tags.length > 0 && (
              <div className="menu-detail__tags">
                {dish.tags.map((tag: string) => (
                  <span key={tag} className="menu-detail__tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Body */}

          <div className="menu-detail__body">
            <motion.div
              className="menu-detail__main"
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
                delay: 0.5,
                duration: 0.6,
              }}
            >
              <p className="menu-detail__description">{dish.description}</p>

              <div className="menu-detail__meta-grid">
                {/* Ingredients */}

                <div className="menu-detail__meta">
                  <h3>Ingredients</h3>

                  <ul>
                    {dish.ingredients.length > 0 ? (
                      dish.ingredients.map((ingredient: string) => (
                        <li key={ingredient}>{ingredient}</li>
                      ))
                    ) : (
                      <li>None listed</li>
                    )}
                  </ul>
                </div>

                {/* Allergens */}

                <div className="menu-detail__meta">
                  <h3>Allergens</h3>

                  <ul>
                    {dish.allergens.length > 0 ? (
                      dish.allergens.map((allergen: string) => (
                        <li key={allergen}>{allergen}</li>
                      ))
                    ) : (
                      <li>None listed</li>
                    )}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Related */}

          {related.length > 0 && (
            <section
              className="menu-detail__related"
              aria-label="Related dishes"
            >
              <h2 className="menu-detail__related-title">You may also enjoy</h2>

              <div className="menu-detail__related-grid">
                {related.map((rel: Dish) => {
                  const image = rel.images.length > 0 ? rel.images[0] : null;

                  return (
                    <Link
                      key={rel.id}
                      to={`/menu/${rel.id}`}
                      className="menu-detail__related-card"
                    >
                      {image?.src ? (
                        <img
                          src={image.src}
                          alt={image.name || rel.name}
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className="menu-detail__related-card-placeholder"
                          aria-hidden="true"
                        />
                      )}

                      <div className="menu-detail__related-info">
                        <h3>{rel.name}</h3>

                        <span>Rs. {rel.price}/-</span>

                        <ArrowUpRight size={16} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </motion.article>
    </main>
  );
}
