import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./Hero.module.css";
import { useGetWebsiteSettingsQuery } from "../../services/websiteSettingsApi";
import { baseUrl } from "../../services/api";

export function Hero() {
  const { data: websiteSettings = null } = useGetWebsiteSettingsQuery();
  let sliderImages: string[] = [];

  if (websiteSettings?.sliderImages) {
    sliderImages = JSON.parse(websiteSettings.sliderImages) as string[];
  }

  return (
    <section className={styles.hero}>
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
          {sliderImages.map((image, index) => {
            const sliderImage = baseUrl + image;
            sliderImage;
            return (
              <SwiperSlide key={image ?? index} className={styles.slide}>
                <img
                  src={sliderImage}
                  alt={"Pastizza special offer"}
                  className={styles.image}
                  onError={(e) => {
                    e.currentTarget.src = "/slider1.webp";
                  }}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
