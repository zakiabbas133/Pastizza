import { motion, type HTMLMotionProps } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { fadeUp, getMotionVariants } from '@/utils/animations';

interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
}

export default function ScrollReveal({ children, delay = 0, ...props }: ScrollRevealProps) {
  const reducedMotion = useReducedMotion();
  const variants = getMotionVariants(reducedMotion, fadeUp);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={variants}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
