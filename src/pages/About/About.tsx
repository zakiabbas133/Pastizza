import { motion } from 'framer-motion';
import { SectionHeader } from '../../components/SectionHeader/SectionHeader';
import styles from './About.module.css';

const timeline = [
  {
    year: '2018',
    title: 'A single oven',
    text: 'Pastizza began as a tiny counter with one wood-fired oven and a handful of recipes.',
  },
  {
    year: '2020',
    title: 'Riverside opens',
    text: 'We found a permanent home on Ember Lane and expanded the menu beyond pizza.',
  },
  {
    year: '2023',
    title: 'Oak & Main',
    text: 'A second location in the Oak Quarter brought more fire and more tables.',
  },
  {
    year: 'Today',
    title: 'Still learning',
    text: 'We keep refining dough, sauce, and technique — always chasing a better bite.',
  },
];

export function About() {
  return (
    <div className="page">
      <section className={styles.hero}>
        <div className="container">
          <SectionHeader
            label="Who we are"
            title="About Pastizza"
            description="We cook with fire, time, and respect for the ingredient. That is the whole philosophy."
          />
        </div>
      </section>

      <section className={styles.story}>
        <div className={`container ${styles.storyGrid}`}>
          <motion.div
            className={styles.storyImage}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=80"
              alt="Restaurant interior"
              loading="lazy"
            />
          </motion.div>
          <div className={styles.storyText}>
            <span className="section-label">Our story</span>
            <h2>Born from heat and patience</h2>
            <p>
              Pastizza is Italian for furnace — the heart of our kitchen. We built
              this place around a single idea: that the best food is shaped by
              fire, fermentation, and the people who cook it every day.
            </p>
            <p>
              Our dough rests for days. Our ragu simmers for hours. Our pizzas
              leave the oven with leopard-spotted crusts and molten cheese.
              Nothing is rushed that should not be.
            </p>
          </div>
        </div>
      </section>

      <section className={`section ${styles.philosophy}`}>
        <div className="container">
          <SectionHeader
            label="How we cook"
            title="What we believe"
          />
          <div className={styles.philoGrid}>
            {[
              {
                title: 'Fresh ingredients',
                text: 'Seasonal produce, quality proteins, and flour we trust. We source carefully and cook simply.',
                img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
              },
              {
                title: 'Fire as a tool',
                text: 'Wood fire is not a gimmick. It transforms dough, vegetables, and proteins in ways a steel oven cannot.',
                img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
              },
              {
                title: 'Atmosphere',
                text: 'Warm light, honest materials, and a room that invites you to stay a little longer.',
                img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
              },
            ].map((item, i) => (
              <motion.article
                key={item.title}
                className={styles.philoCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <img src={item.img} alt="" loading="lazy" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.timeline}`}>
        <div className="container">
          <SectionHeader label="Milestones" title="A short history" />
          <div className={styles.tl}>
            {timeline.map((t, i) => (
              <motion.div
                key={t.year}
                className={styles.tlItem}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <span className={styles.year}>{t.year}</span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
