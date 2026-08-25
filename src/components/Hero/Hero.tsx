import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";

import { deals } from "../../data/deals";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      {/* Background Slider */}
      <div className={styles.bg}>
        <Swiper
          modules={[Navigation, Pagination, A11y, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop
          speed={800}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          navigation
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          className={styles.swiper}
        >
          {deals.map((deal, index) => (
            <SwiperSlide key={deal.id ?? index} className={styles.slide}>
              <img
                src={
                  "https://www.pizzasta.co/_next/image?url=%2Fimages%2Fmidnight-hero-1.jpg&w=1920&q=75"
                }
                alt={deal.title || "Pastizza special offer"}
                className={styles.image}
              />

            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
