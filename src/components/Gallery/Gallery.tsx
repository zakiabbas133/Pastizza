import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages } from '@/data/gallery';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import './Gallery.css';

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const navigate = (dir: 1 | -1) => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + dir + galleryImages.length) % galleryImages.length);
  };

  return (
    <section id="gallery" className="section gallery-section">
      <div className="container">
        <ScrollReveal className="gallery-section__header">
          <span className="section-number" aria-hidden="true">03</span>
          <span className="section-label">Visual Journey</span>
          <h2 className="section-title">Moments captured</h2>
        </ScrollReveal>
      </div>

      <div className="gallery-masonry">
        {galleryImages.map((image, i) => (
          <motion.button
            key={image.id}
            type="button"
            className={`gallery-item gallery-item--${image.size}`}
            onClick={() => openLightbox(i)}
            initial={reducedMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.06, duration: 0.6 }}
            aria-label={`View ${image.alt}`}
          >
            <img src={image.src} alt={image.alt} loading="lazy" />
            <div className="gallery-item__overlay">
              <span className="gallery-item__category">{image.category}</span>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <button type="button" className="lightbox__close" onClick={closeLightbox} aria-label="Close">
              <X size={28} />
            </button>
            <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => navigate(-1)} aria-label="Previous image">
              <ChevronLeft size={32} />
            </button>
            <motion.div
              key={lightboxIndex}
              className="lightbox__content"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].alt}
              />
              <p className="lightbox__caption">{galleryImages[lightboxIndex].alt}</p>
            </motion.div>
            <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => navigate(1)} aria-label="Next image">
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
