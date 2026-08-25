import { motion } from 'framer-motion';
import styles from './SectionHeader.module.css';

interface Props {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({
  label,
  title,
  description,
  align = 'center',
}: Props) {
  return (
    <motion.div
      className={`${styles.header} ${align === 'left' ? styles.left : styles.center}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
    >
      {label && <span className="section-label">{label}</span>}
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.desc}>{description}</p>}
    </motion.div>
  );
}
