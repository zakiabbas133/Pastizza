import { useCallback, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import {
  getMenuItemsByCategory,
  getMenuItemById,
  Dish,
} from "../../services/dishes";
import type { Swiper as SwiperType } from "swiper";
import FullscreenLoader from "../../components/Loader/FullscreenLoader";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./MenuItemDetails.css";

interface DishImage {
  id: string;
  src: string;
  name: string;
}

export default function MenuItemDetails() {
  const { id } = useParams<{ id: string }>();

  const reducedMotion = useReducedMotion();

  const [item, setItem] = useState<Dish | null>(null);
  const [related, setRelated] = useState<Dish[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  /**
   * Fetch the current menu item and related items.
   */
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
        const relatedItems: Dish[] = relatedResponse.data.filter(
          (relatedItem: Dish) => relatedItem.id !== menuItem.id,
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

  /**
   * Fetch item whenever route ID changes.
   */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });

    void fetchMenuItem();

    return () => {
      setThumbsSwiper(null);
    };
  }, [fetchMenuItem]);

  /**
   * Redirect when the dish doesn't exist.
   */
  if (!loading && (notFound || !item)) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <FullscreenLoader open={loading} />

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
        {/* =====================================================
            IMAGES
        ====================================================== */}
        <div>
          {item && item.images.length > 0 && (
            <>
              {/* Main image swiper */}
              <Swiper
                spaceBetween={10}
                navigation
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                modules={[FreeMode, Navigation, Thumbs, Pagination]}
                slidesPerView={1}
                loop={item.images.length > 1}
                pagination={{
                  dynamicBullets: true,
                }}
                className="mySwiper2"
              >
                {item.images.map((image, index) => (
                  <SwiperSlide key={image?.id}>
                    <motion.img
                      src={image?.src}
                      alt={image?.name || item?.name}
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
              {item.images.length > 1 && (
                <Swiper
                  onSwiper={(swiper: SwiperType) => {
                    setThumbsSwiper(swiper);
                  }}
                  spaceBetween={10}
                  slidesPerView={Math.min(item.images.length, 5)}
                  freeMode
                  watchSlidesProgress
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper"
                >
                  {item.images.map((image, index) => (
                    <SwiperSlide key={image.id}>
                      <motion.img
                        src={image.src}
                        alt={image.name || item.name}
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
            </>
          )}
        </div>

        {/* =====================================================
            CONTENT
        ====================================================== */}
        <div className="container menu-detail__content">
          {/* Back button */}
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
            <span className="menu-detail__category">{item?.category}</span>

            <h1 className="menu-detail__name">{item?.name}</h1>

            <span className="menu-detail__price">{item?.price}</span>

            {item?.tags?.length ? (
              <div className="menu-detail__tags">
                {item.tags.map((tag: string) => (
                  <span key={tag} className="menu-detail__tag">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </motion.div>

          {/* =====================================================
              BODY
          ====================================================== */}
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
              <p className="menu-detail__description">{item?.description}</p>

              {/* Ingredients / Allergens */}
              <div className="menu-detail__meta-grid">
                {/* Ingredients */}
                <div className="menu-detail__meta">
                  <h3>Ingredients</h3>

                  <ul>
                    {item?.ingredients?.length ? (
                      item.ingredients.map((ingredient: string) => (
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
                    {item?.allergens?.length ? (
                      item.allergens.map((allergen: string) => (
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

          {/* =====================================================
              RELATED DISHES
          ====================================================== */}
          {related.length > 0 && (
            <section
              className="menu-detail__related"
              aria-label="Related dishes"
            >
              <h2 className="menu-detail__related-title">You may also enjoy</h2>

              <div className="menu-detail__related-grid">
                {related.map((rel: Dish) => {
                  const image: DishImage | undefined = rel.images?.[0];

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

                        <span>{rel.price}</span>

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
    </>
  );
}
