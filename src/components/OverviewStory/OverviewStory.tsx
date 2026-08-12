import { motion } from 'framer-motion';
import { restaurantInfo } from '@/data/restaurant';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { staggerContainer, fadeUp, getMotionVariants } from '@/utils/animations';
import './OverviewStory.css';

export default function OverviewStory() {
  const reducedMotion = useReducedMotion();
  const containerVariants = getMotionVariants(reducedMotion, staggerContainer);
  const itemVariants = getMotionVariants(reducedMotion, fadeUp);

  return (
    <section id="story" className="section overview-story">
      <div className="container">
        <div className="overview-story__grid">
          <ScrollReveal className="overview-story__intro">
            <span className="section-label">Our Story</span>
            <h2 className="section-title">
              A table set<br />by tradition
            </h2>
            <div className="divider" />
            <p className="overview-story__text">
              {restaurantInfo.description} From our 900° wood-fired Acunto oven to the hands that shape every strand of pasta, Pastizza is a sanctuary for those who believe dining is an art form.
            </p>
          </ScrollReveal>

          <div className="overview-story__visual">
            <ScrollReveal delay={0.2}>
              <div className="overview-story__image-main">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
                  alt="Pastizza restaurant interior with warm lighting"
                  loading="lazy"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <div className="overview-story__image-accent">
                <img
                  src={restaurantInfo.chef.image}
                  alt={`${restaurantInfo.chef.name}, ${restaurantInfo.chef.title}`}
                  loading="lazy"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>

        <motion.div
          className="overview-story__stats"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {restaurantInfo.stats.map((stat) => (
            <motion.div key={stat.label} className="overview-story__stat" variants={itemVariants}>
              <span className="overview-story__stat-value">{stat.value}</span>
              <span className="overview-story__stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <ScrollReveal className="overview-story__chef">
          <div className="overview-story__chef-content">
            <span className="section-label">The Kitchen</span>
            <h3 className="overview-story__chef-name">{restaurantInfo.chef.name}</h3>
            <p className="overview-story__chef-title">{restaurantInfo.chef.title}</p>
            <p className="overview-story__chef-bio">{restaurantInfo.chef.bio}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
