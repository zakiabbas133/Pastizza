import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import { restaurantInfo } from '@/data/restaurant';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import './Location.css';

export default function Location() {
  return (
    <section id="location" className="section location-section">
      <div className="container">
        <ScrollReveal className="location-section__header">
          <span className="section-label">Find Us</span>
          <h2 className="section-title">Visit Pastizza</h2>
        </ScrollReveal>

        <div className="location-grid">
          <ScrollReveal className="location-info">
            <div className="location-info__item">
              <MapPin size={20} className="location-info__icon" aria-hidden="true" />
              <div>
                <h3 className="location-info__label">Address</h3>
                <p>{restaurantInfo.address.full}</p>
              </div>
            </div>

            <div className="location-info__item">
              <Clock size={20} className="location-info__icon" aria-hidden="true" />
              <div>
                <h3 className="location-info__label">Opening Hours</h3>
                {restaurantInfo.openingHours.map((slot) => (
                  <p key={slot.days}>
                    <strong>{slot.days}:</strong> {slot.hours}
                  </p>
                ))}
              </div>
            </div>

            <div className="location-info__item">
              <Phone size={20} className="location-info__icon" aria-hidden="true" />
              <div>
                <h3 className="location-info__label">Phone</h3>
                <a href={`tel:${restaurantInfo.phone.replace(/\s/g, '')}`}>{restaurantInfo.phone}</a>
              </div>
            </div>

            <div className="location-info__item">
              <Mail size={20} className="location-info__icon" aria-hidden="true" />
              <div>
                <h3 className="location-info__label">Email</h3>
                <a href={`mailto:${restaurantInfo.email}`}>{restaurantInfo.email}</a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="location-map">
            <iframe
              title="Pastizza restaurant location map"
              src={restaurantInfo.mapEmbedUrl}
              className="location-map__iframe"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
