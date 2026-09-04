import { motion } from "framer-motion";
import heroPizza from "../../assets/heropizza.mp4";
import styles from "./SectionHeader.module.css";

interface Props {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  video?: boolean;
}

export function SectionHeader({
  label,
  title,
  description,
  align = "center",
  video = true,
}: Props) {
  return (
    <motion.div
      className={`${styles.header} ${align === "left" ? styles.left : styles.center}`}
      style={
        !video
          ? {
              minHeight: "unset",
              paddingBottom: 0,
              paddingTop: 0,
            }
          : {}
      }
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      {video && (
        <video
          src={heroPizza}
          autoPlay
          muted
          loop
          playsInline
          className={styles.video}
        />
      )}

      <div className={styles.content}>
        {label && <span className="section-label">{label}</span>}
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.desc}>{description}</p>}
      </div>
    </motion.div>
  );
}
